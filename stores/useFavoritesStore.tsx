import { Resource } from "@/types";
import { create } from "zustand";

interface FavoritesStore {
  favorites: Resource[];
  addFavorite: (favorite: Resource) => void;
  removeFavorite: (favorite: Resource) => void;
}

export const useFavoritesStore = create<FavoritesStore>((set) => ({
  favorites: [],
  addFavorite: (favorite) =>
    set((state) => ({
      favorites: [...state.favorites, favorite],
    })),
  removeFavorite: (favorite) =>
    set((state) => ({
      favorites: state.favorites.filter((f) => f !== favorite),
    })),
}));
