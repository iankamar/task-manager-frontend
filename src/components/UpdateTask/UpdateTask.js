import React, { useEffect, useState } from "react";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getTask, updateTask } from "../../utils/taskApi";
import { Alert } from "react-bootstrap";
import classnames from "classnames";

const UpdateTask = ({ onCloseModal }) => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
  });

  const [errors, setErrors] = useState({});
  const [taskAlert, setTaskAlert] = useState("");

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
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (updatedTask.title.trim() === "") {
      newErrors.title = "Title is required";
    }
    if (updatedTask.description.trim() === "") {
      newErrors.description = "Description is required";
    }
    if (updatedTask.dueDate.trim() === "") {
      newErrors.dueDate = "Due date is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await updateTask(taskId, updatedTask);
        onCloseModal();
        setTimeout(() => {
          navigate("/tasks");
        }, 0);
      } catch (error) {
        setTaskAlert(error.message || "An error occurred");
        console.error("Error updating task:", error);
      }
    }
  };

  return (
    <ModalWithForm
      title="Update Task"
      onSubmit={handleUpdate}
      onClose={onCloseModal}
      showCloseButton={false}
      errors={taskAlert && <Alert variant="danger">{taskAlert}</Alert>}
    >
      {updatedTask && (
        <>
          <label className="form-label">
            Title:
            <input
              type="text"
              name="title"
              value={updatedTask.title}
              onChange={handleChange}
              className={`form-input ${classnames({
                "is-invalid": errors.title,
              })}`}
            />
            {errors.title && (
              <span className="small text-danger">{errors.title}</span>
            )}
          </label>
          <label className="form-label">
            Description:
            <textarea
              name="description"
              value={updatedTask.description}
              onChange={handleChange}
              className={`form-textarea ${classnames({
                "is-invalid": errors.description,
              })}`}
            />
            {errors.description && (
              <span className="small text-danger">{errors.description}</span>
            )}
          </label>
          <label className="form-label">
            Due Date:
            <input
              type="date"
              name="dueDate"
              value={updatedTask.dueDate}
              onChange={handleChange}
              className={`form-input ${classnames({
                "is-invalid": errors.dueDate,
              })}`}
            />
            {errors.dueDate && (
              <span className="small text-danger">{errors.dueDate}</span>
            )}
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
        </>
      )}
    </ModalWithForm>
  );
};

export default UpdateTask;
