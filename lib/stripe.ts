import Stripe from "stripe";
import { PACKAGE_TERM_MONTHS } from "@/app/data/packages";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }

  return stripeClient;
}

export function isStripeConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
}

/** Full prepaid package total in USD cents (monthly rate × term). */
export function getCheckoutAmountCents(pricePerMonth: number): number {
  return Math.round(pricePerMonth * PACKAGE_TERM_MONTHS * 100);
}
