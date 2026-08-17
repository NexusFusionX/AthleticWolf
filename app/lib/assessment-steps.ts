export type AssessmentOption = {
  value: string;
  label: string;
  icon?: AssessmentIconKey;
  hint?: string;
};

export type AssessmentIconKey =
  | "flame"
  | "barbell"
  | "person-simple-run"
  | "heart"
  | "seedling"
  | "trend-up"
  | "trophy"
  | "arrows-clockwise"
  | "calendar-blank"
  | "calendar-check"
  | "calendar-plus"
  | "sun"
  | "buildings"
  | "house"
  | "bounding-box"
  | "person"
  | "fork-knife"
  | "leaf"
  | "lightning"
  | "tree"
  | "path"
  | "clock"
  | "map-pin"
  | "question";

export type AssessmentField =
  | {
      name: string;
      label: string;
      type: "text" | "email" | "number";
      required?: boolean;
      placeholder?: string;
      min?: number;
      max?: number;
      unit?: string;
      error?: string;
      help?: string;
    }
  | {
      name: string;
      label: string;
      type: "textarea";
      required?: boolean;
      placeholder?: string;
      help?: string;
    }
  | {
      name: string;
      label: string;
      type: "radio" | "checkbox";
      required?: boolean;
      options: AssessmentOption[];
      twoCol?: boolean;
      chips?: boolean;
      exclusiveValue?: string;
      error?: string;
      help?: string;
    };

export type AssessmentFormValue = string | string[];

export type AssessmentStep = {
  id: string;
  label: string;
  section?: string;
  why?: string;
  fields: AssessmentField[];
  kind?: "intro" | "fields" | "review";
  /** Return false to skip this step based on prior answers. */
  visibleWhen?: (formData: Record<string, AssessmentFormValue>) => boolean;
};

const HOME_ENVIRONMENTS = new Set([
  "Home gym",
  "Home — minimal equipment",
  "Combination",
]);

const CONSIDERATION_FOLLOW_UP = new Set([
  "Previous injury",
  "Current pain",
  "Medical limitation",
  "Movement limitation",
]);

/**
 * Premium coach-intake flow: one meaningful question per screen,
 * progressive disclosure, black/orange Athletic Wolf brand.
 */
export const ASSESSMENT_STEPS: AssessmentStep[] = [
  {
    id: "goal",
    label: "Goal",
    section: "Your goal",
    why: "This helps us build a plan around what you actually want to achieve.",
    fields: [
      {
        name: "goal",
        label: "What's your main fitness goal?",
        type: "radio",
        required: true,
        error: "Please select a goal to continue.",
        options: [
          {
            value: "Build muscle",
            label: "Build muscle",
            icon: "barbell",
            hint: "Size, shape, and progressive overload",
          },
          {
            value: "Improve strength",
            label: "Improve strength",
            icon: "trophy",
            hint: "Get stronger on the lifts that matter",
          },
          {
            value: "Improve fitness & endurance",
            label: "Improve fitness & endurance",
            icon: "person-simple-run",
            hint: "Conditioning, stamina, and work capacity",
          },
          {
            value: "General health & fitness",
            label: "General health & fitness",
            icon: "heart",
            hint: "Feel better, move better, stay consistent",
          },
          {
            value: "Lose body fat",
            label: "Lose body fat",
            icon: "flame",
            hint: "Sustainable fat loss with training support",
          },
        ],
      },
    ],
  },
  {
    id: "experience",
    label: "Experience",
    section: "Training background",
    why: "We’ll match volume and progression to your level.",
    fields: [
      {
        name: "level",
        label: "How would you describe your training experience?",
        type: "radio",
        required: true,
        error: "Please select your experience level.",
        options: [
          {
            value: "Beginner",
            label: "Beginner",
            icon: "seedling",
            hint: "I'm new to structured training",
          },
          {
            value: "Intermediate",
            label: "Intermediate",
            icon: "trend-up",
            hint: "I've trained consistently before",
          },
          {
            value: "Advanced",
            label: "Advanced",
            icon: "trophy",
            hint: "I have years of structured training experience",
          },
        ],
      },
    ],
  },
  {
    id: "environment",
    label: "Environment",
    section: "Training setup",
    why: "Programs are built for where you actually train.",
    fields: [
      {
        name: "workout_location",
        label: "Where will you train most often?",
        type: "radio",
        required: true,
        error: "Please select where you’ll train.",
        options: [
          {
            value: "Full gym",
            label: "Full gym",
            icon: "buildings",
            hint: "Machines, free weights, cables",
          },
          {
            value: "Home gym",
            label: "Home gym",
            icon: "house",
            hint: "Dedicated setup at home",
          },
          {
            value: "Home — minimal equipment",
            label: "Home — minimal equipment",
            icon: "person",
            hint: "Bodyweight and light gear",
          },
          {
            value: "Outdoors",
            label: "Outdoors",
            icon: "tree",
            hint: "Parks, runs, outdoor sessions",
          },
          {
            value: "Combination",
            label: "Combination",
            icon: "path",
            hint: "Mix of gym, home, or outdoors",
          },
        ],
      },
    ],
  },
  {
    id: "equipment",
    label: "Equipment",
    section: "Training setup",
    why: "Select everything you can access regularly.",
    visibleWhen: (data) =>
      HOME_ENVIRONMENTS.has(String(data.workout_location ?? "")),
    fields: [
      {
        name: "equipment",
        label: "What equipment do you have access to?",
        type: "checkbox",
        required: true,
        chips: true,
        exclusiveValue: "Minimal / no equipment",
        error: "Please select at least one option.",
        help: "Select all that apply.",
        options: [
          { value: "Dumbbells", label: "Dumbbells", icon: "barbell" },
          { value: "Barbell", label: "Barbell", icon: "barbell" },
          { value: "Bench", label: "Bench", icon: "bounding-box" },
          { value: "Squat rack", label: "Squat rack", icon: "buildings" },
          { value: "Cable machine", label: "Cable machine", icon: "lightning" },
          {
            value: "Resistance bands",
            label: "Resistance bands",
            icon: "bounding-box",
          },
          { value: "Pull-up bar", label: "Pull-up bar", icon: "person" },
          { value: "Kettlebells", label: "Kettlebells", icon: "barbell" },
          {
            value: "Cardio equipment",
            label: "Cardio equipment",
            icon: "person-simple-run",
          },
          {
            value: "Minimal / no equipment",
            label: "Minimal / no equipment",
            icon: "person",
          },
          { value: "Other", label: "Other", icon: "question" },
        ],
      },
    ],
  },
  {
    id: "frequency",
    label: "Frequency",
    section: "Your schedule",
    why: "Be honest — we’ll build around what you can keep.",
    fields: [
      {
        name: "days",
        label: "How many days can you realistically train each week?",
        type: "radio",
        required: true,
        error: "Please choose how often you can train.",
        options: [
          { value: "2 days", label: "2 days", icon: "calendar-blank" },
          { value: "3 days", label: "3 days", icon: "calendar-check" },
          { value: "4 days", label: "4 days", icon: "calendar-check" },
          { value: "5 days", label: "5 days", icon: "calendar-plus" },
          { value: "6+ days", label: "6+ days", icon: "sun" },
        ],
      },
    ],
  },
  {
    id: "duration",
    label: "Duration",
    section: "Your schedule",
    why: "Session length shapes how we program intensity and volume.",
    fields: [
      {
        name: "session_length",
        label: "How much time can you usually dedicate to each workout?",
        type: "radio",
        required: true,
        error: "Please select a session length.",
        options: [
          { value: "20–30 minutes", label: "20–30 minutes", icon: "clock" },
          { value: "30–45 minutes", label: "30–45 minutes", icon: "clock" },
          { value: "45–60 minutes", label: "45–60 minutes", icon: "clock" },
          { value: "60+ minutes", label: "60+ minutes", icon: "clock" },
        ],
      },
    ],
  },
  {
    id: "current_training",
    label: "Current training",
    section: "Where you are now",
    why: "This helps your coach meet you at the right starting intensity.",
    fields: [
      {
        name: "current_training",
        label: "What does your current training look like?",
        type: "radio",
        required: true,
        error: "Please select an option.",
        options: [
          {
            value: "I don't currently train",
            label: "I don't currently train",
            icon: "seedling",
          },
          {
            value: "1–2 days/week",
            label: "1–2 days/week",
            icon: "calendar-blank",
          },
          {
            value: "3–4 days/week",
            label: "3–4 days/week",
            icon: "calendar-check",
          },
          {
            value: "5+ days/week",
            label: "5+ days/week",
            icon: "calendar-plus",
          },
          { value: "It varies", label: "It varies", icon: "arrows-clockwise" },
        ],
      },
    ],
  },
  {
    id: "obstacles",
    label: "Barriers",
    section: "Where you are now",
    why: "Your coach plans around real-life blockers — not perfect weeks.",
    fields: [
      {
        name: "obstacles",
        label: "What's been making it difficult to stay consistent?",
        type: "checkbox",
        required: true,
        chips: true,
        error: "Please select at least one option.",
        help: "Select all that apply.",
        options: [
          { value: "Lack of time", label: "Lack of time", icon: "clock" },
          { value: "Motivation", label: "Motivation", icon: "flame" },
          {
            value: "I don't know what to do",
            label: "I don't know what to do",
            icon: "map-pin",
          },
          {
            value: "I struggle with consistency",
            label: "I struggle with consistency",
            icon: "arrows-clockwise",
          },
          {
            value: "Previous injury/limitation",
            label: "Previous injury/limitation",
            icon: "heart",
          },
          { value: "Other", label: "Other", icon: "question" },
        ],
      },
    ],
  },
  {
    id: "activity",
    label: "Activity",
    section: "Your lifestyle",
    why: "Your training plan needs to fit your life — not the other way around.",
    fields: [
      {
        name: "activity_level",
        label: "How active are you outside your workouts?",
        type: "radio",
        required: true,
        error: "Please select an activity level.",
        options: [
          { value: "Mostly sitting", label: "Mostly sitting" },
          { value: "Lightly active", label: "Lightly active" },
          { value: "Moderately active", label: "Moderately active" },
          { value: "Very active", label: "Very active" },
        ],
      },
    ],
  },
  {
    id: "sleep",
    label: "Sleep",
    section: "Your lifestyle",
    why: "Recovery is part of the plan.",
    fields: [
      {
        name: "sleep",
        label: "How would you describe your typical sleep?",
        type: "radio",
        required: true,
        error: "Please select a sleep option.",
        options: [
          { value: "Poor", label: "Poor" },
          { value: "Fair", label: "Fair" },
          { value: "Good", label: "Good" },
          { value: "Excellent", label: "Excellent" },
        ],
      },
    ],
  },
  {
    id: "nutrition",
    label: "Nutrition",
    section: "Nutrition",
    why: "Coaching works best when nutrition is part of the picture.",
    fields: [
      {
        name: "nutrition",
        label: "How would you describe your current nutrition?",
        type: "radio",
        required: true,
        error: "Please select an option.",
        options: [
          { value: "Very inconsistent", label: "Very inconsistent" },
          { value: "Somewhat inconsistent", label: "Somewhat inconsistent" },
          { value: "Fairly consistent", label: "Fairly consistent" },
          { value: "Very consistent", label: "Very consistent" },
        ],
      },
    ],
  },
  {
    id: "diet",
    label: "Diet",
    section: "Nutrition",
    why: "Only what helps your coach personalize guidance.",
    fields: [
      {
        name: "diet",
        label: "Any dietary preferences we should consider?",
        type: "checkbox",
        required: true,
        chips: true,
        exclusiveValue: "No preference",
        error: "Please select at least one option.",
        options: [
          { value: "No preference", label: "No preference", icon: "fork-knife" },
          { value: "Vegetarian", label: "Vegetarian", icon: "leaf" },
          { value: "Vegan", label: "Vegan", icon: "leaf" },
          { value: "Halal", label: "Halal", icon: "fork-knife" },
          { value: "Other", label: "Other", icon: "question" },
        ],
      },
    ],
  },
  {
    id: "considerations",
    label: "Considerations",
    section: "Training considerations",
    why: "Is there anything that may affect how you train?",
    fields: [
      {
        name: "considerations",
        label: "Is there anything that may affect how you train?",
        type: "radio",
        required: true,
        error: "Please select an option.",
        help: "For coaching personalization only — this does not replace professional medical advice.",
        options: [
          { value: "Previous injury", label: "Previous injury" },
          { value: "Current pain", label: "Current pain" },
          { value: "Medical limitation", label: "Medical limitation" },
          { value: "Movement limitation", label: "Movement limitation" },
          { value: "Nothing to report", label: "Nothing to report" },
          {
            value: "I'd prefer to discuss this with my coach",
            label: "I'd prefer to discuss this with my coach",
          },
        ],
      },
    ],
  },
  {
    id: "considerations_detail",
    label: "Details",
    section: "Training considerations",
    why: "A few details help your coach program safely.",
    visibleWhen: (data) =>
      CONSIDERATION_FOLLOW_UP.has(String(data.considerations ?? "")),
    fields: [
      {
        name: "injuries",
        label: "Anything your coach should know?",
        type: "textarea",
        required: true,
        placeholder:
          "e.g. left knee discomfort on deep squats, lower back history…",
        help: "Share what flares up, what to avoid, or what’s already been cleared.",
      },
    ],
  },
  {
    id: "baseline",
    label: "Baseline",
    section: "Starting point",
    why: "Let's establish your starting point.",
    fields: [
      {
        name: "height",
        label: "Height",
        type: "number",
        required: true,
        placeholder: "e.g. 175",
        min: 100,
        max: 250,
        unit: "cm",
        error: "Enter a valid height in cm (100–250).",
        help: "Use centimeters.",
      },
      {
        name: "weight",
        label: "Weight",
        type: "number",
        required: true,
        placeholder: "e.g. 78",
        min: 30,
        max: 300,
        unit: "kg",
        error: "Enter a valid weight in kg (30–300).",
        help: "Use kilograms.",
      },
    ],
  },
  {
    id: "motivation",
    label: "Motivation",
    section: "Why this matters",
    why: "Tell your coach what made you start this journey.",
    fields: [
      {
        name: "motivation",
        label: "Why does this matter to you?",
        type: "textarea",
        required: true,
        placeholder:
          "For example: I've been trying to get consistent for years…",
      },
    ],
  },
  {
    id: "name",
    label: "Name",
    section: "About you",
    why: "So your coach knows who they’re building for.",
    fields: [
      {
        name: "name",
        label: "What should we call you?",
        type: "text",
        required: true,
        placeholder: "e.g. Alex Morgan",
        error: "Please enter your name.",
        help: "First name is enough.",
      },
    ],
  },
  {
    id: "email",
    label: "Contact",
    section: "Almost done",
    why: "We’ll send plan updates and check-ins here.",
    fields: [
      {
        name: "email",
        label: "Where should we send your plan updates?",
        type: "email",
        required: true,
        placeholder: "you@example.com",
        error: "Please enter a valid email address.",
      },
    ],
  },
  {
    id: "review",
    label: "Review",
    kind: "review",
    section: "Your profile",
    why: "Confirm everything — then your coach starts building.",
    fields: [],
  },
];

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

export function isStepVisible(
  step: AssessmentStep,
  formData: Record<string, AssessmentFormValue>
) {
  if (!step.visibleWhen) return true;
  return step.visibleWhen(formData);
}

export function getVisibleSteps(
  formData: Record<string, AssessmentFormValue>
) {
  return ASSESSMENT_STEPS.filter((step) => isStepVisible(step, formData));
}

export function getVisibleStepIndex(
  stepId: string,
  formData: Record<string, AssessmentFormValue>
) {
  return getVisibleSteps(formData).findIndex((step) => step.id === stepId);
}

export function isSingleChoiceStep(
  step: AssessmentStep | undefined,
  formData: Record<string, AssessmentFormValue>
) {
  if (!step || step.kind === "review" || step.kind === "intro") return false;
  if (!isStepVisible(step, formData)) return false;
  if (step.fields.length !== 1) return false;
  return step.fields[0].type === "radio";
}

export function isStepComplete(
  step: AssessmentStep | undefined,
  formData: Record<string, AssessmentFormValue>
) {
  if (!step) return false;
  if (step.kind === "intro" || step.kind === "review") return true;
  if (!isStepVisible(step, formData)) return true;

  for (const field of step.fields) {
    if (!field.required) continue;
    const value = formData[field.name];

    if (field.type === "checkbox") {
      if (!Array.isArray(value) || value.length === 0) return false;
      continue;
    }

    if (field.type === "email") {
      if (
        typeof value !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
      ) {
        return false;
      }
      continue;
    }

    if (field.type === "number") {
      const n = parseFloat((value as string) ?? "");
      if (
        Number.isNaN(n) ||
        (field.min !== undefined && n < field.min) ||
        (field.max !== undefined && n > field.max)
      ) {
        return false;
      }
      continue;
    }

    if (typeof value !== "string" || value.trim() === "") return false;
  }

  return true;
}

/** Summary rows for the completion / review profile. */
export function getProfileSummary(
  formData: Record<string, AssessmentFormValue>
) {
  const rows: { label: string; value: string }[] = [];
  const push = (label: string, key: string, suffix = "") => {
    const raw = formatAssessmentValue(formData[key]);
    if (raw === "—") return;
    rows.push({ label, value: suffix ? `${raw}${suffix}` : raw });
  };

  push("Primary goal", "goal");
  push("Experience", "level");
  push("Training", "days", "/week");
  push("Session length", "session_length");
  push("Training environment", "workout_location");
  if (formData.equipment) push("Equipment", "equipment");
  push("Current training", "current_training");
  push("Activity level", "activity_level");
  push("Sleep", "sleep");
  push("Nutrition", "nutrition");
  push("Diet", "diet");
  push("Considerations", "considerations");
  if (formData.height) push("Height", "height", " cm");
  if (formData.weight) push("Weight", "weight", " kg");

  return rows;
}

export function getFirstName(formData: Record<string, AssessmentFormValue>) {
  const name = formData.name;
  if (typeof name !== "string" || !name.trim()) return null;
  return name.trim().split(/\s+/)[0];
}
