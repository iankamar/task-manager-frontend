import React, { useEffect, useState } from "react";
import Task from "../Task/Task";
import "./TaskList.css";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getTaskList } from "../../utils/taskApi";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await getTaskList();
        setTasks(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="container mt-3 task-list-container">
      <h2>Task List</h2>
      <div className="row my-3">
        <div className="col-12">
          <Link to="/create-task" className="btn btn-primary">
            Create
          </Link>
        </div>
      </div>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        tasks.map((task, index) => <Task key={index} task={task} />)
      )}
    </div>
  );
};

export default TaskList;
