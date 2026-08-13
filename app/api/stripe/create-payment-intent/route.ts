import { NextRequest, NextResponse } from "next/server";
import { packages } from "@/app/data/packages";
import { findCountryByCode } from "@/app/data/countries";
import { getAuthedUser } from "@/lib/supabase-server";
import {
  getPackageChangeType,
  getUpgradeDifferenceCents,
} from "@/app/lib/package-change";
import { convertUsdToStripeAmountLive } from "@/app/lib/checkout-currency";
import { getCheckoutAmountCents, getStripe, isStripeConfigured } from "@/lib/stripe";
import { applyPromoDiscountCents, validatePromoCode } from "@/app/lib/promo-code";

export async function POST(request: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Stripe is not configured. Add test keys to .env.local." },
      { status: 503 }
    );
  }

  const { supabase, user } = await getAuthedUser(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    packageName?: string;
    promoCode?: string;
    countryCode?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const pkg = packages.find((item) => item.name === body.packageName);

  if (!pkg) {
    return NextResponse.json({ error: "Unknown package" }, { status: 400 });
  }

  const countryCode = body.countryCode?.trim().toUpperCase() ?? "";
  if (!countryCode || !findCountryByCode(countryCode)) {
    return NextResponse.json(
      { error: "A valid country is required for checkout pricing." },
      { status: 400 }
    );
  }

  const { data: existingPlan } = await supabase
    .from("plans")
    .select("id, package_name")
    .eq("user_id", user.id)
    .maybeSingle();

  let amountUsdCents: number;
  let description: string;
  let metadata: Record<string, string>;

  if (existingPlan) {
    const changeType = getPackageChangeType(existingPlan.package_name, pkg.name);

    if (!changeType || changeType === "same") {
      return NextResponse.json(
        { error: "You are already on this package." },
        { status: 409 }
      );
    }

    if (changeType === "downgrade") {
      return NextResponse.json(
        {
          error:
            "Downgrades do not require payment. Confirm the package change to continue.",
          changeType: "downgrade",
        },
        { status: 402 }
      );
    }

    const upgradeAmount = getUpgradeDifferenceCents(
      existingPlan.package_name,
      pkg.name
    );

    if (!upgradeAmount) {
      return NextResponse.json(
        { error: "Could not calculate upgrade amount." },
        { status: 400 }
      );
    }

    amountUsdCents = upgradeAmount;
    description = `Athletic Wolf — upgrade to ${pkg.name} (price difference)`;
    metadata = {
      userId: user.id,
      packageName: pkg.name,
      packageSlug: pkg.slug,
      changeType: "upgrade",
      previousPackageName: existingPlan.package_name,
      countryCode,
    };
  } else {
    amountUsdCents = getCheckoutAmountCents(pkg.price);
    description = `Athletic Wolf — ${pkg.name}`;
    metadata = {
      userId: user.id,
      packageName: pkg.name,
      packageSlug: pkg.slug,
      changeType: "new",
      countryCode,
    };
  }

  const promo = body.promoCode ? validatePromoCode(body.promoCode) : null;

  if (body.promoCode && !promo) {
    return NextResponse.json({ error: "Invalid promo code." }, { status: 400 });
  }

  try {
    const stripe = getStripe();

    if (promo) {
      amountUsdCents = applyPromoDiscountCents(amountUsdCents, promo.percentOff);
      metadata.promoCode = promo.code;
      metadata.promoPercentOff = String(promo.percentOff);
      description = `${description} (${promo.code} ${promo.percentOff}% off)`;
    }

    if (amountUsdCents <= 0) {
      return NextResponse.json(
        { error: "This order total is fully covered by your promo code." },
        { status: 400 }
      );
    }

    const charge = await convertUsdToStripeAmountLive(
      amountUsdCents / 100,
      countryCode
    );

    if (charge.amount <= 0) {
      return NextResponse.json(
        { error: "Could not calculate a payable amount for this currency." },
        { status: 400 }
      );
    }

    metadata.chargeCurrency = charge.currencyCode;
    metadata.amountUsdCents = String(amountUsdCents);
    metadata.fxRate = String(charge.rateFromUsd);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: charge.amount,
      currency: charge.currency,
      automatic_payment_methods: { enabled: true },
      metadata,
      description,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: charge.amount,
      currency: charge.currency,
      currencyCode: charge.currencyCode,
      amountUsdCents,
      changeType: metadata.changeType,
    });
  } catch (error) {
    console.error("Stripe create-payment-intent error:", error);
    return NextResponse.json(
      { error: "Could not start payment. Check your Stripe test keys." },
      { status: 500 }
    );
  }
}
