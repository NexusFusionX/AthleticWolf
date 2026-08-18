"use client";

import { ProcessCard } from "./ProcessCard";
import { Reveal } from "./Reveal";
import { AccentHeading } from "./AccentHeading";

const categories = [
  {
    emoji: "💼",
    title: "Busy Professionals",
    description:
      "Limited time, high stress. Get efficient workouts and nutrition that fit your calendar — not the other way around.",
    mobileDescription:
      "Efficient workouts and nutrition that fit your schedule.",
  },
  {
    emoji: "💡",
    title: "Beginners",
    description:
      "New to training? Clear guidance, proper form, and a plan that builds confidence from day one.",
    mobileDescription: "Clear guidance and a plan that builds confidence.",
  },
  {
    emoji: "⚖️",
    title: "Weight Loss Clients",
    description:
      "Tired of crash diets that don't stick? Sustainable fat loss through structured training and personalized nutrition.",
    mobileDescription: "Sustainable fat loss without crash diets.",
  },
  {
    emoji: "🏋️",
    title: "Muscle Building Enthusiasts",
    description:
      "Hit a plateau or starting fresh? Hypertrophy programming with progressive overload built in.",
    mobileDescription: "Structured hypertrophy with progressive overload.",
  },
  {
    emoji: "📈",
    title: "Weight Gain",
    description:
      "Struggling to put on size? Calorie-targeted nutrition and strength training to build lean mass.",
    mobileDescription: "Calorie-targeted plans to build lean mass.",
  },
  {
    emoji: "❤️",
    title: "Anyone Struggling with Consistency",
    description:
      "Life gets in the way. Weekly accountability, check-ins, and coach support keep you showing up.",
    mobileDescription: "Weekly check-ins and coach accountability.",
  },
];

export function WhoItIsFor() {
  return (
    <section className="section-y wheel-section section-surface px-4 sm:px-6 lg:px-7">
      <div className="mx-auto max-w-7xl">
        <Reveal variant="blur-up">
          <div className="mx-auto mb-4 h-px w-10 bg-accent" />
          <AccentHeading
            accent="WHO"
            after="THIS IS FOR"
            className="font-display text-center text-2xl tracking-wide sm:text-4xl lg:text-5xl"
          />
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted sm:text-base">
            Built for real people with real schedules — not gym influencers.
          </p>
        </Reveal>

        <div className="process-grid who-it-is-for__grid mt-8">
          {categories.map((category, i) => (
            <Reveal
              key={category.title}
              delay={i * 0.05}
              variant="fade"
              className="h-full"
            >
              <ProcessCard
                emoji={category.emoji}
                title={category.title}
                description={category.description}
                mobileDescription={category.mobileDescription}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
