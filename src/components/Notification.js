import React from "react";
import { Icon } from "@iconify/react";
import sharpCheckCircle from "@iconify/icons-ic/sharp-check-circle";

const Notification = ({ children, text, type }) => {
  return (
    <div className={`notification ${type}`}>
      <Icon icon={sharpCheckCircle} /> {text ? text : children}
    </div>
  );
};

export default Notification;
