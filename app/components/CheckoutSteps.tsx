type CheckoutStepsProps = {
  current: "assessment" | "account" | "payment";
};

const STEPS = [
  { id: "assessment", label: "Assessment" },
  { id: "account", label: "Account" },
  { id: "payment", label: "Payment" },
] as const;

export function CheckoutSteps({ current }: CheckoutStepsProps) {
  const currentIndex = STEPS.findIndex((step) => step.id === current);

  return (
    <ol className="mb-8 flex items-center justify-center gap-2 sm:gap-4">
      {STEPS.map((step, index) => {
        const done = index < currentIndex;
        const active = index === currentIndex;

        return (
          <li key={step.id} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  done || active
                    ? "bg-accent text-white"
                    : "border border-line bg-surface text-muted"
                }`}
                aria-hidden
              >
                {done ? "✓" : index + 1}
              </span>
              <span
                className={`hidden text-xs font-semibold sm:inline ${
                  active ? "text-white" : done ? "text-accent" : "text-muted"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <span
                className={`h-px w-6 sm:w-10 ${done ? "bg-accent/60" : "bg-line"}`}
                aria-hidden
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
