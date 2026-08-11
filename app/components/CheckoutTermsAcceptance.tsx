"use client";

import Link from "next/link";
import { Check } from "@phosphor-icons/react";

type CheckoutTermsAcceptanceProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

export function CheckoutTermsAcceptance({
  checked,
  onChange,
  disabled = false,
}: CheckoutTermsAcceptanceProps) {
  function handleCardClick(event: React.MouseEvent<HTMLDivElement>) {
    if (disabled) return;
    const target = event.target as HTMLElement;
    if (target.closest("a") || target.closest("label") || target.closest("input")) {
      return;
    }
    onChange(!checked);
  }

  return (
    <section className="checkout-section" aria-labelledby="checkout-terms-title">
      <div
        className={`checkout-terms${disabled ? " checkout-terms--disabled" : ""}`}
        onClick={handleCardClick}
      >
        <label className="checkout-terms__check">
          <input
            type="checkbox"
            className="checkout-terms__checkbox"
            checked={checked}
            onChange={(event) => onChange(event.target.checked)}
            disabled={disabled}
          />
          <span className="checkout-terms__box" aria-hidden>
            {checked ? <Check size={16} weight="bold" /> : null}
          </span>
        </label>

        <p id="checkout-terms-title" className="checkout-terms__text">
          I agree to the{" "}
          <Link
            href="/terms"
            className="checkout-terms__link"
            onClick={(event) => event.stopPropagation()}
          >
            Terms of Service
          </Link>
          ,{" "}
          <Link
            href="/privacy"
            className="checkout-terms__link"
            onClick={(event) => event.stopPropagation()}
          >
            Privacy Policy
          </Link>
          , and{" "}
          <Link
            href="/refund"
            className="checkout-terms__link"
            onClick={(event) => event.stopPropagation()}
          >
            Refund Policy
          </Link>{" "}
          of Athletic Wolf.
        </p>
      </div>
    </section>
  );
}
