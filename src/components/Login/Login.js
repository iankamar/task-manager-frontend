import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const Login = ({ handleLogin, onCloseModal }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!credentials.email) formErrors.email = "Email is required";
    if (!credentials.password) formErrors.password = "Password is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      handleLogin(credentials);
      onCloseModal(); // Close the modal after successful login
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <ModalWithForm title="Login" onSubmit={handleSubmit} onClose={onCloseModal}>
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={credentials.email}
        onChange={handleChange}
        required
      />
      {errors.email && <div className="error">{errors.email}</div>}

      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        required
        autoComplete="on"
      />
      {errors.password && <div className="error">{errors.password}</div>}

      <button type="submit" className="submit-btn">
        Login
      </button>
    </ModalWithForm>
  );
};

export default Login;
