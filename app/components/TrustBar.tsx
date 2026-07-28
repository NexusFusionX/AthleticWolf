const highlights = [
  "ISSA-Certified Coaching",
  "Worldwide Online Access",
  "Custom Workout & Nutrition Plans",
  "Weekly Check-ins & Accountability",
  "6-Month Coaching Packages",
];

export function TrustBar() {
  return (
    <section
      className="border-y border-line bg-card/40 px-6 py-5 sm:px-8"
      aria-label="Coaching highlights"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center">
        {highlights.map((item) => (
          <span
            key={item}
            className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55 sm:text-xs"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
