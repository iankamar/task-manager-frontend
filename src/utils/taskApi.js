import { request } from "./api";

// const API_URL = "https://task-manager-backend-nc497uynq-iankamars-projects.vercel.app/api";
// const API_URL = "http://localhost:3001/api";

const API_URL = process.env.NODE_ENV === 'production'
  ? "https://task-manager-backend-nc497uynq-iankamars-projects.vercel.app/api"
  : "http://localhost:3001/api";


export const getTaskList = async () => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  return await request(`${API_URL}/tasks`, {
    method: "GET",
    headers: headers,
  });
};

export const getTask = async (taskId) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  return await request(`${API_URL}/tasks/${taskId}`, {
    method: "GET",
    headers: headers,
  });
};

export const createTask = async (taskData) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  return await request(`${API_URL}/tasks`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(taskData),
  });
};

export const updateTask = async (taskId, updatedTaskData) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  return await request(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(updatedTaskData),
  });
};

export const deleteTask = async (taskId) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  return await request(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: headers,
  });
};
