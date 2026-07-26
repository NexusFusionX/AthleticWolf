import { NextRequest, NextResponse } from "next/server";
import { packages } from "@/app/data/packages";
import { getAuthedUser } from "@/lib/supabase-server";
import { getCheckoutAmountCents, getStripe, isStripeConfigured } from "@/lib/stripe";

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
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { paymentIntentId, packageName, assessmentData } = body;

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

    if (paymentIntent.amount !== getCheckoutAmountCents(pkg.price)) {
      return NextResponse.json({ error: "Payment amount mismatch" }, { status: 403 });
    }

    const { data: existingPlan } = await supabase
      .from("plans")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existingPlan) {
      return NextResponse.json({ error: "Plan already exists" }, { status: 409 });
    }

    const { error } = await supabase.from("plans").insert({
      user_id: user.id,
      package_name: pkg.name,
      status: "active",
      assessment_completed_at: new Date().toISOString(),
      assessment_data:
        assessmentData != null ? JSON.stringify(assessmentData) : null,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Stripe complete-order error:", error);
    return NextResponse.json(
      { error: "Could not complete order after payment." },
      { status: 500 }
    );
  }
}
