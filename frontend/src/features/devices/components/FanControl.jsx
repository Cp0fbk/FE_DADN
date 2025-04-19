import React, { useEffect } from "react";
import { setFanSpeed } from "../services/deviceService";

const FanControl = ({ speed, setSpeed, token }) => {
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("deviceData"));
    if (storedData && storedData.fan) {
      setSpeed(parseInt(storedData.fan));
    }
  }, [setSpeed]);

  const handleSpeedChange = async (e) => {
    const newSpeed = parseInt(e.target.value);
    setSpeed(newSpeed);
  
    const storedData = JSON.parse(localStorage.getItem("deviceData")) || {};
    storedData.fan = newSpeed;
    localStorage.setItem("deviceData", JSON.stringify(storedData));
  
    try {
      await setFanSpeed(newSpeed, token);
    } catch (err) {
      console.error("Failed to update fan speed:", err.message);
    }
  };  
  

  return (
    <div className="mt-3">
      <input
        type="range"
        min="0"
        max="255"
        value={speed}
        onChange={handleSpeedChange}
        className="w-full cursor-pointer"
        step={1}
      />
      <p className="text-xs mt-1 text-gray-400">Speed: {speed}</p>
    </div>
  );
};

export default FanControl;
