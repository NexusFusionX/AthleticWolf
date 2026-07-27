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
import { HeroBanner } from "./components/HeroBanner";
import { SeoText } from "./components/SeoText";
import { PromoMarquee } from "./components/PromoMarquee";
import { BrandLogo } from "./components/BrandLogo";
import { AccentHeading } from "./components/AccentHeading";
import { PackageGrid } from "./components/PackageCard";

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
    <div className="flex min-h-full flex-col overflow-x-clip">
      <Header />

      <main>
        <HeroBanner />

        {/* Trust strip with icons */}
        <HeroBadges />

        {/* Programs */}
        <Programs />

        {/* How Coaching Works */}
        <HowCoachingWorks />

        {/* Who It Is For */}
        <WhoItIsFor />

        {/* Does This Sound Like You */}
        <DoesThisSoundLikeYou />

        {/* Packages */}
        <section id="packages" className="wheel-section px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                Membership
              </p>
              <AccentHeading
                accent="Choose"
                after="Your Package"
                className="font-display mt-3 text-4xl sm:text-5xl"
              />
              <p className="mt-4 text-muted">
                All plans are 6-month coaching packages designed to help you reach
                your fitness goals with expert guidance.
              </p>
            </Reveal>

            <PackageGrid className="mt-14" />
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
                <AccentHeading
                  before="Built For People Who Refuse To"
                  accent="Settle"
                  className="font-display mt-3 text-4xl sm:text-5xl"
                />
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

        <PromoMarquee />

        {/* FAQ */}
        <section id="faq" className="px-6 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Faq showIntro />
            </Reveal>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-ink px-6 pt-16 pb-8 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <BrandLogo height={80} />
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
                <li>
                  <a href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/refund" className="hover:text-white">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white">
                    Terms &amp; Conditions
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
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <a href="/privacy" className="hover:text-white/70">
                Privacy
              </a>
              <a href="/refund" className="hover:text-white/70">
                Refunds
              </a>
              <a href="/terms" className="hover:text-white/70">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
