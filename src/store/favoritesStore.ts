import { create } from "zustand";

interface FavoriteStore {
    favorites: (string | number)[]; // նկարների id-ները
    toggleFavorite: (id: string | number) => void;
}

export const useFavoriteStore = create<FavoriteStore>((set) => ({
    favorites: [],
    toggleFavorite: (id) =>
        set((state: FavoriteStore) => {
            const isFavorite = state.favorites.includes(id);
            return {
                favorites: isFavorite
                    ? state.favorites.filter((favId) => favId !== id)
                    : [...state.favorites, id],
            };
        }),
}));
