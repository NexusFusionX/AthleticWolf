import Link from "next/link";
import { Header } from "@/app/components/Header";
import { ClipboardText, Phone, FileText, User, Trophy } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "How Coaching Works | Athletic Wolf",
  description: "A full step-by-step breakdown of how Athletic Wolf online coaching works, from application to results.",
};

const steps = [
  {
    icon: ClipboardText,
    title: "Apply",
    summary: "Fill out the application.",
    detail:
      "Choose a coaching package and sign in to start. You'll fill out a short application covering your goals, training history, and lifestyle — this takes about 5 minutes and helps us understand where you're starting from.",
  },
  {
    icon: FileText,
    title: "Complete Your Assessment",
    summary: "Tell us about your goals, experience, and schedule.",
    detail:
      "Right after applying, you'll complete a full intake assessment: your main fitness goal, experience level, training days available, equipment access, dietary preferences, and any injuries or health conditions we should account for. This is what makes your plan personal instead of generic.",
  },
  {
    icon: Phone,
    title: "Consultation & Plan Building",
    summary: "We build your custom training and nutrition plan.",
    detail:
      "Using your assessment, your coach builds a training and nutrition plan tailored specifically to your goals, schedule, and equipment. This typically takes 24-48 hours after checkout. You'll be notified as soon as it's ready in your dashboard.",
  },
  {
    icon: User,
    title: "Weekly Coaching & Check-ins",
    summary: "Ongoing support, adjustments, and accountability.",
    detail:
      "Once your plan is live, you'll have regular check-ins with your coach to track progress, adjust your plan as needed, and stay accountable. Depending on your package, this includes WhatsApp access, 24/7 assistant support, and body condition check-ups.",
  },
  {
    icon: Trophy,
    title: "Achieve Real Results",
    summary: "Sustainable progress, tracked and adjusted over time.",
    detail:
      "Your plan isn't static — it evolves as you progress. Whether your goal is fat loss, muscle building, or body recomposition, your coach continuously adjusts your training and nutrition to keep you moving toward real, lasting results.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-line bg-ink px-6 py-12 text-white sm:px-8">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/#how-it-works"
              className="inline-block text-sm font-semibold text-accent hover:text-accent-bright transition-colors mb-6"
            >
              ← Back to Home
            </Link>
            <h1 className="font-display text-4xl sm:text-5xl">How Coaching Works</h1>
            <p className="mt-4 max-w-xl text-white/75">
              A full, step-by-step look at what happens from the moment you apply
              to the results you'll see down the line.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col gap-10">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-line bg-card text-accent">
                        <Icon size={26} weight="regular" />
                      </div>
                      {i < steps.length - 1 && (
                        <div className="mt-2 w-px flex-1 bg-line" />
                      )}
                    </div>
                    <div className="pb-2">
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
                        Step {i + 1}
                      </p>
                      <h2 className="font-display mt-1 text-2xl">{step.title}</h2>
                      <p className="mt-1 text-sm font-semibold text-muted">
                        {step.summary}
                      </p>
                      <p className="mt-3 leading-relaxed text-muted">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-14 rounded-2xl border border-line bg-card p-8 text-center shadow-premium">
              <h2 className="font-display text-2xl">Ready to get started?</h2>
              <p className="mt-2 text-muted">
                Pick a coaching package and begin your assessment today.
              </p>
              <Link
                href="/packages"
                className="btn btn-accent mt-6 inline-block px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white"
              >
                View Packages
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
