export const FREE_SHIPPING_THRESHOLD = 500;
export const FLAT_SHIPPING = 25;
export const MEMBER_DISCOUNT_RATE = 0.1;

export function computeTotals(subtotal: number, discountRate = 0) {
  const discount = Math.round(subtotal * discountRate);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  return { subtotal, discount, shipping, total: subtotal - discount + shipping };
}