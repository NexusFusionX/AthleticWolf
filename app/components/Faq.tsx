const faqs = [
  {
    q: "How soon will I receive my customized plan?",
    a: "Most clients receive their first workout and nutrition plan within 3-5 days of signing up, once your intake form is reviewed.",
  },
  {
    q: "Is the plan actually personalized to me?",
    a: "Yes. Every plan is built around your goals, training experience, equipment access, schedule, and food preferences — no cookie-cutter templates.",
  },
  {
    q: "Can I request changes after receiving my plan?",
    a: "Absolutely. Your plan is a starting point and gets adjusted based on your progress, feedback, and check-ins.",
  },
  {
    q: "Do you include vegetarian or vegan meal plans?",
    a: "Yes, dietary preferences and restrictions (vegetarian, vegan, halal, allergies, intolerances) are collected upfront and built into your nutrition plan.",
  },
  {
    q: "Are supplements required?",
    a: "No. Supplements are optional and only recommended where they genuinely help — the plan works with or without them.",
  },
  {
    q: "Is there a home workout option?",
    a: "Yes. Programs are built around whatever equipment you have access to, whether that's a full gym, a home setup, or bodyweight only.",
  },
  {
    q: "How often will my plan be updated?",
    a: "Your plan is reviewed and adjusted regularly based on your check-ins, typically every 2-4 weeks or sooner if needed.",
  },
  {
    q: "What if I have a medical condition?",
    a: "You'll be asked about medical history and current injuries during onboarding. Please consult a physician before starting any new training program, especially with pre-existing conditions.",
  },
  {
    q: "Can beginners join?",
    a: "Yes — coaching is built for every level, from complete beginners to experienced athletes.",
  },
  {
    q: "How long does support last?",
    a: "Support runs for the full length of your coaching package, with regular check-ins throughout.",
  },
];

export function Faq() {
  return (
    <div className="shadow-premium mt-14 divide-y divide-line rounded-2xl border border-line bg-card">
      {faqs.map((item) => (
        <details key={item.q} className="group px-6 py-5 sm:px-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold">
            {item.q}
            <span className="shrink-0 text-accent transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
