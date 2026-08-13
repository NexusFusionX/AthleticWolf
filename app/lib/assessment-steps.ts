export type AssessmentOption = { value: string; label: string };

export type AssessmentField =
  | {
      name: string;
      label: string;
      type: "text" | "email" | "number";
      required?: boolean;
      placeholder?: string;
      min?: number;
      max?: number;
      error?: string;
    }
  | {
      name: string;
      label: string;
      type: "textarea";
      required?: boolean;
      placeholder?: string;
    }
  | {
      name: string;
      label: string;
      type: "radio" | "checkbox";
      required?: boolean;
      options: AssessmentOption[];
      twoCol?: boolean;
      error?: string;
    };

export type AssessmentStep = {
  label: string;
  fields: AssessmentField[];
  /** Final confirmation page — shows a summary of prior answers. */
  kind?: "fields" | "review";
};

export const ASSESSMENT_STEPS: AssessmentStep[] = [
  {
    label: "Your Goal",
    fields: [
      {
        name: "goal",
        label: "What's your main fitness goal?",
        type: "radio",
        required: true,
        error: "Please select a goal to continue.",
        options: [
          { value: "Lose weight", label: "🔥 Lose weight" },
          { value: "Build muscle", label: "💪 Build muscle" },
          { value: "Improve endurance", label: "🏃 Improve endurance" },
          { value: "General health", label: "❤️ General health & mobility" },
        ],
      },
    ],
  },
  {
    label: "About You",
    fields: [
      {
        name: "name",
        label: "What's your name?",
        type: "text",
        required: true,
        placeholder: "e.g. Ahmed Khan",
        error: "Please enter your name.",
      },
      {
        name: "age",
        label: "Your age",
        type: "number",
        required: true,
        placeholder: "e.g. 28",
        min: 12,
        max: 90,
        error: "Please enter a valid age (12-90).",
      },
    ],
  },
  {
    label: "Experience",
    fields: [
      {
        name: "level",
        label: "How would you rate your experience level?",
        type: "radio",
        required: true,
        twoCol: true,
        error: "Please select your experience level.",
        options: [
          { value: "Beginner", label: "Beginner" },
          { value: "Intermediate", label: "Intermediate" },
          { value: "Advanced", label: "Advanced" },
          { value: "Returning after break", label: "Returning after a break" },
        ],
      },
    ],
  },
  {
    label: "Training Setup",
    fields: [
      {
        name: "days",
        label: "How many days per week can you train?",
        type: "radio",
        required: true,
        twoCol: true,
        error: "Please choose how often you can train.",
        options: [
          { value: "1-2 days", label: "1-2 days" },
          { value: "3-4 days", label: "3-4 days" },
          { value: "5-6 days", label: "5-6 days" },
          { value: "Every day", label: "Every day" },
        ],
      },
      {
        name: "equipment",
        label: "What equipment do you have access to?",
        type: "checkbox",
        required: true,
        twoCol: true,
        error: "Please select at least one option.",
        options: [
          { value: "Full gym", label: "Full gym" },
          { value: "Dumbbells at home", label: "Dumbbells at home" },
          { value: "Resistance bands", label: "Resistance bands" },
          { value: "Bodyweight only", label: "Bodyweight only" },
        ],
      },
    ],
  },
  {
    label: "Nutrition & Health",
    fields: [
      {
        name: "diet",
        label: "Do you follow any diet preference?",
        type: "radio",
        required: true,
        twoCol: true,
        error: "Please select a diet preference.",
        options: [
          { value: "No preference", label: "No preference" },
          { value: "High protein", label: "High protein" },
          { value: "Vegetarian", label: "Vegetarian" },
          { value: "Keto / low carb", label: "Keto / low carb" },
        ],
      },
      {
        name: "injuries",
        label: "Any injuries or health conditions we should know about? (optional)",
        type: "textarea",
        placeholder: "e.g. lower back pain, knee injury...",
      },
      {
        name: "email",
        label: "Where should we send your plan?",
        type: "email",
        required: true,
        placeholder: "you@example.com",
        error: "Please enter a valid email address.",
      },
    ],
  },
  {
    label: "Review",
    kind: "review",
    fields: [],
  },
];

export type AssessmentFormValue = string | string[];

export function getAssessmentFieldLabel(fieldName: string) {
  for (const step of ASSESSMENT_STEPS) {
    const field = step.fields.find((item) => item.name === fieldName);
    if (field) return field.label;
  }
  return fieldName;
}

export function formatAssessmentValue(value: AssessmentFormValue | undefined) {
  if (value == null) return "—";
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "—";
  }
  const trimmed = value.trim();
  return trimmed || "—";
}
