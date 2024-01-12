import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="home-view">
      <h1>Welcome to Task Management</h1>
      <p>Your one-stop solution for managing your tasks efficiently.</p>
      <div className="about">
        Crafted with care, this task management tool showcases the author's
        dedication to delivering user-friendly and efficient software solutions.
      </div>
      <div className="about">
        The author's attention to detail ensures that your task management
        process is both smooth and effective.
      </div>
      <Link to="/tasks">Go to Tasks</Link>
    </div>
  );
};

export default Home;
