import React from "react";
import verj from "../assets/verj.png";

interface LastPartProps {
  columns: number; // 2 կամ 3
}

const LastPart: React.FC<LastPartProps> = ({ columns }) => {
  // 2 column-ի դեպքում top բարձրացնենք
  const topPosition = columns === 2 ? 1700 : 1000;

  return (
    <div>
      <div
        className="relative w-[1550px] h-[440px] bg-[#101623]"
        style={{ top: `${topPosition}px` }}
      >
        <img
          className="w-[1550px] absolute top-[310px]"
          src="https://amaranoc.am/_next/image?url=%2Fimages%2Ffooter%2Ffooter-background.png&w=1920&q=75"
          alt="footer background"
        />
        <img
          className="absolute top-[50px] h-[200px] w-[85%] left-[100px]"
          src={verj}
          alt="verj section"
        />
      </div>
    </div>
  );
};

export default LastPart;
