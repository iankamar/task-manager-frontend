const API_URL = "https://api-iankamar-taskmanager.azurewebsites.net/api";

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
  return fetch(API_URL + url, options)
    .then(handleServerResponse)
    .catch(handleError);
};
