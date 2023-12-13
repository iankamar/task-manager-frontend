/*
import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./DeleteTask.css";

const DeleteTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://657661050febac18d403d9cd.mockapi.io/api/v1/tasks/${taskId}`
      );
      navigate("/tasks");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container mt-3 delete-task-container">
      <button onClick={handleDelete} className="delete-btn">
        Delete Task
      </button>
    </div>
  );
};

export default DeleteTask;
*/
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./DeleteTask.css";

const DeleteTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://657661050febac18d403d9cd.mockapi.io/api/v1/tasks/${taskId}`
      );
      navigate("/tasks");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container mt-3 delete-task-container">
      <button onClick={handleDelete} className="delete-btn">
        Delete Task
      </button>
      <Link to="/tasks" className="btn btn-secondary">
        Back to Task List
      </Link>
    </div>
  );
};

export default DeleteTask;
