import Image from "next/image";
import { Check, Play } from "@phosphor-icons/react/dist/ssr";

const HERO_ALT =
  "Athletic Wolf ISSA-certified coach at an outdoor gym";

const DESKTOP_HERO = {
  src: "/media/hero/coach-hero-outdoor-21-9.png",
  width: 2352,
  height: 1008,
} as const;

const MOBILE_HERO = {
  src: "/media/hero/coach-hero-mobile-4-3.jpg",
  width: 1344,
  height: 1008,
} as const;

const HERO_BULLETS = [
  "ISSA-certified coach — plans built for you",
  "100% personalized training & nutrition",
  "Weekly check-ins & direct support",
] as const;

function HeroBannerCopyDesktop() {
  return (
    <div className="hero-banner__copy hero-banner__copy--desktop">
      <span className="hero-banner__badge hero-banner__reveal">
        Online Coaching · Worldwide
      </span>

      <h1 className="hero-banner__title hero-banner__reveal font-display font-bold uppercase leading-[0.92] tracking-[-0.02em] text-balance">
        Unleash The
        <br />
        <span className="text-accent">Inner Wolf</span>
      </h1>

      <p className="hero-banner__lead hero-banner__reveal mt-5 max-w-lg text-base leading-relaxed text-white/75 lg:text-lg">
        ISSA-certified coaching built around your life, schedule, and goals —
        not a template.
      </p>

      <ul className="hero-banner__bullets hero-banner__reveal mt-6 space-y-2.5">
        {HERO_BULLETS.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-sm text-white/82 lg:text-[0.9375rem]"
          >
            <Check
              size={18}
              weight="bold"
              className="mt-0.5 shrink-0 text-accent"
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="hero-banner__actions hero-banner__reveal mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          href="/#packages"
          className="btn btn-accent inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white"
        >
          View Coaching Packages
        </a>
        <a
          href="#coach-videos"
          className="btn btn-outline inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold"
        >
          <Play size={18} weight="fill" aria-hidden />
          Watch Coach Videos
        </a>
      </div>

      <p className="hero-banner__trust hero-banner__reveal mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-white/50 lg:text-[0.8125rem]">
        ISSA Certified · 100% Personalized · Weekly Check-ins
      </p>
    </div>
  );
}

function HeroBannerCopyMobile() {
  return (
    <div className="hero-banner__copy hero-banner__copy--mobile">
      <span className="hero-banner__badge">Online Coaching · Worldwide</span>

      <h1 className="hero-banner__title font-display font-bold uppercase tracking-[-0.02em]">
        Unleash The
        <br />
        <span className="text-accent">Inner Wolf</span>
      </h1>

      <p className="hero-banner__lead">
        ISSA-certified coaching built around your life, schedule, and goals —
        not a template.
      </p>

      <ul className="hero-banner__bullets">
        {HERO_BULLETS.map((item) => (
          <li key={item}>
            <Check size={12} weight="bold" className="shrink-0 text-accent" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="hero-banner__actions">
        <a href="/#packages" className="btn btn-accent hero-banner__btn">
          Packages
        </a>
        <a href="#coach-videos" className="btn btn-outline hero-banner__btn">
          <Play size={14} weight="fill" aria-hidden />
          Videos
        </a>
      </div>

      <p className="hero-banner__trust">
        ISSA Certified · 100% Personalized · Weekly Check-ins
      </p>
    </div>
  );
}

export function HeroBanner() {
  return (
    <section className="hero-banner relative w-full bg-black text-white">
      <div className="hero-banner__frame hero-banner__frame--mobile relative isolate md:hidden">
        <Image
          src={MOBILE_HERO.src}
          alt={HERO_ALT}
          width={MOBILE_HERO.width}
          height={MOBILE_HERO.height}
          priority
          className="hero-banner__media-img hero-banner__media-img--mobile block h-auto w-full"
          sizes="100vw"
        />
        <div className="hero-banner__inner hero-banner__inner--mobile">
          <HeroBannerCopyMobile />
        </div>
      </div>

      <div className="hero-banner__frame hero-banner__frame--desktop relative isolate hidden w-full md:block">
        <Image
          src={DESKTOP_HERO.src}
          alt={HERO_ALT}
          width={DESKTOP_HERO.width}
          height={DESKTOP_HERO.height}
          priority
          className="hero-banner__media-img hero-banner__media-img--desktop block h-auto w-full"
          sizes="100vw"
        />
        <div className="hero-banner__inner hero-banner__inner--desktop">
          <HeroBannerCopyDesktop />
        </div>
      </div>
    </section>
  );
}
