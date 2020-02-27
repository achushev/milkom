import React from "react";
import { Route, Redirect } from "react-router-dom";

import ls from "local-storage";

export const ProtectedRoute = ({
  component: Component,
  accessLevel,
  ...rest
}) => {
  const userAccess = ls.get("userAccess");

  return (
    <Route
      {...rest}
      render={props =>
        accessLevel === parseInt(userAccess) || parseInt(userAccess) === 9 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
