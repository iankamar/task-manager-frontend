const API_URL = "https://api-iankamar-taskmanager.azurewebsites.net/api";

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const request = (url, options) => {
  return fetch(url, options).then(handleServerResponse);
};

export const getTaskList = async () => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch task list. Status code: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching the task list");
  }
};

export const getTask = async (taskId) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch the task. Status code: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching the task");
  }
};

export const createTask = async (taskData) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create the task. Status code: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while creating the task");
  }
};

export const updateTask = async (taskId, updatedTaskData) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(updatedTaskData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update the task. Status code: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while updating the task");
  }
};

export const deleteTask = async (taskId) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "DELETE",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete the task. Status code: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while deleting the task");
  }
};
