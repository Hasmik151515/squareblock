import React, { ReactElement } from "react";

const PriceFilter = (): ReactElement => (
  <div className="price-filter">
    <p className="absolute size-16 font-normal top-[430px] left-[120px]">Price</p>
    <div className="absolute top-[425px] left-[180px] border border-1-blue rounded-full h-9 w-9 flex font-medium justify-center items-center bg-black text-white">Դ</div>
    <div className="absolute top-[425px] left-[230px] border border-1-blue rounded-full h-9 w-9 flex justify-center items-center"><i className="fa-solid fa-dollar-sign"></i></div>
    <div className="absolute top-[425px] left-[280px] border border-1-blue rounded-full h-9 w-9 flex justify-center items-center"><i className="fa-solid fa-euro-sign"></i></div>
    <div className="absolute top-[425px] left-[330px] border border-1-blue rounded-full h-9 w-9 flex justify-center items-center"><i className="fa-solid fa-ruble-sign"></i></div>

    <input
      className="absolute top-[480px] left-[120px] rounded-[10px] p-2 h-11 w-[90px] border border-gray-200"
      type="text"
      placeholder="From"
    />
    <p className="absolute left-[230px] top-[480px] text-[25px] font-medium">-</p>
    <input
      className="absolute top-[480px] left-[260px] rounded-[10px] p-2 h-11 w-[90px] border border-gray-200"
      type="text"
      placeholder="To"
    />
  </div>
);

export default PriceFilter;
