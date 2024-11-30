import { Resource } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FavoritesStore {
  favorites: Resource[];
  addFavorite: (favorite: Resource) => void;
  removeFavorite: (favorite: Resource) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (favorite) =>
        set((state) => ({
          favorites: [...state.favorites, favorite],
        })),
      removeFavorite: (favorite) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f.title !== favorite.title),
        })),
    }),
    {
      name: "favorites-storage", // unique name for the storage
      storage: createJSONStorage(() => localStorage), // specify localStorage as the storage
    },
  ),
);
