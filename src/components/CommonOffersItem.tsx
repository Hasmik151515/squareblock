import React, { useState } from "react";

interface Offer {
  id: string | number;
  image: string;
  location: string;
  people: number;
  hasGazar?: boolean;
  price: string | number;
}

interface Icons {
  location: string;
  users: string;
  gazaraguyn: string;
  pitak: string;
}

interface CommonOffersItemProps {
  offer: Offer;
  icons: Icons;
}

const CommonOffersItem: React.FC<CommonOffersItemProps> = ({ offer, icons }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="relative h-[370px] w-[330px] rounded-lg shadow-[4px_4px_10px_rgba(0,0,0,0.25)]">
      <img
        src={offer.image}
        alt={offer.location}
        className="h-[250px] w-[330px] rounded-[10px]"
      />

      {/* Favorites heart */}
      <i
        className={`fa-heart absolute top-2 right-2 text-2xl cursor-pointer ${isFavorite ? "fa-solid text-red-500" : "fa-regular text-black"
          }`}
        onClick={() => setIsFavorite(!isFavorite)}
      ></i>

      {/* Location */}
      <img src={icons.location} alt="location" className="relative top-[10px] left-[10px]" />
      <span className="relative top-[-12px] left-[40px] font-medium">{offer.location}</span>

      {/* People */}
      <img src={icons.users} alt="users" className="relative top-[-40px] left-[160px]" />
      <span className="relative top-[-65px] left-[190px] font-medium">{offer.people}</span>

      {/* Gazar */}
      {
        offer.hasGazar && (
          <img
            src={icons.gazaraguyn}
            alt="gazaraguyn"
            className="absolute bottom-10 right-4 w-6 h-6"
          />
        )
      }

      {/* Pitak */}
      <img src={icons.pitak} alt="pitak" className="absolute bottom-2 left-2 w-6 h-6" />
      <span className="relative left-[20px] top-[15px] text-[20px] leading-[28px] font-normal tracking-normal text-[#585e6d] font-impact">{offer.price}</span>
    </div >
  );
};

export default CommonOffersItem;
