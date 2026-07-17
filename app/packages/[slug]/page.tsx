import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/app/components/Header";
import { packages } from "@/app/data/packages";
import { Check } from "@phosphor-icons/react/dist/ssr";

export function generateStaticParams() {
  return packages.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = packages.find((p) => p.slug === slug);
  if (!pkg) return {};
  return {
    title: `${pkg.name} Coaching Package | Athletic Wolf`,
    description: pkg.tagline,
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = packages.find((p) => p.slug === slug);
  if (!pkg) notFound();

  const otherPackages = packages.filter((p) => p.slug !== slug);

  return (
    <div className="flex min-h-full flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-line bg-ink px-6 py-12 text-white sm:px-8">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/packages"
              className="inline-block text-sm font-semibold text-accent hover:text-accent-bright transition-colors mb-6"
            >
              ← All Packages
            </Link>
            {pkg.featured && (
              <span className="mb-4 inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                Most Popular
              </span>
            )}
            <h1 className="font-display text-4xl sm:text-5xl">{pkg.name} Plan</h1>
            <p className="mt-4 max-w-xl text-white/75">{pkg.tagline}</p>
          </div>
        </section>

        <section className="px-6 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <h2 className="font-display text-2xl">What&apos;s Included</h2>
              <ul className="mt-6 flex flex-col gap-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 border-b border-dashed border-line pb-3">
                    <Check size={20} weight="bold" className="mt-0.5 shrink-0 text-accent" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <h2 className="font-display text-2xl">How It Works</h2>
                <p className="mt-3 text-muted leading-relaxed">
                  Sign in, complete a short assessment about your goals and lifestyle,
                  then check out to lock in your {pkg.name} plan. Your coach reviews your
                  assessment and prepares a fully personalized program within 24-48 hours.
                </p>
              </div>
            </div>

            <div className="h-fit rounded-2xl border border-line bg-card p-6 shadow-premium">
              <p className="text-sm text-muted">6 Month Coaching Package</p>
              <div className="mt-2 flex items-end gap-1">
                <span className="font-display text-4xl">${pkg.price}</span>
                <span className="mb-1 text-sm text-muted">/ month</span>
              </div>
              <p className="mt-1 text-sm text-muted">Total value ${pkg.value}</p>

              <Link
                href={`/quiz?package=${encodeURIComponent(pkg.name)}`}
                className={`btn mt-6 w-full px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white ${
                  pkg.featured ? "btn-accent" : "btn-dark"
                }`}
              >
                Choose {pkg.name}
              </Link>

              {otherPackages.length > 0 && (
                <div className="mt-6 border-t border-line pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Compare Other Plans
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    {otherPackages.map((other) => (
                      <Link
                        key={other.slug}
                        href={`/packages/${other.slug}`}
                        className="text-sm text-accent hover:underline"
                      >
                        View {other.name} →
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
