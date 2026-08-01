import Link from "next/link";
import { Header } from "@/app/components/Header";
import { AccentHeading } from "@/app/components/AccentHeading";
import { HowItWorksGuide } from "@/app/components/HowItWorksGuide";

export const metadata = {
  title: "How Coaching Works | Athletic Wolf",
  description:
    "A visual step-by-step walkthrough of Athletic Wolf online coaching — from sign-up and checkout to your custom plan and dashboard.",
};

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-line bg-black px-6 py-12 text-white sm:px-8">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/"
              className="mb-6 inline-block text-sm font-semibold text-accent transition-colors hover:text-accent-bright"
            >
              ← Back to Home
            </Link>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
              Step-by-step
            </p>
            <AccentHeading
              as="h1"
              before="How"
              accent="Coaching"
              after="Works"
              className="font-display mt-3 text-4xl sm:text-5xl"
            />
            <p className="mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
              See exactly what happens from creating your account to training
              with your custom plan — with live previews of each screen.
            </p>
          </div>
        </section>

        <section className="page-section px-6 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <HowItWorksGuide />
          </div>
        </section>
      </main>
    </div>
  );
}
