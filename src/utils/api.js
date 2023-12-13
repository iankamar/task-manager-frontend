import axios from "axios";

const API_URL = "https://657661050febac18d403d9cd.mockapi.io/api/v1";
const TODOIST_API_TOKEN = "2b61d8158074902ceca67b61794de3fda171840d";

export const handleServerResponse = (res) => {
  console.log(process.env.NODE_ENV, API_URL);
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const request = (url, options) => {
  return fetch(url, options).then(handleServerResponse);
};

const headers = {
  Authorization: `Bearer ${TODOIST_API_TOKEN}`,
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
