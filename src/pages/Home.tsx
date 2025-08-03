import React from "react";
import ParentDiv from "../components/parentDiv";
import MapCal from "../components/mapCal";
// import HouseTypes from "../components/HouseTypes";
// import BestOffer from "../components/BestOffer"; 
// import CommonOffers from "../components/CommonOffers";
// import Pagination from "../components/Pagination";
// import Footer from "../components/footer";
// import LastPart from "../components/lastPart";



interface HomeProps {
  onLogout: () => void;
}

export default function Home({ onLogout }: HomeProps) {
  return (
    <div>
      <h1>Welcome Home!</h1>
      <button onClick={onLogout}>Logout</button>
      
           <ParentDiv />
      <MapCal />
      {/* <HouseTypes /> */}
      {/* <BestOffer />  */}
      {/* <CommonOffers /> */}
      {/* <Pagination /> */}
      {/* <Footer /> */}
      {/* <LastPart /> */}
    </div>
  );
}
