import React from "react";
import { useFavoriteStore } from "../store/favoritesStore";
import { bestOffers } from "../data/offer";

const Favorites: React.FC = () => {
    const { favorites, toggleFavorite } = useFavoriteStore();

    const favoriteOffers = bestOffers.filter((offer) =>
        favorites.includes(offer.id)
    );

    return (
        <div className="p-4 grid grid-cols-3 gap-4">
            {favoriteOffers.length === 0 && (
                <p className="col-span-3 text-center text-gray-500">No favorites yet</p>
            )}
            {favoriteOffers.map((offer) => (
                <div
                    key={offer.id}
                    className="relative h-[370px] w-[330px] rounded-[10px] shadow-md"
                >
                    <img
                        src={offer.image}
                        alt={offer.location}
                        className="h-[250px] w-[330px] rounded-[10px] object-cover"
                    />
                    <i
                        className="fa-solid fa-heart text-red-500 absolute top-2 right-2 cursor-pointer text-2xl"
                        onClick={() => toggleFavorite(offer.id)}
                    ></i>
                    <div className="p-2">
                        <p className="font-medium">{offer.location}</p>
                        <p>{offer.people} people</p>
                        <p className="font-semibold">{offer.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Favorites;
