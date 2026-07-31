import Link from "next/link";
import { Header } from "@/app/components/Header";
import { TrustHighlightStrip } from "@/app/components/TrustHighlightStrip";
import type { TrustHighlightItem } from "@/app/lib/trust-highlights";

export function LegalPage({
  title,
  subtitle,
  trustHighlights,
  children,
}: {
  title: string;
  subtitle?: string;
  trustHighlights?: TrustHighlightItem[];
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-line bg-ink px-6 py-12 text-white sm:px-8">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/"
              className="mb-6 inline-block text-sm font-semibold text-accent transition-colors hover:text-accent-light"
            >
              ← Back to Home
            </Link>
            <h1 className="font-display text-4xl sm:text-5xl">{title}</h1>
            {subtitle ? (
              <p className="mt-4 max-w-2xl text-white/70">{subtitle}</p>
            ) : null}
          </div>
        </section>

        <section className="page-section px-6 sm:px-8">
          <div className="legal-prose mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-muted sm:text-base">
            {children}
          </div>
        </section>

        {trustHighlights ? (
          <TrustHighlightStrip
            items={trustHighlights}
            className="page-trust-strip"
          />
        ) : null}
      </main>
    </div>
  );
}
