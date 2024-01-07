import { request } from "./api";

const API_URL = "https://api-iankamar-taskmanager.azurewebsites.net/api";

export const register = ({ email, password, name }) => {
  return request(`${API_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
};

export const login = async ({ email, password }) => {
  const response = await request(`${API_URL}/auth/signin`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return response;
};

export const getUser = () => {
  return request(`${API_URL}/users/me`, {
    method: "GET",
  });
};

export const updateUser = (name, avatar, token) => {
  return request(`${API_URL}/users/me`, {
    method: "PATCH",
    body: JSON.stringify({ name, avatar }),
  });
};
