/*
import React, { useEffect, useState } from "react";
import Main from "../Main/Main";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { AuthProvider } from "../../contexts/Authcontext";
import { AuthContext } from "../../contexts/Authcontext";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Task from "../Task/Task";
import CreateTask from "../CreateTask/CreateTask";
import DeleteTask from "../DeleteTask/DeleteTask";
import UpdateTask from "../UpdateTask/UpdateTask";
import TaskList from "../TaskList/TaskList";

import {
  getTaskList,
  createTask,
  deleteTask,
  updateTask,
} from "../../utils/api";
import { register, login } from "../../utils/auth";
import "./App.css";
import LoginModal from "../LoginModal/LoginModal";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import RegisterModal from "../RegisterModal/RegisterModal";

const NavigationComponent = ({ tasks, setTasks }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [activeModal, setActiveModal] = useState("");
  const [selectedTask, setSelectedTask] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedTask = (task) => {
    setActiveModal("preview");
    setSelectedTask(task);
  };

  const handleDeleteTask = (selectedTask) => {
    setIsLoading(true);
    deleteTask(selectedTask.id)
      .then(() => {
        const updatedTasks = tasks.filter(
          (task) => task.id !== selectedTask.id
        );
        setTasks(updatedTasks);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Error deleting task:", err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleCreateTask = (task) => {
    setIsLoading(true);
    createTask(task)
      .then((addedTask) => {
        setTasks([addedTask, ...tasks]);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Error creating task:", err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleUpdateTask = (task) => {
    setIsLoading(true);
    updateTask(task)
      .then((updatedTask) => {
        const updatedTasks = tasks.map((t) =>
          t.id === updatedTask.id ? updatedTask : t
        );
        setTasks(updatedTasks);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Error updating task:", err);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getTaskList()
      .then((taskList) => {
        setTasks(taskList);
      })
      .catch((error) => console.error(error));
  }, [setTasks]);

  const handleRegistration = ({ email, password }) => {
    register({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setIsLoggedIn(true);
          navigate("/tasks");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setIsLoggedIn(true);
          navigate("/tasks");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const openRegisterModal = () => {
    setActiveModal("register");
  };

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        openLoginModal={openLoginModal}
        openRegisterModal={openRegisterModal}
      />

      <Routes>
        <Route
          path="/register"
          element={<Register onRegister={handleRegistration} />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/tasks"
          element={<TaskList tasks={tasks} onTaskClick={handleSelectedTask} />}
        />
        <Route
          path="/create-task"
          element={
            <CreateTask
              onCloseModal={handleCloseModal}
              onAddTask={handleCreateTask}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/update-task/:taskId"
          element={
            <UpdateTask
              task={selectedTask}
              onCloseModal={handleCloseModal}
              onUpdateTask={handleUpdateTask}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/delete-task/:taskId"
          element={
            <DeleteTask
              task={selectedTask}
              onCloseModal={handleCloseModal}
              onDeleteTask={handleDeleteTask}
              isLoading={isLoading}
            />
          }
        />
        <Route path="/task-manager-frontend" element={<Main />} />
      </Routes>

      {activeModal === "preview" && (
        <Task task={selectedTask} onCloseModal={handleCloseModal} />
      )}
      {activeModal === "login" && (
        <LoginModal setActiveModal={setActiveModal} />
      )}
      {activeModal === "register" && (
        <RegisterModal setActiveModal={setActiveModal} />
      )}
      <Footer />
    </>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);

  return (
    <AuthProvider>
      <AuthContext.Provider value={tasks}>
        <Router>
          <NavigationComponent tasks={tasks} setTasks={setTasks} />
        </Router>
      </AuthContext.Provider>
    </AuthProvider>
  );
};

export default App;
*/

import React, { useEffect, useState } from "react";
import Main from "../Main/Main";
import { HashRouter, Route, Routes, useNavigate } from "react-router-dom";
import { AuthProvider } from "../../contexts/Authcontext";
import { AuthContext } from "../../contexts/Authcontext";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Task from "../Task/Task";
import CreateTask from "../CreateTask/CreateTask";
import DeleteTask from "../DeleteTask/DeleteTask";
import UpdateTask from "../UpdateTask/UpdateTask";
import TaskList from "../TaskList/TaskList";

import {
  getTaskList,
  createTask,
  deleteTask,
  updateTask,
} from "../../utils/api";
import { register, login } from "../../utils/auth";
import "./App.css";
import LoginModal from "../LoginModal/LoginModal";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import RegisterModal from "../RegisterModal/RegisterModal";

const NavigationComponent = ({ tasks, setTasks }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [activeModal, setActiveModal] = useState("");
  const [selectedTask, setSelectedTask] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedTask = (task) => {
    setActiveModal("preview");
    setSelectedTask(task);
  };

  const handleDeleteTask = (selectedTask) => {
    setIsLoading(true);
    deleteTask(selectedTask.id)
      .then(() => {
        const updatedTasks = tasks.filter(
          (task) => task.id !== selectedTask.id
        );
        setTasks(updatedTasks);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Error deleting task:", err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleCreateTask = (task) => {
    setIsLoading(true);
    createTask(task)
      .then((addedTask) => {
        setTasks([addedTask, ...tasks]);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Error creating task:", err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleUpdateTask = (task) => {
    setIsLoading(true);
    updateTask(task)
      .then((updatedTask) => {
        const updatedTasks = tasks.map((t) =>
          t.id === updatedTask.id ? updatedTask : t
        );
        setTasks(updatedTasks);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Error updating task:", err);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getTaskList()
      .then((taskList) => {
        setTasks(taskList);
      })
      .catch((error) => console.error(error));
  }, [setTasks]);

  const handleRegistration = ({ email, password }) => {
    register({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setIsLoggedIn(true);
          navigate("/tasks");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setIsLoggedIn(true);
          navigate("/tasks");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const openRegisterModal = () => {
    setActiveModal("register");
  };

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        openLoginModal={openLoginModal}
        openRegisterModal={openRegisterModal}
      />

      <Routes>
        <Route
          path="/register"
          element={<Register onRegister={handleRegistration} />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/tasks"
          element={<TaskList tasks={tasks} onTaskClick={handleSelectedTask} />}
        />
        <Route
          path="/create-task"
          element={
            <CreateTask
              onCloseModal={handleCloseModal}
              onAddTask={handleCreateTask}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/update-task/:taskId"
          element={
            <UpdateTask
              task={selectedTask}
              onCloseModal={handleCloseModal}
              onUpdateTask={handleUpdateTask}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/delete-task/:taskId"
          element={
            <DeleteTask
              task={selectedTask}
              onCloseModal={handleCloseModal}
              onDeleteTask={handleDeleteTask}
              isLoading={isLoading}
            />
          }
        />
        <Route path="/" element={<Main />} />
      </Routes>

      {activeModal === "preview" && (
        <Task task={selectedTask} onCloseModal={handleCloseModal} />
      )}
      {activeModal === "login" && (
        <LoginModal setActiveModal={setActiveModal} />
      )}
      {activeModal === "register" && (
        <RegisterModal setActiveModal={setActiveModal} />
      )}
      <Footer />
    </>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);

  return (
    <AuthProvider>
      <AuthContext.Provider value={tasks}>
        <HashRouter>
          <NavigationComponent tasks={tasks} setTasks={setTasks} />
        </HashRouter>
      </AuthContext.Provider>
    </AuthProvider>
  );
};

export default App;
