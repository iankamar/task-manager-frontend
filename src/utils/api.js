const API_URL = "https://api-iankamar-taskmanager.azurewebsites.net/api";

//my deployed backend url https://api-iankamar-taskmanager.azurewebsites.net
/*
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api-iankamar-taskmanager.azurewebsites.net/api"
    : "http://localhost:3001/api";
*/

const handleServerResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    console.error("Server responded with an error:", error);
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const handleError = (error) => {
  console.error("An error occurred:", error);
  return Promise.reject(error.message || error);
};

export const request = (url, options) => {
  return fetch(url, options).then(handleServerResponse).catch(handleError);
};

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export const getTaskList = async () => {
  const response = await request(`${API_URL}/tasks`, getHeaders());
  return response;
};

export const getTask = async (taskId) => {
  const response = await request(`${API_URL}/tasks/${taskId}`, getHeaders());
  return response;
};

export const createTask = async (taskData) => {
  const response = await request(`${API_URL}/tasks`, {
    method: "POST",
    headers: getHeaders().headers,
    body: JSON.stringify(taskData),
  });
  return response;
};

export const updateTask = async (taskId, updatedTaskData) => {
  const response = await request(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: getHeaders().headers,
    body: JSON.stringify(updatedTaskData),
  });
  return response;
};

export const deleteTask = async (taskId) => {
  const response = await request(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: getHeaders().headers,
  });
  return response;
};
