// Task.js
import React from "react";
import "./Task.css";

const Task = ({ task }) => {
  return (
    <div className="task-container">
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      <div className="task-details">
        <p>
          <strong>Due Date:</strong> {task.dueDate}
        </p>
        <p>
          <strong>Status:</strong> {task.status}
        </p>
        {/* Additional details */}
      </div>
      {/* ... Display other task details */}
    </div>
  );
};

export default Task;
