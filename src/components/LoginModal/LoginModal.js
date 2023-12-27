import React, { useState } from "react";
import { Alert, Modal } from "react-bootstrap";

const LoginModal = ({ setActiveModal, handleLogin, signinErr }) => {
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
      handleLogin(credentials);
    } catch (error) {
      console.error("Error logging in:", error.response.data);
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
            {signinErr && (
              <Alert variant="danger">
                <div className="alert-body">
                  <span>{`Error: ${signinErr}`}</span>
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
