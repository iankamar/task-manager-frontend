// ForgotPassword.js
import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:your-backend-port/api/forgot-password",
        { email }
      );
      console.log(response.data);
      // Optionally, show a success message to the user
    } catch (error) {
      console.error("Error sending forgot password email:", error);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="submit-btn">
          Send Reset Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
