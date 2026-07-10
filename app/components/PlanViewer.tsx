"use client";

interface PlanViewerProps {
  planContent: string | null;
}

export function PlanViewer({ planContent }: PlanViewerProps) {
  if (!planContent) {
    return (
      <div className="rounded-xl bg-surface p-6 text-center">
        <p className="text-muted">Your coaching plan is being created...</p>
      </div>
    );
  }

  try {
    const plan = JSON.parse(planContent);

    return (
      <div className="rounded-xl border border-line bg-surface p-8 space-y-8">
        <div>
          <h3 className="font-display text-xl mb-6">Weekly Workout Schedule</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { key: "mondayWorkout", label: "Monday" },
              { key: "tuesdayWorkout", label: "Tuesday" },
              { key: "wednesdayWorkout", label: "Wednesday" },
              { key: "thursdayWorkout", label: "Thursday" },
              { key: "fridayWorkout", label: "Friday" },
              { key: "saturdayWorkout", label: "Saturday" },
              { key: "sundayWorkout", label: "Sunday" },
            ].map((day) => (
              <div key={day.key} className="rounded-lg bg-surface/50 p-4 border border-line/50">
                <p className="text-xs font-semibold text-muted uppercase mb-2">{day.label}</p>
                <p className="font-medium text-foreground">
                  {plan[day.key as keyof typeof plan] || "—"}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-xl mb-6">Nutrition Plan</h3>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-surface/50 p-4 border border-line/50">
                <p className="text-xs font-semibold text-muted uppercase mb-2">Daily Calories</p>
                <p className="font-medium text-foreground">{plan.dailyCalories || "—"}</p>
              </div>
              <div className="rounded-lg bg-surface/50 p-4 border border-line/50">
                <p className="text-xs font-semibold text-muted uppercase mb-2">Protein</p>
                <p className="font-medium text-foreground">{plan.proteinGrams || "—"}</p>
              </div>
              <div className="rounded-lg bg-surface/50 p-4 border border-line/50">
                <p className="text-xs font-semibold text-muted uppercase mb-2">Carbs</p>
                <p className="font-medium text-foreground">{plan.carbsGrams || "—"}</p>
              </div>
              <div className="rounded-lg bg-surface/50 p-4 border border-line/50">
                <p className="text-xs font-semibold text-muted uppercase mb-2">Fats</p>
                <p className="font-medium text-foreground">{plan.fatsGrams || "—"}</p>
              </div>
            </div>

            {plan.mealFrequency && (
              <div className="rounded-lg bg-surface/50 p-4 border border-line/50">
                <p className="text-xs font-semibold text-muted uppercase mb-2">Meal Frequency</p>
                <p className="font-medium text-foreground">{plan.mealFrequency}</p>
              </div>
            )}

            {plan.supplements && (
              <div className="rounded-lg bg-surface/50 p-4 border border-line/50">
                <p className="text-xs font-semibold text-muted uppercase mb-2">Supplements</p>
                <p className="font-medium text-foreground whitespace-pre-line">{plan.supplements}</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-display text-xl mb-6">Goals & Progress</h3>
          <div className="space-y-4">
            {plan.primaryGoal && (
              <div className="rounded-lg bg-surface/50 p-4 border border-line/50">
                <p className="text-xs font-semibold text-muted uppercase mb-2">Primary Goal</p>
                <p className="font-medium text-foreground">{plan.primaryGoal}</p>
              </div>
            )}

            {plan.targetWeight && (
              <div className="rounded-lg bg-surface/50 p-4 border border-line/50">
                <p className="text-xs font-semibold text-muted uppercase mb-2">Target Weight</p>
                <p className="font-medium text-foreground">{plan.targetWeight}</p>
              </div>
            )}

            {plan.checkInFrequency && (
              <div className="rounded-lg bg-surface/50 p-4 border border-line/50">
                <p className="text-xs font-semibold text-muted uppercase mb-2">Check-in Frequency</p>
                <p className="font-medium text-foreground">{plan.checkInFrequency}</p>
              </div>
            )}

            {plan.progressMetrics && (
              <div className="rounded-lg bg-surface/50 p-4 border border-line/50">
                <p className="text-xs font-semibold text-muted uppercase mb-2">Progress Metrics</p>
                <p className="font-medium text-foreground whitespace-pre-line">{plan.progressMetrics}</p>
              </div>
            )}

            {plan.adjustmentTriggers && (
              <div className="rounded-lg bg-surface/50 p-4 border border-line/50">
                <p className="text-xs font-semibold text-muted uppercase mb-2">Adjustment Triggers</p>
                <p className="font-medium text-foreground whitespace-pre-line">{plan.adjustmentTriggers}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div className="rounded-xl bg-surface p-6 text-center">
        <p className="text-muted">Unable to display plan</p>
      </div>
    );
  }
}
