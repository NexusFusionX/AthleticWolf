"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface PlanWizardProps {
  planId: string;
  onSuccess: () => void;
}

const steps = [
  {
    label: "Weekly Schedule",
    fields: [
      {
        name: "mondayWorkout",
        label: "Monday Workout",
        type: "text",
        placeholder: "e.g. Chest & Triceps",
      },
      {
        name: "tuesdayWorkout",
        label: "Tuesday Workout",
        type: "text",
        placeholder: "e.g. Back & Biceps",
      },
      {
        name: "wednesdayWorkout",
        label: "Wednesday Workout",
        type: "text",
        placeholder: "e.g. Legs",
      },
      {
        name: "thursdayWorkout",
        label: "Thursday Workout",
        type: "text",
        placeholder: "e.g. Shoulders",
      },
      {
        name: "fridayWorkout",
        label: "Friday Workout",
        type: "text",
        placeholder: "e.g. Arms & Cardio",
      },
      {
        name: "saturdayWorkout",
        label: "Saturday Workout",
        type: "text",
        placeholder: "e.g. Full Body",
      },
      {
        name: "sundayWorkout",
        label: "Sunday Activity",
        type: "text",
        placeholder: "e.g. Rest or Light Cardio",
      },
    ],
  },
  {
    label: "Nutrition",
    fields: [
      {
        name: "dailyCalories",
        label: "Daily Calorie Target",
        type: "text",
        placeholder: "e.g. 2500",
      },
      {
        name: "proteinGrams",
        label: "Daily Protein (grams)",
        type: "text",
        placeholder: "e.g. 150g",
      },
      {
        name: "carbsGrams",
        label: "Daily Carbs (grams)",
        type: "text",
        placeholder: "e.g. 300g",
      },
      {
        name: "fatsGrams",
        label: "Daily Fats (grams)",
        type: "text",
        placeholder: "e.g. 80g",
      },
      {
        name: "mealFrequency",
        label: "Recommended Meal Frequency",
        type: "text",
        placeholder: "e.g. 4-5 meals per day",
      },
      {
        name: "supplements",
        label: "Recommended Supplements",
        type: "textarea",
        placeholder: "e.g. Whey Protein, Creatine, Multivitamin",
      },
    ],
  },
  {
    label: "Goals & Progress",
    fields: [
      {
        name: "primaryGoal",
        label: "Primary Goal",
        type: "text",
        placeholder: "e.g. Lose 15 lbs of fat",
      },
      {
        name: "targetWeight",
        label: "Target Weight",
        type: "text",
        placeholder: "e.g. 185 lbs",
      },
      {
        name: "checkInFrequency",
        label: "Check-in Frequency",
        type: "text",
        placeholder: "e.g. Weekly on Mondays",
      },
      {
        name: "progressMetrics",
        label: "Progress Metrics to Track",
        type: "textarea",
        placeholder: "e.g. Weight, body measurements, strength gains",
      },
      {
        name: "adjustmentTriggers",
        label: "When to Adjust Plan",
        type: "textarea",
        placeholder: "e.g. No progress for 2 weeks, plateau reached",
      },
    ],
  },
];

export function PlanWizard({ planId, onSuccess }: PlanWizardProps) {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function setValue(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError("");

    try {
      const { error: updateError } = await supabase
        .from("plans")
        .update({
          plan_content: JSON.stringify(formData),
        })
        .eq("id", planId);

      if (updateError) throw updateError;

      setSubmitting(false);
      onSuccess();
    } catch (err) {
      setError("Failed to save plan. Please try again.");
      setSubmitting(false);
    }
  }

  function handleNext() {
    if (current < steps.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      handleSubmit();
    }
  }

  function handleBack() {
    if (current > 0) setCurrent((c) => c - 1);
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-card overflow-hidden shadow-premium">
      <div className="bg-ink px-8 py-7 text-white">
        <h2 className="font-display text-2xl">Create Coaching Plan</h2>
        <p className="text-sm text-muted mt-2">
          Step {current + 1} of {steps.length}. {steps[current].label}
        </p>
      </div>

      <div className="p-8">
        {error && (
          <div className="mb-6 rounded-xl bg-error/10 border border-error/30 p-4">
            <p className="text-sm text-error">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {steps[current].fields.map((field) => (
            <label key={field.name} className="flex flex-col gap-2 text-sm">
              {field.label}
              {field.type === "textarea" ? (
                <textarea
                  value={formData[field.name] || ""}
                  onChange={(e) => setValue(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                  className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                />
              ) : (
                <input
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={(e) => setValue(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                />
              )}
            </label>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={handleBack}
            disabled={current === 0}
            className="btn btn-outline px-6 py-3 text-sm font-bold uppercase tracking-wide disabled:opacity-50"
          >
            ← Back
          </button>
          <button
            onClick={handleNext}
            disabled={submitting}
            className="btn btn-accent flex-1 px-6 py-3 text-sm font-bold uppercase tracking-wide disabled:opacity-50"
          >
            {submitting ? "Saving..." : current === steps.length - 1 ? "Save Plan" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}
