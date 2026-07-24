import Link from "next/link";
import { Header } from "@/app/components/Header";

export function LegalPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
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

        <section className="px-6 py-14 sm:px-8 sm:py-20">
          <div className="legal-prose mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-muted sm:text-base">
            {children}
          </div>
        </section>
      </main>

      <footer className="border-t border-line px-6 py-8 text-center text-xs text-muted sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link href="/privacy" className="hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="/refund" className="hover:text-foreground">
            Refund Policy
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            Terms &amp; Conditions
          </Link>
        </div>
        <p className="mt-4">
          © {new Date().getFullYear()} Athletic Wolf. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
