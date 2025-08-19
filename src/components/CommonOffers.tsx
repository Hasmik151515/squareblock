import React from "react";
import { commonOffers } from "../data/offer";
import { icons } from "../data/icons";
import BestOfferItem from "./BestOfferItem";

interface CommonOffersProps {
    columns: number; // 2 կամ 3
}

const CommonOffers: React.FC<CommonOffersProps> = ({ columns }) => {
    // Dynamic grid class ըստ columns
    const gridCols = columns === 2 ? "grid-cols-[500px_500px]" : "grid-cols-[330px_330px_330px]";

    // Dynamic position ըստ columns
    const leftPos = "left-[470px]";
    const topPos = columns === 2 ? "top-[1950px]" : "top-[1600px]";

    return (
        <div>
            <p className={`absolute ${leftPos} ${topPos} font-semibold text-[17px]`}>
                Common Offers
            </p>

            <div className={`grid gap-4 mt-10 w-[1020px] absolute ${leftPos} ${topPos} ${gridCols}`}>
                {commonOffers.map((offer, index) => {
                    const specialStyle =
                        columns === 2 && index === 8 // 9-րդը (index 8)
                            ? "opacity-0 pointer-events-none"
                            : "";

                    return (
                        <div key={index} className={specialStyle}>
                            <BestOfferItem offer={offer} icons={icons} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CommonOffers;
