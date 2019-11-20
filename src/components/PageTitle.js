import React, { useContext } from "react";
import { GlobalStateContext } from "../providers/GlobalStateProvider";

export const PageTitle = () => {
  const { pageTitle } = useContext(GlobalStateContext);

  return <h1 className="page-title">{pageTitle}</h1>;
};
