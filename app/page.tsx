import Image from "next/image";
import { MediaPlaceholder } from "./components/MediaPlaceholder";
import { Faq } from "./components/Faq";
import { ApplyForm } from "./components/ApplyForm";
import { Reveal, RevealGroup, RevealItem } from "./components/Reveal";
import { AnimatedHeroHeading, AnimatedFadeIn } from "./components/AnimatedHero";

const trustBadges = [
  "ISSA Certified Trainer",
  "100% Online Coaching",
  "Coaching UK & USA Clients Worldwide",
];

const howItWorks = [
  {
    step: "01",
    title: "Apply",
    desc: "Tell us about your goals, training experience, and lifestyle through a short application.",
  },
  {
    step: "02",
    title: "Get Your Custom Plan",
    desc: "Receive a workout and nutrition plan built specifically around your body, schedule, and preferences.",
  },
  {
    step: "03",
    title: "Train With Support",
    desc: "Weekly check-ins and direct coach access keep you accountable and moving forward.",
  },
  {
    step: "04",
    title: "Adjust & Progress",
    desc: "Your plan evolves as you do — updated regularly based on real results, not guesswork.",
  },
];

const packages = [
  {
    name: "Silver",
    price: 70,
    value: 140,
    featured: false,
    features: [
      "1:1 Coaching",
      "Customized Diet Plan",
      "Customized Workout Plan",
      "Supplement Guide",
      "Weekly Calls and Check-ins",
    ],
  },
  {
    name: "Platinum",
    price: 130,
    value: 260,
    featured: true,
    features: [
      "Everything in Silver",
      "24/7 Assistant",
      "WhatsApp Access",
      "Body Condition Check-ups",
      "Accountability",
    ],
  },
  {
    name: "Diamond",
    price: 170,
    value: 340,
    featured: false,
    features: [
      "Everything in Platinum",
      "Medical Condition Check-ups",
      "Meal Recipes Guide",
      "Muscular Condition Check-ups",
      "Various Workout Plans",
    ],
  },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <a
            href="#"
            className="font-display text-xl tracking-wide sm:text-2xl"
          >
            ATHLETIC WOLF
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted sm:flex">
            <a href="#about" className="transition-colors hover:text-foreground">
              About
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-foreground">
              How It Works
            </a>
            <a href="#packages" className="transition-colors hover:text-foreground">
              Packages
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              FAQ
            </a>
          </nav>
          <a
            href="#apply"
            className="rounded-full bg-flame px-4 py-2 text-sm font-semibold text-white transition-all hover:brightness-110 sm:px-5 sm:py-2.5"
          >
            Get Started
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 py-20 sm:px-8 sm:py-28 lg:py-36">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,90,31,0.2),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(79,179,255,0.14),transparent_50%)]"
            aria-hidden
          />
          <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <AnimatedFadeIn>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                  Online Personal Training
                </p>
              </AnimatedFadeIn>
              <AnimatedHeroHeading
                lines={[
                  [{ text: "UNLEASH" }, { text: "YOUR" }],
                  [{ text: "INNER" }, { text: "WOLF", accent: true }],
                ]}
              />
              <AnimatedFadeIn delay={0.5}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                  ISSA-certified coaching for athletes and everyday people, wherever
                  you are. Custom training and nutrition plans, built around your
                  life — not a template.
                </p>
              </AnimatedFadeIn>
              <AnimatedFadeIn delay={0.65}>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#apply"
                    className="inline-flex items-center justify-center rounded-full bg-flame px-8 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(255,140,20,0.4)]"
                  >
                    Start Your Journey
                  </a>
                  <a
                    href="#about"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-base font-semibold transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  >
                    Learn More
                  </a>
                </div>
              </AnimatedFadeIn>
            </div>

            <AnimatedFadeIn
              delay={0.4}
              className="w-full max-w-md lg:max-w-lg"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-surface-2">
                <Image
                  src="/media/hero/coach-hero.jpg"
                  alt="Athletic Wolf coach"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 32rem, (min-width: 640px) 28rem, 100vw"
                />
              </div>
            </AnimatedFadeIn>
          </div>
        </section>

        {/* Trust bar */}
        <section className="border-t border-white/10 px-6 py-8 sm:px-8">
          <RevealGroup className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-4 sm:justify-between">
            {trustBadges.map((badge, i) => (
              <RevealItem key={badge}>
                <span className="flex items-center gap-2 rounded-full border border-white/10 bg-surface px-5 py-2 text-sm font-medium text-muted">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: i % 2 === 0 ? "var(--accent)" : "var(--accent-2)",
                    }}
                    aria-hidden
                  />
                  {badge}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* About */}
        <section id="about" className="border-t border-white/10 px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                About Your Coach
              </p>
              <h2 className="mt-4 font-display text-4xl tracking-wide sm:text-5xl">
                BUILT FOR PEOPLE WHO REFUSE TO SETTLE
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Athletic Wolf is built on a simple belief: everyone has an
                athlete inside them. As an ISSA-certified coach, every program
                combines science-backed training, nutrition guidance, and
                real accountability — delivered fully online to clients
                wherever they are.
              </p>
            </Reveal>

            <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-3">
              {[
                {
                  title: "Personalized Programs",
                  desc: "Every plan is tailored to your body, schedule, and goals — no cookie-cutter workouts.",
                },
                {
                  title: "Performance Focused",
                  desc: "Strength, speed, endurance, and mobility — we train the whole athlete, not just one muscle group.",
                },
                {
                  title: "Real Accountability",
                  desc: "Weekly check-ins, progress tracking, and direct access to your coach keep you on track.",
                },
              ].map((item) => (
                <RevealItem key={item.title}>
                  <div className="h-full rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-accent/40">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {item.desc}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="border-t border-white/10 px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                How Coaching Works
              </p>
              <h2 className="mt-4 font-display text-4xl tracking-wide sm:text-5xl">
                FROM APPLICATION TO RESULTS
              </h2>
            </Reveal>

            <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((item, i) => (
                <RevealItem key={item.step}>
                  <div className="h-full rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-accent/40">
                    <p
                      className="font-display text-3xl"
                      style={{ color: i % 2 === 0 ? "var(--accent)" : "var(--accent-2)" }}
                    >
                      {item.step}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {item.desc}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="border-t border-white/10 px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Packages
              </p>
              <h2 className="mt-4 font-display text-4xl tracking-wide sm:text-5xl">
                CHOOSE YOUR PACKAGE
              </h2>
              <p className="mt-4 text-lg text-muted">
                All plans are 6-month coaching packages designed to help you reach
                your fitness goals with expert guidance.
              </p>
            </Reveal>

            <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-3">
              {packages.map((pkg) => (
                <RevealItem key={pkg.name} className="h-full">
                  <div
                    className={`relative flex h-full flex-col rounded-2xl border p-8 transition-transform duration-300 hover:-translate-y-2 ${
                      pkg.featured
                        ? "border-accent bg-surface shadow-[0_0_40px_rgba(255,90,31,0.15)]"
                        : "border-white/10 bg-surface"
                    }`}
                  >
                    {pkg.featured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-flame px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                        Most Popular
                      </span>
                    )}
                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">
                      {pkg.name}
                    </p>
                    <p className="mt-1 text-sm text-muted">6 Month Plan</p>
                    <div className="mt-6 flex items-end gap-1">
                      <span className="text-4xl font-bold">${pkg.price}</span>
                      <span className="mb-1 text-sm text-muted">/ per month</span>
                    </div>
                    <p className="mt-2 text-sm text-muted">Value ${pkg.value}</p>

                    <ul className="mt-8 flex flex-1 flex-col gap-3">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <span className="mt-0.5 text-accent" aria-hidden>
                            ✓
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#apply"
                      className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                        pkg.featured
                          ? "bg-flame text-white hover:brightness-110"
                          : "border border-white/20 hover:border-accent hover:text-accent"
                      }`}
                    >
                      Get Started
                    </a>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Proof / transformations */}
        <section id="results" className="border-t border-white/10 px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Results
              </p>
              <h2 className="mt-4 font-display text-4xl tracking-wide sm:text-5xl">
                REAL CLIENTS, REAL PROGRESS
              </h2>
              <p className="mt-4 text-lg text-muted">
                Transformation photos and client stories go here once
                available.
              </p>
            </Reveal>

            <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {["Client 1", "Client 2", "Client 3", "Client 4"].map((label) => (
                <RevealItem key={label}>
                  <MediaPlaceholder label={`${label} before/after`} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-white/10 px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                FAQ
              </p>
              <h2 className="mt-4 font-display text-4xl tracking-wide sm:text-5xl">
                QUESTIONS, ANSWERED
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <Faq />
            </Reveal>
          </div>
        </section>

        {/* Apply */}
        <section id="apply" className="border-t border-white/10 px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <Reveal className="text-center">
              <h2 className="font-display text-4xl tracking-wide sm:text-5xl">
                READY TO TRANSFORM?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-lg text-muted">
                Submit your application and we&apos;ll get back to you within
                24-48 hours to get you started.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-12">
              <ApplyForm />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Athletic Wolf. All rights reserved.</p>
          <p>Train smarter. Move stronger. Live bolder.</p>
        </div>
      </footer>
    </div>
  );
}
