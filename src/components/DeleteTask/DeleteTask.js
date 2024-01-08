import { useNavigate, useParams, Link } from "react-router-dom";
import "./DeleteTask.css";
import { deleteTask } from "../../utils/taskApi";

const DeleteTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteTask(taskId);

      navigate("/tasks");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container mt-3 delete-task-container">
      <button onClick={handleDelete} className="delete-btn">
        Delete Task
      </button>
      <Link to="/tasks" className="btn btn-secondary">
        Back to Task List
      </Link>
    </div>
  );
};

export default DeleteTask;
