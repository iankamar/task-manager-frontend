import React, { useState } from "react";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useNavigate, Link } from "react-router-dom";
import { createTask } from "../../utils/taskApi";
import classnames from "classnames";
import { Alert } from "react-bootstrap";

const CreateTask = ({ onCloseModal }) => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "in-progress",
  });

  const [errors, setErrors] = useState({});
  const [taskAlert, setTaskAlert] = useState("");

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (task.title.trim() === "") {
      newErrors.title = "Title is required";
    }
    if (task.description.trim() === "") {
      newErrors.description = "Description is required";
    }
    if (task.dueDate.trim() === "") {
      newErrors.dueDate = "Due date is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await createTask(task);
        onCloseModal();
        navigate("/tasks");
      } catch (error) {
        setTaskAlert(error);
        console.error("Error creating task:", error);
      }
    }
  };

  return (
    <ModalWithForm
      title="Create Task"
      onSubmit={handleSubmit}
      onClose={onCloseModal}
      showCloseButton={false}
    >
      {taskAlert && (
        <Alert variant="danger">
          <div className="alert-body">
            <span>{`${taskAlert}`}</span>
          </div>
        </Alert>
      )}
      <label className="form-label">
        Title:
        <input
          type="text"
          name="title"
          value={task.title}
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
          value={task.description}
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
          value={task.dueDate}
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
    </ModalWithForm>
  );
};

export default CreateTask;
