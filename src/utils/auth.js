import { request } from "../utils/api";
/*
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.iankamar-taskmanager.cbu.net"
    : "http://localhost:3001";
*/
const baseUrl = "https://657661050febac18d403d9cd.mockapi.io/api/v2";
const TODOIST_API_TOKEN = "2b61d8158074902ceca67b61794de3fda171840d";

export const register = ({ name, avatar, email, password }) => {
  console.log(process.env.NODE_ENV, baseUrl);
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

export const login = ({ email, password }) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
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
