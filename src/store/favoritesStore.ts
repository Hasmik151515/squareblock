import { create } from "zustand";

interface FavoriteStore {
    favorites: string[];
    toggleFavorite: (id: string) => void;
}

export const useFavoriteStore = create<FavoriteStore>((set) => ({
    favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
    toggleFavorite: (id: string) =>
        set((state) => {
            const isFav = state.favorites.includes(id);
            const newFavorites = isFav
                ? state.favorites.filter((fav) => fav !== id)
                : [...state.favorites, id];
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
            return { favorites: newFavorites };
        }),
}));
