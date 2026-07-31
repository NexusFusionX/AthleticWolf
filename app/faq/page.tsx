import Link from "next/link";
import { Header } from "@/app/components/Header";
import { Faq } from "@/app/components/Faq";
import { AiFaqChat } from "@/app/components/AiFaqChat";
import { AccentHeading } from "@/app/components/AccentHeading";
import { TrustHighlightStrip } from "@/app/components/TrustHighlightStrip";
import { FAQ_TRUST_HIGHLIGHTS } from "@/app/lib/trust-highlights";

export const metadata = {
  title: "FAQ & AI Assistant | Athletic Wolf",
  description: "Ask our AI assistant anything about Athletic Wolf's coaching packages and process, or browse common questions.",
};

export default function FaqPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-line bg-ink px-6 py-12 text-white sm:px-8">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/#faq"
              className="inline-block text-sm font-semibold text-accent hover:text-accent-bright transition-colors mb-6"
            >
              ← Back to Home
            </Link>
            <AccentHeading
              as="h1"
              before="Questions,"
              accent="Answered"
              className="font-display text-4xl sm:text-5xl"
            />
            <p className="mt-4 max-w-xl text-white/75">
              Ask our AI assistant anything about our coaching programs, or browse
              common questions below.
            </p>
          </div>
        </section>

        <section className="page-section px-6 sm:px-8">
          <AiFaqChat />
        </section>

        <section className="px-6 pb-20 sm:px-8 sm:pb-28">
          <div className="mx-auto max-w-3xl">
            <AccentHeading
              before="Common"
              accent="Questions"
              className="font-display mb-8 text-2xl"
            />
            <Faq />
          </div>
        </section>

        <TrustHighlightStrip
          items={FAQ_TRUST_HIGHLIGHTS}
          className="page-trust-strip"
        />
      </main>
    </div>
  );
}
