import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "api-iankamar-taskmanager.azurewebsites.net"
    : "http://localhost:3001";

export const handleServerResponse = (res) => {
  console.log(process.env.NODE_ENV, API_URL);
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const request = (url, options) => {
  return fetch(url, options).then(handleServerResponse);
};

const headers = {
  "Content-Type": "application/json",
};

const api = axios.create({
  baseURL: API_URL,
  headers,
});

export const getTaskList = () => api.get("/tasks");
export const createTask = (taskData) => api.post("/tasks", taskData);
export const updateTask = (taskId, updatedTaskData) =>
  api.post(`/tasks/${taskId}`, updatedTaskData);
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`);

export default api;
