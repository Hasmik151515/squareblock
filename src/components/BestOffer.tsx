import React from "react";
import { bestOffers } from "../data/offer";
import { icons } from "../data/icons";
import BestOfferItem from "./BestOfferItem";

const BestOffer: React.FC = () => {
  return (
    <>
      <p className="absolute left-[470px] top-[330px] font-semibold text-[17px]">
        Best offers
      </p>
      <div className="absolute top-[400px] left-[470px] w-[1020px] grid gap-[15px] grid-cols-[330px_330px_330px] grid-rows-[370px_370px_370px]">
        {bestOffers.map((offer, index) => (
          <BestOfferItem key={index} offer={offer} icons={icons} />
        ))}
      </div>
    </>
  );
};

export default BestOffer;
