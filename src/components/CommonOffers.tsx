import React from "react";
import { commonOffers } from "../data/offer";
import { icons } from "../data/icons";
import BestOfferItem from "./BestOfferItem";

const CommonOffers: React.FC = () => {
    return (
        <div className="grid grid-cols-3 gap-4 mt-10">
            {commonOffers.map((offer, index) => (
                <BestOfferItem key={index} offer={offer} icons={icons} />
            ))}
        </div>
    );
};

export default CommonOffers;
