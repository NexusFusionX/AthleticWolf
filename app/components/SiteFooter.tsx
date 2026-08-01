import Link from "next/link";
import type { ComponentType } from "react";
import type { IconProps } from "@phosphor-icons/react";
import {
  EnvelopeSimple,
  FacebookLogo,
  FileText,
  InstagramLogo,
  Question,
  ShieldCheck,
  SignIn,
  SnapchatLogo,
  SquaresFour,
  TiktokLogo,
  UserPlus,
  WhatsappLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import { BrandLogo } from "./BrandLogo";
import { SiteFooterCTA } from "./SiteFooterCTA";
import { TrustHighlightStrip } from "./TrustHighlightStrip";
import {
  getFooterContactIcons,
  type FooterContactIconId,
} from "@/app/lib/site-contact";

type FooterNavLink = {
  href: string;
  label: string;
  description: string;
  icon: ComponentType<IconProps>;
  external?: boolean;
};

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

const CONTACT_ICONS: Record<FooterContactIconId, ComponentType<IconProps>> = {
  email: EnvelopeSimple,
  whatsapp: WhatsappLogo,
  youtube: YoutubeLogo,
  instagram: InstagramLogo,
  tiktok: TiktokLogo,
  snapchat: SnapchatLogo,
  facebook: FacebookLogo,
};

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

function FooterContactIcons() {
  const contactIcons = getFooterContactIcons();

  return (
    <div className="site-footer__contact-icons">
      <ul className="site-footer__contact-icons-row" aria-label="Contact">
        {contactIcons.map((contact) => {
          const Icon = CONTACT_ICONS[contact.id];

          return (
            <li key={contact.id}>
              <a
                href={contact.href}
                {...(contact.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="site-footer__contact-icon-btn"
                aria-label={contact.label}
              >
                <Icon size={22} weight="fill" aria-hidden />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
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
            <TrustHighlightStrip embedded className="site-footer__trust" />
          </div>

          <div className="site-footer__nav-area">
            <div className="site-footer__nav-columns">
              <FooterNavSection title="Support" links={SUPPORT_LINKS} />
              <FooterNavSection title="Account" links={ACCOUNT_LINKS} />
            </div>
          </div>
          <FooterContactIcons />
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
