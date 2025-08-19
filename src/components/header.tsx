import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import { useFavoriteStore } from "../store/favoritesStore";

interface MenuItem {
  label: string;
  className?: string;
}

const Header: React.FC = () => {
  const [headerMenu, setHeaderMenu] = useState<MenuItem[]>([]);
  const [showSticky, setShowSticky] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  const lastScrollY = useRef(0); // store previous scroll position

  const navigate = useNavigate();
  const { favorites } = useFavoriteStore();

  useEffect(() => {
    fetch("https://amaranoc4-default-rtdb.firebaseio.com/headerMenu.json")
      .then((res) => res.json())
      .then((data) => setHeaderMenu(data))
      .catch((err) => console.error("Fetch headerMenu error:", err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY.current) {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        setShowSticky(true);

        const timeout = setTimeout(() => {
          setShowSticky(false);
        }, 100);
        setScrollTimeout(timeout);
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [scrollTimeout]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full bg-white shadow-md transition-transform duration-500 z-50 ${showSticky ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="grid grid-cols-[310px_240px_100px_100px_100px_349px_60px_30px_270px] h-[93.2px]">
          <div className="flex justify-center items-center">
            <img
              className="h-11 w-40"
              src="https://amaranoc.am/images/logo.svg"
              alt="logo"
            />
          </div>

          <HeaderMenu menuItems={headerMenu} />

          <div className="flex justify-end items-center">
            <i className="fa-solid fa-globe text-black"></i>
          </div>

          <div
            className="flex justify-center items-center cursor-pointer"
            onClick={handleLoginClick}
          >
            <i className="fa-regular fa-user text-black"></i>
          </div>

          <div
            className="flex justify-center items-center relative cursor-pointer"
            onClick={() => navigate("/favorites")}
          >
            <i className="fa-regular fa-heart text-[19px]"></i>
            {favorites.length > 0 && (
              <span className="absolute -top-2  bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex justify-center items-center">
                {favorites.length}
              </span>
            )}
          </div>

          <div className="flex justify-start items-center relative">
            <input
              className="h-[34px] w-[200px] rounded-full text-[#101623] border border-[#101623] px-2 text-[15px]"
              type="text"
              placeholder="Search"
            />
            <i className="fa-solid fa-magnifying-glass absolute right-2 text-[#101623] text-[13px]"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[310px_240px_100px_100px_100px_349px_60px_30px_270px] h-[93.2px] relative">
        <div className="flex justify-center items-center">
          <img
            className="h-11 w-40"
            src="https://amaranoc.am/images/logo.svg"
            alt="logo"
          />
        </div>

        <HeaderMenu menuItems={headerMenu} />

        <div className="flex justify-end items-center">
          <i className="fa-solid fa-globe text-black"></i>
        </div>

        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={handleLoginClick}
        >
          <i className="fa-regular fa-user text-black"></i>
        </div>

        <div
          className="flex justify-center items-center relative cursor-pointer"
          onClick={() => navigate("/favorites")}
        >
          <i className="fa-regular fa-heart text-[19px]"></i>
          {favorites.length > 0 && (
            <span className="absolute top-[20px] -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex justify-center items-center">
              {favorites.length}
            </span>
          )}
        </div>

        <div className="flex justify-start items-center relative">
          <input
            className="h-[34px] w-[200px] rounded-full text-[#101623] border border-[#101623] px-2 text-[15px]"
            type="text"
            placeholder="Search"
          />
          <i className="fa-solid fa-magnifying-glass absolute right-2 text-[#101623] text-[13px]"></i>
        </div>
      </div>
    </>
  );
};

export default Header;
