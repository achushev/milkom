import React from "react";
import { Icon } from "@iconify/react";
import sharpCheckCircle from "@iconify/icons-ic/sharp-check-circle";

const Notification = ({ text, type }) => {
  return (
    <div className={`notification ${type}`}>
      <Icon icon={sharpCheckCircle} /> {text}
    </div>
  );
};

export default Notification;
