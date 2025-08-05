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
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (email: string): void => {
    localStorage.setItem("userEmail", email);
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = (): void => {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    setIsLoggedIn(false);
  };

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Home onLogout={handleLogout} userEmail={userEmail} /> : <Navigate to="/login" replace />
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
