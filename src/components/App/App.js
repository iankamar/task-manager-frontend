import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
import { AuthRoute } from "../../contexts/AuthRoute";
import {
  getTaskList,
  createTask,
  deleteTask,
  updateTask,
} from "../../utils/api";
import { register, login } from "../../utils/auth";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedTask, setSelectedTask] = useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  // navigate("/home");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedTask = (task) => {
    setActiveModal("preview");
    setSelectedTask(task);
  };

  const handleDeleteTask = (selectedTask) => {
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
    const handleTaskRequest = () => {
      return createTask(task).then((addedTask) => {
        setTasks([addedTask, ...tasks]);
      });
    };

    handleSubmit(handleTaskRequest);
  };

  const handleUpdateTask = (task) => {
    const handleTaskRequest = () => {
      return updateTask(task).then((updatedTask) => {
        const updatedTasks = tasks.map((t) =>
          t.id === updatedTask.id ? updatedTask : t
        );
        setTasks(updatedTasks);
      });
    };

    handleSubmit(handleTaskRequest);
  };

  const handleSubmit = (request) => {
    setIsLoading(true);

    request()
      .then(handleCloseModal)
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getTaskList()
      .then((taskList) => {
        setTasks(taskList);
      })
      .catch((error) => console.error(error));
  }, []);

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

  return (
    <AuthProvider>
      <AuthContext value={tasks}>
        <Router>
          <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

          <Route exact path="/register">
            <Register onRegister={handleRegistration} />
          </Route>
          <Route exact path="/login">
            <Login onLogin={handleLogin} />
          </Route>
          <AuthRoute path="/tasks">
            <TaskList tasks={tasks} onTaskClick={handleSelectedTask} />
          </AuthRoute>
          <AuthRoute path="/create-task">
            <CreateTask
              onCloseModal={handleCloseModal}
              onAddTask={handleCreateTask}
              isLoading={isLoading}
            />
          </AuthRoute>
          <AuthRoute path="/update-task/:taskId">
            <UpdateTask
              task={selectedTask}
              onCloseModal={handleCloseModal}
              onUpdateTask={handleUpdateTask}
              isLoading={isLoading}
            />
          </AuthRoute>
          <AuthRoute path="/delete-task/:taskId">
            <DeleteTask
              task={selectedTask}
              onCloseModal={handleCloseModal}
              onDeleteTask={handleDeleteTask}
              isLoading={isLoading}
            />
          </AuthRoute>
          {activeModal === "preview" && (
            <Task task={selectedTask} onCloseModal={handleCloseModal} />
          )}
          <Footer />
        </Router>
      </AuthContext>
    </AuthProvider>
  );
};

export default App;
