import React, { useState } from "react";
import "../ModalWithForm/ModalWithForm.css";
import { useNavigate, Link } from "react-router-dom";
import { createTask } from "../../utils/taskApi";

const CreateTask = ({ onCloseModal }) => {
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
      onCloseModal();
      navigate("/tasks");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <span className="close-btn" onClick={onCloseModal}>
          &times;
        </span>
        <h2>Create Task</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-label">
            Title:
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label className="form-label">
            Description:
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              className="form-textarea"
              required
            />
          </label>
          <label className="form-label">
            Due Date:
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label className="form-label">
            Status:
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </label>
          <button type="submit" className="form-button">
            Create Task
          </button>
          <Link to="/tasks" className="btn btn-secondary">
            Back to Task List
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
