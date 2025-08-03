import React from "react";
import { commonOffers } from "../data/offer";
import { icons } from "../data/icons";
import BestOfferItem from "./BestOfferItem";

const CommonOffers: React.FC = () => (
  <>
    <p className="absolute top-[1560px] left-[470px] font-semibold text-[17px]">
      Common offers
    </p>
    <div className="absolute top-[1620px] left-[470px] w-[1020px] grid gap-[15px] grid-cols-[330px_330px_330px] grid-rows-[370px_370px_370px]">
      {commonOffers.map((offer) => (
        <BestOfferItem key={offer.id} offer={offer} icons={icons} />
      ))}
    </div>
  </>
);

export default CommonOffers;
