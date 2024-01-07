import { request } from "./api";

const API_URL = "https://api-iankamar-taskmanager.azurewebsites.net/api";

export const getTaskList = async () => {
  const response = await request(`${API_URL}/tasks`);
  return response;
};

export const getTask = async (taskId) => {
  const response = await request(`${API_URL}/tasks/${taskId}`);
  return response;
};

export const createTask = async (taskData) => {
  const response = await request(`${API_URL}/tasks`, {
    method: "POST",
    body: JSON.stringify(taskData),
  });
  return response;
};

export const updateTask = async (taskId, updatedTaskData) => {
  const response = await request(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(updatedTaskData),
  });
  return response;
};

export const deleteTask = async (taskId) => {
  const response = await request(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
  });
  return response;
};
