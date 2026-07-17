import Link from "next/link";
import { Header } from "@/app/components/Header";
import { packages } from "@/app/data/packages";
import { Check } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Our Coaching Packages | Athletic Wolf",
  description: "Choose the perfect coaching package for your fitness goals",
};

export default function PackagesPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-line bg-ink px-6 py-12 text-white sm:px-8">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/#packages"
              className="inline-block text-sm font-semibold text-accent hover:text-accent-bright transition-colors mb-6"
            >
              ← Back to Home
            </Link>
            <h1 className="font-display text-4xl sm:text-5xl">Our Coaching Packages</h1>
            <p className="mt-4 max-w-xl text-white/75">
              Choose the perfect package to match your fitness goals. All plans are 6-month coaching packages designed to help you achieve real results.
            </p>
          </div>
        </section>

        {/* Packages */}
        <section className="px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`card-premium relative flex flex-col rounded-2xl border p-8 transition-all ${
                    pkg.featured
                      ? "border-ink bg-ink text-white lg:scale-[1.03] lg:-translate-y-4"
                      : "border-line bg-card"
                  }`}
                >
                  {pkg.featured && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
                      Most Popular
                    </span>
                  )}

                  <div>
                    <p className="font-display text-2xl">{pkg.name}</p>
                    <p
                      className={`mt-2 text-sm ${
                        pkg.featured ? "text-white/55" : "text-muted"
                      }`}
                    >
                      6 Month Coaching Package
                    </p>

                    <div className="mt-6 flex items-end gap-2">
                      <span className="font-display text-5xl">${pkg.price}</span>
                      <span
                        className={`mb-2 ${
                          pkg.featured ? "text-white/55" : "text-muted"
                        }`}
                      >
                        / month
                      </span>
                    </div>
                    <p
                      className={`mt-1 text-sm ${
                        pkg.featured ? "text-white/55" : "text-muted"
                      }`}
                    >
                      Total value ${pkg.value}
                    </p>

                    <p
                      className={`mt-6 text-sm leading-relaxed ${
                        pkg.featured ? "text-white/75" : "text-muted"
                      }`}
                    >
                      Get personalized coaching, custom meal plans, workout programs, and
                      weekly accountability check-ins tailored to your goals.
                    </p>
                  </div>

                  <ul className="mt-8 flex flex-1 flex-col gap-3 border-t border-dashed py-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check
                          size={20}
                          weight="bold"
                          className="mt-0.5 shrink-0 text-accent"
                          aria-hidden
                        />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/packages/${pkg.slug}`}
                    className={`btn w-full px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition-all ${
                      pkg.featured ? "btn-accent" : "btn-dark"
                    }`}
                  >
                    View {pkg.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
