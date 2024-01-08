import React, { useEffect, useState } from "react";
import "../ModalWithForm/ModalWithForm.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getTask, updateTask } from "../../utils/taskApi";

const UpdateTask = ({ onCloseModal }) => {
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
        setUpdatedTask({
          title: response.title || "",
          description: response.description || "",
          dueDate: response.dueDate || "",
          status: response.status || "",
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
      onCloseModal();
      setTimeout(() => {
        navigate("/tasks");
      }, 0);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <span className="close-btn" onClick={onCloseModal}>
          &times;
        </span>
        <h2>Update Task</h2>
        {updatedTask && (
          <form onSubmit={handleUpdate}>
            <label className="form-label">
              Title:
              <input
                type="text"
                name="title"
                value={updatedTask.title}
                onChange={handleChange}
                className="form-input"
                required
              />
            </label>
            <label className="form-label">
              Description:
              <textarea
                name="description"
                value={updatedTask.description}
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
                value={updatedTask.dueDate}
                onChange={handleChange}
                className="form-input"
                required
              />
            </label>
            <label className="form-label">
              Status:
              <select
                name="status"
                value={updatedTask.status}
                onChange={handleChange}
                className="form-select"
              >
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </label>
            <button type="submit" className="form-button">
              Update Task
            </button>
            <Link to="/tasks" className="btn btn-secondary">
              Back to Task List
            </Link>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateTask;
