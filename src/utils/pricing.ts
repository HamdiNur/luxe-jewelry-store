export const FREE_SHIPPING_THRESHOLD = 500;
export const FLAT_SHIPPING = 25;

export function computeTotals(subtotal: number) {
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  return { subtotal, shipping, total: subtotal + shipping };
}