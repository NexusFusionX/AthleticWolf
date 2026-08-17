export type CheckoutGender = "Male" | "Female" | "Prefer not to say";

export type CheckoutContact = {
  firstName: string;
  lastName: string;
  gender: CheckoutGender | "";
  countryCode: string;
  contactChannel: "phone" | "email";
  phone: string;
  email: string;
  preferredContact: "WhatsApp" | "Phone call" | "Email";
};

export const CHECKOUT_GENDER_OPTIONS: {
  value: CheckoutGender;
  label: string;
}[] = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Prefer not to say", label: "Prefer not to say" },
];

export const PHONE_CONTACT_OPTIONS = [
  { value: "WhatsApp", label: "WhatsApp" },
  { value: "Phone call", label: "Phone call" },
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isCheckoutContactComplete(contact: CheckoutContact) {
  if (!contact.firstName.trim()) return false;
  if (!contact.gender) return false;
  if (!contact.countryCode.trim()) return false;

  if (contact.contactChannel === "phone") {
    return (
      contact.phone.trim().length >= 7 &&
      (contact.preferredContact === "WhatsApp" ||
        contact.preferredContact === "Phone call")
    );
  }

  return (
    EMAIL_PATTERN.test(contact.email.trim()) &&
    contact.preferredContact === "Email"
  );
}

export function formatCheckoutFullName(contact: CheckoutContact) {
  return [contact.firstName.trim(), contact.lastName.trim()]
    .filter(Boolean)
    .join(" ");
}
