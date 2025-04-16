"use client";
import React, { useEffect } from "react";
import axios from "axios";

const LedControl = ({ brightness, setBrightness, isOn, autoMode, setAutoMode, token }) => {
  
  const toggleLed = async () => {
    const url = isOn
      ? "http://localhost:5000/api/devices/turnONled"
      : "http://localhost:5000/api/devices/turnOFFled";

    try {
      const response = await axios.post(url, {}, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log(response.data); 
        // toast.success("Successful change");
      } else {
        console.error("Error:", response.data);
      }
    } catch (error) {
      console.error("Error in LED API call:", error);
    }
  };

  const toggleAutoLed = async () => {
    const url = autoMode
      ? "http://localhost:5000/api/devices/turnONautoLed"
      : "http://localhost:5000/api/devices/turnOFFautoLed";

    try {
      const response = await axios.post(url, {}, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log(response.data); 
        // toast.success("Successful change");
      } else {
        console.error("Error:", response.data);
      }
    } catch (error) {
      console.error("Error in Auto LED API call:", error);
    }
  };

  useEffect(() => {
    if (isOn) {
      toggleLed(); 
    } else {
      toggleLed(); 
    }
  }, [isOn]);

  useEffect(() => {
    if (autoMode) {
      toggleAutoLed(); 
    } else {
      toggleAutoLed();
    }
  }, [autoMode]);

  return (
    <div>
      <div className="mt-3">
        <input
          type="range"
          min="0"
          max="100"
          value={brightness}
          onChange={(e) => setBrightness(e.target.value)}
          className="w-full cursor-pointer"
          disabled={!isOn || autoMode}
        />
        <p className="text-xs mt-1 text-gray-400">Brightness: {brightness}%</p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs md:text-sm">Auto Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={autoMode}
              onChange={() => setAutoMode(!autoMode)}
              className="sr-only peer"
            />
            <div
              className="w-11 h-6 bg-gray-600 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer
              peer-checked:bg-indigo-500 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white
              after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"
            ></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default LedControl;
