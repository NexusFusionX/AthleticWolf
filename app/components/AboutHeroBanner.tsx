import Link from "next/link";
import Image from "next/image";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { getWhatsAppUrl } from "@/app/lib/site-contact";

const HERO_ALT = "Athletic Wolf coach in the gym";

const DESKTOP_HERO = {
  src: "/media/about/about-hero-desktop-21-9.jpg",
  width: 2352,
  height: 1008,
} as const;

const MOBILE_HERO = {
  src: "/media/about/about-hero-mobile-4-3.jpg",
  width: 1344,
  height: 1008,
} as const;

const HERO_BULLETS = [
  "ISSA-certified personal trainer",
  "10+ years coaching experience",
  "Online coaching worldwide",
] as const;

function AboutHeroCopyDesktop() {
  return (
    <div className="hero-banner__copy hero-banner__copy--desktop">
      <Link
        href="/"
        className="hero-banner__back-link hero-banner__reveal text-sm font-semibold text-accent transition-colors hover:text-accent-bright"
      >
        ← Back to Home
      </Link>

      <span className="hero-banner__badge hero-banner__reveal">
        About your coach
      </span>

      <h1 className="hero-banner__title hero-banner__reveal font-display font-bold uppercase leading-[0.92] tracking-[-0.02em] text-balance">
        Built For People Who Refuse To
        <br />
        <span className="text-accent">Settle</span>
      </h1>

      <p className="hero-banner__lead hero-banner__reveal mt-5 max-w-lg text-base leading-relaxed text-white/75 lg:text-lg">
        ISSA-certified online coaching with 10+ years of experience — custom
        training, nutrition, and real accountability for clients everywhere.
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
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-accent inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white"
        >
          Contact on WhatsApp
        </a>
        <Link
          href="/packages"
          className="btn btn-outline inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold"
        >
          View packages
        </Link>
      </div>

      <p className="hero-banner__trust hero-banner__reveal mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-white/50 lg:text-[0.8125rem]">
        ISSA Certified · 10+ Years · Weekly Check-ins
      </p>
    </div>
  );
}

function AboutHeroCopyMobile() {
  return (
    <div className="hero-banner__copy hero-banner__copy--mobile">
      <span className="hero-banner__badge">About your coach</span>

      <h1 className="hero-banner__title font-display font-bold uppercase tracking-[-0.02em]">
        Refuse To
        <br />
        <span className="text-accent">Settle</span>
      </h1>

      <p className="hero-banner__lead">
        ISSA-certified coach with 10+ years of experience — online training,
        nutrition, and accountability.
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
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-accent hero-banner__btn"
        >
          WhatsApp
        </a>
        <Link href="/packages" className="btn btn-outline hero-banner__btn">
          Packages
        </Link>
      </div>

      <p className="hero-banner__trust">
        ISSA Certified · 10+ Years · Weekly Check-ins
      </p>
    </div>
  );
}

export function AboutHeroBanner() {
  return (
    <section className="hero-banner relative w-full border-b border-line bg-black text-white">
      <div className="hero-banner__frame hero-banner__frame--mobile relative isolate md:hidden">
        <Image
          src={MOBILE_HERO.src}
          alt={HERO_ALT}
          width={MOBILE_HERO.width}
          height={MOBILE_HERO.height}
          priority
          className="hero-banner__media-img hero-banner__media-img--mobile about-hero__media-img--mobile block h-auto w-full"
          sizes="100vw"
        />
        <div className="hero-banner__inner hero-banner__inner--mobile">
          <AboutHeroCopyMobile />
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
          <AboutHeroCopyDesktop />
        </div>
      </div>
    </section>
  );
}
