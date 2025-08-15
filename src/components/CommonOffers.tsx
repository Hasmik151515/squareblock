import React from "react";
import { commonOffers } from "../data/offer";
import { icons } from "../data/icons";
import BestOfferItem from "./BestOfferItem";

const CommonOffers: React.FC = () => {
    return (
        <div>
            <p className="absolute left-[470px] top-[1580px] font-semibold text-[17px]">Common Offers</p >

            <div className="grid grid-cols-3 gap-4 mt-10 w-[1020px] absolute left-[470px] top-[1600px]">
                {commonOffers.map((offer, index) => (
                    <BestOfferItem key={index} offer={offer} icons={icons} />
                ))}
            </div >
        </div >
    );
};

export default CommonOffers;

