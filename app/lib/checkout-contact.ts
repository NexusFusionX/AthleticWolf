export type CheckoutContact = {
  firstName: string;
  lastName: string;
  countryCode: string;
  contactChannel: "phone" | "email";
  phone: string;
  email: string;
  preferredContact: "WhatsApp" | "Phone call" | "Email";
};

export const PHONE_CONTACT_OPTIONS = [
  { value: "WhatsApp", label: "WhatsApp" },
  { value: "Phone call", label: "Phone call" },
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isCheckoutContactComplete(contact: CheckoutContact) {
  if (!contact.firstName.trim()) return false;
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
