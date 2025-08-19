import React from "react";
import { bestOffers } from "../data/offer";
import { icons } from "../data/icons";
import BestOfferItem from "./BestOfferItem";

interface BestOfferProps {
  columns: number; // 2 կամ 3
}

const BestOffer: React.FC<BestOfferProps> = ({ columns }) => {
  const gridCols = columns === 2 ? "grid-cols-[500px_500px]" : "grid-cols-[330px_330px_330px]";

  return (
    <div>
      <p className="absolute left-[470px] top-[330px] font-semibold text-[17px]">
        Best Offers
      </p>

      <div className={`absolute top-[400px] left-[470px] w-[1020px] grid gap-[15px] ${gridCols}`}>
        {bestOffers.map((offer, index) => {
          // 9-րդ div-ի համար հատուկ class
          const specialStyle =
            columns === 2 && index === 8 // 9-րդը (index 8)
              ? "opacity-0 pointer-events-none" // uxxaki / քիչ թափանցիկ
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

export default BestOffer;
