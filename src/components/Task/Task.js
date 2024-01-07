import React from "react";
import { Link } from "react-router-dom";
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
      <div className="task-btn-group">
        {/* Use Link for update and delete buttons */}
        <Link to={`/update-task/${task._id}`} className="task-update">
          Update
        </Link>
        <Link to={`/delete-task/${task._id}`} className="task-delete">
          Delete
        </Link>
      </div>
      {/* ... Display other task details */}
    </div>
  );
};

export default Task;
