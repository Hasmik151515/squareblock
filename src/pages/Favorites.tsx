import React from "react";
import { useFavoriteStore } from "../store/favoritesStore";
import { bestOffers } from "../data/offer";
import { icons } from "../data/icons";

const Favorites: React.FC = () => {
    const { favorites, toggleFavorite } = useFavoriteStore();

    const favoriteOffers = bestOffers.filter((offer) =>
        favorites.includes(offer.id.toString())
    );

    return (
        <div className="p-10 grid grid-cols-3 gap-6">
            {favoriteOffers.map((offer) => (
                <div
                    key={offer.id}
                    className="relative h-[370px] w-[330px] rounded-lg shadow-lg"
                >
                    {/* Նկար */}
                    <img
                        src={offer.image}
                        alt={offer.location}
                        className="h-[250px] w-full rounded-t-lg object-cover"
                    />

                    {/* Սրտիկ */}
                    <i
                        className={`fa-heart absolute top-2 right-2 text-2xl cursor-pointer ${favorites.includes(offer.id.toString())
                                ? "fa-solid text-red-500"
                                : "fa-regular text-black"
                            }`}
                        onClick={() => toggleFavorite(offer.id.toString())}
                    ></i>

                    {/* Տեղանքի և մարդկանց ինֆո */}
                    <div className="flex justify-between items-center mt-2 px-2">
                        <div className="flex items-center gap-1">
                            <img src={icons.location} alt="location" className="w-4 h-4" />
                            <span className="font-medium">{offer.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <img src={icons.users} alt="users" className="w-4 h-4" />
                            <span className="font-medium">{offer.people}</span>
                        </div>
                    </div>

                    {/* Gazar */}
                    {offer.hasGazar && (
                        <img
                            src={icons.gazaraguyn}
                            alt="gazaraguyn"
                            className="absolute bottom-10 right-4 w-6 h-6"
                        />
                    )}

                    {/* Pitak և Գինը */}
                    <img
                        src={icons.pitak}
                        alt="pitak"
                        className="absolute bottom-2 left-2 w-6 h-6"
                    />
                    <span className="absolute bottom-2 left-10 font-medium">
                        {offer.price}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Favorites;
