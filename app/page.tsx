export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <a href="#" className="text-lg font-bold tracking-tight sm:text-xl">
            Athletic Wolf
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted sm:flex">
            <a href="#about" className="transition-colors hover:text-foreground">
              About
            </a>
            <a href="#contact" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </nav>
          <a
            href="#contact"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover sm:px-5 sm:py-2.5"
          >
            Get Started
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 py-20 sm:px-8 sm:py-28 lg:py-36">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.2),transparent_50%)]"
            aria-hidden
          />
          <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Fitness & Athletic Performance
              </p>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                Unleash your inner{" "}
                <span className="text-accent">Athletic Wolf</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                Elite coaching for athletes and everyday warriors. Train smarter,
                recover faster, and dominate your goals.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Start Your Journey
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-base font-semibold transition-colors hover:border-accent hover:text-accent"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="grid w-full max-w-md grid-cols-2 gap-4 lg:max-w-lg">
              {[
                { stat: "1000+", label: "Clients trained" },
                { stat: "10+", label: "Years experience" },
                { stat: "98%", label: "Goal completion" },
                { stat: "24/7", label: "Support access" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-surface p-5 text-center"
                >
                  <p className="text-2xl font-bold text-accent sm:text-3xl">
                    {item.stat}
                  </p>
                  <p className="mt-1 text-sm text-muted">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-t border-white/10 px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                About Us
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Built for people who refuse to settle
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Athletic Wolf was founded on a simple belief: everyone has an
                athlete inside them. We combine science-backed training, nutrition
                guidance, and relentless accountability to help you break through
                plateaus and perform at your peak.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-3">
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
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-surface p-6"
                >
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="border-t border-white/10 px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface px-8 py-14 text-center sm:px-16 sm:py-20">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.12),transparent_70%)]"
                aria-hidden
              />
              <div className="relative">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready to transform?
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-lg text-muted">
                  Book a free intro call and discover how Athletic Wolf can help
                  you reach the next level.
                </p>
                <a
                  href="mailto:hello@athleticwolf.com"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-10 py-4 text-base font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Contact Us Today
                </a>
                <p className="mt-4 text-sm text-muted">
                  hello@athleticwolf.com · Free consultation · No commitment
                </p>
              </div>
            </div>
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
