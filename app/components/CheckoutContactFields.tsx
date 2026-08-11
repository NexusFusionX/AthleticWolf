"use client";

import {
  PHONE_CONTACT_OPTIONS,
  type CheckoutContact,
} from "@/app/lib/checkout-contact";
import { CheckoutCountrySelect } from "@/app/components/CheckoutCountrySelect";

type CheckoutContactFieldsProps = {
  value: CheckoutContact;
  onChange: (value: CheckoutContact) => void;
};

export function CheckoutContactFields({
  value,
  onChange,
}: CheckoutContactFieldsProps) {
  function update<K extends keyof CheckoutContact>(
    key: K,
    next: CheckoutContact[K]
  ) {
    onChange({ ...value, [key]: next });
  }

  function setContactChannel(channel: CheckoutContact["contactChannel"]) {
    if (channel === "phone") {
      onChange({
        ...value,
        contactChannel: "phone",
        preferredContact:
          value.preferredContact === "Email" ? "WhatsApp" : value.preferredContact,
        email: "",
      });
      return;
    }

    onChange({
      ...value,
      contactChannel: "email",
      preferredContact: "Email",
      phone: "",
    });
  }

  return (
    <section className="checkout-section">
      <div className="checkout-section__head">
        <h2 className="checkout-section__title">Personal details</h2>
        <p className="checkout-section__subtitle">
          Tell us how to reach you about your coaching plan.
        </p>
      </div>

      <div className="checkout-contact">
      <div className="checkout-contact__grid">
        <label className="checkout-contact__field">
          <span>First name *</span>
          <input
            type="text"
            className="input"
            value={value.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            placeholder="e.g. Ahmed"
            autoComplete="given-name"
            required
          />
        </label>
        <label className="checkout-contact__field">
          <span>Last name</span>
          <input
            type="text"
            className="input"
            value={value.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            placeholder="e.g. Khan (optional)"
            autoComplete="family-name"
          />
        </label>
      </div>

      <fieldset className="checkout-contact__fieldset">
        <legend>Best way to reach you *</legend>
        <div className="checkout-contact__choices checkout-contact__choices--channel">
          <label
            className={`checkout-contact__choice${
              value.contactChannel === "phone"
                ? " checkout-contact__choice--selected"
                : ""
            }`}
          >
            <input
              type="radio"
              name="contactChannel"
              checked={value.contactChannel === "phone"}
              onChange={() => setContactChannel("phone")}
              className="sr-only"
            />
            <span className="checkout-contact__choice-dot" aria-hidden />
            Phone number
          </label>
          <label
            className={`checkout-contact__choice${
              value.contactChannel === "email"
                ? " checkout-contact__choice--selected"
                : ""
            }`}
          >
            <input
              type="radio"
              name="contactChannel"
              checked={value.contactChannel === "email"}
              onChange={() => setContactChannel("email")}
              className="sr-only"
            />
            <span className="checkout-contact__choice-dot" aria-hidden />
            Email
          </label>
        </div>
      </fieldset>

      {value.contactChannel === "phone" ? (
        <>
          <label className="checkout-contact__field">
            <span>Phone number *</span>
            <input
              type="tel"
              className="input"
              value={value.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="e.g. +1 555 123 4567"
              autoComplete="tel"
              required
            />
          </label>

          <CheckoutCountrySelect
            value={value.countryCode}
            onChange={(countryCode) => update("countryCode", countryCode)}
          />

          <fieldset className="checkout-contact__fieldset">
            <legend>Contact via *</legend>
            <div className="checkout-contact__choices">
              {PHONE_CONTACT_OPTIONS.map((option) => {
                const selected = value.preferredContact === option.value;
                return (
                  <label
                    key={option.value}
                    className={`checkout-contact__choice${
                      selected ? " checkout-contact__choice--selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="preferredContact"
                      value={option.value}
                      checked={selected}
                      onChange={() => update("preferredContact", option.value)}
                      className="sr-only"
                    />
                    <span className="checkout-contact__choice-dot" aria-hidden />
                    {option.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        </>
      ) : (
        <label className="checkout-contact__field">
          <span>Email address *</span>
          <input
            type="email"
            className="input"
            value={value.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </label>
      )}

      {value.contactChannel === "email" ? (
        <CheckoutCountrySelect
          value={value.countryCode}
          onChange={(countryCode) => update("countryCode", countryCode)}
        />
      ) : null}
      </div>
    </section>
  );
}
