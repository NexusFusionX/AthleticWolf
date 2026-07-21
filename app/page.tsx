import Image from "next/image";
import { Faq } from "./components/Faq";
import { Reveal } from "./components/Reveal";
import { Header } from "./components/Header";
import { WhoItIsFor } from "./components/WhoItIsFor";
import { DoesThisSoundLikeYou } from "./components/DoesThisSoundLikeYou";
import { HowCoachingWorks } from "./components/HowCoachingWorks";
import { ResultsCarousel } from "./components/ResultsCarousel";
import { CoachVideos } from "./components/CoachVideos";
import { Programs } from "./components/Programs";
import { HeroBadges } from "./components/HeroBadges";
import { SeoText } from "./components/SeoText";
import { packages } from "./data/packages";
import { Check } from "@phosphor-icons/react/dist/ssr";

const differentiators = [
  {
    title: "Personalized Programs",
    desc: "Every plan is tailored to your body, schedule, and goals. No cookie-cutter workouts.",
  },
  {
    title: "Performance Focused",
    desc: "Strength, speed, endurance, and mobility. We train the whole athlete, not just one muscle group.",
  },
  {
    title: "Real Accountability",
    desc: "Weekly check-ins, progress tracking, and direct access to your coach keep you on track.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-20 pt-14 text-white sm:px-8 sm:pb-28 sm:pt-20">
          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-accent">
                Online Coaching, Worldwide
              </span>

              <h1 className="font-display mt-5 text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
                UNLEASH THE
                <br />
                <span className="text-accent">INNER WOLF</span>
              </h1>

              <p className="mt-5 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                ISSA-certified coaching built around your life, not a template.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <a
                  href="#packages"
                  className="btn btn-accent px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white"
                >
                  View Packages
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none">
              <div className="shadow-premium relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src="/media/hero/coach-hero-portrait.jpg"
                  alt="Your coach at Athletic Wolf"
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 540px, (min-width: 640px) 450px, 100vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip with icons */}
        <HeroBadges />

        {/* Programs */}
        <Programs />

        {/* Who It Is For */}
        <WhoItIsFor />

        {/* Does This Sound Like You */}
        <DoesThisSoundLikeYou />

        {/* How Coaching Works */}
        <HowCoachingWorks />

        {/* Packages */}
        <section id="packages" className="wheel-section px-6 py-20 sm:px-8 sm:py-28">
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
                    className={`card-premium relative flex h-full flex-col rounded-2xl border p-8 transition-all ${
                      pkg.featured
                        ? "card-featured text-white lg:scale-[1.03]"
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
                          <Check
                            size={16}
                            weight="bold"
                            className="mt-0.5 shrink-0 text-accent"
                            aria-hidden
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={`/packages/${pkg.slug}`}
                      className={`btn mt-8 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white ${
                        pkg.featured ? "btn-accent" : "btn-dark"
                      }`}
                    >
                      View {pkg.name}
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Results Carousel */}
        <ResultsCarousel />

        {/* Coach Videos */}
        <CoachVideos />

        {/* About the Coach */}
        <section id="about" className="wheel-section px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <Reveal>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                  About Your Coach
                </p>
                <h2 className="font-display mt-3 text-4xl sm:text-5xl">
                  Built For People Who Refuse To Settle
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  Athletic Wolf is built on a simple belief: everyone has an
                  athlete inside them. As an ISSA-certified coach, every program
                  combines science-backed training, nutrition guidance, and real
                  accountability, delivered fully online to clients wherever
                  they are.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="shadow-premium relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line">
                  <Image
                    src="/media/about/coach-mountain.jpg"
                    alt="Athletic Wolf coach training outdoors"
                    fill
                    className="object-cover object-[center_20%]"
                    sizes="(min-width: 1024px) 40rem, 100vw"
                  />
                </div>
              </Reveal>
            </div>

            <div className="mt-14 border-t border-line">
              {differentiators.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.06}>
                  <div className="grid gap-2 border-b border-line py-6 sm:grid-cols-[220px_1fr] sm:gap-10">
                    <h3 className="font-display text-xl">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Text */}
        <SeoText />

        {/* FAQ */}
        <section id="faq" className="px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-xl">
              <h2 className="font-display text-4xl sm:text-5xl">
                Questions, Answered
              </h2>
              <p className="mt-4 text-muted">
                Have a specific question?{" "}
                <a href="/faq" className="font-semibold text-accent hover:underline">
                  Ask our AI assistant →
                </a>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Faq />
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
                ISSA-certified online personal training and nutrition coaching,
                built for clients worldwide. No gym required.
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
