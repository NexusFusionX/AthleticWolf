import { ArrowRight, Check, Fire } from "@phosphor-icons/react/dist/ssr";
import { packages, getPackageDiscountPercent, getPackageTotalUsd } from "../data/packages";
import { Reveal } from "./Reveal";
import { revealAt } from "../lib/reveal";
import { PackageStartLink } from "./PackageStartLink";
import { LocalizedPackagePrice } from "./LocalizedPackagePrice";

const PACKAGE_VARIANTS = ["rise", "zoom", "tilt-right"] as const;

type Package = (typeof packages)[number];

function ctaClassName(slug: Package["slug"]) {
  if (slug === "platinum") return "btn btn-package-invert";
  if (slug === "diamond") return "btn btn-accent-warm";
  return "btn btn-accent";
}

export function PackageCard({ pkg }: { pkg: Package }) {
  const isHero = pkg.featured;
  const total = getPackageTotalUsd(pkg.price);
  const discountPercent = getPackageDiscountPercent(pkg);

  return (
    <div
      className={`package-card-shell${isHero ? " package-card-shell--hero" : ""}`}
    >
      {isHero ? (
        <span className="package-card__popular">
          <Fire size={14} weight="fill" aria-hidden />
          Most Popular
        </span>
      ) : (
        <span className="package-card__badge">{pkg.ribbon}</span>
      )}

      <article
        className={`package-card package-card--${pkg.slug}${isHero ? " package-card--hero" : ""}`}
      >
        {isHero ? (
          <span
            className="package-card__discount-ribbon"
            aria-label={`Save ${discountPercent}%`}
          >
            <span className="package-card__discount-ribbon-text">
              -{discountPercent}%
            </span>
          </span>
        ) : null}
        <div className="package-card__head">
          <p className="package-card__tier">{pkg.name}</p>
          <p className="package-card__term">6 Month Plan</p>
          <p className="package-card__tagline">{pkg.tagline}</p>
        </div>

        <LocalizedPackagePrice usdPrice={pkg.price} usdTotal={total} />

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
          <PackageStartLink
            packageName={pkg.name}
            className={`package-card__cta ${ctaClassName(pkg.slug)}`}
          >
            <span className="package-card__cta-label">
              Get started
              <ArrowRight size={16} weight="bold" aria-hidden />
            </span>
          </PackageStartLink>
          {pkg.slug !== "silver" ? (
            <PackageStartLink
              packageName={pkg.name}
              className="package-card__cta-secondary"
            >
              <span className="package-card__cta-label">Upgrade</span>
            </PackageStartLink>
          ) : null}
        </div>
      </article>
    </div>
  );
}

export function PackageGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`package-card-grid ${className}`.trim()}>
      {packages.map((pkg, i) => (
        <Reveal key={pkg.slug} delay={i * 0.08} variant={revealAt([...PACKAGE_VARIANTS], i)}>
          <PackageCard pkg={pkg} />
        </Reveal>
      ))}
    </div>
  );
}
