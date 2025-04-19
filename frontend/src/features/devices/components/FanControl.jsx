import React, { useEffect } from "react";
import { setFanSpeed } from "../services/deviceService";

const FanControl = ({ speed, setSpeed, token }) => {

  const handleSpeedChange = async (e) => {
    const newSpeed = parseInt(e.target.value);
    setSpeed(newSpeed);
  
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
