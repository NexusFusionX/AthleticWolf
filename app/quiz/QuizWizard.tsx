"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Option = { value: string; label: string };

type Field =
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
      options: Option[];
      twoCol?: boolean;
      error?: string;
    };

const steps: { label: string; fields: Field[] }[] = [
  {
    label: "Your Goal",
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
    label: "Training Style",
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
    label: "Final Details",
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
];

type FormValue = string | string[];

type SavedProgress = {
  step: number;
  formData: Record<string, FormValue>;
  packageName: string | null;
};

const STORAGE_KEY = "athletic-wolf-quiz-progress";

function loadSavedProgress(): SavedProgress | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as SavedProgress;
  } catch {
    return null;
  }
}

export function QuizWizard() {
  const searchParams = useSearchParams();
  const selectedPackage = searchParams.get("package");

  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState<Record<string, FormValue>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [resumePrompt, setResumePrompt] = useState<SavedProgress | null | undefined>(
    undefined
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadSavedProgress();
    const hasProgress =
      saved &&
      (saved.step > 0 ||
        Object.values(saved.formData ?? {}).some((v) =>
          Array.isArray(v) ? v.length > 0 : Boolean(v)
        ));

    if (hasProgress) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only localStorage read on mount, before any UI renders
      setResumePrompt(saved);
    } else {
      setResumePrompt(null);
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated || submitted) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ step: current, formData, packageName: selectedPackage })
    );
  }, [current, formData, hydrated, submitted, selectedPackage]);

  function resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
    setCurrent(0);
    setFormData({});
    setErrors({});
  }

  function handleContinueResume() {
    if (resumePrompt) {
      setCurrent(resumePrompt.step);
      setFormData(resumePrompt.formData);
    }
    setResumePrompt(null);
    setHydrated(true);
  }

  function handleStartOver() {
    resetProgress();
    setResumePrompt(null);
    setHydrated(true);
  }

  function setValue(name: string, value: FormValue) {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  }

  function toggleCheckbox(name: string, value: string) {
    setFormData((prev) => {
      const existing = (prev[name] as string[] | undefined) ?? [];
      const next = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value];
      return { ...prev, [name]: next };
    });
    setErrors((prev) => ({ ...prev, [name]: false }));
  }

  function validateStep(idx: number) {
    const step = steps[idx];
    const newErrors: Record<string, boolean> = {};
    let ok = true;

    for (const field of step.fields) {
      if (!field.required) continue;
      const value = formData[field.name];
      let valid = false;

      if (field.type === "checkbox") {
        valid = Array.isArray(value) && value.length > 0;
      } else if (field.type === "email") {
        valid =
          typeof value === "string" &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
      } else if (field.type === "number") {
        const n = parseFloat((value as string) ?? "");
        valid =
          !isNaN(n) &&
          (field.min === undefined || n >= field.min) &&
          (field.max === undefined || n <= field.max);
      } else {
        valid = typeof value === "string" && value.trim() !== "";
      }

      if (!valid) {
        newErrors[field.name] = true;
        ok = false;
      }
    }

    setErrors(newErrors);
    return ok;
  }

  function handleNext() {
    if (!validateStep(current)) return;

    if (current < steps.length - 1) {
      setCurrent((c) => c + 1);
      return;
    }

    const lines = [
      selectedPackage ? `Package: ${selectedPackage}` : null,
      ...steps.flatMap((step) =>
        step.fields.map((field) => {
          const value = formData[field.name];
          const display = Array.isArray(value) ? value.join(", ") : value ?? "";
          return `${field.label}: ${display}`;
        })
      ),
    ].filter(Boolean);

    const body = lines.join("\n");
    const subject = `New coaching application${
      selectedPackage ? ` - ${selectedPackage} Plan` : ""
    }`;

    window.location.href = `mailto:hello@athleticwolf.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    localStorage.removeItem(STORAGE_KEY);
    setSubmitted(true);
  }

  function handleBack() {
    if (current > 0) setCurrent((c) => c - 1);
  }

  if (resumePrompt === undefined) {
    return null;
  }

  if (resumePrompt) {
    return (
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-6">
        <div className="w-full overflow-hidden shadow-premium rounded-2xl border border-line bg-card">
          <div className="bg-ink px-8 py-7 text-white">
            <Link href="/" className="font-display text-lg">
              Athletic<span className="text-accent">Wolf</span>
            </Link>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Welcome Back
            </p>
            <h1 className="font-display mt-1.5 text-3xl sm:text-4xl">
              Resume Your Assessment?
            </h1>
          </div>
          <div className="p-8 text-center">
            <p className="text-muted">
              You have an assessment in progress: Step {resumePrompt.step + 1}{" "}
              of {steps.length}
              {resumePrompt.packageName
                ? ` for the ${resumePrompt.packageName} Plan`
                : ""}
              . Continue where you left off, or start over.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={handleContinueResume}
                className="btn-accent font-display rounded-xl px-7 py-3 text-base text-white"
              >
                Continue Where I Left Off →
              </button>
              <button
                type="button"
                onClick={handleStartOver}
                className="rounded-xl border border-line px-7 py-3 text-sm font-semibold transition-colors hover:border-accent/60"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-6">
      <div className="w-full overflow-hidden shadow-premium rounded-2xl border border-line bg-card">
        <div className="bg-ink px-8 py-7 text-white">
          <Link href="/" className="font-display text-lg">
            Athletic<span className="text-accent">Wolf</span>
          </Link>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Free Assessment
          </p>
          <h1 className="font-display mt-1.5 text-3xl sm:text-4xl">
            Find Your Training Plan
          </h1>
          {selectedPackage && (
            <span className="mt-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
              Applying for the {selectedPackage} Plan
            </span>
          )}

          {!submitted && (
            <>
              <div className="mt-5 flex gap-2">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      i <= current ? "bg-accent" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.14em] text-white/60">
                  Step {current + 1} of {steps.length}: {steps[current].label}
                </p>
                <button
                  type="button"
                  onClick={resetProgress}
                  className="text-xs font-semibold uppercase tracking-[0.1em] text-white/50 underline-offset-2 transition-colors hover:text-white hover:underline"
                >
                  Start Over
                </button>
              </div>
            </>
          )}
        </div>

        <div className="p-8">
          {submitted ? (
            <div className="py-4 text-center">
              <h2 className="font-display text-3xl">You&apos;re All Set! ✅</h2>
              <p className="mt-3 text-muted">
                Your email app should have opened with your details pre-filled.
                Hit send and we&apos;ll get back to you within 24-48 hours to
                arrange payment and get you started.
              </p>
              <Link
                href="/"
                className="mt-6 inline-block rounded-xl bg-ink px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-ink-soft"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-7">
              {steps[current].fields.map((field) => (
                <div key={field.name}>
                  <label className="mb-2.5 block text-sm font-semibold">
                    {field.label}
                    {field.required && (
                      <span className="ml-0.5 text-accent">*</span>
                    )}
                  </label>

                  {(field.type === "text" ||
                    field.type === "email" ||
                    field.type === "number") && (
                    <input
                      type={field.type}
                      value={(formData[field.name] as string) ?? ""}
                      onChange={(e) => setValue(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      min={field.min}
                      max={field.max}
                      className={`w-full rounded-xl border bg-surface px-3.5 py-3 text-sm outline-none transition-colors ${
                        errors[field.name]
                          ? "border-error"
                          : "border-line focus:border-accent"
                      }`}
                    />
                  )}

                  {field.type === "textarea" && (
                    <textarea
                      value={(formData[field.name] as string) ?? ""}
                      onChange={(e) => setValue(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      rows={3}
                      className="w-full resize-y rounded-xl border border-line bg-surface px-3.5 py-3 text-sm outline-none transition-colors focus:border-accent"
                    />
                  )}

                  {(field.type === "radio" || field.type === "checkbox") && (
                    <div
                      className={`grid gap-2.5 ${
                        field.twoCol ? "sm:grid-cols-2" : ""
                      }`}
                    >
                      {field.options.map((opt) => {
                        const isChecked =
                          field.type === "checkbox"
                            ? ((formData[field.name] as string[]) ?? []).includes(
                                opt.value
                              )
                            : formData[field.name] === opt.value;
                        return (
                          <label
                            key={opt.value}
                            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 text-sm transition-colors ${
                              isChecked
                                ? "border-accent bg-accent/10"
                                : "border-line bg-surface hover:border-accent/60"
                            }`}
                          >
                            <input
                              type={field.type}
                              name={field.name}
                              checked={isChecked}
                              onChange={() =>
                                field.type === "checkbox"
                                  ? toggleCheckbox(field.name, opt.value)
                                  : setValue(field.name, opt.value)
                              }
                              className="sr-only"
                            />
                            <span
                              className={`h-[18px] w-[18px] shrink-0 border-2 ${
                                field.type === "checkbox"
                                  ? "rounded-[5px]"
                                  : "rounded-full"
                              } ${
                                isChecked
                                  ? "border-accent bg-accent shadow-[inset_0_0_0_3px_#fff]"
                                  : "border-line"
                              }`}
                            />
                            <span className={isChecked ? "font-semibold" : ""}>
                              {opt.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {errors[field.name] && "error" in field && field.error && (
                    <p className="mt-2 text-xs text-error">{field.error}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {!submitted && (
          <div className="flex items-center justify-between border-t border-line px-8 py-5">
            {current > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                className="rounded-xl border border-line px-6 py-3 text-sm font-semibold transition-colors hover:border-accent/60"
              >
                ← Back
              </button>
            ) : (
              <span />
            )}
            <button
              type="button"
              onClick={handleNext}
              className="btn-accent font-display rounded-xl px-7 py-3 text-base text-white"
            >
              {current === steps.length - 1 ? "Get My Plan →" : "Next Step →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
