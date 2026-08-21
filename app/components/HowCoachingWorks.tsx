"use client";

import Link from "next/link";
import {
  ClipboardText,
  FileText,
  User,
  Trophy,
  ArrowRight,
  ArrowDown,
} from "@phosphor-icons/react";
import { Reveal } from "./Reveal";
import { AccentHeading } from "./AccentHeading";

const steps = [
  {
    icon: User,
    title: "Apply for Coaching",
    desc: "Answer a short application so your coach understands your situation.",
  },
  {
    icon: ClipboardText,
    title: "Coach Review",
    desc: "Your coach reviews your answers and reaches out with next steps.",
  },
  {
    icon: FileText,
    title: "Get Your Plan",
    desc: "Receive a custom workout and nutrition plan built around you.",
  },
  {
    icon: Trophy,
    title: "Weekly Coaching",
    desc: "Check-ins, plan updates, and direct coach support throughout.",
  },
];

export function HowCoachingWorks() {
  return (
    <section id="how-it-works" className="section-y wheel-section px-4 sm:px-6 lg:px-7">
      <div className="mx-auto max-w-7xl">
        <Reveal variant="fade">
          <div className="mx-auto mb-4 h-px w-10 bg-accent" />
          <AccentHeading
            before="HOW"
            accent="COACHING"
            after="WORKS"
            className="font-display text-center text-2xl tracking-wide sm:text-4xl lg:text-5xl"
          />
        </Reveal>

        <div className="mt-8">
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={i * 0.08} variant="slide-right">
                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-line bg-card text-accent">
                      <Icon size={32} weight="regular" />
                    </div>

                    {i < steps.length - 1 && (
                      <div className="absolute left-full top-10 flex w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-accent">
                        <ArrowRight size={20} weight="bold" />
                      </div>
                    )}

                    <p className="font-display mt-4 text-sm font-bold tracking-wide">
                      {step.title}
                    </p>
                    <p className="mt-2 max-w-[140px] text-center text-xs text-muted">
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="mx-auto max-w-sm lg:hidden">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === steps.length - 1;
              return (
                <Reveal key={step.title} delay={i * 0.08} variant="down">
                  <div>
                    <div className="grid grid-cols-[3rem_1fr] gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-card text-accent">
                        <Icon size={18} weight="light" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="font-display text-xs font-bold tracking-wide">
                          {step.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-muted">
                          {step.desc}
                        </p>
                      </div>
                    </div>

                    {!isLast && (
                      <div className="flex w-12 justify-center py-2">
                        <ArrowDown size={16} weight="bold" className="text-accent" />
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/#apply"
            className="btn btn-accent px-6 py-3 text-sm font-semibold text-white"
          >
            Apply for coaching
          </Link>
        </div>
      </div>
    </section>
  );
}
