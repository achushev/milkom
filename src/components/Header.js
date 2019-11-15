import React, { useContext } from "react";
import { GlobalStateContext } from "../providers/GlobalStateProvider";

export const Header = () => {
  const { pageTitle } = useContext(GlobalStateContext);

  return (
    <header className="layout-header">
      <h1 className="page-title">{pageTitle}</h1>
    </header>
  );
};
