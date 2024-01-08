import React from "react";
import "./Logout.css";
import { baseUrl } from "../../utils/authApi";

const Logout = () => {
  const handleLogout = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(`${baseUrl}/api/logout`, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Failed to log out. Status code: ${response.status}`);
      }

      console.log(data);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="logout-container">
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Logout;
