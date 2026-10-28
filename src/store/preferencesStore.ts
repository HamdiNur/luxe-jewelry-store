import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type PreferenceKey = "orderUpdates" | "newArrivals" | "analytics";

type PreferencesState = {
  orderUpdates: boolean;
  newArrivals: boolean;
  analytics: boolean;
  setPreference: (key: PreferenceKey, value: boolean) => void;
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      orderUpdates: true,
      newArrivals: false,
      analytics: true,
      setPreference: (key, value) => set({ [key]: value } as Pick<PreferencesState, PreferenceKey>),
    }),
    {
      name: "luxe-preferences",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ orderUpdates: s.orderUpdates, newArrivals: s.newArrivals, analytics: s.analytics }),
    }
  )
);