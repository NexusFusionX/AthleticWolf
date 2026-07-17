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
    <section className="wheel-section px-6 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-4 h-px w-10 bg-accent" />
        <h2 className="font-display text-center text-2xl tracking-wide sm:text-3xl">
          WHO THIS IS FOR
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="flex flex-col items-center gap-3 rounded-xl border border-line bg-card px-4 py-6 text-center transition-all hover:-translate-y-1 hover:border-accent/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon size={20} weight="regular" />
                </div>
                <h3 className="text-xs font-semibold leading-tight">
                  {category.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
