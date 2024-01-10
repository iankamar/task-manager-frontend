import React from "react";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useNavigate, useParams, Link } from "react-router-dom";
import { deleteTask } from "../../utils/taskApi";

const DeleteTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteTask(taskId);
      navigate("/tasks");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <ModalWithForm
      title="Delete Task"
      onSubmit={handleDelete}
      onClose={navigate}
      showCloseButton={false}
    >
      <button type="submit" className="delete-btn">
        Delete Task
      </button>
      <Link to="/tasks" className="btn btn-secondary">
        Back to Task List
      </Link>
    </ModalWithForm>
  );
};

export default DeleteTask;
