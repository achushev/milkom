import React, { createContext, useState } from "react";

export const GlobalStateContext = createContext("");

export const GlobalStateProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [userAccess, setUserAccess] = useState(null);
  const permissionsList = {
    0: "delivery",
    1: "lab",
    2: "milk",
    3: "yogurt",
    4: "whitecheese",
    5: "yellowcheese",
    6: "salads",
    7: "vakuum",
    9: "delivery"
  };

  return (
    <GlobalStateContext.Provider
      value={{
        pageTitle,
        setPageTitle,
        isLogged,
        setIsLogged,
        userAccess,
        setUserAccess,
        permissionsList
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
