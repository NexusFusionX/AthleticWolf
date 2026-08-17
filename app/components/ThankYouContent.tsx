"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react";
import { Header } from "@/app/components/Header";
import { packages } from "@/app/data/packages";
import "./thank-you.css";

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
      <main className="thank-you">
        <div className="thank-you__glow" aria-hidden />

        <div className="thank-you__inner">
          <p className="thank-you__eyebrow">Payment confirmed</p>

          <h1 className="thank-you__title">Thank you.</h1>

          <p className="thank-you__lede">
            {isUpgrade
              ? `You're upgraded${pkg ? ` to ${pkg.name}` : ""}. Your coach has your new package details.`
              : `Welcome to Athletic Wolf${pkg ? ` — ${pkg.name}` : ""}. You're locked in.`}
          </p>

          {pkg ? (
            <p className="thank-you__package">
              <span>Your package</span>
              <strong>{pkg.name}</strong>
            </p>
          ) : null}

          <ol className="thank-you__next" aria-label="What happens next">
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
              <li key={item}>
                <span className="thank-you__step" aria-hidden>
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>

          <div className="thank-you__actions">
            <Link href={nextHref} className="thank-you__btn-primary">
              {nextLabel}
              <ArrowRight size={16} weight="bold" aria-hidden />
            </Link>
            <Link href={secondaryHref} className="thank-you__btn-ghost">
              {secondaryLabel}
            </Link>
          </div>

          <p className="thank-you__help">
            Questions?{" "}
            <a href="mailto:hello@athleticwolf.com">hello@athleticwolf.com</a>
          </p>
        </div>
      </main>
    </div>
  );
}
