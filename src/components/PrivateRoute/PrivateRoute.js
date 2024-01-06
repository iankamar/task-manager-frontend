import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element, isLoggedIn, ...rest }) => {
  if (!isLoggedIn) {
    sessionStorage.setItem("intendedRoute", rest.location.pathname);
  }

  return isLoggedIn ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
