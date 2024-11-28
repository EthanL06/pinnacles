import { ResourceType } from "@/types/Resource";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface PreferencesState {
  viewMode: "list" | "grid";
  setViewMode: (viewMode: "list" | "grid") => void;
  filter: ResourceType | "all";
  setFilter: (filter: ResourceType | "all") => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      viewMode: "grid",
      setViewMode: (viewMode) => set({ viewMode }),
      filter: "all",
      setFilter: (filter) => set({ filter }),
    }),
    {
      name: "preferences-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
