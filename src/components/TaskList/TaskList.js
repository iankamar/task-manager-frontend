// TaskList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Task from "../Task/Task";
import "./TaskList.css";
import { Spinner } from "react-bootstrap";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://657661050febac18d403d9cd.mockapi.io/api/v1/tasks"
        );
        setTasks(response.data);
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
          <a href="/create-task" className="btn btn-primary">
            Create
          </a>
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
/*
/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import Task from "../Task/Task";
import "./TaskList.css";
import { Spinner } from "react-bootstrap";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const createTask = () => {
    setTasks([{}, ...tasks]);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://657661050febac18d403d9cd.mockapi.io/api/v1/tasks"
        );
        setTasks(response.data);
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
          <button onClick={createTask} className="btn btn-primary">
            Create
          </button>
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
*/
/*
// TaskList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Task from "../Task/Task";
import "./TaskList.css";
import { Spinner } from "react-bootstrap";
import { createTask as createTaskApi } from "../../utils/api";
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const createTask = async () => {
    setLoading(true);
    try {
      await createTaskApi({}, (newTask) => {
        setTasks([newTask, ...tasks]);
        setLoading(false);
      });
    } catch (error) {
      console.error("Error creating task:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://657661050febac18d403d9cd.mockapi.io/api/v1/tasks"
        );
        setTasks(response.data);
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
          <button onClick={createTask} className="btn btn-primary">
            Create
          </button>
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
*/
