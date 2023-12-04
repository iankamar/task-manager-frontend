import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { fetchTasks } from "../../utils/api";

import "./App.css";

// Define the AuthContext
export const AuthContext = createContext();

// Define the useAuth hook
export function useAuth() {
  return useContext(AuthContext);
}

// Define the AuthProvider component
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);

  const saveProfile = async (token) => {
    try {
      const response = await fetchTasks();

      if (!response.ok) {
        throw new Error("Profile fetch failed");
      }

      const profile = await response.json();
      setProfile(profile);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setIsLoggedIn(true);
    saveProfile(token);
  }, []);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    profile,
    saveProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function App() {
  const [tasks, setTasks] = useState([]);
  const { isLoggedIn } = useAuth();

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/" /> : <Register />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/tasks/add"
            element={
              isLoggedIn ? (
                <TaskInput addTask={addTask} />
              ) : (
                <Navigate to="/login" state={{ redirectUrl: "/tasks/add" }} />
              )
            }
          />
          <Route
            path="/tasks/:taskId"
            element={
              isLoggedIn ? (
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
