"use client";

import Link from "next/link";
import { Reveal } from "./Reveal";
import { ProcessStepCard } from "./process/ProcessStepCard";
import {
  ProcessPreviewSignIn,
  ProcessPreviewSignUp,
} from "./process/ProcessPreviewAccount";
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

const STEPS = [
  {
    step: "01",
    title: "Create your account",
    lead: "Sign up or log in to start checkout.",
    detail:
      "Create a free account with your email and password, or sign in if you already have one. Your account is where you'll access your assessment, plan, and coaching dashboard.",
    points: ["Quick email sign-up", "Secure login anytime"],
    screens: [
      { key: "signup", node: <ProcessPreviewSignUp /> },
      { key: "signin", node: <ProcessPreviewSignIn /> },
    ],
  },
  {
    step: "02",
    title: "Choose your package",
    lead: "Pick Silver, Platinum, or Diamond.",
    detail:
      "Compare coaching packages and choose the level of support that fits your goals. All plans are prepaid 6-month coaching packages paid in full at checkout.",
    points: ["Three coaching tiers", "Switch package at checkout"],
    screens: [
      { key: "packages", node: <ProcessPreviewPackages selectedSlug="silver" /> },
      { key: "packages-featured", node: <ProcessPreviewPackages selectedSlug="platinum" /> },
    ],
  },
  {
    step: "03",
    title: "Checkout & pay securely",
    lead: "Enter your details and pay with Stripe.",
    detail:
      "Add your contact info, confirm your package, and pay securely online. Upgrades charge only the price difference if you already have an active plan.",
    points: ["Stripe-encrypted payment", "Contact preferences saved"],
    screens: [
      { key: "checkout", node: <ProcessPreviewCheckout /> },
      { key: "checkout-pay", node: <ProcessPreviewCheckout /> },
    ],
  },
  {
    step: "04",
    title: "Complete your assessment",
    lead: "Tell us about your goals, schedule, and diet.",
    detail:
      "Right after checkout, complete a short intake: fitness goal, training experience, days available, equipment, dietary preferences, and any injuries. This is what makes your plan personal.",
    points: ["Takes about 5 minutes", "Syncs with real assessment flow"],
    screens: [
      { key: "goals", node: <ProcessPreviewAssessmentGoals /> },
      { key: "training", node: <ProcessPreviewAssessmentTraining /> },
    ],
  },
  {
    step: "05",
    title: "Your coach builds your plan",
    lead: "Custom training and nutrition — built for you.",
    detail:
      "Using your assessment, your coach builds a training and nutrition plan tailored to your goals, schedule, and equipment. You are notified when it is ready in your dashboard.",
    points: ["Personalized workouts & meals", "Built within 24–48 hours"],
    screens: [
      { key: "building", node: <ProcessPreviewPlanBuilding /> },
      { key: "building-status", node: <ProcessPreviewPlanBuilding /> },
    ],
  },
  {
    step: "06",
    title: "Train, track & stay accountable",
    lead: "Access your plan and check in with your coach.",
    detail:
      "Once your plan is live, train with your custom program, track progress in your dashboard, and stay accountable with weekly check-ins. Higher tiers include WhatsApp access and extra support.",
    points: ["Dashboard access 24/7", "Ongoing coach adjustments"],
    screens: [
      { key: "dashboard", node: <ProcessPreviewDashboard /> },
      { key: "dashboard-plan", node: <ProcessPreviewDashboard /> },
    ],
  },
] as const;

export function HowItWorksGuide() {
  return (
    <div className="how-it-works-steps">
      {STEPS.map((item, i) => (
        <Reveal key={item.step} delay={i * 0.06} variant="up">
          <ProcessStepCard {...item} variant="detailed" />
        </Reveal>
      ))}

      <Reveal delay={0.15} variant="up">
        <div className="how-it-works-cta">
          <h2 className="font-display text-2xl text-white sm:text-3xl">
            Ready to get started?
          </h2>
          <p className="mt-2 text-white/65">
            Pick a coaching package and check out to begin your assessment.
          </p>
          <Link
            href="/packages"
            className="btn btn-accent mt-6 inline-flex px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white"
          >
            View packages
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
