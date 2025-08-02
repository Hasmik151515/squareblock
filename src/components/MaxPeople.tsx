import React, { useState } from "react";

const MaxPeople: React.FC = () => {
  const [peopleCount, setPeopleCount] = useState<number>(0);



  const handleMinus = () => {
    if (peopleCount > 0) setPeopleCount(peopleCount - 1);
  };

  const handlePlus = () => {
    setPeopleCount(peopleCount + 1);
  };

  return (
    <div className="absolute top-[550px] left-[120px]">
      <p className="text-[16px] font-medium">Max people count</p>
      <div className=" relative top-[20px] left-[0px] h-[40px] w-[40px] bg-gray-200 rounded-full flex justify-center items-center font-medium cursor-pointer" onClick={handleMinus}>-</div>
      <input className="relative top-[-25px] left-[60px] w-[70px] p-3 rounded-[10px] border  border-gray-200 font-medium" type="number" value={peopleCount} readOnly />
      <div className="relative top-[-70px] left-[150px] h-[40px] w-[40px] bg-gray-200 rounded-full flex justify-center items-center font-medium cursor-pointer" onClick={handlePlus}>+</div>
    </div>
  );
};
export default MaxPeople;
