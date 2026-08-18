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
          <div className="mx-auto max-w-7xl">
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
              prepaid 6-month coaching packages — pay once at checkout for the full term.
            </p>
          </div>
        </section>

        <section className="page-section px-4 sm:px-6 lg:px-7">
          <div className="mx-auto max-w-7xl">
            <PackageGrid />
          </div>
        </section>
      </main>
    </div>
  );
}
