import React, { createContext } from "react";
import { makeStyles } from "@material-ui/core";

export const StylesContext = createContext(null);

const useStyles = makeStyles(theme => ({
  paper: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    padding: theme.spacing(3)
  }
}));

export const GlobalStylesProvider = ({ children }) => {
  return (
    <StylesContext.Provider value={{ useStyles }}>
      {children}
    </StylesContext.Provider>
  );
};
