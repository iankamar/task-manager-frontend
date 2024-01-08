import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../contexts/Authcontext";
//import { AuthContext } from "../../contexts/Authcontext";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Task from "../Task/Task";
import CreateTask from "../CreateTask/CreateTask";
import DeleteTask from "../DeleteTask/DeleteTask";
import UpdateTask from "../UpdateTask/UpdateTask";
import TaskList from "../TaskList/TaskList";
import { createTask, deleteTask, updateTask } from "../../utils/taskApi";
import { register, login } from "../../utils/authApi";
import { useNavigate } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import Home from "../Home/home";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const NavigationComponent = ({
  tasks,
  setTasks,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState("");
  const [selectedTask, setSelectedTask] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginErr, setLoginErr] = useState("");
  const [registerErr, setRegisterErr] = useState("");

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

  const handleRegistration = ({ email, password, name }) => {
    register({ email, password, name })
      .then((res) => {
        console.log("Registration response:", res);
        if (res.token) {
          localStorage.setItem("token", res.token);
          setIsLoggedIn(true);
          setRegisterErr("");
          handleCloseModal();
          navigate("/tasks");
        } else if (res.message !== "User successfully registered") {
          setRegisterErr(res.message);
        }
      })
      .catch((err) => {
        console.log("Registration response:", err);
        setRegisterErr(err.message);
      });
  };

  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((res) => {
        console.log("Login response:", res);
        if (res.token) {
          localStorage.setItem("token", res.token);
          setIsLoggedIn(true);
          setLoginErr("");
          handleCloseModal();
          navigate("/tasks");
        } else {
          setLoginErr(res.message);
        }
      })
      .catch((err) => {
        console.log("Login response:", err);
        setLoginErr(err.message);
      });
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
        handleLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={<Register onRegister={handleRegistration} />}
        />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <TaskList tasks={tasks} onTaskClick={handleSelectedTask} />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-task"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <CreateTask
                onCloseModal={handleCloseModal}
                onAddTask={handleCreateTask}
                isLoading={isLoading}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-task/:taskId"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <UpdateTask
                task={selectedTask}
                onCloseModal={handleCloseModal}
                onUpdateTask={handleUpdateTask}
                isLoading={isLoading}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/delete-task/:taskId"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <DeleteTask
                task={selectedTask}
                onCloseModal={handleCloseModal}
                onDeleteTask={handleDeleteTask}
                isLoading={isLoading}
              />
            </PrivateRoute>
          }
        />
      </Routes>

      {activeModal === "preview" && (
        <Task task={selectedTask} onCloseModal={handleCloseModal} />
      )}
      {activeModal === "login" && (
        <LoginModal
          onCloseModal={handleCloseModal}
          loginErr={loginErr}
          handleLogin={handleLogin}
        />
      )}
      {activeModal === "register" && (
        <RegisterModal
          onCloseModal={handleCloseModal}
          registerErr={registerErr}
          handleRegistration={handleRegistration}
        />
      )}
      <Footer />
    </>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const currentUser = {
    tasks,
    setTasks,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AuthProvider>
      <CurrentUserContext.Provider value={currentUser}>
        <HashRouter>
          <NavigationComponent
            tasks={tasks}
            setTasks={setTasks}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        </HashRouter>
      </CurrentUserContext.Provider>
    </AuthProvider>
  );
};

export default App;
