import React, { useState } from "react";
import { Alert, Modal } from "react-bootstrap";

const RegisterModal = ({ setActiveModal, handleRegistration, registerErr }) => {
  const handleClose = () => {
    setActiveModal("");
  };

  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = { name: "", email: "", password: "" };
    let valid = true;

    // Validate name
    if (!user.name.trim()) {
      formErrors.name = "Name is required";
      valid = false;
    }

    // Validate email
    if (!user.email.trim()) {
      formErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      formErrors.email = "Email address is invalid";
      valid = false;
    }

    // Validate password
    if (!user.password) {
      formErrors.password = "Password is required";
      valid = false;
    } else if (user.password.length < 6) {
      formErrors.password = "Password needs to be 6 characters or more";
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      handleRegistration(user);
      handleClose();
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <>
      <Modal show={true} onHide={handleClose}>
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
              {errors.name && <p>{errors.name}</p>}
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
              {errors.email && <p>{errors.email}</p>}
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
              {errors.password && <p>{errors.password}</p>}
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
