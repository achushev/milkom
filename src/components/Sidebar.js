import React  from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <section className="layout-sidebar">

      <nav className="layout-sidebar-navigation">
        <Link to="/">Home</Link>
        <Link to="/delivery">Доставка</Link>
      </nav>
    </section>
  );
};
