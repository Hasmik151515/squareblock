import React from "react";
import { useFavoriteStore } from "../store/favoritesStore"; // ավելացնել import

// Offer-ի interface
interface Offer {
    id: string | number;
    image: string;
    location: string;
    people: number;
    hasGazar?: boolean;
    className?: string;
    class?: string;
    price: string | number;
}

// Icons-ի interface
interface Icons {
    location: string;
    users: string;
    gazaraguyn: string;
    pitak: string;
}

// Props-ի interface
interface CommonOffersItemProps {
    offer: Offer;
    icons: Icons;
}

const CommonOffersItem: React.FC<CommonOffersItemProps> = ({ offer, icons }) => {
    const { favorites, toggleFavorite } = useFavoriteStore();
    const offerIdStr = offer.id.toString(); // միշտ string
    const isFavorite = favorites.includes(offerIdStr);

    return (
        <div
            className={`h-[370px] w-[330px] rounded-[10px] shadow-md relative ${isFavorite ? "border-2 border-red-500" : ""
                }`}
        >
            {/* Favorites */}

            < i
                className={`fa-heart absolute top-2 right-2 cursor-pointer text-2xl ${isFavorite ? "fa-solid text-red-500" : "fa-regular text-black"
                    }`}
                onClick={() => toggleFavorite(offerIdStr)}
            ></i >

            <img
                src={offer.image}
                className="h-[250px] w-full rounded-t-lg object-cover"
                alt={offer.location}
            />

            <img
                src={icons.location}
                className="absolute top-[260px] left-2 w-4 h-4"
                alt="location"
            />
            <span className="absolute top-[260px] left-10 font-medium">
                {offer.location}
            </span>

            <img
                src={icons.users}
                className="absolute top-[290px] left-2 w-4 h-4"
                alt="users"
            />
            <span className="absolute top-[290px] left-10 font-medium">
                {offer.people}
            </span>

            {
                offer.hasGazar && (
                    <img
                        src={icons.gazaraguyn}
                        className="absolute bottom-10 right-4 w-6 h-6"
                        alt="gazar"
                    />
                )
            }
            <img src={icons.pitak} className={offer.className} alt="pitak" />
            <span className={offer.class}>{offer.price}</span>
        </div >
    );
};

export default CommonOffersItem;
