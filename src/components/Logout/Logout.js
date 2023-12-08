// Logout.js
import React from "react";
import axios from "axios";
import "./Logout.css";

const Logout = () => {
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/logout");
      console.log(response.data);
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
