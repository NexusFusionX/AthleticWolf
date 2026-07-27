const marqueeItems = [
  "ISSA-Certified Coaching",
  "Worldwide Online Access",
  "Custom Workout & Nutrition Plans",
  "Weekly Check-Ins & Accountability",
  "Home or Gym Training",
  "6-Month Coaching Packages",
  "Real Coach, Real Support",
  "Fat Loss · Muscle · Recomposition",
];

export function PromoMarquee() {
  const loop = [...marqueeItems, ...marqueeItems];

  return (
    <div className="promo-marquee" aria-label="Coaching highlights">
      <div className="promo-marquee__track">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="promo-marquee__item">
            {item}
            <span className="promo-marquee__dot" aria-hidden>
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
