import React, { useState } from "react";
import TaskList from "../TaskList/TaskList";
import CreateTask from "../CreateTask/CreateTask";
import UpdateTask from "../UpdateTask/UpdateTask";
import DeleteTask from "../DeleteTask/DeleteTask";
import { deleteTask, createTask, updateTask } from "../../utils/api";

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeModal, setActiveModal] = useState("");

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

  return (
    <div>
      <TaskList tasks={tasks} onTaskClick={handleSelectedTask} />
      {activeModal === "create" && (
        <CreateTask
          onCloseModal={handleCloseModal}
          onAddTask={handleCreateTask}
          isLoading={isLoading}
        />
      )}
      {activeModal === "update" && (
        <UpdateTask
          task={selectedTask}
          onCloseModal={handleCloseModal}
          onUpdateTask={handleUpdateTask}
          isLoading={isLoading}
        />
      )}
      {activeModal === "delete" && (
        <DeleteTask
          task={selectedTask}
          onCloseModal={handleCloseModal}
          onDeleteTask={handleDeleteTask}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Main;
