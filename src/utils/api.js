/*
import axios from "axios";

const API_URL = "http://localhost:3001/todoist-proxy";
//const API_URL = "https://api.todoist.com/rest/v1";
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
  withCredentials: true,
});

export const getTaskList = () => api.get("/tasks");
export const createTask = (taskData) => api.post("/tasks", taskData);
export const updateTask = (taskId, updatedTaskData) =>
  api.post(`/tasks/${taskId}`, updatedTaskData);
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`);

export default api;
*/

// api.js
export const apiConfig = {
  // baseUrl: "https://iankamar.github.io/task-manager-frontend/",
  baseUrl: "https://api.todoist.com/rest/v2",
  headers: {
    authorization: "Bearer 2b61d8158074902ceca67b61794de3fda171840d",
    "Content-Type": "application/json",
  },
};

export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _handleResponse(res) {
    console.log(process.env.NODE_ENV, this.baseUrl);
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getTaskList() {
    return fetch(`${this.baseUrl}/tasks`, {
      headers: this.headers,
    }).then(this._handleResponse);
  }

  createTask(taskData) {
    return fetch(`${this.baseUrl}/tasks`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(taskData),
    }).then(this._handleResponse);
  }

  updateTask(taskId, updatedTaskData) {
    return fetch(`${this.baseUrl}/tasks/${taskId}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(updatedTaskData),
    }).then(this._handleResponse);
  }

  deleteTask(taskId) {
    return fetch(`${this.baseUrl}/tasks/${taskId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._handleResponse);
  }
}
