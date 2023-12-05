import React, { useState, useEffect, createContext, useContext } from "react";
import { fetchTasks } from "../utils/api";
/* export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
*/

// Define the AuthContext
export const AuthContext = createContext();

// Define the useAuth hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

// Define the AuthProvider component
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);

  const saveProfile = async (token) => {
    try {
      const response = await fetchTasks();

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
    if (!token) return;
    setIsLoggedIn(true);
    saveProfile(token);
  }, []);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    profile,
    saveProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
