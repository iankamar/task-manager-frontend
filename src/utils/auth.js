import { request } from "../utils/api";

const baseUrl = "https://api-iankamar-taskmanager.azurewebsites.net/api";

//my deployed backend url https://api-iankamar-taskmanager.azurewebsites.net
/*
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api-iankamar-taskmanager.azurewebsites.net/api"
    : "http://localhost:3001/api";
*/
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
    const data = await response.json();

    if (!response.ok) {
      return data;
    }

    return data;
  } catch (error) {
    console.error("Error Register:", error);
    return error;
  }
};

export const login = ({ email, password }) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${baseUrl}/auth/signin`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(`${data.message}`);
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      return error;
    });
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
