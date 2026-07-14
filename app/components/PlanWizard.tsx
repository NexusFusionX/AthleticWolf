"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface PlanWizardProps {
  planId: string;
  onSuccess: () => void;
}

const workoutOptions = [
  "Chest & Triceps",
  "Back & Biceps",
  "Legs",
  "Shoulders",
  "Arms & Cardio",
  "Full Body",
  "Rest or Light Cardio",
  "HIIT Training",
  "Functional Training",
  "Flexibility & Mobility",
];

const calorieOptions = ["1500", "1800", "2000", "2200", "2500", "2800", "3000", "3200", "3500"];
const proteinOptions = ["100g", "120g", "140g", "150g", "160g", "180g", "200g", "220g"];
const carbOptions = ["150g", "200g", "250g", "300g", "350g", "400g", "450g", "500g"];
const fatOptions = ["50g", "60g", "70g", "80g", "90g", "100g", "110g", "120g"];
const mealFrequencyOptions = ["3 meals per day", "4 meals per day", "5 meals per day", "6 meals per day"];
const supplementOptions = [
  "Whey Protein",
  "Creatine Monohydrate",
  "Multivitamin",
  "Omega-3 Fish Oil",
  "BCAAs",
  "Pre-Workout",
  "Mass Gainer",
  "Casein Protein",
];

const primaryGoalOptions = [
  "Lose fat",
  "Build muscle",
  "Body recomposition",
  "Get stronger",
  "Improve endurance",
  "Athletic performance",
  "General fitness",
];

const targetWeightOptions = [
  "140 lbs",
  "150 lbs",
  "160 lbs",
  "170 lbs",
  "180 lbs",
  "190 lbs",
  "200 lbs",
  "210 lbs",
  "220 lbs",
  "230 lbs",
];

const checkInFrequencyOptions = [
  "Weekly on Mondays",
  "Weekly on Fridays",
  "Bi-weekly",
  "Every 2 weeks",
  "Monthly",
];

const progressMetricsOptions = [
  "Weight",
  "Body measurements",
  "Strength gains",
  "Photos",
  "Energy levels",
  "Sleep quality",
  "Workout performance",
];

const adjustmentTriggersOptions = [
  "No progress for 2 weeks",
  "Plateau reached",
  "Weight gain/loss of 5 lbs",
  "Strength plateau",
  "Persistent soreness",
  "Lifestyle changes",
];

const steps = [
  {
    label: "Weekly Schedule",
    fields: [
      { name: "mondayWorkout", label: "Monday Workout", options: workoutOptions },
      { name: "tuesdayWorkout", label: "Tuesday Workout", options: workoutOptions },
      { name: "wednesdayWorkout", label: "Wednesday Workout", options: workoutOptions },
      { name: "thursdayWorkout", label: "Thursday Workout", options: workoutOptions },
      { name: "fridayWorkout", label: "Friday Workout", options: workoutOptions },
      { name: "saturdayWorkout", label: "Saturday Workout", options: workoutOptions },
      { name: "sundayWorkout", label: "Sunday Activity", options: workoutOptions },
    ],
  },
  {
    label: "Nutrition",
    fields: [
      { name: "dailyCalories", label: "Daily Calorie Target", options: calorieOptions },
      { name: "proteinGrams", label: "Daily Protein", options: proteinOptions },
      { name: "carbsGrams", label: "Daily Carbs", options: carbOptions },
      { name: "fatsGrams", label: "Daily Fats", options: fatOptions },
      { name: "mealFrequency", label: "Meal Frequency", options: mealFrequencyOptions },
      { name: "supplements", label: "Recommended Supplements", options: supplementOptions, multiSelect: true },
    ],
  },
  {
    label: "Goals & Progress",
    fields: [
      { name: "primaryGoal", label: "Primary Goal", options: primaryGoalOptions },
      { name: "targetWeight", label: "Target Weight", options: targetWeightOptions },
      { name: "checkInFrequency", label: "Check-in Frequency", options: checkInFrequencyOptions },
      { name: "progressMetrics", label: "Progress Metrics", options: progressMetricsOptions, multiSelect: true },
      { name: "adjustmentTriggers", label: "Adjustment Triggers", options: adjustmentTriggersOptions, multiSelect: true },
    ],
  },
];

export function PlanWizard({ planId, onSuccess }: PlanWizardProps) {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [planSaved, setPlanSaved] = useState(false);
  const [markingReady, setMarkingReady] = useState(false);

  function setValue(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function toggleMultiSelect(name: string, value: string) {
    const current = formData[name] || "";
    const values = current ? current.split(", ") : [];

    if (values.includes(value)) {
      const updated = values.filter((v) => v !== value);
      setValue(name, updated.join(", "));
    } else {
      setValue(name, [...values, value].join(", "));
    }
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
      setPlanSaved(true);
    } catch (err) {
      setError("Failed to save plan. Please try again.");
      setSubmitting(false);
    }
  }

  async function handleMarkReady() {
    setMarkingReady(true);
    setError("");

    try {
      const { error: updateError } = await supabase
        .from("plans")
        .update({ plan_ready_at: new Date().toISOString() })
        .eq("id", planId);

      if (updateError) throw updateError;

      alert("Plan marked ready! Customer notified.");
      onSuccess();
    } catch (err) {
      setError("Failed to mark plan ready. Please try again.");
      setMarkingReady(false);
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

  const currentStep = steps[current];
  const currentField = currentStep.fields[0];

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-card overflow-hidden shadow-premium">
      <div className="bg-ink px-8 py-7 text-white">
        <h2 className="font-display text-2xl">Create Coaching Plan</h2>
        <p className="text-sm text-muted mt-2">
          Step {current + 1} of {steps.length}. {currentStep.label}
        </p>
      </div>

      <div className="p-8">
        {error && (
          <div className="mb-6 rounded-xl bg-error/10 border border-error/30 p-4">
            <p className="text-sm text-error">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {currentStep.fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-foreground">{field.label}</label>

              {field.multiSelect ? (
                <div className="flex flex-wrap gap-2">
                  {field.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleMultiSelect(field.name, option)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        (formData[field.name] || "").includes(option)
                          ? "bg-accent text-ink"
                          : "bg-surface border border-line text-foreground hover:border-accent"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <select
                  value={formData[field.name] || ""}
                  onChange={(e) => setValue(field.name, e.target.value)}
                  className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>

        {planSaved ? (
          <div className="mt-8 space-y-4">
            <div className="rounded-xl bg-accent/10 border border-accent/30 p-4">
              <p className="text-sm font-semibold text-accent">✓ Plan saved successfully!</p>
              <p className="text-xs text-foreground mt-1">Click below to notify the customer.</p>
            </div>
            <button
              onClick={handleMarkReady}
              disabled={markingReady}
              className="btn btn-accent w-full px-6 py-3 text-sm font-bold uppercase tracking-wide disabled:opacity-50"
            >
              {markingReady ? "Notifying..." : "Mark Ready & Notify Customer"}
            </button>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
