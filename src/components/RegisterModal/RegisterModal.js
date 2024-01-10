import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { Alert } from "react-bootstrap";

const RegisterModal = ({ onCloseModal, handleRegistration, registerErr }) => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!user.name.trim()) formErrors.name = "Name is required";
    if (!user.email.trim()) formErrors.email = "Email is required";
    if (!user.password.trim()) formErrors.password = "Password is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  /*
  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      handleRegistration(user);
      onCloseModal();
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  */
  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      const response = await handleRegistration(user);
      if (response) {
        if (response.success) {
          onCloseModal();
        }
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <ModalWithForm
      title="Register"
      onSubmit={handleSubmit}
      onClose={onCloseModal}
      errors={registerErr}
      closeModal={onCloseModal}
    >
      {registerErr && (
        <Alert variant="danger">
          <div className="alert-body">
            <span>{`Error: ${registerErr}`}</span>
          </div>
        </Alert>
      )}
      <label className="form-label">
        Name:
        <input
          type="text"
          name="name"
          className="form-control"
          value={user.name}
          onChange={handleChange}
          required
          autoComplete="new-name"
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </label>

      <label className="form-label">
        Email:
        <input
          type="email"
          name="email"
          className="form-control"
          value={user.email}
          onChange={handleChange}
          required
          autoComplete="new-email"
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </label>

      <label className="form-label">
        Password:
        <input
          type="password"
          name="password"
          className="form-control"
          value={user.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </label>

      {/* Other form fields */}
      <button type="submit" className="form-button">
        Register
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
