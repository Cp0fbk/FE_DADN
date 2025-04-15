import React from "react";

const FanControl = ({ speed, setSpeed, isOn }) => (
  <div className="mt-3">
    <input
      type="range"
      min="1"
      max="5"
      value={speed}
      onChange={(e) => setSpeed(e.target.value)}
      className="w-full cursor-pointer"
      disabled={!isOn}
    />
    <p className="text-xs mt-1 text-gray-400">Speed: {speed}</p>
  </div>
);

export default FanControl;
