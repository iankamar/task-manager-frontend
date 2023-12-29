import React, { useState } from "react";
// import axios from "axios";
import { Alert, Modal } from "react-bootstrap";

const RegisterModal = ({ setActiveModal, handleRegistration, registerErr }) => {
  const handleClose = () => {
    setActiveModal("");
  };

  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

/*
import React, { useState } from "react";
import { Alert, Modal } from "react-bootstrap";

const RegisterModal = ({ setActiveModal, handleRegistration }) => {
  const handleClose = () => {
    setActiveModal("");
  };

  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (typeof handleRegistration !== "function") {
        console.error(
          "handleRegistration is not a function. Received:",
          handleRegistration
        );
        throw new Error("handleRegistration is not a function");
      }

      handleRegistration(user);

      setErrorMsg("");
      handleClose();
    } catch (error) {
      let errorMessage = "Error registering user";

      if (error && error.message) {
        errorMessage = error.message;
      }

      setErrorMsg(errorMessage);
      console.error("Error registering user:", errorMessage);
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
            {errorMsg && (
              <Alert variant="danger">
                <div className="alert-body">
                  <span>{`Error: ${errorMsg}`}</span>
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
*/
