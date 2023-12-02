// CreateTask.js
import React, { useState } from "react";
import axios from "axios";
import "./CreateTask.css";

const CreateTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "in-progress",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:your-backend-port/api/tasks",
        task
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="create-task-container">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Status:
          <select name="status" value={task.status} onChange={handleChange}>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <button type="submit" className="submit-btn">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
