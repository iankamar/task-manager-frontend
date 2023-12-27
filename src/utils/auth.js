import { request } from "../utils/api";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api-iankamar-taskmanager.azurewebsites.net"
    : "http://localhost:3001";

export const register = async ({ email, password }) => {
  try {
    const response = await request(`${baseUrl}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return response;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await request(`${baseUrl}/api/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await request(`${baseUrl}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Get user error:", error);
    throw error;
  }
};

export const updateUser = async (name, token) => {
  try {
    const response = await request(`${baseUrl}/api/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    return response;
  } catch (error) {
    console.error("Update user error:", error);
    throw error;
  }
};

export const authorize = async (email, password) => {
  try {
    const response = await request(`${baseUrl}/api/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.token) {
      localStorage.setItem("token", response.token);
    }
    return response;
  } catch (error) {
    console.error("Authorization error:", error);
    throw error;
  }
};
