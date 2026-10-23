import { useMemo } from "react";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { computeTotals, MEMBER_DISCOUNT_RATE } from "@/utils/pricing";
import { useMembership } from "./useMembership";

export function useCartLines() {
  const items = useCartStore((s) => s.items);
  const { isMember } = useMembership();

  return useMemo(() => {
    // If a saved product no longer exists in the data, it is skipped instead of crashing.
    const lines = items.flatMap((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? [{ item, product }] : [];
    });
    const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.item.quantity, 0);
    const count = lines.reduce((n, l) => n + l.item.quantity, 0);
    return { lines, count, ...computeTotals(subtotal, isMember ? MEMBER_DISCOUNT_RATE : 0) };
  }, [items, isMember]);
}