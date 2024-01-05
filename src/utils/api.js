const API_URL = "https://api-iankamar-taskmanager.azurewebsites.net/api";

//my deployed backend url https://api-iankamar-taskmanager.azurewebsites.net
/*
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api-iankamar-taskmanager.azurewebsites.net/api"
    : "http://localhost:3001/api";
export const handleServerResponse = (res) => {
 return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};
*/
export const request = (url, options) => {
  return fetch(url, options).then(handleServerResponse);
};

export const getHeaders = (method) => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
      method: method,
    },
  };
};

export const getTaskList = async () => {
  const response = await request(`${API_URL}/tasks`, {
    method: "GET",
    headers: getHeaders("GET"),
  });
  return response;
};

export const getTask = async (taskId) => {
  const response = await request(`${API_URL}/tasks/${taskId}`, {
    method: "GET",
    headers: getHeaders("GET"),
  });
  return response;
};

export const createTask = async (taskData) => {
  const response = await request(`${API_URL}/tasks`, {
    method: "POST",
    headers: getHeaders("POST"),
    body: JSON.stringify(taskData),
  });
  return response;
};

export const updateTask = async (taskId, updatedTaskData) => {
  const response = await request(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: getHeaders("PUT"),
    body: JSON.stringify(updatedTaskData),
  });
  return response;
};

export const deleteTask = async (taskId) => {
  const response = await request(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: getHeaders("DELETE"),
  });
  return response;
};
