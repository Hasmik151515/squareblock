import React from "react";
import verj from "../assets/verj.png";
import { Link } from "react-router-dom";

const LastPart: React.FC = () => {
  return (
   <div>
     <div className="relative w-[1550px] top-[1050px] h-[440px] bg-[#101623]">
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
     <Link to="/group" className="text-orange-400 underline">
        Գնալ Group Chat
      </Link>
   </div>
  );
};

export default LastPart;
