import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutFlow } from "./CheckoutFlow";

export const metadata: Metadata = {
  title: "Checkout | Athletic Wolf",
  description: "Complete your Athletic Wolf coaching package order.",
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutFlow />
    </Suspense>
  );
}
