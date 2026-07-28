"use client";

import { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { supabase } from "@/lib/supabase";

type StripeCheckoutPaymentProps = {
  packageName: string;
  amountLabel: string;
  assessmentData?: unknown;
  onSuccess: () => void;
};

function PaymentForm({
  packageName,
  amountLabel,
  assessmentData,
  onSuccess,
}: StripeCheckoutPaymentProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isTestMode =
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith("pk_test_") ??
    process.env.NODE_ENV === "development";

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!stripe || !elements) return;

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message ?? "Payment failed. Please try again.");
        setSubmitting(false);
        return;
      }

      if (!paymentIntent || paymentIntent.status !== "succeeded") {
        setErrorMessage("Payment was not completed. Please try again.");
        setSubmitting(false);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        setErrorMessage("Your session expired. Please sign in again.");
        setSubmitting(false);
        return;
      }

      const completeRes = await fetch("/api/stripe/complete-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          paymentIntentId: paymentIntent.id,
          packageName,
          assessmentData,
        }),
      });

      const completeData = await completeRes.json();

      if (!completeRes.ok) {
        setErrorMessage(
          completeData.error ?? "Payment succeeded but order setup failed."
        );
        setSubmitting(false);
        return;
      }

      onSuccess();
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />

      {errorMessage && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || submitting}
        className="btn btn-accent font-display w-full px-8 py-3.5 text-base text-white disabled:opacity-50"
      >
        {submitting
          ? "Processing..."
          : isTestMode
            ? `Pay ${amountLabel} (Test)`
            : `Pay ${amountLabel}`}
      </button>

      {isTestMode && (
        <p className="text-center text-xs leading-relaxed text-muted">
          Stripe test mode — use card{" "}
          <span className="font-mono">4242 4242 4242 4242</span> with any future
          expiry and CVC.
        </p>
      )}
    </form>
  );
}

export function StripeCheckoutPayment({
  packageName,
  amountLabel,
  assessmentData,
  onSuccess,
}: StripeCheckoutPaymentProps) {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = useMemo(
    () => (publishableKey ? loadStripe(publishableKey) : null),
    [publishableKey]
  );

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function createIntent() {
      if (!publishableKey) {
        setErrorMessage(
          "Stripe is not configured yet. Add your test keys to .env.local."
        );
        setLoading(false);
        return;
      }

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.access_token) {
          setErrorMessage("Please sign in again to continue checkout.");
          setLoading(false);
          return;
        }

        const response = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ packageName }),
        });

        const data = await response.json();

        if (cancelled) return;

        if (!response.ok) {
          setErrorMessage(data.error ?? "Could not start checkout.");
          setLoading(false);
          return;
        }

        setClientSecret(data.clientSecret);
        setLoading(false);
      } catch {
        if (!cancelled) {
          setErrorMessage("Could not connect to payment service.");
          setLoading(false);
        }
      }
    }

    createIntent();

    return () => {
      cancelled = true;
    };
  }, [packageName, publishableKey]);

  if (loading) {
    return (
      <div className="animate-pulse rounded-xl border border-line bg-surface p-6 space-y-4">
        <div className="h-4 w-32 rounded bg-white/10" />
        <div className="h-24 rounded-lg bg-white/10" />
        <div className="h-12 rounded-xl bg-white/10" />
      </div>
    );
  }

  if (errorMessage || !clientSecret || !stripePromise) {
    return (
      <div className="rounded-xl border border-dashed border-line bg-surface p-6 text-center">
        <p className="text-sm font-semibold">Payment setup</p>
        <p className="mt-2 text-sm text-muted">
          {errorMessage ??
            "Add Stripe test keys to .env.local, then refresh this page."}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-surface p-6">
      <p className="text-sm font-semibold">Secure payment</p>
      <p className="mt-1 text-xs text-muted">
        Your card details are encrypted by Stripe.
      </p>

      <div className="mt-4">
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "night",
              variables: {
                colorPrimary: "#ff6b35",
                colorBackground: "#111111",
                colorText: "#ffffff",
                colorDanger: "#ef4444",
                borderRadius: "12px",
              },
            },
          }}
        >
          <PaymentForm
            packageName={packageName}
            amountLabel={amountLabel}
            assessmentData={assessmentData}
            onSuccess={onSuccess}
          />
        </Elements>
      </div>
    </div>
  );
}
