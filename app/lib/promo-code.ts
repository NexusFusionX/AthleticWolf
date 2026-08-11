import { findPromoCode, type PromoCodeDefinition } from "@/app/data/promo-codes";

export function validatePromoCode(code: string): PromoCodeDefinition | null {
  if (!code.trim()) return null;
  return findPromoCode(code);
}

export function getPromoDiscountAmount(amount: number, percentOff: number) {
  return Math.round((amount * percentOff) / 100);
}

export function applyPromoDiscount(amount: number, percentOff: number) {
  return Math.max(0, amount - getPromoDiscountAmount(amount, percentOff));
}

export function applyPromoDiscountCents(amountCents: number, percentOff: number) {
  const discountCents = Math.round((amountCents * percentOff) / 100);
  return Math.max(0, amountCents - discountCents);
}
