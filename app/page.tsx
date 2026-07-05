import { Faq } from "./components/Faq";
import { ApplyForm } from "./components/ApplyForm";
import { Reveal } from "./components/Reveal";
import { HeroImage } from "./components/HeroImage";
import { BeforeAfterSlider } from "./components/BeforeAfterSlider";
import { packages } from "./data/packages";

const heroStats = [
  { label: "ISSA", caption: "Certified Trainer" },
  { label: "100%", caption: "Online Coaching" },
  { label: "Global", caption: "UK & USA Clients" },
];

const programs = [
  {
    icon: "🔥",
    title: "Fat Loss",
    desc: "Sustainable fat loss through structured training and nutrition — no crash diets.",
  },
  {
    icon: "💪",
    title: "Muscle Building",
    desc: "Progressive strength programming designed to build lean muscle at your pace.",
  },
  {
    icon: "⚖️",
    title: "Body Recomposition",
    desc: "Lose fat and build muscle at the same time with a plan tuned to your body.",
  },
  {
    icon: "💻",
    title: "Online Coaching",
    desc: "Full remote coaching with weekly check-ins, plan updates, and direct coach access.",
  },
  {
    icon: "🥗",
    title: "Nutrition Coaching",
    desc: "Custom nutrition plans built around your preferences, schedule, and goals.",
  },
];

const howItWorks = [
  {
    num: "01",
    title: "Assessment First",
    desc: "Every client starts with a full intake covering goals, training history, and lifestyle.",
  },
  {
    num: "02",
    title: "Custom Plan",
    desc: "You get a training and nutrition plan built specifically around your body and schedule.",
  },
  {
    num: "03",
    title: "Weekly Check-ins",
    desc: "Regular check-ins keep your plan accountable and updated as you progress.",
  },
  {
    num: "04",
    title: "Real Results",
    desc: "Sustainable progress — tracked, adjusted, and built to last.",
  },
];

const differentiators = [
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
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <a href="#" className="font-display text-xl text-white sm:text-2xl">
            Athletic<span className="text-accent">Wolf</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-white/75 lg:flex">
            <a href="#programs" className="transition-colors hover:text-white">
              Programs
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-white">
              How It Works
            </a>
            <a href="#packages" className="transition-colors hover:text-white">
              Packages
            </a>
            <a href="#results" className="transition-colors hover:text-white">
              Results
            </a>
            <a href="#about" className="transition-colors hover:text-white">
              About
            </a>
            <a href="#faq" className="transition-colors hover:text-white">
              FAQ
            </a>
          </nav>
          <a
            href="#apply"
            className="rounded-xl bg-accent px-4 py-2 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-dark sm:px-5 sm:py-2.5"
          >
            Get Started
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-ink px-6 pt-16 pb-0 text-white sm:px-8">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                Online Coaching, Worldwide
              </p>
              <h1 className="font-display mt-3 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
                UNLEASH YOUR <span className="text-accent">INNER WOLF</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
                ISSA-certified coaching for athletes and everyday people, wherever
                you are. Custom training and nutrition plans, built around your
                life — not a template.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#packages"
                  className="rounded-xl bg-accent px-8 py-3.5 text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-dark"
                >
                  View Packages
                </a>
                <a
                  href="#apply"
                  className="rounded-xl border border-white/25 px-8 py-3.5 text-base font-bold uppercase tracking-wide text-white transition-colors hover:border-white"
                >
                  Get Started
                </a>
              </div>

              <div className="mt-16 flex flex-wrap border-t border-white/10">
                {heroStats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`py-6 pr-8 ${i > 0 ? "border-l border-white/10 pl-8" : ""}`}
                  >
                    <p className="font-display text-3xl">{stat.label}</p>
                    <p className="mt-1 text-sm text-white/55">{stat.caption}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto w-full max-w-sm">
              <HeroImage />
            </div>
          </div>
        </section>

        {/* Programs */}
        <section id="programs" className="px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                What We Offer
              </p>
              <h2 className="font-display mt-3 text-4xl sm:text-5xl">
                Programs Built For Your Goal
              </h2>
              <p className="mt-4 text-muted">
                Every program starts with an onboarding assessment, so you never
                get a generic plan.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((program, i) => (
                <Reveal key={program.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-line bg-card p-7 transition-transform hover:-translate-y-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-2xl">
                      {program.icon}
                    </div>
                    <h3 className="font-display mt-5 text-2xl">{program.title}</h3>
                    <p className="mt-2 text-sm text-muted">{program.desc}</p>
                    <a
                      href="#apply"
                      className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
                    >
                      Get started →
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-ink px-6 py-20 text-white sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                The Process
              </p>
              <h2 className="font-display mt-3 text-4xl sm:text-5xl">
                How Coaching Works
              </h2>
            </Reveal>

            <div className="mt-14 grid divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
              {howItWorks.map((step, i) => (
                <Reveal key={step.num} delay={i * 0.08}>
                  <div className="h-full p-7">
                    <p className="font-display text-sm tracking-[0.15em] text-accent">
                      {step.num}
                    </p>
                    <h3 className="font-display mt-3 text-xl">{step.title}</h3>
                    <p className="mt-2 text-sm text-white/60">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                Membership
              </p>
              <h2 className="font-display mt-3 text-4xl sm:text-5xl">
                Choose Your Package
              </h2>
              <p className="mt-4 text-muted">
                All plans are 6-month coaching packages designed to help you reach
                your fitness goals with expert guidance.
              </p>
            </Reveal>

            <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
              {packages.map((pkg, i) => (
                <Reveal key={pkg.name} delay={i * 0.08} className="h-full">
                  <div
                    className={`relative flex h-full flex-col rounded-2xl border p-8 ${
                      pkg.featured
                        ? "border-ink bg-ink text-white lg:scale-[1.03]"
                        : "border-line bg-card"
                    }`}
                  >
                    {pkg.featured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
                        Most Popular
                      </span>
                    )}
                    <p className="font-display text-lg tracking-wide">{pkg.name}</p>
                    <p
                      className={`mt-1 text-sm ${pkg.featured ? "text-white/55" : "text-muted"}`}
                    >
                      6 Month Plan
                    </p>
                    <div className="mt-5 flex items-end gap-1">
                      <span className="font-display text-4xl">${pkg.price}</span>
                      <span
                        className={`mb-1 text-sm ${pkg.featured ? "text-white/55" : "text-muted"}`}
                      >
                        / month
                      </span>
                    </div>
                    <p className={`mt-1 text-sm ${pkg.featured ? "text-white/55" : "text-muted"}`}>
                      Value ${pkg.value}
                    </p>

                    <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                      {pkg.features.map((feature) => (
                        <li
                          key={feature}
                          className={`flex items-start gap-3 border-b border-dashed py-2 text-sm ${
                            pkg.featured ? "border-white/15" : "border-line"
                          }`}
                        >
                          <span className="mt-0.5 font-bold text-accent" aria-hidden>
                            ✓
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={`/checkout?package=${encodeURIComponent(pkg.name)}`}
                      className={`mt-8 inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${
                        pkg.featured
                          ? "bg-accent text-white hover:bg-accent-dark"
                          : "bg-ink text-white hover:bg-ink-soft"
                      }`}
                    >
                      Get Started
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        <section
          id="results"
          className="border-y border-line bg-white px-6 py-20 sm:px-8 sm:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                Member Results
              </p>
              <h2 className="font-display mt-3 text-4xl sm:text-5xl">
                Real Clients, Real Progress
              </h2>
              <p className="mt-4 text-muted">
                Drag the sliders to compare — real transformation photos go here
                once available.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {["Transformation 1", "Transformation 2", "Transformation 3"].map(
                (label, i) => (
                  <Reveal key={label} delay={i * 0.08}>
                    <BeforeAfterSlider beforeLabel="BEFORE" afterLabel="AFTER" />
                  </Reveal>
                )
              )}
            </div>
          </div>
        </section>

        {/* About the Coach */}
        <section id="about" className="px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                About Your Coach
              </p>
              <h2 className="font-display mt-3 text-4xl sm:text-5xl">
                Built For People Who Refuse To Settle
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Athletic Wolf is built on a simple belief: everyone has an athlete
                inside them. As an ISSA-certified coach, every program combines
                science-backed training, nutrition guidance, and real
                accountability — delivered fully online to clients wherever they
                are.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-3">
              {differentiators.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-line bg-card p-6">
                    <h3 className="font-display text-xl">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="px-6 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="flex flex-wrap items-center justify-between gap-8 rounded-3xl bg-accent px-8 py-12 text-white sm:px-14 sm:py-16">
                <div>
                  <h2 className="font-display text-3xl sm:text-4xl">
                    Ready To Transform?
                  </h2>
                  <p className="mt-3 max-w-md text-white/90">
                    Submit your application and we&apos;ll get back to you within
                    24-48 hours to get you started.
                  </p>
                </div>
                <a
                  href="#apply"
                  className="rounded-xl bg-ink px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-ink-soft"
                >
                  Apply Now →
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                FAQ
              </p>
              <h2 className="font-display mt-3 text-4xl sm:text-5xl">
                Questions, Answered
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Faq />
            </Reveal>
          </div>
        </section>

        {/* Apply */}
        <section id="apply" className="px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <Reveal className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                Get Started
              </p>
              <h2 className="font-display mt-3 text-4xl sm:text-5xl">
                Apply For Coaching
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-muted">
                Tell us about your goals and we&apos;ll get back to you within
                24-48 hours.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-12">
              <ApplyForm />
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-ink px-6 pt-16 pb-8 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-display text-xl">
                Athletic<span className="text-accent">Wolf</span>
              </p>
              <p className="mt-4 max-w-xs text-sm text-white/55">
                ISSA-certified online personal training and nutrition coaching —
                built for clients worldwide, no gym required.
              </p>
            </div>
            <div>
              <h5 className="text-sm font-bold uppercase tracking-[0.12em] text-white/90">
                Explore
              </h5>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/55">
                <li>
                  <a href="#programs" className="hover:text-white">
                    Programs
                  </a>
                </li>
                <li>
                  <a href="#packages" className="hover:text-white">
                    Packages
                  </a>
                </li>
                <li>
                  <a href="#results" className="hover:text-white">
                    Results
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white">
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-bold uppercase tracking-[0.12em] text-white/90">
                Support
              </h5>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/55">
                <li>
                  <a href="#faq" className="hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#apply" className="hover:text-white">
                    Apply for Coaching
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-bold uppercase tracking-[0.12em] text-white/90">
                Contact
              </h5>
              <p className="mt-4 text-sm text-white/55">hello@athleticwolf.com</p>
              <p className="mt-2 text-sm text-white/55">@athletic_wolf7</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 pt-6 text-xs text-white/40">
            <span>© {new Date().getFullYear()} Athletic Wolf. All rights reserved.</span>
            <span>Train smarter. Move stronger. Live bolder.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
