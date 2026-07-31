import Link from "next/link";
import type { ComponentType } from "react";
import type { IconProps } from "@phosphor-icons/react";
import {
  Barbell,
  ChartLineUp,
  EnvelopeSimple,
  FileText,
  InstagramLogo,
  Package,
  Path,
  Question,
  Receipt,
  ShieldCheck,
  SignIn,
  SquaresFour,
  Star,
  User,
  UserPlus,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { BrandLogo } from "./BrandLogo";
import { SiteFooterCTA } from "./SiteFooterCTA";
import { SiteFooterTrust } from "./SiteFooterTrust";
import { getWhatsAppUrl, SITE_CONTACT } from "@/app/lib/site-contact";

type FooterNavLink = {
  href: string;
  label: string;
  description: string;
  icon: ComponentType<IconProps>;
  external?: boolean;
};

const EXPLORE_LINKS: FooterNavLink[] = [
  {
    href: "/#programs",
    label: "Programs",
    description: "Fat loss, muscle, and more.",
    icon: Barbell,
  },
  {
    href: "/packages",
    label: "Packages",
    description: "Silver, Platinum, and Diamond.",
    icon: Package,
  },
  {
    href: "/how-it-works",
    label: "How It Works",
    description: "From signup to your first workout.",
    icon: Path,
  },
  {
    href: "/#results",
    label: "Results",
    description: "Real client transformations.",
    icon: ChartLineUp,
  },
  {
    href: "/#testimonials",
    label: "Reviews",
    description: "What clients say about coaching.",
    icon: Star,
  },
  {
    href: "/about",
    label: "About",
    description: "Meet your ISSA-certified coach.",
    icon: User,
  },
];

const SUPPORT_LINKS: FooterNavLink[] = [
  {
    href: "/faq",
    label: "FAQ & Help",
    description: "Common questions answered fast.",
    icon: Question,
  },
  {
    href: "/privacy",
    label: "Privacy Policy",
    description: "How we protect your information.",
    icon: ShieldCheck,
  },
  {
    href: "/refund",
    label: "Refund Policy",
    description: "Clear terms before you commit.",
    icon: Receipt,
  },
  {
    href: "/terms",
    label: "Terms & Conditions",
    description: "Coaching and billing policies.",
    icon: FileText,
  },
];

const ACCOUNT_LINKS: FooterNavLink[] = [
  {
    href: "/auth/login",
    label: "Client login",
    description: "Access your coaching dashboard.",
    icon: SignIn,
  },
  {
    href: "/auth/signup",
    label: "Create account",
    description: "Start checkout in minutes.",
    icon: UserPlus,
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    description: "Workouts, nutrition, and check-ins.",
    icon: SquaresFour,
  },
];

const CONTACT_LINKS: FooterNavLink[] = [
  {
    href: `mailto:${SITE_CONTACT.email}`,
    label: "Email",
    description: SITE_CONTACT.email,
    icon: EnvelopeSimple,
  },
  {
    href: getWhatsAppUrl(),
    label: "WhatsApp",
    description: SITE_CONTACT.whatsappDisplay,
    icon: WhatsappLogo,
    external: true,
  },
  {
    href: SITE_CONTACT.instagramUrl,
    label: "Instagram",
    description: SITE_CONTACT.instagramHandle,
    icon: InstagramLogo,
    external: true,
  },
];

function FooterNavCard({ link }: { link: FooterNavLink }) {
  const Icon = link.icon;

  const content = (
    <>
      <span className="trust-highlight-strip__icon" aria-hidden>
        <Icon size={20} weight="duotone" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="site-footer__nav-card-title block text-sm font-bold text-white">
          {link.label}
        </span>
        <span className="mt-0.5 block text-xs leading-relaxed text-white/55">
          {link.description}
        </span>
      </span>
    </>
  );

  const className =
    "site-footer__nav-card trust-highlight-strip__card trust-highlight-strip__card--link";

  if (link.external) {
    return (
      <li>
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {content}
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link href={link.href} className={className}>
        {content}
      </Link>
    </li>
  );
}

function FooterNavSection({
  title,
  links,
}: {
  title: string;
  links: FooterNavLink[];
}) {
  return (
    <section className="site-footer__nav-section">
      <h5 className="text-xs font-bold uppercase tracking-[0.12em] text-white/90">
        {title}
      </h5>
      <ul className="site-footer__nav-list">
        {links.map((link) => (
          <FooterNavCard key={`${title}-${link.href}`} link={link} />
        ))}
      </ul>
    </section>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer mt-auto w-full shrink-0 bg-black text-white">
      <div
        className="h-[3px] w-full bg-gradient-to-r from-transparent via-accent to-transparent"
        aria-hidden
      />

      <div className="mx-auto w-full max-w-6xl px-6 pt-14 sm:px-8">
        <SiteFooterCTA />
      </div>

      <SiteFooterTrust />

      <div className="mx-auto w-full max-w-6xl px-6 pb-8 pt-14 sm:px-8">
        <div className="site-footer__main border-b border-white/10 pb-12">
          <div className="site-footer__brand">
            <BrandLogo height={88} />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
              ISSA-certified online personal training and nutrition coaching for
              clients worldwide.
            </p>
            <p className="mt-3 inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
              ISSA Certified
            </p>
          </div>

          <div className="site-footer__nav-columns">
            <FooterNavSection title="Explore" links={EXPLORE_LINKS} />
            <FooterNavSection title="Support" links={SUPPORT_LINKS} />
            <FooterNavSection title="Account" links={ACCOUNT_LINKS} />
            <FooterNavSection title="Contact" links={CONTACT_LINKS} />
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Athletic Wolf. All rights reserved.</span>
          <span className="text-white/30">
            Online coaching worldwide · Custom training &amp; nutrition plans
          </span>
        </div>
      </div>
    </footer>
  );
}
