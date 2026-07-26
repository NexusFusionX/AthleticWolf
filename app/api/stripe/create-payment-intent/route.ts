import { NextRequest, NextResponse } from "next/server";
import { packages } from "@/app/data/packages";
import { getAuthedUser } from "@/lib/supabase-server";
import { getCheckoutAmountCents, getStripe, isStripeConfigured } from "@/lib/stripe";

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

  let body: { packageName?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const pkg = packages.find((item) => item.name === body.packageName);

  if (!pkg) {
    return NextResponse.json({ error: "Unknown package" }, { status: 400 });
  }

  const { data: existingPlan } = await supabase
    .from("plans")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingPlan) {
    return NextResponse.json(
      { error: "You already have an active package." },
      { status: 409 }
    );
  }

  try {
    const stripe = getStripe();
    const amount = getCheckoutAmountCents(pkg.price);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId: user.id,
        packageName: pkg.name,
        packageSlug: pkg.slug,
      },
      description: `Athletic Wolf — ${pkg.name} (placeholder checkout amount)`,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount,
      currency: "usd",
    });
  } catch (error) {
    console.error("Stripe create-payment-intent error:", error);
    return NextResponse.json(
      { error: "Could not start payment. Check your Stripe test keys." },
      { status: 500 }
    );
  }
}
