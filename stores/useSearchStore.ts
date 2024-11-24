import { create } from "zustand";

interface SearchStore {
  query: string;
  setQuery: (query: string) => void;
  selectedTag: string;
  onSelectedTagChange: (tag: string) => void;
}

export const useSearchStore = create<SearchStore>()((set) => ({
  query: "",
  setQuery: (query) => set({ query: query.trim() }),
  selectedTag: "All",
  onSelectedTagChange: (tag) =>
    set((state) => {
      if (state.selectedTag !== tag) {
        return { selectedTag: tag };
      } else {
        return state;
      }
    }),
}));
