import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const Logout = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/logout", {
        method: "POST",
      });
      const data = await response.json();
      console.log(data);
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="logout-container">
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Logout;

// Route configuration
<Router>
  <Route path="/login" component={Login} />
  <Route
    path="/tasks"
    render={() => (isLoggedIn ? <Tasks /> : <Redirect to="/login" />)}
  />
</Router>;
