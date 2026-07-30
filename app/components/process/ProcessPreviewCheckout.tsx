import { Check, CreditCard, Package } from "@phosphor-icons/react";
import { packages } from "@/app/data/packages";
import { ProcessMiniScreen } from "./ProcessMiniScreen";

export function ProcessPreviewPackages({
  selectedSlug,
}: {
  selectedSlug?: string;
} = {}) {
  const featured =
    packages.find((p) => p.slug === selectedSlug) ??
    packages.find((p) => p.featured) ??
    packages[1];

  return (
    <ProcessMiniScreen eyebrow="Packages" title="Pick your plan">
      <div className="process-mini-option process-mini-option--selected">
        <Package size={16} weight="fill" className="text-accent" aria-hidden />
        <div>
          <p className="process-mini-option__label">{featured.name}</p>
          <p className="process-mini-option__meta">${featured.price}/mo</p>
        </div>
      </div>
    </ProcessMiniScreen>
  );
}

export function ProcessPreviewCheckout() {
  const pkg = packages.find((p) => p.featured) ?? packages[1];

  return (
    <ProcessMiniScreen eyebrow="Checkout" title="Pay securely">
      <div className="process-mini-summary">
        <p className="process-mini-summary__plan">{pkg.name}</p>
        <p className="process-mini-summary__price">${pkg.price}/mo</p>
      </div>
      <div className="process-mini-cta">
        <CreditCard size={14} weight="fill" aria-hidden />
        Secure payment
      </div>
    </ProcessMiniScreen>
  );
}
