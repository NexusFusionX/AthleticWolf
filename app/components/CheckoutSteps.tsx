type CheckoutStepsProps = {
  current: "plan" | "payment";
};

const STEPS = [
  { id: "plan", label: "Account & Plan" },
  { id: "payment", label: "Payment" },
] as const;

export function CheckoutSteps({ current }: CheckoutStepsProps) {
  const currentIndex = STEPS.findIndex((step) => step.id === current);

  return (
    <ol className="checkout-steps" aria-label="Checkout progress">
      {STEPS.map((step, index) => {
        const done = index < currentIndex;
        const active = index === currentIndex;

        return (
          <li key={step.id} className="checkout-steps__item">
            <div className="checkout-steps__marker">
              <span
                className={`checkout-steps__dot${
                  done || active
                    ? " checkout-steps__dot--active"
                    : " checkout-steps__dot--pending"
                }`}
                aria-hidden
              >
                {done ? "✓" : index + 1}
              </span>
              <span
                className={`checkout-steps__label${
                  active
                    ? " checkout-steps__label--active"
                    : done
                      ? " checkout-steps__label--done"
                      : ""
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <span
                className={`checkout-steps__line${
                  done ? " checkout-steps__line--done" : ""
                }`}
                aria-hidden
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
