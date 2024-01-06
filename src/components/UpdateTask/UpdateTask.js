import React, { useEffect, useState } from "react";
import "./UpdateTask.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getTask, updateTask } from "../../utils/api";

const UpdateTask = ({ handleCloseModal }) => {
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
        const response = await getTask(taskId);
        setUpdatedTask(response.data);
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
      await updateTask(taskId, updatedTask);
      // Close modal only after a successful server response
      handleCloseModal();
      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
      // Handle error and potentially keep the modal open for user corrections
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
        <Link to="/tasks" className="btn btn-secondary">
          Back to Task List
        </Link>
      </form>
    </div>
  );
};

export default UpdateTask;
