import Link from "next/link";
import { EnvelopeSimple, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { BrandLogo } from "./BrandLogo";

const EXPLORE_LINKS = [
  { href: "/#programs", label: "Programs" },
  { href: "/#packages", label: "Packages" },
  { href: "/#results", label: "Results" },
  { href: "/#testimonials", label: "Reviews" },
  { href: "/#about", label: "About" },
] as const;

const SUPPORT_LINKS = [
  { href: "/#faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refund", label: "Refund Policy" },
  { href: "/terms", label: "Terms & Conditions" },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__accent-bar" aria-hidden />

      <div className="site-footer__cta mx-auto max-w-6xl px-6 pt-14 sm:px-8">
        <div className="site-footer__cta-inner rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-8 text-center sm:px-10 sm:py-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
            Ready to start?
          </p>
          <h2 className="font-display mt-3 text-2xl font-bold text-white sm:text-3xl">
            Your coach is one assessment away.
          </h2>
          <Link
            href="/auth/login?redirect=%2Fquiz%3Fstart%3D1"
            className="btn btn-accent mt-6 inline-flex px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-14 pb-8 sm:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <BrandLogo height={72} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              ISSA-certified online personal training and nutrition coaching for
              clients worldwide.
            </p>
            <p className="mt-3 inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
              ISSA Certified
            </p>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h5 className="site-footer__heading">Explore</h5>
            <ul className="site-footer__links">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h5 className="site-footer__heading">Support</h5>
            <ul className="site-footer__links">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h5 className="site-footer__heading">Contact</h5>
            <ul className="site-footer__links">
              <li>
                <a href="mailto:hello@athleticwolf.com">
                  <EnvelopeSimple size={16} weight="regular" aria-hidden />
                  hello@athleticwolf.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/athletic_wolf7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramLogo size={16} weight="regular" aria-hidden />
                  @athletic_wolf7
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Athletic Wolf. All rights reserved.</span>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy" className="hover:text-white/70">
              Privacy
            </Link>
            <Link href="/refund" className="hover:text-white/70">
              Refunds
            </Link>
            <Link href="/terms" className="hover:text-white/70">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
