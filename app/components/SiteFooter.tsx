import Link from "next/link";
import {
  EnvelopeSimple,
  Headset,
  InstagramLogo,
  ShieldCheck,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { BrandLogo } from "./BrandLogo";
import { SiteFooterCTA } from "./SiteFooterCTA";
import { getWhatsAppUrl, SITE_CONTACT } from "@/app/lib/site-contact";

const EXPLORE_LINKS = [
  { href: "/#programs", label: "Programs" },
  { href: "/packages", label: "Packages" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/#results", label: "Results" },
  { href: "/#testimonials", label: "Reviews" },
  { href: "/about", label: "About" },
] as const;

const SUPPORT_LINKS = [
  { href: "/faq", label: "FAQ & Help" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refund", label: "Refund Policy" },
  { href: "/terms", label: "Terms & Conditions" },
] as const;

const ACCOUNT_LINKS = [
  { href: "/auth/login", label: "Client login" },
  { href: "/auth/signup", label: "Create account" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <div>
      <h5 className="text-xs font-bold uppercase tracking-[0.12em] text-white/90">
        {title}
      </h5>
      <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/55">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
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

      <div className="mx-auto mt-10 grid w-full max-w-6xl gap-4 px-6 sm:grid-cols-3 sm:px-8">
        <Link
          href="/refund"
          className="flex items-start gap-3 rounded-xl border border-white/10 p-4 transition-colors hover:border-accent/40"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
            <ShieldCheck size={20} weight="duotone" aria-hidden />
          </span>
          <span>
            <span className="block text-sm font-bold text-white">Refund policy</span>
            <span className="mt-0.5 block text-xs leading-relaxed text-white/55">
              Clear terms before you commit.
            </span>
          </span>
        </Link>

        <div className="flex items-start gap-3 rounded-xl border border-white/10 p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Headset size={20} weight="duotone" aria-hidden />
          </span>
          <span>
            <span className="block text-sm font-bold text-white">Coach follow-up</span>
            <span className="mt-0.5 block text-xs leading-relaxed text-white/55">
              We reach out within 24 hours after checkout.
            </span>
          </span>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-white/10 p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
            <ShieldCheck size={20} weight="duotone" aria-hidden />
          </span>
          <span>
            <span className="block text-sm font-bold text-white">Secure checkout</span>
            <span className="mt-0.5 block text-xs leading-relaxed text-white/55">
              Payments encrypted and processed by Stripe.
            </span>
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-8 pt-14 sm:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <BrandLogo height={88} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              ISSA-certified online personal training and nutrition coaching for
              clients worldwide.
            </p>
            <p className="mt-3 inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
              ISSA Certified
            </p>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <FooterLinkColumn title="Explore" links={EXPLORE_LINKS} />
          </div>

          <div className="lg:col-span-2">
            <FooterLinkColumn title="Support" links={SUPPORT_LINKS} />
          </div>

          <div className="lg:col-span-2">
            <FooterLinkColumn title="Account" links={ACCOUNT_LINKS} />
          </div>

          <div className="lg:col-span-2">
            <h5 className="text-xs font-bold uppercase tracking-[0.12em] text-white/90">
              Contact
            </h5>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/55">
              <li>
                <a
                  href={`mailto:${SITE_CONTACT.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <EnvelopeSimple size={16} weight="regular" aria-hidden />
                  {SITE_CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <WhatsappLogo size={16} weight="regular" aria-hidden />
                  {SITE_CONTACT.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <InstagramLogo size={16} weight="regular" aria-hidden />
                  {SITE_CONTACT.instagramHandle}
                </a>
              </li>
            </ul>
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
