// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check Authentication on Page Reload
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_ROUTE}/auth/check`, {
        withCredentials: true, // Ensure cookies are sent
      });
      setUser(response.data.user);
      console.log("User authenticated:", response.data.user);
    } catch (error) {
      console.log("User not authenticated:", error.response?.data?.error || error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Run this on initial load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (loading) {
    return (
      <>
      <div className="h-screen w-screen bg-blue-600 flex justify-center items-center">
        <h1 className="font-display text-5xl text-white">Loading...</h1>
      </div>
      </>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};