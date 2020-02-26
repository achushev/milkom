import React from "react";

export const NotFound = ({ location }) => (
  <div>
    <h3>
      Страницата която търсите не съществува или нямате право да я достъпите{" "}
      <code>{location.pathname}</code>
    </h3>
  </div>
);
