import React, { useEffect, useState } from "react";
import "./UpdateTask.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getTask, updateTask } from "../../utils/taskApi";

const UpdateTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [updatedTask, setUpdatedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTask(taskId);
        setUpdatedTask({
          title: response.title,
          description: response.description,
          dueDate: response.dueDate,
          status: response.status,
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
      await updateTask(taskId, updatedTask);
      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="container mt-3 update-task-container">
      <h2>Update Task</h2>
      {updatedTask && (
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
      )}
    </div>
  );
};

export default UpdateTask;
