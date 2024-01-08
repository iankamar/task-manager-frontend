import React, { useState } from "react";
import "./CreateTask.css";
import { useNavigate, Link } from "react-router-dom";
import { createTask } from "../../utils/taskApi";

const CreateTask = () => {
  const navigate = useNavigate();
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
      await createTask(task);

      navigate("/tasks");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="container mt-3 create-task-container">
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
        <Link to="/tasks" className="btn btn-secondary">
          Back to Task List
        </Link>
      </form>
    </div>
  );
};

export default CreateTask;
