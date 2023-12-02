// TaskList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Task from "./Task";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:your-backend-port/api/tasks"
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="task-list-container">
      <h2>Task List</h2>
      {tasks.map((task) => (
        <Task key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
