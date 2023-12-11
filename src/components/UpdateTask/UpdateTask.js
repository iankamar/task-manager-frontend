// UpdateTask.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UpdateTask.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `https://657661050febac18d403d9cd.mockapi.io/api/v1/tasks/${taskId}`
        );
        setUpdatedTask({
          title: response.data.title,
          description: response.data.description,
          dueDate: response.data.dueDate,
          status: response.data.status,
        });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [taskId]);

  const handleChange = (e) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `https://657661050febac18d403d9cd.mockapi.io/api/v1/tasks/${taskId}`,
        updatedTask
      );
      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="container mt-3 update-task-container">
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
