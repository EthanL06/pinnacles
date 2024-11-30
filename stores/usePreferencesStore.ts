import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface PreferencesState {
  viewMode: "list" | "grid";
  setViewMode: (viewMode: "list" | "grid") => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      viewMode: "grid",
      setViewMode: (viewMode) => set({ viewMode }),
    }),
    {
      name: "preferences-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
