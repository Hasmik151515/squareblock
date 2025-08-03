import React from "react";

interface Offer {
  id: number | string;
  image: string;
  location: string;
  people: number;
  hasGazar?: boolean;
  className?: string;
  class?: string;
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

const CommonOffersItem: React.FC<CommonOffersItemProps> = ({ offer, icons }) => (
  <div className="arajin2">
    <img className="nr" src={offer.image} alt={offer.location} />
    <img src={icons.location} className="location" alt="location" />
    <span className="Bjni">{offer.location}</span>
    <img src={icons.users} className="users" alt="users" />
    <span className="qanak">{offer.people}</span>
    {offer.hasGazar && (
      <img src={icons.gazaraguyn} className="gazar" alt="gazaraguyn" />
    )}
    <img src={icons.pitak} className={offer.className} alt="pitak" />
    <span className={offer.class}>{offer.price}</span>
  </div>
);

export default CommonOffersItem;
