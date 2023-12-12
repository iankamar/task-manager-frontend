import React, { useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

const LoginModal = ({ setActiveModal }) => {
  const handleClose = () => {
    setActiveModal("");
  };

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        credentials
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-3">
          <form onSubmit={handleSubmit} className="login-form">
            <label>
              Email:
              <input
                type="email"
                name="email"
                className="form-control"
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
                className="form-control"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;
