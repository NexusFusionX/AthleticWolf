import Link from "next/link";
import { Header } from "@/app/components/Header";
import { AccentHeading } from "@/app/components/AccentHeading";
import { PackageGrid } from "@/app/components/PackageCard";

export const metadata = {
  title: "Our Coaching Packages | Athletic Wolf",
  description: "Choose the perfect coaching package for your fitness goals",
};

export default function PackagesPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-line bg-ink px-6 py-12 text-white sm:px-8">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/#packages"
              className="mb-6 inline-block text-sm font-semibold text-accent transition-colors hover:text-accent-bright"
            >
              ← Back to Home
            </Link>
            <AccentHeading
              as="h1"
              before="Our"
              accent="Coaching"
              after="Packages"
              className="font-display text-4xl sm:text-5xl"
            />
            <p className="mt-4 max-w-xl text-white/75">
              Choose the perfect package to match your fitness goals. All plans are
              6-month coaching packages designed to help you achieve real results.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <PackageGrid />
          </div>
        </section>
      </main>
    </div>
  );
}
