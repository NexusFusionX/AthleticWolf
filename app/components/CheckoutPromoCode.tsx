"use client";

import { useState } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { validatePromoCode } from "@/app/lib/promo-code";
import type { PromoCodeDefinition } from "@/app/data/promo-codes";

type CheckoutPromoCodeProps = {
  appliedPromo: PromoCodeDefinition | null;
  onApply: (promo: PromoCodeDefinition | null) => void;
  disabled?: boolean;
};

export function CheckoutPromoCode({
  appliedPromo,
  onApply,
  disabled = false,
}: CheckoutPromoCodeProps) {
  const [input, setInput] = useState(appliedPromo?.code ?? "");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (disabled || appliedPromo) return;

    const promo = validatePromoCode(input);
    if (!promo) {
      setError("That promo code is not valid.");
      return;
    }

    setError(null);
    onApply(promo);
    setInput(promo.code);
  }

  function handleRemove() {
    setInput("");
    setError(null);
    onApply(null);
  }

  return (
    <section className="checkout-section" aria-labelledby="checkout-promo-title">
      <div className="checkout-section__head">
        <h2 id="checkout-promo-title" className="checkout-section__title">
          Have a promo code?
        </h2>
      </div>

      <div className="checkout-promo-panel">
        {appliedPromo ? (
          <div className="checkout-promo-panel__success">
            <div className="checkout-promo-panel__success-main">
              <span className="checkout-promo-panel__success-icon" aria-hidden>
                <CheckCircle size={20} weight="fill" />
              </span>
              <div>
                <p className="checkout-promo-panel__success-code">{appliedPromo.code}</p>
                <p className="checkout-promo-panel__success-text">
                  {appliedPromo.description}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              disabled={disabled}
              className="checkout-promo-panel__remove"
            >
              Remove
            </button>
          </div>
        ) : (
          <form className="checkout-promo-panel__form" onSubmit={handleSubmit}>
            <label className="checkout-promo-panel__field">
              <span className="sr-only">Promo code</span>
              <input
                type="text"
                className="input checkout-promo-panel__input"
                value={input}
                onChange={(event) => {
                  setInput(event.target.value.toUpperCase());
                  setError(null);
                }}
                placeholder="Enter promo code"
                disabled={disabled}
                autoComplete="off"
                spellCheck={false}
              />
            </label>
            <button
              type="submit"
              disabled={disabled || !input.trim()}
              className="btn btn-accent font-display checkout-promo-panel__apply"
            >
              Apply
            </button>
          </form>
        )}

        {error ? <p className="checkout-promo-panel__error">{error}</p> : null}
      </div>
    </section>
  );
}
