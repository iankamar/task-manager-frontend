import React, { useState } from "react";
import { Alert, Modal } from "react-bootstrap";

const LoginModal = ({ setActiveModal, handleLogin, loginErr }) => {
  const handleClose = () => {
    setActiveModal("");
  };

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      console.error("Error logging in: Both fields are required.");
      return;
    }

    try {
      handleLogin(credentials);
      handleClose();
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
