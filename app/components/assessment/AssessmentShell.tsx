import type { ReactNode } from "react";
import Link from "next/link";
import type { AssessmentStep } from "@/app/lib/assessment-steps";

export type AssessmentSegment = {
  id: string;
  label: string;
  absoluteIndex: number;
};

type AssessmentShellProps = {
  children: ReactNode;
  step: AssessmentStep;
  /** 1-based index among visible steps. */
  displayStep: number;
  displayTotal: number;
  packageName?: string | null;
  compact?: boolean;
  preview?: boolean;
  onStartOver?: () => void;
  onSelectStep?: (absoluteIndex: number) => void;
  segments?: AssessmentSegment[];
  furthestAbsoluteIndex?: number;
  footer?: ReactNode;
  brandHref?: string;
  showProgress?: boolean;
};

export function AssessmentShell({
  children,
  step,
  displayStep,
  displayTotal,
  packageName,
  compact = false,
  preview = false,
  onStartOver,
  onSelectStep,
  segments = [],
  furthestAbsoluteIndex = 0,
  footer,
  brandHref,
  showProgress = true,
}: AssessmentShellProps) {
  const progressPct = Math.round(
    (Math.min(displayStep, displayTotal) / Math.max(displayTotal, 1)) * 100
  );
  const canJump = Boolean(onSelectStep) && !preview && !compact;

  if (compact) {
    return (
      <div className="overflow-hidden rounded-2xl border border-line bg-card">
        <div className="bg-ink px-3 py-3 text-white">
          <p className="font-display text-[10px]">
            Athletic<span className="text-accent">Wolf</span>
          </p>
          <p className="mt-1 text-[8px] uppercase tracking-wide text-accent">
            {step.label}
          </p>
        </div>
        <div className="p-3">{children}</div>
        {footer}
      </div>
    );
  }

  return (
    <div className="assessment-pro">
      <header className="assessment-pro__top">
        <div className="assessment-pro__top-inner">
          <div className="assessment-pro__brand-row">
            <p className="assessment-pro__brand">
              {brandHref && !preview ? (
                <Link href={brandHref}>
                  Athletic<span>Wolf</span>
                </Link>
              ) : (
                <>
                  Athletic<span>Wolf</span>
                </>
              )}
            </p>
            <div className="assessment-pro__top-meta">
              {packageName ? (
                <span className="assessment-pro__chip">{packageName}</span>
              ) : null}
              {!preview && onStartOver ? (
                <button
                  type="button"
                  onClick={onStartOver}
                  className="assessment-pro__link-btn"
                >
                  Start over
                </button>
              ) : null}
            </div>
          </div>

          {showProgress ? (
            <div className="assessment-pro__progress">
              <div className="assessment-pro__progress-meta">
                <span>
                  Step {displayStep} of {displayTotal}
                </span>
                <span>{progressPct}%</span>
              </div>
              <div
                className="assessment-pro__progress-track"
                role="progressbar"
                aria-valuenow={displayStep}
                aria-valuemin={1}
                aria-valuemax={displayTotal}
                aria-label="Assessment progress"
              >
                <div
                  className="assessment-pro__progress-fill"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              {canJump && segments.length > 0 ? (
                <nav
                  className="assessment-pro__segments"
                  aria-label="Jump to step"
                >
                  {segments.map((item) => {
                    const isCurrent = item.id === step.id;
                    const isDone = item.absoluteIndex <= furthestAbsoluteIndex;
                    const className = [
                      "assessment-pro__segment",
                      isCurrent ? "assessment-pro__segment--current" : "",
                      isDone ? "assessment-pro__segment--done" : "",
                    ]
                      .filter(Boolean)
                      .join(" ");

                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={className}
                        onClick={() => onSelectStep?.(item.absoluteIndex)}
                        aria-current={isCurrent ? "step" : undefined}
                        aria-label={`Go to ${item.label}`}
                        title={item.label}
                      />
                    );
                  })}
                </nav>
              ) : null}
            </div>
          ) : null}
        </div>
      </header>

      <main className="assessment-pro__main">
        <div className="assessment-pro__main-inner">
          {step.kind === "review" ? null : (
            <>
              {step.section ? (
                <p className="assessment-pro__section">{step.section}</p>
              ) : null}
              {step.why ? (
                <p className="assessment-pro__lead assessment-pro__lead--tight">
                  {step.why}
                </p>
              ) : null}
            </>
          )}

          <div className="assessment-pro__content">{children}</div>
        </div>
      </main>

      {footer ? (
        <footer className="assessment-pro__footer">
          <div className="assessment-pro__footer-inner">{footer}</div>
        </footer>
      ) : null}
    </div>
  );
}
