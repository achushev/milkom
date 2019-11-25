import React from "react";
import { Icon } from "@iconify/react";
import sharpCheckCircle from "@iconify/icons-ic/sharp-check-circle";

const Notification = ({ text }) => {
  return (
    <div className="notification success">
      <Icon icon={sharpCheckCircle} /> {text}
    </div>
  );
};

export default Notification;
