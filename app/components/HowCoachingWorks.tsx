"use client";

import { ClipboardText, Phone, FileText, User, Trophy, ArrowRight } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";

const steps = [
  {
    icon: ClipboardText,
    title: "APPLY",
    desc: "Fill out the application",
  },
  {
    icon: Phone,
    title: "CONSULTATION CALL",
    desc: "We discuss your goals",
  },
  {
    icon: FileText,
    title: "PERSONALIZED PLAN",
    desc: "Get a custom plan tailored to your needs",
  },
  {
    icon: User,
    title: "WEEKLY COACHING",
    desc: "Weekly check-ins, reviews & support",
  },
  {
    icon: Trophy,
    title: "ACHIEVE RESULTS",
    desc: "Transform your body and your life",
  },
];

export function HowCoachingWorks() {
  return (
    <section id="how-it-works" className="wheel-section px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-center text-4xl sm:text-5xl">
            HOW COACHING WORKS
          </h2>
        </Reveal>

        <div className="mt-16">
          {/* Desktop flow */}
          <div className="hidden lg:block">
            <div className="flex items-end justify-center gap-3">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <Reveal key={step.title} delay={i * 0.08}>
                    <div className="flex flex-col items-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-line bg-card text-accent">
                        <Icon size={32} weight="regular" />
                      </div>
                      <p className="font-display mt-4 text-sm font-bold uppercase tracking-wider">
                        {step.title}
                      </p>
                      <p className="mt-2 max-w-[120px] text-center text-xs text-muted">
                        {step.desc}
                      </p>

                      {i < steps.length - 1 && (
                        <div className="mt-6 flex items-center gap-2 text-accent">
                          <ArrowRight size={20} weight="bold" />
                        </div>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Mobile flow */}
          <div className="lg:hidden space-y-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={i * 0.08}>
                  <div className="flex gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-line bg-card text-accent">
                      <Icon size={24} weight="regular" />
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="font-display text-sm font-bold uppercase tracking-wider">
                        {step.title}
                      </p>
                      <p className="mt-1 text-sm text-muted">{step.desc}</p>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="flex items-center text-accent">
                        <ArrowRight size={20} weight="bold" />
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
