import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { AuthProvider, useAuth } from "../../contexts/Authcontext";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const auth = useAuth();

  if (auth.isLoggedIn === undefined) {
    return <div>Loading...</div>;
  }

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signup"
            element={auth.isLoggedIn ? <Navigate to="/" /> : <Register />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/tasks/add"
            element={
              auth.isLoggedIn ? (
                <TaskInput addTask={addTask} />
              ) : (
                <Navigate to="/login" state={{ redirectUrl: "/tasks/add" }} />
              )
            }
          />
          <Route
            path="/tasks/:taskId"
            element={
              auth.isLoggedIn ? (
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
    </AuthProvider>
  );
}

function TaskInput({ addTask }) {
  const [input, setInput] = useState("");
  const { isLoggedIn } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    addTask(input);
    setInput("");
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ redirectUrl: "/tasks/add" }} />;
  }

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
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <Navigate to="/login" state={{ redirectUrl: window.location.pathname }} />
    );
  }

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
