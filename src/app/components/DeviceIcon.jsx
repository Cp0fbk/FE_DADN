import React from "react";

const DeviceIcon = ({ name, icon: Icon, isOn }) => {
  const iconClass = name === "LED" ? 
    isOn ? "text-yellow-400 opacity-100 animate-pulse scale-110" : "text-white opacity-30 scale-100" :
    isOn ? "text-white animate-spin-slow" : "text-gray-500";

  return (
    <Icon className={`text-4xl transition-all duration-500 ${iconClass}`} />
  );
};

export default DeviceIcon;
