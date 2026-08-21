"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react";
import { Header } from "@/app/components/Header";
import { packages } from "@/app/data/packages";
import {
  EMPTY_LEAD_FORM,
  leadDisplayRows,
  leadToFormData,
  type LeadFormData,
  type LeadRecord,
} from "@/app/lib/lead-form-steps";
import "./thank-you.css";

const SUBMITTED_KEY = "aw_lead_form_submitted";

export function ThankYouContent() {
  const searchParams = useSearchParams();
  const leadId = searchParams.get("lead");
  const packageName = searchParams.get("package");
  const changeType = searchParams.get("type"); // upgrade | new

  const [leadData, setLeadData] = useState<LeadFormData | null>(null);
  const [leadLoading, setLeadLoading] = useState(Boolean(leadId));

  useEffect(() => {
    if (!leadId) return;

    let cancelled = false;

    async function loadLead() {
      try {
        const cached = window.sessionStorage.getItem(SUBMITTED_KEY);
        if (cached) {
          const parsed = JSON.parse(cached) as {
            id?: string;
            data?: LeadFormData;
          };
          if (parsed.id === leadId && parsed.data) {
            if (!cancelled) {
              setLeadData({ ...EMPTY_LEAD_FORM, ...parsed.data });
              setLeadLoading(false);
            }
          }
        }
      } catch {
        // continue to API
      }

      try {
        const res = await fetch(`/api/leads/${encodeURIComponent(leadId!)}`);
        const payload = await res.json();
        if (!res.ok || !payload.lead) return;
        if (!cancelled) {
          setLeadData(leadToFormData(payload.lead as LeadRecord));
        }
      } catch {
        // keep session cache if present
      } finally {
        if (!cancelled) setLeadLoading(false);
      }
    }

    void loadLead();
    return () => {
      cancelled = true;
    };
  }, [leadId]);

  const isLeadMode = Boolean(leadId);
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
  const rows = leadData ? leadDisplayRows(leadData) : [];

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="thank-you">
        <div className="thank-you__glow" aria-hidden />

        <div className="thank-you__inner">
          <p className="thank-you__eyebrow">
            {isLeadMode ? "Application received" : "Payment confirmed"}
          </p>

          <h1 className="thank-you__title">Thank you.</h1>

          {isLeadMode ? (
            <>
              <p className="thank-you__lede">
                We&apos;re creating your plan. Your coach has your details and
                will follow up soon.
              </p>

              {leadLoading ? (
                <p className="thank-you__lede">Loading your answers…</p>
              ) : rows.length > 0 ? (
                <div className="thank-you__answers">
                  <p className="thank-you__answers-title">Your details</p>
                  <dl className="thank-you__answers-list">
                    {rows.map((row) => (
                      <div key={row.key} className="thank-you__answers-row">
                        <dt>{row.label}</dt>
                        <dd>{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}

              <ol className="thank-you__next" aria-label="What happens next">
                {[
                  "Your application is with your coach.",
                  "We're building a plan around your answers.",
                  "We'll reach out on Instagram or email with next steps.",
                ].map((item, index) => (
                  <li key={item}>
                    <span className="thank-you__step" aria-hidden>
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>

              <div className="thank-you__actions">
                <Link href="/" className="thank-you__btn-primary">
                  Back to home
                  <ArrowRight size={16} weight="bold" aria-hidden />
                </Link>
              </div>
            </>
          ) : (
            <>
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
                <Link href="/dashboard" className="thank-you__btn-ghost">
                  Go to dashboard
                </Link>
              </div>
            </>
          )}

          <p className="thank-you__help">
            Questions?{" "}
            <a href="mailto:hello@athleticwolf.com">hello@athleticwolf.com</a>
          </p>
        </div>
      </main>
    </div>
  );
}
