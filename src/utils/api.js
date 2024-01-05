import axios from "axios";
const API_URL = "https://api-iankamar-taskmanager.azurewebsites.net/api";

//my deployed backend url https://api-iankamar-taskmanager.azurewebsites.net
/*
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api-iankamar-taskmanager.azurewebsites.net/api"
    : "http://localhost:3001/api";
*/
export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const request = (url, options) => {
  return fetch(url, options).then(handleServerResponse);
};

const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
};

export const getTaskList = async () => {
  const headers = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get(`${API_URL}/tasks`, headers);
  return response;
};

export const getTask = async (taskId) => {
  const headers = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get(`${API_URL}/tasks/${taskId}`, headers);
  return response;
};

export const createTask = async (taskData) => {
  const headers = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(`${API_URL}/tasks`, taskData, headers);
  return response;
};

export const updateTask = async (taskId, updatedTaskData) => {
  const headers = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.put(
    `${API_URL}/tasks/${taskId}`,
    updatedTaskData,
    headers
  );
  return response;
};

export const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API_URL}/tasks/${taskId}`, headers);
  return response;
};
