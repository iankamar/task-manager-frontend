import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { baseUrl } from "../../utils/authApi";

const Register = ({ onCloseModal }) => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let formErrors = { username: "", email: "", password: "" };
    let valid = true;

    if (!user.username.trim()) {
      formErrors.username = "Username is required";
      valid = false;
    }

    if (!user.email.trim()) {
      formErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      formErrors.email = "Email address is invalid";
      valid = false;
    }

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

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    try {
      const response = await fetch(`${baseUrl}/api/register`, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `Failed to register user. Status code: ${response.status}`
        );
      }

      console.log(data);
      if (data && data.success) {
        onCloseModal();
      } else {
        console.error("Error registering user:", data.error);
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
    >
      <label className="form-label">
        Username:
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
        />
        {errors.username && <p>{errors.username}</p>}
      </label>
      <label className="form-label">
        Email:
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p>{errors.email}</p>}
      </label>
      <label className="form-label">
        Password:
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p>{errors.password}</p>}
      </label>
      <button type="submit" className="form-button">
        Register
      </button>
    </ModalWithForm>
  );
};

export default Register;
