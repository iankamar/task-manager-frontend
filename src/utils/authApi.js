import { request } from "./api";

// export const baseUrl = "https://task-manager-backend-livid.vercel.app";
export const baseUrl = "http://localhost:3001/api";

export const register = async ({ email, password, name }) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  };
  return await request(`${baseUrl}/auth/signup`, requestOptions);
};

export const login = async ({ email, password }) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };
  return await request(`${baseUrl}/auth/signin`, requestOptions);
};

export const getUser = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await request(`${baseUrl}/users/me`, requestOptions);
};

export const updateUser = async (name, avatar, token) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  };
  return await request(`${baseUrl}/users/me`, requestOptions);
};

export const authorize = async (email, password) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };
  const data = await request(`${baseUrl}/signin`, requestOptions);
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
};

export const checkToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await request(`${baseUrl}/auth/checkToken`, requestOptions);
  if (data.status === "error") {
    throw new Error(data.message);
  }
  return data;
};
