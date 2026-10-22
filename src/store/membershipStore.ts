import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { PlanId } from "@/types/membership";

export interface Subscription {
  plan: PlanId;
  startedAt: string; // ISO date
}

type MembershipState = {
  subscriptions: Record<string, Subscription>;
  subscribe: (userId: string, plan: PlanId) => void;
  cancel: (userId: string) => void;
};

export const useMembershipStore = create<MembershipState>()(
  persist(
    (set) => ({
      subscriptions: {},
      subscribe: (userId, plan) =>
        set((s) => ({
          subscriptions: { ...s.subscriptions, [userId]: { plan, startedAt: new Date().toISOString() } },
        })),
      cancel: (userId) =>
        set((s) => {
          const next = { ...s.subscriptions };
          delete next[userId];
          return { subscriptions: next };
        }),
    }),
    {
      name: "luxe-membership",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ subscriptions: s.subscriptions }),
    }
  )
);