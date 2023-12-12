// Register.js
import React, { useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

const RegisterModal = ({ setActiveModal }) => {
  const [isShow, isShowModal] = useState(true);
  const closeRegisterModal = () => {
    setActiveModal("");
    isShowModal(false);
  };
  const [user, setUser] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/register",
        user
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={closeRegisterModal}>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-3">
          <form onSubmit={handleSubmit} className="register-form">
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                required
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
