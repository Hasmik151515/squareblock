// App.tsx
import React, { useState, useEffect, ReactElement } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/header";
import UserList from "./components/UserList";
import MessageList from "./components/MessageList";

import './index.css';
import './App.css';

export default function App(): ReactElement {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userUid, setUserUid] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
      setUserUid(user.uid);
      setUserEmail(user.email);
      setIsLoggedIn(true);
      localStorage.setItem("userEmail", user.email || "");
    } else {
      setUserUid(null);
      setUserEmail(null);
      setIsLoggedIn(false);
      localStorage.removeItem("userEmail");

    }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = (email: string, uid?: string): void => {
    localStorage.setItem("userEmail", email);
    setUserEmail(email);
    if (uid) {
      setUserUid(uid);
    }
    setIsLoggedIn(true);
  };

  const handleLogout = (): void => {
    auth.signOut();
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    setUserUid(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn && userEmail ? (
              <Home onLogout={handleLogout} userEmail={userEmail} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/register"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Register onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/users"
          element={
            isLoggedIn && userUid ? (
              <UserList
                currentUserUid={userUid}
                onSelectUser={(user) => {
                  navigate(`/chat/${user.uid}`);
                }}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/chat/:chatId"
          element={
            isLoggedIn ? (
              <MessageList />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </>
  );
}
