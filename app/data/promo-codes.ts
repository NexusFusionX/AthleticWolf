export type PromoCodeDefinition = {
  code: string;
  percentOff: number;
  description: string;
};

export const promoCodes: PromoCodeDefinition[] = [
  {
    code: "WOLF10",
    percentOff: 10,
    description: "10% off today's payment",
  },
];

export function findPromoCode(code: string) {
  const normalized = code.trim().toUpperCase();
  return promoCodes.find((promo) => promo.code === normalized) ?? null;
}
