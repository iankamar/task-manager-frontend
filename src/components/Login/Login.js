import React, { useState } from "react";
import "./Login.css";

const Login = ({ setIsLoggedIn }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const checkTokenValidity = async (token) => {
    try {
      const response = await fetch("http://localhost:3001/api/check-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      return data.isValid;
    } catch (error) {
      console.error("Error checking token validity:", error);
      return false;
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.token) {
        const isValidToken = await checkTokenValidity(data.token);

        if (isValidToken) {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
        } else {
          setError("Invalid or expired token. Please log in again.");
        }
      } else {
        setError("Invalid username or password.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred during login.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="submit-btn">
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
