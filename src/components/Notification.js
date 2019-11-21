import React, { useEffect, useState } from "react";
import { Icon, InlineIcon } from "@iconify/react";
import sharpCheckCircle from "@iconify/icons-ic/sharp-check-circle";

const Notification = ({ text }) => {
  return (
    <div className="notification success">
      <Icon icon={sharpCheckCircle} /> {text}
    </div>
  );
};

export default Notification;
