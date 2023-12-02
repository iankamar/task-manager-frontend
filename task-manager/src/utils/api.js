import axios from "axios";

const API_URL = "https://api.todoist.com/rest/v1";
const TODOIST_API_TOKEN = "YOUR_TODOIST_API_TOKEN"; // Replace with my actual Todoist API token

const headers = {
  Authorization: `Bearer ${TODOIST_API_TOKEN}`,
  "Content-Type": "application/json",
};

const api = axios.create({
  baseURL: API_URL,
  headers,
});

// Todoist Tasks API
export const fetchTasks = () => api.get("/tasks");
export const createTask = (taskData) => api.post("/tasks", taskData);
export const updateTask = (taskId, updatedTaskData) =>
  api.post(`/tasks/${taskId}`, updatedTaskData);
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`);

export default api;
