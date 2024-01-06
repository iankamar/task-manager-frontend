import { request } from "../utils/api";
const API_URL = "https://api-iankamar-taskmanager.azurewebsites.net/api";

//my deployed backend url https://api-iankamar-taskmanager.azurewebsites.net
/*
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api-iankamar-taskmanager.azurewebsites.net/api"
    : "http://localhost:3001/api";
*/

const handleServerResponse = (res) => {
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

const handleError = (error) => {
  console.error("An error occurred:", error);
  return Promise.reject(error.message || error);
};

export const makeRequest = (url, options) => {
  return fetch(url, options).then(handleServerResponse).catch(handleError);
};

export const register = ({ email, password, name }) => {
  return request(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
};

export const login = async ({ email, password }) => {
  try {
    const response = await request(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return response;
  } catch (err) {
    console.error(err);
    if (err.status === 400) {
      return Promise.reject({ message: "Invalid credentials" });
    } else {
      return Promise.reject({ message: "An error occurred during login" });
    }
  }
};

export const getUser = () => {
  return request(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const updateUser = (name, avatar, token) => {
  return request(`${API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
};

export const authorize = (email, password) => {
  return request(`${API_URL}/signin`, {
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
