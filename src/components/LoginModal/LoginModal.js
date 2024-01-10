import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { Alert } from "react-bootstrap";

const LoginModal = ({ onCloseModal, handleLogin, loginErr }) => {
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

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      handleLogin(credentials);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <ModalWithForm
      title="Login"
      onSubmit={handleSubmit}
      onClose={onCloseModal}
      errors={loginErr}
    >
      {loginErr && (
        <Alert variant="danger">
          <div className="alert-body">
            <span>{`Error: ${loginErr}`}</span>
          </div>
        </Alert>
      )}
      <label>
        Email:
        <input
          type="email"
          name="email"
          className="form-control"
          value={credentials.email}
          onChange={handleChange}
          required
          autoComplete="current-email"
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          className="form-control"
          value={credentials.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </label>
      <button type="submit" className="form-button">
        Login
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
