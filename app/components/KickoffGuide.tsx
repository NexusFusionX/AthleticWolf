"use client";

import Link from "next/link";
import { Reveal } from "./Reveal";
import { AccentHeading } from "./AccentHeading";
import { ProcessPhoneFrame } from "./process/ProcessPhoneFrame";
import {
  ProcessPreviewCheckout,
  ProcessPreviewPackages,
} from "./process/ProcessPreviewCheckout";
import {
  ProcessPreviewAssessmentGoals,
  ProcessPreviewAssessmentTraining,
} from "./process/ProcessPreviewAssessment";
import {
  ProcessPreviewDashboard,
  ProcessPreviewPlanBuilding,
} from "./process/ProcessPreviewDashboard";

const steps = [
  {
    step: "01",
    title: "Pick a plan & pay",
    lead: "Choose your package and checkout in minutes.",
    screens: [
      { key: "packages", node: <ProcessPreviewPackages /> },
      { key: "checkout", node: <ProcessPreviewCheckout /> },
    ],
  },
  {
    step: "02",
    title: "Complete your assessment",
    lead: "After payment, answer a short intake so your coach knows you.",
    screens: [
      { key: "goals", node: <ProcessPreviewAssessmentGoals /> },
      { key: "training", node: <ProcessPreviewAssessmentTraining /> },
    ],
  },
  {
    step: "03",
    title: "Get your plan & train",
    lead: "Your coach delivers your program — then you start training.",
    screens: [
      { key: "building", node: <ProcessPreviewPlanBuilding /> },
      { key: "dashboard", node: <ProcessPreviewDashboard /> },
    ],
  },
];

export function KickoffGuide() {
  return (
    <section
      id="our-process"
      className="section-y wheel-section px-6 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal variant="fade">
          <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-accent">
            Kick-Off Guide
          </p>
          <AccentHeading
            before="How"
            accent="Our Process"
            after="Works"
            className="font-display mt-3 text-center text-3xl sm:text-4xl lg:text-5xl"
          />
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-white/80 sm:text-lg">
            Three simple steps from signup to your first workout.
          </p>
        </Reveal>

        <div className="kickoff-grid mt-8">
          {steps.map((item, i) => (
            <Reveal
              key={item.step}
              delay={i * 0.08}
              variant="up"
              className="kickoff-grid__item"
            >
              <article className="kickoff-card">
                <div className="kickoff-card__copy">
                  <span className="kickoff-card__step">Step {item.step}</span>
                  <h3 className="kickoff-card__title">{item.title}</h3>
                  <p className="kickoff-card__lead">{item.lead}</p>
                </div>

                <div className="kickoff-card__screens" aria-hidden inert>
                  {item.screens.map((screen, screenIndex) => (
                    <div
                      key={screen.key}
                      className={
                        screenIndex === 0
                          ? "kickoff-card__phone"
                          : "kickoff-card__phone kickoff-card__phone--desktop"
                      }
                    >
                      <ProcessPhoneFrame>{screen.node}</ProcessPhoneFrame>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} variant="up">
          <div className="mt-12 text-center">
            <Link
              href="/packages"
              className="btn btn-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white"
            >
              Get Started
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
