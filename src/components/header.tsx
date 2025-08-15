import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import { useFavoriteStore } from "../store/favoritesStore";

interface MenuItem {
  label: string;
  className?: string;
}

const Header: React.FC = () => {
  const [headerMenu, setHeaderMenu] = useState<MenuItem[]>([]);
  const navigate = useNavigate();
  const { favorites } = useFavoriteStore();

  useEffect(() => {
    fetch("https://amaranoc4-default-rtdb.firebaseio.com/headerMenu.json")
      .then((res) => res.json())
      .then((data) => setHeaderMenu(data))
      .catch((err) => console.error("Fetch headerMenu error:", err));
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="grid grid-cols-[310px_240px_100px_100px_100px_349px_60px_30px_270px] h-[93.2px] relative">

      {/* Logo */}
      <div className="flex justify-center items-center">
        <img
          className="h-11 w-40"
          src="https://amaranoc.am/images/logo.svg"
          alt="logo"
        />
      </div>

      {/* Header Menu */}
      <HeaderMenu menuItems={headerMenu} />

      {/* Globe icon */}
      <div className="flex justify-end items-center">
        <i className="fa-solid fa-globe text-black"></i>
      </div>

      {/* User icon */}
      <div
        className="flex justify-center items-center cursor-pointer"
        onClick={handleLoginClick}
      >
        <i className="fa-regular fa-user text-black"></i>
      </div>
      <div
        className="flex justify-center items-center relative cursor-pointer"
        onClick={() => navigate("/favorites")} // navigate դեպի Favorites էջ
      >
        <i className="fa-regular fa-heart text-[19px]"></i>

      </div>
      {/* Search input */}
      <div className="flex justify-start items-center relative">
        <input
          className="h-[34px] w-[200px] rounded-full text-[#101623] border border-[#101623] px-2 text-[15px]"
          type="text"
          placeholder="Search"
        />
        <i className="fa-solid fa-magnifying-glass absolute left-[1440px] text-[#101623] text-[13px]"></i>
      </div>


    </div>
  );
};

export default Header;
