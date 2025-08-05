import React from "react";
import ParentDiv from "../components/parentDiv";
import MapCal from "../components/mapCal";
import HouseTypes from "../components/HouseTypes";
import BestOffer from "../components/BestOffer"; 
import CommonOffers from "../components/CommonOffers";
import Pagination from "../components/Pagination";
import Footer from "../components/footer";
import LastPart from "../components/LastPart";



interface HomeProps {
  onLogout: () => void;
  userEmail: string | null;
}

export default function Home({ onLogout  }: HomeProps) {
  return (
    <div>
      <button onClick={onLogout} className="relative top-[2850px] ">Logout</button>
      
      <ParentDiv />
      <MapCal />
      <HouseTypes />
      <BestOffer /> 
      <CommonOffers />
      <Pagination />
      <Footer />
      <LastPart />
    </div>
  );
}
