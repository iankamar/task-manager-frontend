// DeleteTask.js
import React from "react";
import axios from "axios";
import "./DeleteTask.css";

const DeleteTask = ({ taskId }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:your-backend-port/api/tasks/${taskId}`
      );
      console.log(response.data);
      // Optionally, redirect or update the state after successful task deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="delete-task-container">
      <button onClick={handleDelete} className="delete-btn">
        Delete Task
      </button>
    </div>
  );
};

export default DeleteTask;
