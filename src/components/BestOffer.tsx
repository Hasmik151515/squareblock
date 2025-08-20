import React, { useEffect, useState } from "react";
import { bestOffers } from "../data/offer";
import { icons } from "../data/icons";
import BestOfferItem from "./BestOfferItem";

interface BestOfferProps {
  columns: number; // 2 կամ 3
}

const BestOffer: React.FC<BestOfferProps> = ({ columns }) => {
  const [loading, setLoading] = useState(true);

  // Էջը refresh անելուց հետո 1 վայրկյան loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 վայրկյան

    return () => clearTimeout(timer);
  }, []);

  const gridCols =
    columns === 2
      ? "grid-cols-[500px_500px]"
      : "grid-cols-[330px_330px_330px]";

  if (loading) {
    return (
      <div className="absolute top-[400px] left-[470px] w-[1020px] grid gap-[15px] animate-pulse grid-cols-3">
        {Array.from({ length: bestOffers.length }).map((_, index) => (
          <div
            key={index}
            className="h-[250px] w-[330px] bg-gray-300 rounded-[10px]"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <p className="absolute left-[470px] top-[330px] font-semibold text-[17px]">
        Best Offers
      </p>

      <div
        className={`absolute top-[400px] left-[470px] w-[1020px] grid gap-[15px] ${gridCols}`}
      >
        {bestOffers.map((offer, index) => {
          // 9-րդ div-ի համար հատուկ class
          const specialStyle =
            columns === 2 && index === 8
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

export default BestOffer;
