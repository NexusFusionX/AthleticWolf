import type { ReactNode } from "react";
import Link from "next/link";
import { ASSESSMENT_STEPS } from "@/app/lib/assessment-steps";

type AssessmentShellProps = {
  children: ReactNode;
  currentStep: number;
  packageName?: string | null;
  compact?: boolean;
  preview?: boolean;
  onStartOver?: () => void;
  footer?: ReactNode;
  brandHref?: string;
  showProgress?: boolean;
};

export function AssessmentShell({
  children,
  currentStep,
  packageName,
  compact = false,
  preview = false,
  onStartOver,
  footer,
  brandHref,
  showProgress = true,
}: AssessmentShellProps) {
  const step = ASSESSMENT_STEPS[currentStep];
  const headerPad = compact ? "px-3 py-3" : "px-8 py-7";
  const bodyPad = compact ? "p-3" : "p-8";
  const titleClass = compact
    ? "font-display mt-1 text-sm leading-tight"
    : "font-display mt-1.5 text-3xl sm:text-4xl";

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-premium">
      <div className={`bg-ink text-white ${headerPad}`}>
        <p
          className={`font-display ${compact ? "text-[10px]" : "text-lg"}`}
          aria-hidden={preview}
        >
          {brandHref && !preview ? (
            <Link href={brandHref}>
              Athletic<span className="text-accent">Wolf</span>
            </Link>
          ) : (
            <>
              Athletic<span className="text-accent">Wolf</span>
            </>
          )}
        </p>
        <p
          className={`mt-2 font-semibold uppercase tracking-[0.16em] text-accent ${
            compact ? "text-[8px]" : "text-sm"
          }`}
        >
          Intake Assessment
        </p>
        <h2 className={titleClass}>Tell Us About Your Goals</h2>
        {packageName && (
          <span
            className={`mt-2 inline-block rounded-full bg-white/10 font-semibold uppercase tracking-wide text-white/90 ${
              compact ? "px-2 py-0.5 text-[8px]" : "px-3 py-1 text-xs"
            }`}
          >
            {packageName} Plan
          </span>
        )}

        {showProgress && (
          <>
            <div className={`${compact ? "mt-2" : "mt-5"} flex gap-1`}>
              {ASSESSMENT_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${
                    i <= currentStep ? "bg-accent" : "bg-white/20"
                  }`}
                  aria-hidden
                />
              ))}
            </div>
            <div
              className={`${compact ? "mt-1.5" : "mt-2.5"} flex items-center justify-between`}
            >
              <p
                className={`uppercase tracking-[0.12em] text-white/60 ${
                  compact ? "text-[8px]" : "text-xs"
                }`}
              >
                Step {currentStep + 1} of {ASSESSMENT_STEPS.length}: {step.label}
              </p>
              {!preview && onStartOver && (
                <button
                  type="button"
                  onClick={onStartOver}
                  className="text-xs font-semibold uppercase tracking-[0.1em] text-white/50 underline-offset-2 transition-colors hover:text-white hover:underline"
                >
                  Start Over
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <div className={bodyPad}>{children}</div>
      {footer}
    </div>
  );
}
