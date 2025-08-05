import React from "react";

const MapCal: React.FC = () => {
  return (
    <div>
      <div className="absolute top-[120px] left-[450px] h-[45.2px] w-[108px] border rounded-[40px] grid grid-cols-[54px_54px] items-center">
        <div className="relative left-[20px]">Map</div>
        <div className="relative left-[10px]">
          <i className="fa-regular fa-map"></i>
        </div>
      </div>

      <div className="absolute top-[120px] left-[570px] h-[45.2px] w-[45.2px] border rounded-[40px] grid justify-center items-center">
        <i className="fa-regular fa-calendar"></i>
      </div>
    </div>
  );
};

export default MapCal;
