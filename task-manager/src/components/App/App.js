import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { saveProfile } from "./redux/actions/authActions";
import Register from "./Register";
import Login from "./Login";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    dispatch(saveProfile(token));
  }, [authState.isLoggedIn, dispatch]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={authState.isLoggedIn ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/tasks/add"
          element={
            authState.isLoggedIn ? (
              <TaskInput addTask={addTask} />
            ) : (
              <Navigate to="/login" state={{ redirectUrl: "/tasks/add" }} />
            )
          }
        />
        <Route
          path="/tasks/:taskId"
          element={
            authState.isLoggedIn ? (
              <TaskList tasks={tasks} />
            ) : (
              <Navigate
                to="/login"
                state={{ redirectUrl: window.location.pathname }}
              />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function TaskInput({ addTask }) {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addTask(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="task-input-field"
      />
      <button type="submit" className="submit-button">
        Add Task
      </button>
    </form>
  );
}

function TaskList({ tasks }) {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li key={index} className="task-item">
          {task}
        </li>
      ))}
    </ul>
  );
}

export default App;
