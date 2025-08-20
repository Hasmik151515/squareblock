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
import SearchResults from "../components/SearchResults";
import SearchInput from "../components/SearchInput";
interface HomeProps {
  onLogout: () => void;
  userEmail: string | null;
}

const Home: React.FC<HomeProps> = ({ onLogout, userEmail }) => {
  const [currentUserUid, setCurrentUserUid] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState<number>(3);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const onToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    async function fetchUid() {
      if (!userEmail) return;
      const usersSnapshot = await getDocs(collection(db, "users"));
      const currentUser = usersSnapshot.docs.find(
        (doc) => doc.data().email === userEmail
      );
      if (currentUser) setCurrentUserUid(currentUser.data().uid);
      setLoading(false);
    }

    fetchUid();
  }, [userEmail]);

  return (
    <div>
      {/* Search input */}
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Show search results or normal content */}
      {searchTerm ? (
        <SearchResults searchTerm={searchTerm} />
      ) : (
        <>
          <ParentDiv />
          <MapCal />
          <HouseTypes />
          <Squareblock setColumns={setColumns} />
          <BestOffer columns={columns} />
          <CommonOffers columns={columns} />
          <Pagination columns={columns} />
          <Footer columns={columns} />
          <LastPart columns={columns} />
        </>
      )}

      {/* Logout button */}
      <div className="p-5">
        <button
          onClick={onLogout}
          className=" absolute"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
