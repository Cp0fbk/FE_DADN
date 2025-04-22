"use client";
import React, { useEffect} from "react";
import { controlLEDBrightness } from "../services/deviceService";

const LedControl = ({ brightness, setBrightness, token }) => {

  const sendBrightnessLevel = async (level) => {
    await controlLEDBrightness(level, token);
  };
  
  

  useEffect(() => {
      sendBrightnessLevel(brightness);
  }, [brightness]);
  
  const brightnessLabel = {
    0: "OFF",
    50: "MEDIUM",
    100: "HIGH",
    99: "HIGH"
  };

  return (
    <div>
      <div className="mt-3">
        <input
          type="range"
          min="0"
          max="100"
          step="50"
          value={brightness}
          onChange={(e) => {
            const newBrightness = parseInt(e.target.value);
            setBrightness(newBrightness);
          }}
          
          className="w-full cursor-pointer"
        />
        <p className="text-xs mt-1 text-gray-400">
          Brightness: {brightnessLabel[brightness]}
        </p>

      </div>
    </div>
  );
};

export default LedControl;
