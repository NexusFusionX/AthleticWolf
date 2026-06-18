export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
          <span className="text-lg font-bold tracking-tight sm:text-xl">
            Athletic Wolf
          </span>
          <a
            href="#contact"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent sm:px-5 sm:py-2.5"
          >
            Contact
          </a>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="relative flex flex-1 items-center overflow-hidden px-6 py-16 sm:px-8 sm:py-24">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_55%)]"
            aria-hidden
          />
          <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Personal Fitness Coaching
              </p>
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Athletic Wolf
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                Build strength, improve endurance, and reach your goals with
                coaching tailored to your body, schedule, and lifestyle.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  id="contact"
                  href="mailto:hello@athleticwolf.com"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Contact
                </a>
                <p className="text-sm text-muted">
                  Free intro call · Online & in-person sessions
                </p>
              </div>
            </div>

            <div className="grid w-full max-w-md grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-lg">
              {[
                { label: "Custom training plans", value: "Built around you" },
                { label: "Weekly check-ins", value: "Stay accountable" },
                { label: "Nutrition guidance", value: "Fuel your progress" },
                { label: "Real results", value: "Strength you can feel" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-surface p-5"
                >
                  <p className="text-sm font-medium text-accent">{item.label}</p>
                  <p className="mt-1 text-base font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-6 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Athletic Wolf. All rights reserved.</p>
          <p>Train smarter. Move stronger.</p>
        </div>
      </footer>
    </div>
  );
}
