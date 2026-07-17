"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";

const programs = [
  {
    src: "/media/programs/fat-loss.jpg",
    title: "Fat Loss Coaching",
    desc: "Lose fat, improve health and confidence with sustainable nutrition & training.",
  },
  {
    src: "/media/programs/muscle-building.jpg",
    title: "Muscle Building Coaching",
    desc: "Build lean muscle with structured workouts and optimal nutrition.",
  },
  {
    src: "/media/programs/body-recomposition.jpg",
    title: "Body Recomposition",
    desc: "Lose fat and gain muscle at the same time. Transform your body composition.",
  },
  {
    src: "/media/programs/online-coaching.jpg",
    title: "Online Coaching",
    desc: "Full remote coaching with weekly check-ins, plan updates, and direct coach access.",
  },
  {
    src: "/media/programs/nutrition-coaching.jpg",
    title: "Nutrition Coaching",
    desc: "Custom nutrition plans built around your preferences, schedule, and goals.",
  },
];

export function Programs() {
  return (
    <section id="programs" className="wheel-section px-6 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto mb-4 h-px w-10 bg-accent" />
          <h2 className="font-display text-center text-2xl tracking-wide sm:text-4xl">
            COACHING PROGRAMS
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {programs.map((program, i) => (
            <Reveal key={program.title} delay={i * 0.06}>
              <div className="card-premium overflow-hidden rounded-xl border border-line bg-card transition-all hover:-translate-y-1.5">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={program.src}
                    alt={program.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 240px, (min-width: 640px) 30vw, 45vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm font-bold uppercase leading-tight">
                    {program.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {program.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
