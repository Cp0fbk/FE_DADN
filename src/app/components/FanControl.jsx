import React from "react";
import axios from "axios";

const FanControl = ({ speed, setSpeed, isOn, token }) => {
  const handleSpeedChange = async (e) => {
    const newSpeed = parseInt(e.target.value);
    setSpeed(newSpeed);

    try {
      await axios.post(
        `http://localhost:5000/api/devices/fan/${newSpeed}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.error("Failed to update fan speed:", err.message);
    }
  };

  return (
    <div className="mt-3">
      <input
        type="range"
        min="10"
        max="255"
        value={speed}
        onChange={handleSpeedChange}
        className="w-full cursor-pointer"
        disabled={!isOn}
      />
      <p className="text-xs mt-1 text-gray-400">Speed: {speed}</p>
    </div>
  );
};

export default FanControl;
