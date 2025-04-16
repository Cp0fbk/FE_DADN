import React from "react";

const DeviceIcon = ({ name, icon: Icon, isOn }) => {
  let iconClass = "text-4xl transition-all duration-500 ";

  if (name === "LED") {
    iconClass += isOn
      ? "text-yellow-400 opacity-100 animate-pulse scale-110"
      : "text-white opacity-30 scale-100";
  } else if (name === "Fan") {
    iconClass += isOn
      ? "text-white animate-spin-slow"
      : "text-gray-500";
  } else {
    iconClass += true
      ? "text-white"
      : "text-gray-500";
  }

  return <Icon className={iconClass} />;
};

export default DeviceIcon;

