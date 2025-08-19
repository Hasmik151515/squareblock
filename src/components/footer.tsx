import React from "react";
import nkar from "../assets/Screenshot 2025-07-07 203347.png";

interface FooterProps {
  columns: number; // 2 կամ 3
}

const Footer: React.FC<FooterProps> = ({ columns }) => {
  // Եթե 2 column է, նոր top-position = 1400px, եթե 3 column է, սովորական top
  const topPosition = columns === 2 ? 1800 : 1050;

  return (
    <div className="relative h-[600px] w-[1550px]" style={{ top: `${topPosition}px` }}>
      <img className="nkar2" src={nkar} alt="Footer" />
    </div>
  );
};

export default Footer;
