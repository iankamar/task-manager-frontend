// api.js
export const apiConfig = {
  baseUrl: "https://api.todoist.com/rest/v2",
  headers: {
    authorization: "9d038fa32583784d3857e4bf3c43abae419d005c",
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
