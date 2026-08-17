"use client";

import {
  formatAssessmentValue,
  getFirstName,
  getProfileSummary,
  getVisibleSteps,
  type AssessmentFormValue,
} from "@/app/lib/assessment-steps";

type AssessmentReviewProps = {
  formData: Record<string, AssessmentFormValue>;
  onEditStep: (stepIndex: number) => void;
  /** Map of summary label → absolute step index in ASSESSMENT_STEPS for edit. */
  editTargets?: Record<string, number>;
};

export function AssessmentReview({
  formData,
  onEditStep,
  editTargets = {},
}: AssessmentReviewProps) {
  const firstName = getFirstName(formData);
  const summary = getProfileSummary(formData);
  const visible = getVisibleSteps(formData).filter(
    (step) => step.kind !== "intro" && step.kind !== "review"
  );

  return (
    <div className="assessment-pro-review">
      <div className="assessment-pro-review__hero">
        <p className="assessment-pro-review__kicker">You&apos;re ready</p>
        <h1 className="assessment-pro-review__headline">
          {firstName ? `You're ready, ${firstName}.` : "You're ready."}
        </h1>
        <p className="assessment-pro-review__lede">
          We&apos;ve got what we need to start building your plan.
        </p>
      </div>

      <section className="assessment-pro-review__profile" aria-label="Your profile">
        <div className="assessment-pro-review__profile-head">
          <h2 className="assessment-pro-review__profile-title">Your profile</h2>
        </div>
        <dl className="assessment-pro-review__summary">
          {summary.map((row) => (
            <div key={row.label} className="assessment-pro-review__summary-row">
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="assessment-pro-review__note">
        Your coach will use this information to build a program around your
        goals, schedule, and training environment.
      </p>

      <div className="assessment-pro-review__list">
        {visible.map((step) => {
          const absoluteIndex = editTargets[step.id];
          return (
            <section key={step.id} className="assessment-pro-review__card">
              <div className="assessment-pro-review__card-head">
                <p className="assessment-pro-review__card-title">
                  {step.section ?? step.label}
                </p>
                {typeof absoluteIndex === "number" ? (
                  <button
                    type="button"
                    onClick={() => onEditStep(absoluteIndex)}
                    className="assessment-pro-review__edit"
                  >
                    Edit
                  </button>
                ) : null}
              </div>
              <dl className="assessment-pro-review__fields">
                {step.fields.map((field) => {
                  let display = formatAssessmentValue(formData[field.name]);
                  if (field.name === "height" && display !== "—") {
                    display = `${display} cm`;
                  }
                  if (field.name === "weight" && display !== "—") {
                    display = `${display} kg`;
                  }
                  return (
                    <div key={field.name}>
                      <dt>{field.label}</dt>
                      <dd>{display}</dd>
                    </div>
                  );
                })}
              </dl>
            </section>
          );
        })}
      </div>
    </div>
  );
}
