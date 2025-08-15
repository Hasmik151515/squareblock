import React from "react";
import { useFavoriteStore } from "../store/favoritesStore";

interface Offer {
  id: string | number;
  image: string;
  location: string;
  people: number;
  hasGazar: boolean;
  className: string;
  class: string;
  price: string | number;
}

interface Icons {
  location: string;
  users: string;
  gazaraguyn: string;
  pitak: string;
}

interface BestOfferItemProps {
  offer: Offer;
  icons: Icons;
}

const BestOfferItem: React.FC<BestOfferItemProps> = ({ offer, icons }) => {
  const { favorites, toggleFavorite } = useFavoriteStore();
  const offerIdStr = offer.id.toString(); // միշտ string
  const isFavorite = favorites.includes(offerIdStr);

  return (
    <div className="h-[370px] w-[330px] rounded-[10px] shadow-[4px_4px_10px_rgba(0,0,0,0.25)] relative">
      <img
        className="h-[250px] w-[330px] rounded-[10px]"
        src={offer.image}
        alt={offer.location}
      />

      {/* Favorites Heart */}
      <i
        className={`fa-heart absolute top-2 right-2 cursor-pointer text-2xl ${isFavorite ? "fa-solid text-red-500" : "fa-regular text-black"
          }`}
        onClick={() => toggleFavorite(offerIdStr)}
      ></i>

      <img src={icons.location} className="relative top-[10px] left-[10px]" alt="location" />
      <span className="relative top-[-12px] left-[40px] font-medium">{offer.location}</span>

      <img src={icons.users} className="relative top-[-40px] left-[160px]" alt="users" />
      <span className="relative top-[-65px] left-[190px] font-medium">{offer.people}</span>

      {offer.hasGazar && (
        <img src={icons.gazaraguyn} className="relative top-[290px] left-[260px]" alt="gazaraguyn" />
      )}
      <img src={icons.pitak} className={offer.className} alt="pitak" />
      <span className={offer.class}>{offer.price}</span>
    </div>
  );
};

export default BestOfferItem;
