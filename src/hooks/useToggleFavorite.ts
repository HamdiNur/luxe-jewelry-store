import { useCallback } from "react";
import { products } from "@/data/products";
import { useFavoritesStore } from "@/store/favoritesStore";
import { track } from "@/services/analytics";

export function useToggleFavorite() {
  const toggle = useFavoritesStore((s) => s.toggle);

  return useCallback(
    (productId: string) => {
      const wasLiked = useFavoritesStore.getState().ids.includes(productId);
      const product = products.find((p) => p.id === productId);
      toggle(productId);
      if (product) {
        track(wasLiked ? "favorite_removed" : "favorite_added", {
          product_id: product.id,
          product_name: product.name,
          category: product.category,
        });
      }
    },
    [toggle]
  );
}