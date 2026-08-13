import { NextRequest, NextResponse } from "next/server";
import { packages } from "@/app/data/packages";
import { getAuthedUser } from "@/lib/supabase-server";
import { getUpgradeDifferenceCents } from "@/app/lib/package-change";
import { convertUsdToStripeAmount } from "@/app/lib/checkout-currency";
import { applyPromoDiscountCents } from "@/app/lib/promo-code";
import { getCheckoutAmountCents, getStripe, isStripeConfigured } from "@/lib/stripe";
import { USD_EXCHANGE_RATES } from "@/app/data/currency-rates";

export async function POST(request: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Stripe is not configured." },
      { status: 503 }
    );
  }

  const { supabase, user } = await getAuthedUser(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    paymentIntentId?: string;
    packageName?: string;
    assessmentData?: unknown;
    checkoutContact?: {
      firstName?: string;
      lastName?: string;
      countryCode?: string;
      contactChannel?: "phone" | "email";
      phone?: string;
      email?: string;
      preferredContact?: string;
    };
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { paymentIntentId, packageName, assessmentData, checkoutContact } = body;

  if (!paymentIntentId || !packageName) {
    return NextResponse.json(
      { error: "Missing paymentIntentId or packageName" },
      { status: 400 }
    );
  }

  const pkg = packages.find((item) => item.name === packageName);

  if (!pkg) {
    return NextResponse.json({ error: "Unknown package" }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
    }

    if (paymentIntent.metadata.userId !== user.id) {
      return NextResponse.json({ error: "Payment does not match this account" }, { status: 403 });
    }

    if (paymentIntent.metadata.packageName !== packageName) {
      return NextResponse.json({ error: "Payment does not match this package" }, { status: 403 });
    }

    const changeType = paymentIntent.metadata.changeType ?? "new";

    const { data: existingPlan } = await supabase
      .from("plans")
      .select("id, package_name")
      .eq("user_id", user.id)
      .maybeSingle();

    let expectedUsdCents: number;

    if (changeType === "upgrade") {
      if (!existingPlan) {
        return NextResponse.json({ error: "No active package found" }, { status: 404 });
      }

      const upgradeAmount = getUpgradeDifferenceCents(
        existingPlan.package_name,
        packageName
      );

      if (!upgradeAmount) {
        return NextResponse.json({ error: "Invalid upgrade amount" }, { status: 400 });
      }

      expectedUsdCents = upgradeAmount;
    } else {
      if (existingPlan) {
        return NextResponse.json({ error: "Plan already exists" }, { status: 409 });
      }

      expectedUsdCents = getCheckoutAmountCents(pkg.price);
    }

    const promoPercentOff = Number(paymentIntent.metadata.promoPercentOff || 0);
    if (Number.isFinite(promoPercentOff) && promoPercentOff > 0) {
      expectedUsdCents = applyPromoDiscountCents(expectedUsdCents, promoPercentOff);
    }

    const countryCode =
      paymentIntent.metadata.countryCode?.trim().toUpperCase() ||
      checkoutContact?.countryCode?.trim().toUpperCase() ||
      "US";

    // Use the FX rate locked at payment-intent creation so a mid-checkout
    // market move cannot fail a successful payment.
    const fxRate = Number(paymentIntent.metadata.fxRate);
    const chargeCurrency =
      paymentIntent.metadata.chargeCurrency?.trim().toUpperCase() ||
      paymentIntent.currency.toUpperCase();

    const ratesForValidation: Record<string, number> = {
      ...USD_EXCHANGE_RATES,
      [chargeCurrency]:
        Number.isFinite(fxRate) && fxRate > 0
          ? fxRate
          : USD_EXCHANGE_RATES[chargeCurrency] ?? 1,
      USD: 1,
    };

    const expectedCharge = convertUsdToStripeAmount(
      expectedUsdCents / 100,
      countryCode,
      ratesForValidation
    );

    if (
      paymentIntent.amount !== expectedCharge.amount ||
      paymentIntent.currency !== expectedCharge.currency
    ) {
      return NextResponse.json({ error: "Payment amount mismatch" }, { status: 403 });
    }

    const hasAssessment = assessmentData != null;

    const checkoutPayload = checkoutContact?.firstName
      ? {
          firstName: checkoutContact.firstName.trim(),
          lastName: checkoutContact.lastName?.trim() ?? "",
          countryCode: checkoutContact.countryCode?.trim() ?? "",
          contactChannel: checkoutContact.contactChannel,
          phone:
            checkoutContact.contactChannel === "phone"
              ? checkoutContact.phone?.trim() ?? ""
              : "",
          email:
            checkoutContact.contactChannel === "email"
              ? checkoutContact.email?.trim() ?? ""
              : user.email ?? "",
          preferredContact: checkoutContact.preferredContact,
          accountEmail: user.email ?? "",
        }
      : null;

    if (changeType === "upgrade" && existingPlan) {
      const { error } = await supabase
        .from("plans")
        .update({
          package_name: pkg.name,
          status: "active",
          ...(checkoutPayload
            ? { checkout_data: JSON.stringify(checkoutPayload) }
            : {}),
        })
        .eq("id", existingPlan.id);

      if (error) throw error;
    } else {
      const { error } = await supabase.from("plans").insert({
        user_id: user.id,
        package_name: pkg.name,
        status: hasAssessment ? "active" : "assessment_pending",
        assessment_completed_at: hasAssessment ? new Date().toISOString() : null,
        assessment_data: hasAssessment ? JSON.stringify(assessmentData) : null,
        ...(checkoutPayload ? { checkout_data: JSON.stringify(checkoutPayload) } : {}),
      });

      if (error) throw error;
    }

    if (checkoutContact?.firstName) {
      const fullName = [checkoutContact.firstName.trim(), checkoutContact.lastName?.trim()]
        .filter(Boolean)
        .join(" ");
      await supabase.auth.updateUser({
        data: {
          first_name: checkoutContact.firstName.trim(),
          last_name: checkoutContact.lastName?.trim() || null,
          full_name: fullName || checkoutContact.firstName.trim(),
          phone:
            checkoutContact.contactChannel === "phone"
              ? checkoutContact.phone?.trim() ?? null
              : null,
          contact_email:
            checkoutContact.contactChannel === "email"
              ? checkoutContact.email?.trim() ?? null
              : null,
          contact_channel: checkoutContact.contactChannel,
          preferred_contact: checkoutContact.preferredContact ?? null,
          country: checkoutContact.countryCode?.trim() || null,
        },
      });
    }

    return NextResponse.json({ success: true, changeType });
  } catch (error) {
    console.error("Stripe complete-order error:", error);
    return NextResponse.json(
      { error: "Could not complete order after payment." },
      { status: 500 }
    );
  }
}
