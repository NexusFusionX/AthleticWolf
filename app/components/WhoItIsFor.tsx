"use client";

import {
  Briefcase,
  Lightbulb,
  Scales,
  Barbell,
  TrendUp,
  Heart,
} from "@phosphor-icons/react";

const categories = [
  {
    icon: Briefcase,
    title: "Busy Professionals",
  },
  {
    icon: Lightbulb,
    title: "Beginners",
  },
  {
    icon: Scales,
    title: "Weight Loss Clients",
  },
  {
    icon: Barbell,
    title: "Muscle Building Enthusiasts",
  },
  {
    icon: TrendUp,
    title: "Weight Gain",
  },
  {
    icon: Heart,
    title: "Anyone Struggling with Consistency",
  },
];

export function WhoItIsFor() {
  return (
    <section className="wheel-section px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-center text-4xl sm:text-5xl">
          WHO THIS IS FOR
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="card-premium flex flex-col items-center rounded-2xl border border-line bg-card p-8 text-center transition-all hover:-translate-y-1.5"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon size={32} weight="regular" />
                </div>
                <h3 className="font-display mt-6 text-lg">{category.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
