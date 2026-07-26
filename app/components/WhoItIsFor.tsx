"use client";

import { ProcessCard } from "./ProcessCard";
import { Reveal } from "./Reveal";

const categories = [
  {
    emoji: "💼",
    title: "Busy Professionals",
    description:
      "Limited time, high stress. Get efficient workouts and nutrition that fit your calendar — not the other way around.",
  },
  {
    emoji: "💡",
    title: "Beginners",
    description:
      "New to training? Clear guidance, proper form, and a plan that builds confidence from day one.",
  },
  {
    emoji: "⚖️",
    title: "Weight Loss Clients",
    description:
      "Tired of crash diets that don't stick? Sustainable fat loss through structured training and personalized nutrition.",
  },
  {
    emoji: "🏋️",
    title: "Muscle Building Enthusiasts",
    description:
      "Hit a plateau or starting fresh? Hypertrophy programming with progressive overload built in.",
  },
  {
    emoji: "📈",
    title: "Weight Gain",
    description:
      "Struggling to put on size? Calorie-targeted nutrition and strength training to build lean mass.",
  },
  {
    emoji: "❤️",
    title: "Anyone Struggling with Consistency",
    description:
      "Life gets in the way. Weekly accountability, check-ins, and coach support keep you showing up.",
  },
];

export function WhoItIsFor() {
  return (
    <section className="wheel-section px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mx-auto mb-4 h-px w-10 bg-accent" />
          <h2 className="font-display text-center text-2xl tracking-wide sm:text-4xl lg:text-5xl">
            WHO THIS IS FOR
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted sm:text-base">
            Built for real people with real schedules — not gym influencers.
          </p>
        </Reveal>

        <div className="process-grid mt-14">
          {categories.map((category, i) => (
            <Reveal key={category.title} delay={i * 0.06}>
              <ProcessCard
                emoji={category.emoji}
                title={category.title}
                description={category.description}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
