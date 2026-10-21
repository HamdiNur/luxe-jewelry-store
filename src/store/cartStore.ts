import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { CartItem } from "@/types/cart";
import type { Metal } from "@/types/product";

const MAX_QTY = 10;

type AddInput = { productId: string; metal?: Metal; size?: string; quantity: number };

type CartState = {
  items: CartItem[];
  hydrated: boolean;
  addItem: (input: AddInput) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
  setHydrated: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      hydrated: false,
      addItem: ({ productId, metal, size, quantity }) =>
        set((state) => {
          const key = [productId, metal ?? "-", size ?? "-"].join("|");
          const existing = state.items.find((i) => i.key === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + quantity) } : i
              ),
            };
          }
          return {
            items: [...state.items, { key, productId, metal, size, quantity: Math.min(MAX_QTY, quantity) }],
          };
        }),
      setQuantity: (key, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: Math.max(1, Math.min(MAX_QTY, quantity)) } : i
          ),
        })),
      removeItem: (key) => set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
      clear: () => set({ items: [] }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "luxe-cart",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    }
  )
);