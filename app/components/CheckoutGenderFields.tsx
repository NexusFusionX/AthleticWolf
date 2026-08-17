"use client";

import {
  CHECKOUT_GENDER_OPTIONS,
  type CheckoutContact,
  type CheckoutGender,
} from "@/app/lib/checkout-contact";

type CheckoutGenderFieldsProps = {
  value: CheckoutContact;
  onChange: (value: CheckoutContact) => void;
};

export function CheckoutGenderFields({
  value,
  onChange,
}: CheckoutGenderFieldsProps) {
  function selectGender(gender: CheckoutGender) {
    onChange({ ...value, gender });
  }

  return (
    <section className="checkout-section">
      <div className="checkout-section__head">
        <h2 className="checkout-section__title">Gender</h2>
        <p className="checkout-section__subtitle">
          Helps your coach personalize training and nutrition safely.
        </p>
      </div>

      <fieldset className="checkout-contact__fieldset">
        <legend className="sr-only">Select your gender</legend>
        <div className="checkout-contact__choices checkout-contact__choices--gender">
          {CHECKOUT_GENDER_OPTIONS.map((option) => {
            const selected = value.gender === option.value;
            return (
              <label
                key={option.value}
                className={`checkout-contact__choice${
                  selected ? " checkout-contact__choice--selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="checkoutGender"
                  value={option.value}
                  checked={selected}
                  onChange={() => selectGender(option.value)}
                  className="sr-only"
                  required
                />
                <span className="checkout-contact__choice-dot" aria-hidden />
                {option.label}
              </label>
            );
          })}
        </div>
      </fieldset>
    </section>
  );
}
