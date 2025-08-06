import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import ParentDiv from "../components/parentDiv";
import MapCal from "../components/mapCal";
import HouseTypes from "../components/HouseTypes";
import BestOffer from "../components/BestOffer"; 
import CommonOffers from "../components/CommonOffers";
import Pagination from "../components/Pagination";
import Footer from "../components/footer";

interface HomeProps {
  onLogout: () => void;
  userEmail: string | null;
}

interface User {
  uid: string;
  email?: string;
}

export default function Home({ onLogout, userEmail }: HomeProps) {
  const [currentUserUid, setCurrentUserUid] = useState("");
  const navigate = useNavigate();

  // ✅ Քո useEffect-ը ավելացրե՛ցի
  useEffect(() => {
    async function fetchUid() {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const currentUser = usersSnapshot.docs.find(
        (doc) => doc.data().email === userEmail
      );
      if (currentUser) {
        setCurrentUserUid(currentUser.data().uid); // կամ doc.id
      }
    }

    if (userEmail) {
      fetchUid();
    }
  }, [userEmail]);

  const handleSelectUser = (user: User) => {
    navigate(`/chat/${user.uid}`);
  };

  return (
    <div>
      <button onClick={onLogout} className="relative top-[2850px]">
        Logout
      </button>

      <ParentDiv />
      <MapCal />
      <HouseTypes />
      <BestOffer />
      <CommonOffers />
      <Pagination />
      <Footer />

     
    </div>
  );
}
