import Link from "next/link";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import { packages } from "../data/packages";

type Package = (typeof packages)[number];

function ctaClassName(slug: Package["slug"]) {
  if (slug === "platinum") return "btn btn-package-invert";
  if (slug === "diamond") return "btn btn-accent-warm";
  return "btn btn-accent";
}

export function PackageCard({ pkg }: { pkg: Package }) {
  const isHero = pkg.featured;

  return (
    <div
      className={`package-card-shell${isHero ? " package-card-shell--hero" : ""}`}
    >
      {isHero ? (
        <span className="package-card__popular">
          <span aria-hidden>🔥</span> Most Popular
        </span>
      ) : null}

      <article
        className={`package-card package-card--${pkg.slug}${isHero ? " package-card--hero" : ""}`}
      >
        {!isHero ? (
          <span className="package-card__ribbon">{pkg.ribbon}</span>
        ) : null}

      <div className="package-card__head">
        <p className="package-card__tier">{pkg.name}</p>
        <p className="package-card__term">6 Month Plan</p>
        <p className="package-card__tagline">{pkg.tagline}</p>
      </div>

      <div className="package-card__pricing">
        <div className="package-card__price-row">
          <span className="package-card__price">${pkg.price}</span>
          <span className="package-card__period">/ month</span>
        </div>
        <p className="package-card__billing">6-month coaching commitment</p>
        <span className="package-card__value-badge">Total value ${pkg.value}</span>
      </div>

      <ul className="package-card__features">
        {pkg.features.map((feature) => (
          <li key={feature} className="package-card__feature">
            <span className="package-card__check" aria-hidden>
              <Check size={12} weight="bold" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="package-card__actions">
        <Link
          href={`/packages/${pkg.slug}`}
          className={`package-card__cta ${ctaClassName(pkg.slug)}`}
        >
          <span className="package-card__cta-label">
            Choose {pkg.name}
            <ArrowRight size={16} weight="bold" aria-hidden />
          </span>
        </Link>
        {isHero ? (
          <Link href="/packages" className="package-card__cta-secondary">
            <span className="package-card__cta-label">Compare all plans</span>
          </Link>
        ) : null}
      </div>
    </article>
    </div>
  );
}

export function PackageGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`package-card-grid ${className}`.trim()}>
      {packages.map((pkg) => (
        <PackageCard key={pkg.slug} pkg={pkg} />
      ))}
    </div>
  );
}
