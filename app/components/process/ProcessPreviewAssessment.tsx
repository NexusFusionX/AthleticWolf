import { ASSESSMENT_STEPS } from "@/app/lib/assessment-steps";
import { ProcessMiniScreen } from "./ProcessMiniScreen";

const GOAL_VALUE = "Build muscle";
const DAYS_VALUE = "3-4 days";

function PreviewOptions({
  options,
  selected,
}: {
  options: { value: string; label: string }[];
  selected: string;
}) {
  return (
    <div className="process-mini-options">
      {options.slice(0, 2).map((opt) => {
        const isSelected = opt.value === selected;
        return (
          <div
            key={opt.value}
            className={`process-mini-options__item${
              isSelected ? " process-mini-options__item--selected" : ""
            }`}
          >
            <span className="process-mini-options__dot" aria-hidden />
            <span>{opt.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export function ProcessPreviewAssessmentGoals() {
  const field = ASSESSMENT_STEPS[0].fields[1];
  if (field.type !== "radio") return null;

  return (
    <ProcessMiniScreen eyebrow="Your goal" title="Share your goal">
      <p className="process-mini-q">{field.label.replace("?", "?")}</p>
      <PreviewOptions options={field.options} selected={GOAL_VALUE} />
    </ProcessMiniScreen>
  );
}

export function ProcessPreviewAssessmentTraining() {
  const field = ASSESSMENT_STEPS[1].fields[1];
  if (field.type !== "radio") return null;

  return (
    <ProcessMiniScreen eyebrow="Your schedule" title="Training days">
      <p className="process-mini-q">{field.label.replace("?", "?")}</p>
      <PreviewOptions options={field.options} selected={DAYS_VALUE} />
    </ProcessMiniScreen>
  );
}
