import React from "react";
import { Route } from "react-router-dom";

export const AuthRoute = ({ children, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Route
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
