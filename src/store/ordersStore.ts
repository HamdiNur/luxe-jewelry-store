import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Order } from "@/types/order";

type OrdersState = {
  orders: Order[];
  hydrated: boolean;
  addOrder: (order: Order) => void;
  clearAll: () => void;
  setHydrated: () => void;
};

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      hydrated: false,
      addOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),
      clearAll: () => set({ orders: [] }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "luxe-orders",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ orders: s.orders }),
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    }
  )
);