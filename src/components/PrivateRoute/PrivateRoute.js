import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ element, isLoggedIn, ...rest }) => {
  const location = useLocation();

  if (!isLoggedIn) {
    sessionStorage.setItem("intendedRoute", location.pathname);
  }

  return isLoggedIn ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
