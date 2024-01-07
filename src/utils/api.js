const handleServerResponse = async (response) => {
  if (!response.ok) {
    try {
      const error = await response.json();
      console.error("Server responded with an error:", error);
      throw new Error(`HTTP error! status: ${response.status}`);
    } catch (jsonError) {
      console.error("Non-JSON response:", await response.text());
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
  return response.json();
};

const handleError = (error) => {
  console.error("An error occurred:", error);
  return Promise.reject(error.message || error);
};

export const request = (url, options) => {
  return fetch(url, { ...options, mode: "cors" })
    .then(handleServerResponse)
    .catch(handleError);
};
