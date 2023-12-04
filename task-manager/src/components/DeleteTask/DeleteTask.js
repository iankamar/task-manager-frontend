// DeleteTask.js
import React from "react";
import axios from "axios";
import "./DeleteTask.css";

const DeleteTask = ({ taskId }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/tasks/${taskId}`
      );
      console.log(response.data);
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
