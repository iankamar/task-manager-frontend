import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  isOpen,
  handleCloseModal,
  handleLogin,
  handleToggleModal,
  showFormError,
  isLoading,
}) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isFormFilled, setIsFormFilled] = useState(false);
  const history = useNavigate();

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
    setIsFormFilled(credentials.email !== "" && credentials.password !== "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(credentials.email, credentials.password);
    history.push("/profile");
  };

  return (
    <ModalWithForm
      className="modal__title"
      isOpen={isOpen}
      type="login"
      title="Log in"
      buttonText={
        isLoading ? "Loading..." : isFormFilled ? " Log in" : "Log in"
      }
      onCloseModal={handleCloseModal}
      onSubmit={handleSubmit}
    >
      <label className={showFormError ? "modal__labelError" : "modal__label"}>
        {showFormError ? "Incorrect email or password" : "Email"}
        <input
          className={showFormError ? "modal__inputError" : "modal__input"}
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          name="email"
          required
        />
      </label>
      <label className={showFormError ? "modal__labelError" : "modal__label"}>
        {showFormError ? "Incorrect email or password" : "Password"}
        <input
          className={showFormError ? "modal__inputError" : "modal__input"}
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          name="password"
          required
        />
      </label>
      <button
        type="button"
        className="modal__register"
        onClick={handleToggleModal}
      >
        or Register
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
