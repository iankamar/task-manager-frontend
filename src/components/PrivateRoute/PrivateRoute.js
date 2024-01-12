import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, isLoggedIn, ...props }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
