"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight } from "@phosphor-icons/react";
import { Header } from "@/app/components/Header";
import { packages } from "@/app/data/packages";

export function ThankYouContent() {
  const searchParams = useSearchParams();
  const packageName = searchParams.get("package");
  const changeType = searchParams.get("type"); // upgrade | new
  const pkg = useMemo(
    () => packages.find((item) => item.name === packageName) ?? null,
    [packageName]
  );

  const isUpgrade = changeType === "upgrade";
  const nextHref = `/quiz${
    packageName ? `?package=${encodeURIComponent(packageName)}` : ""
  }`;
  const nextLabel = isUpgrade
    ? "Continue to assessment"
    : "Start your assessment";
  const secondaryHref = "/dashboard";
  const secondaryLabel = "Go to dashboard";

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-16 sm:px-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,107,53,0.22), transparent 60%)",
          }}
        />

        <div className="relative w-full max-w-xl">
          <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-premium">
            <div className="bg-ink px-8 py-8 text-white sm:px-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                Payment confirmed
              </p>
              <div className="mt-4 flex items-start gap-3">
                <CheckCircle
                  size={36}
                  weight="fill"
                  className="mt-0.5 shrink-0 text-accent"
                  aria-hidden
                />
                <div>
                  <h1 className="font-display text-3xl text-balance sm:text-4xl">
                    {isUpgrade ? "You're upgraded." : "Welcome to the pack."}
                  </h1>
                  <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                    {isUpgrade
                      ? `Your plan is now ${pkg?.name ?? "updated"}. Your coach has your new package details.`
                      : `Thanks for joining Athletic Wolf${pkg ? ` on the ${pkg.name} plan` : ""}. You're locked in — next we'll learn your goals.`}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 px-8 py-8 sm:px-10">
              {pkg ? (
                <div className="rounded-xl border border-line bg-surface/50 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    Your package
                  </p>
                  <p className="mt-1 font-display text-xl text-white">
                    {pkg.name}
                  </p>
                  <p className="mt-1 text-sm text-muted">{pkg.tagline}</p>
                </div>
              ) : null}

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  What happens next
                </p>
                <ol className="mt-3 space-y-3">
                  {(isUpgrade
                    ? [
                        "Your dashboard already reflects the new package.",
                        "Your coach will adjust training and nutrition as needed.",
                        "Keep checking in weekly — support stays on.",
                      ]
                    : [
                        "Complete a short intake assessment (a few minutes).",
                        "Your coach builds your custom plan within 24–48 hours.",
                        "Start training from your dashboard with weekly check-ins.",
                      ]
                  ).map((item, index) => (
                    <li key={item} className="flex gap-3 text-sm text-white/80">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                        {index + 1}
                      </span>
                      <span className="pt-0.5">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={nextHref}
                  className="btn btn-accent inline-flex flex-1 items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white"
                >
                  {nextLabel}
                  <ArrowRight size={16} weight="bold" aria-hidden />
                </Link>
                <Link
                  href={secondaryHref}
                  className="btn btn-outline inline-flex flex-1 items-center justify-center px-6 py-3.5 text-sm font-bold uppercase tracking-wide"
                >
                  {secondaryLabel}
                </Link>
              </div>

              <p className="text-center text-xs text-muted">
                Questions? Email{" "}
                <a
                  href="mailto:hello@athleticwolf.com"
                  className="text-accent hover:underline"
                >
                  hello@athleticwolf.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
