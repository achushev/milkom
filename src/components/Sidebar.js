import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <section className="layout-sidebar">
      <nav className="layout-sidebar-navigation">
        <Link to="/delivery">Доставка</Link>
        <Link to="/lab">Лаборатория</Link>
        <Link to="/milk">Цех прясно мляко</Link>
      </nav>
    </section>
  );
};
