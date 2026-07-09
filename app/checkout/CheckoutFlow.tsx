"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check } from "@phosphor-icons/react";
import { packages } from "../data/packages";

export function CheckoutFlow() {
  const searchParams = useSearchParams();
  const packageName = searchParams.get("package");
  const pkg = packages.find((p) => p.name === packageName);

  if (!pkg) {
    return (
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-6">
        <div className="w-full shadow-premium rounded-2xl border border-line bg-card p-10 text-center">
          <h1 className="font-display text-3xl">No Package Selected</h1>
          <p className="mt-3 text-muted">
            Head back to the packages section and pick a plan to check out.
          </p>
          <Link
            href="/#packages"
            className="btn-accent mt-6 inline-block rounded-xl px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
          >
            View Packages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-6">
      <div className="w-full overflow-hidden shadow-premium rounded-2xl border border-line bg-card">
        <div className="bg-ink px-8 py-7 text-white">
          <Link href="/" className="font-display text-lg">
            Athletic<span className="text-accent">Wolf</span>
          </Link>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Checkout
          </p>
          <h1 className="font-display mt-1.5 text-3xl sm:text-4xl">
            Complete Your Order
          </h1>
        </div>

        <div className="p-8">
          <div className="rounded-xl border border-line bg-surface p-6">
            <div className="flex items-center justify-between">
              <p className="font-display text-xl">{pkg.name} Plan</p>
              {pkg.featured && (
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Most Popular
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted">6 Month Coaching Package</p>
            <div className="mt-4 flex items-end gap-1">
              <span className="font-display text-3xl">${pkg.price}</span>
              <span className="mb-0.5 text-sm text-muted">/ month</span>
            </div>
            <p className="mt-1 text-sm text-muted">Total value ${pkg.value}</p>

            <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-5">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <Check
                    size={16}
                    weight="bold"
                    className="mt-0.5 shrink-0 text-accent"
                    aria-hidden
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-xl border border-dashed border-line bg-surface p-6 text-center">
            <p className="text-sm font-semibold">🔒 Payment Method</p>
            <p className="mt-2 text-sm text-muted">
              Secure payment processing isn&apos;t connected yet. Once it is,
              you&apos;ll enter your card details here. For now, continue below
              to proceed as if payment were complete.
            </p>
          </div>

          <Link
            href={`/quiz?package=${encodeURIComponent(pkg.name)}`}
            className="btn-accent font-display mt-6 flex w-full items-center justify-center rounded-xl px-8 py-3.5 text-base text-white"
          >
            Complete Purchase (Test Mode) →
          </Link>
        </div>
      </div>
    </div>
  );
}
