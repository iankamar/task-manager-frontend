import React, { useState, useEffect, createContext, useContext } from "react";
import { getTaskList } from "../utils/taskApi";

export const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);

  const saveProfile = async (token) => {
    try {
      const response = await getTaskList();

      if (!response.ok) {
        throw new Error("Profile fetch failed");
      }

      const profile = await response.json();
      setProfile(profile);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      saveProfile(token);
    }
  }, []);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    profile,
    saveProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
