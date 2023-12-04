import axios from "axios";

const API_URL = "https://api.todoist.com/rest/v1";
const TODOIST_API_TOKEN = "2b61d8158074902ceca67b61794de3fda171840d";

const headers = {
  Authorization: `Bearer ${TODOIST_API_TOKEN}`,
  "Content-Type": "application/json",
};

const api = axios.create({
  baseURL: API_URL,
  headers,
});

export const fetchTasks = () => api.get("/tasks");
export const createTask = (taskData) => api.post("/tasks", taskData);
export const updateTask = (taskId, updatedTaskData) =>
  api.post(`/tasks/${taskId}`, updatedTaskData);
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`);

export default api;
