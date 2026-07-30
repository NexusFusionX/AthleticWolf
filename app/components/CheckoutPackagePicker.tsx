"use client";

import { Check } from "@phosphor-icons/react";
import { packages } from "@/app/data/packages";

type CheckoutPackagePickerProps = {
  selectedName: string;
  onSelect: (packageName: string) => void;
};

export function CheckoutPackagePicker({
  selectedName,
  onSelect,
}: CheckoutPackagePickerProps) {
  const selectedPackage = packages.find((pkg) => pkg.name === selectedName);

  return (
    <section className="checkout-section">
      <div className="checkout-section__head">
        <h2 className="checkout-section__title">Select plan</h2>
        <p className="checkout-section__subtitle">
          Choose the coaching package that fits you best.
        </p>
      </div>

      <div className="checkout-package-picker">
        <div className="checkout-package-picker__grid">
          {packages.map((pkg) => {
            const selected = pkg.name === selectedName;
            return (
              <button
                key={pkg.slug}
                type="button"
                onClick={() => onSelect(pkg.name)}
                className={`checkout-package-picker__option${
                  selected ? " checkout-package-picker__option--selected" : ""
                }${pkg.featured ? " checkout-package-picker__option--featured" : ""}`}
                aria-pressed={selected}
              >
                <span className="checkout-package-picker__check" aria-hidden>
                  {selected ? <Check size={14} weight="bold" /> : null}
                </span>
                {pkg.featured && (
                  <span className="checkout-package-picker__badge">
                    {pkg.ribbon ?? "Popular"}
                  </span>
                )}
                <span className="checkout-package-picker__name">{pkg.name}</span>
                <span className="checkout-package-picker__price">
                  ${pkg.price}/mo
                </span>
                <span className="checkout-package-picker__term">6-month plan</span>
              </button>
            );
          })}
        </div>

        {selectedPackage ? (
          <details className="checkout-package-picker__features" open>
            <summary>What&apos;s included in {selectedPackage.name}</summary>
            <ul>
              {selectedPackage.features.map((feature) => (
                <li key={feature}>
                  <Check size={14} weight="bold" aria-hidden />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </details>
        ) : null}
      </div>
    </section>
  );
}
