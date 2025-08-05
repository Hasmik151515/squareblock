import React, { useState, useEffect, ReactElement } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/header";
import './index.css';
import './App.css';


export default function App(): ReactElement {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (email: string): void => {
    localStorage.setItem("userEmail", email);
    setIsLoggedIn(true);
  };

  const handleLogout = (): void => {
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
  };

  return (
    
    <>
      {/* Այստեղ ենք դնում Header-ը, որ ամեն էջի վրա լինի */}
      <Header />

      {/* Սա պահում ենք Routes-ի համար */}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/register"
          element={
            isLoggedIn ? <Navigate to="/" replace /> : <Register />

          }
        />
      </Routes>
    </>
  );
}

