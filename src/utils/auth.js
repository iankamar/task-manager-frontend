import { request } from "../utils/api";

const baseUrl = "https://api-iankamar-taskmanager.azurewebsites.net/api";

export const register = async ({ email, password, name }) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  };

  try {
    const response = await fetch(`${baseUrl}/auth/signup`, requestOptions);

    if (!response.ok) {
      throw new Error(
        "Error: Error Signing up. Please check your credentials."
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error Register:", error.message);
    throw error;
  }
};

export const login = async ({ email, password }) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  try {
    const response = await fetch(`${baseUrl}/auth/signin`, requestOptions);

    if (!response.ok) {
      if (response.headers.get("content-type").includes("application/json")) {
        const data = await response.json();
        throw new Error(`Error logging in: ${data.message}`);
      } else {
        throw new Error("Error logging in. Please check your credentials.");
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

export const getUser = () => {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((data) => {
    return data;
  });
};

export const updateUser = (name, avatar, token) => {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
};

export const authorize = (email, password) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((data) => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      return data;
    }
  });
};
