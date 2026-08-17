import { ASSESSMENT_STEPS } from "@/app/lib/assessment-steps";
import { ProcessMiniScreen } from "./ProcessMiniScreen";

const GOAL_VALUE = "Build muscle";
const DAYS_VALUE = "3 days";
const LEVEL_VALUE = "Intermediate";

function findField(name: string) {
  for (const step of ASSESSMENT_STEPS) {
    const field = step.fields.find((item) => item.name === name);
    if (field) return field;
  }
  return null;
}

function PreviewOptions({
  options,
  selected,
  limit,
}: {
  options: { value: string; label: string }[];
  selected: string;
  limit?: number;
}) {
  const items = limit ? options.slice(0, limit) : options;

  return (
    <div className="process-mini-options">
      {items.map((opt) => {
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
  const goalField = findField("goal");
  if (!goalField || goalField.type !== "radio") {
    return null;
  }

  return (
    <ProcessMiniScreen eyebrow="Your goal" title="Share your goal">
      <p className="process-mini-q">{goalField.label}</p>
      <PreviewOptions options={goalField.options} selected={GOAL_VALUE} limit={4} />
    </ProcessMiniScreen>
  );
}

export function ProcessPreviewAssessmentTraining() {
  const levelField = findField("level");
  const daysField = findField("days");
  if (
    !levelField ||
    !daysField ||
    levelField.type !== "radio" ||
    daysField.type !== "radio"
  ) {
    return null;
  }

  return (
    <ProcessMiniScreen eyebrow="Your schedule" title="Training days">
      <p className="process-mini-q">{daysField.label}</p>
      <PreviewOptions
        options={daysField.options}
        selected={DAYS_VALUE}
        limit={3}
      />
      <p className="process-mini-q process-mini-q--spaced">{levelField.label}</p>
      <PreviewOptions
        options={levelField.options}
        selected={LEVEL_VALUE}
        limit={2}
      />
    </ProcessMiniScreen>
  );
}
