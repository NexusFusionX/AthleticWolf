import Link from "next/link";
import { Header } from "@/app/components/Header";
import { Faq } from "@/app/components/Faq";
import { AiFaqChat } from "@/app/components/AiFaqChat";

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
            <h1 className="font-display text-4xl sm:text-5xl">Questions, Answered</h1>
            <p className="mt-4 max-w-xl text-white/75">
              Ask our AI assistant anything about our coaching programs, or browse
              common questions below.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 sm:px-8 sm:py-20">
          <AiFaqChat />
        </section>

        <section className="px-6 pb-20 sm:px-8 sm:pb-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl">Common Questions</h2>
            <Faq />
          </div>
        </section>
      </main>
    </div>
  );
}
