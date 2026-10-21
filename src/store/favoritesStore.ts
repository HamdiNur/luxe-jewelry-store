import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FavoritesState = {
  ids: string[];
  hydrated: boolean;
  toggle: (id: string) => void;
  setHydrated: () => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      ids: [],
      hydrated: false,
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id) ? state.ids.filter((x) => x !== id) : [id, ...state.ids],
        })),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "luxe-favorites",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ ids: state.ids }),
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    }
  )
);