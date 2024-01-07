import React, { useState } from "react";
import { Alert, Modal } from "react-bootstrap";

const RegisterModal = ({ onCloseModal, handleRegistration, registerErr }) => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!user.name) formErrors.name = "Name is required";
    if (!user.email) formErrors.email = "Email is required";
    if (!user.password) formErrors.password = "Password is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      handleRegistration(user);
      onCloseModal();
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <>
      <Modal show={true} onHide={onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-3">
          <form onSubmit={handleSubmit} className="register-form">
            {registerErr && (
              <Alert variant="danger">
                <div className="alert-body">
                  <span>{`Error: ${registerErr}`}</span>
                </div>
              </Alert>
            )}
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                required
                autoComplete="new-name"
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
                autoComplete="new-email"
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </label>
            <button type="submit" className="submit-btn">
              Register
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterModal;
