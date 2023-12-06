// UpdateTask.js
import React, { useState } from "react";
import axios from "axios";
import "./UpdateTask.css";

const UpdateTask = ({ taskId }) => {
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
  });

  const handleChange = (e) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:your-backend-port/api/tasks/${taskId}`,
        updatedTask
      );
      console.log(response.data);
      // Optionally, you can redirect or update the state after successful task update
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="update-task-container">
      <h2>Update Task</h2>
      <form onSubmit={handleUpdate} className="update-task-form">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={updatedTask.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={updatedTask.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={updatedTask.dueDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Status:
          <select
            name="status"
            value={updatedTask.status}
            onChange={handleChange}
          >
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <button type="submit" className="update-btn">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
