import React from "react";
import { houseTypes } from "../data/houseTypes";

interface HouseType {
  label: string;
  image: string;
  className?: string;
}

const HouseTypes: React.FC = () => (
  <div className="absolute top-[210px] left-[450px] h-[90px] w-[1020px] border-t border-b border-[#E5E7EB] flex overflow-x-auto whitespace-nowrap gap-5">
    {houseTypes.map((type: HouseType, idx: number) => (
      <div key={idx} className="items-center grid justify-center">
        <img className={type.className} src={type.image} alt={type.label} />
        <p className="hau2">{type.label}</p>
      </div>
    ))}
  </div>
);

export default HouseTypes;
