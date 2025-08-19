import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import ParentDiv from "../components/parentDiv";
import MapCal from "../components/mapCal";
import HouseTypes from "../components/HouseTypes";
import Squareblock from "../components/Squareblock";
import BestOffer from "../components/BestOffer";
import CommonOffers from "../components/CommonOffers";
import Pagination from "../components/Pagination";
import Footer from "../components/footer";
import LastPart from "../components/LastPart";

interface HomeProps {
  onLogout: () => void;
  userEmail: string | null;
}

interface User {
  uid: string;
  email?: string;
}

const Home: React.FC<HomeProps> = ({ onLogout, userEmail }) => {
  const [currentUserUid, setCurrentUserUid] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Columns state (2 կամ 3)
  const [columns, setColumns] = useState<number>(3);

  const navigate = useNavigate();

  const onToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    async function fetchUid() {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const currentUser = usersSnapshot.docs.find(
        (doc) => doc.data().email === userEmail
      );
      if (currentUser) setCurrentUserUid(currentUser.data().uid);
      setLoading(false);
    }

    if (userEmail) fetchUid();
  }, [userEmail]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[600px] w-[1500px]">
        <div className="h-[350px] w-[500px]">
          <img
            className="h-[350px] w-[500px]"
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
            alt="loading"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onLogout} className="relative top-[2850px]">
        Logout
      </button>

      <ParentDiv />
      <MapCal />
      <HouseTypes />

      {/* Squareblock changes columns */}
      <Squareblock setColumns={setColumns} />

      {/* BestOffer layout depends on columns */}
      <BestOffer columns={columns} />
      <CommonOffers columns={columns} />
      <Pagination columns={columns} />

      <Footer columns={columns} />

      <LastPart columns={columns} />
    </div>
  );
};

export default Home;
