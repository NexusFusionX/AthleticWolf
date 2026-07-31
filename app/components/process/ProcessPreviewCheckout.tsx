import { CreditCard, Package, ShieldCheck } from "@phosphor-icons/react";
import { packages } from "@/app/data/packages";
import { ProcessMiniScreen } from "./ProcessMiniScreen";

export function ProcessPreviewPackages({
  selectedSlug,
}: {
  selectedSlug?: string;
} = {}) {
  const selected =
    selectedSlug ??
    packages.find((p) => p.featured)?.slug ??
    packages[1]?.slug;

  return (
    <ProcessMiniScreen eyebrow="Packages" title="Pick your plan">
      <div className="process-mini-stack">
        {packages.map((pkg) => {
          const isSelected = pkg.slug === selected;

          return (
            <div
              key={pkg.slug}
              className={`process-mini-option process-mini-option--compact${
                isSelected ? " process-mini-option--selected" : ""
              }`}
            >
              <Package
                size={14}
                weight={isSelected ? "fill" : "regular"}
                className={isSelected ? "text-accent" : "text-white/45"}
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <p className="process-mini-option__label">{pkg.name}</p>
                  {pkg.featured ? (
                    <span className="process-mini-tag">Popular</span>
                  ) : null}
                </div>
                <p className="process-mini-option__meta">${pkg.price}/mo</p>
                <p className="process-mini-option__hint">{pkg.tagline}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="process-mini-note-box process-mini-fill-bottom">
        6-month coaching · switch anytime at checkout
      </p>
    </ProcessMiniScreen>
  );
}

export function ProcessPreviewCheckout() {
  const pkg = packages.find((p) => p.featured) ?? packages[1];

  return (
    <ProcessMiniScreen eyebrow="Checkout" title="Pay securely">
      <div className="process-mini-stack">
        <div className="process-mini-field">
          <span className="process-mini-field__label">Full name</span>
          <span className="process-mini-field__value">Alex Morgan</span>
        </div>
        <div className="process-mini-field">
          <span className="process-mini-field__label">Email</span>
          <span className="process-mini-field__value">you@email.com</span>
        </div>
        <div className="process-mini-field">
          <span className="process-mini-field__label">Phone</span>
          <span className="process-mini-field__value">+1 555 0123</span>
        </div>
        <div className="process-mini-summary">
          <div>
            <p className="process-mini-summary__plan">{pkg.name} coaching</p>
            <p className="process-mini-summary__meta">6-month program</p>
          </div>
          <p className="process-mini-summary__price">${pkg.price}/mo</p>
        </div>
      </div>
      <div className="process-mini-fill-bottom">
        <div className="process-mini-cta">
          <CreditCard size={14} weight="fill" aria-hidden />
          Secure payment
        </div>
        <p className="process-mini-footnote">
          <ShieldCheck size={11} weight="fill" aria-hidden />
          Stripe encrypted checkout
        </p>
      </div>
    </ProcessMiniScreen>
  );
}
