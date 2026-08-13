"use client";

import {
  ASSESSMENT_STEPS,
  formatAssessmentValue,
  type AssessmentFormValue,
} from "@/app/lib/assessment-steps";

type AssessmentReviewProps = {
  formData: Record<string, AssessmentFormValue>;
  onEditStep: (stepIndex: number) => void;
};

export function AssessmentReview({
  formData,
  onEditStep,
}: AssessmentReviewProps) {
  const reviewSteps = ASSESSMENT_STEPS.filter((step) => step.kind !== "review");

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-xl text-white">Confirm your answers</h3>
        <p className="mt-2 text-sm text-muted">
          Take a quick look before we send this to your coach. You can edit any
          section.
        </p>
      </div>

      {reviewSteps.map((step, index) => (
        <section
          key={step.label}
          className="rounded-xl border border-line bg-surface/40 p-4"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              {step.label}
            </p>
            <button
              type="button"
              onClick={() => onEditStep(index)}
              className="text-xs font-semibold uppercase tracking-[0.1em] text-white/55 underline-offset-2 transition-colors hover:text-accent hover:underline"
            >
              Edit
            </button>
          </div>
          <dl className="space-y-3">
            {step.fields.map((field) => (
              <div key={field.name}>
                <dt className="text-xs text-muted">{field.label}</dt>
                <dd className="mt-1 text-sm font-medium text-white">
                  {formatAssessmentValue(formData[field.name])}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
