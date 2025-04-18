"use client";
import React, { useEffect } from "react";
import axios from "axios";

const LedControl = ({ brightness, setBrightness, autoMode, setAutoMode, token }) => {
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("deviceData"));
    if (storedData) {
      if (storedData.led !== undefined) setBrightness(parseInt(storedData.led));
      if (storedData.autoled !== undefined)
        setAutoMode(storedData.autoled !== "offline");
    }
  }, [setBrightness, setAutoMode]);

  const sendBrightnessLevel = async (level) => {
    let url = "";
    if (level === 0) {
      url = "http://localhost:5000/api/devices/turnOFFled";
    } else if (level === 50) {
      url = "http://localhost:5000/api/devices/turnONled_medium";
    } else if (level === 100 || level === 99) {
      url = "http://localhost:5000/api/devices/turnONled_high";
    }

    try {
      const response = await axios.post(url, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log(`LED action (${url}) executed successfully.`);
      } else {
        console.error("LED action failed:", response.data);
      }
    } catch (error) {
      console.error("Error sending LED brightness level:", error);
    }
  };

  const toggleAutoLed = async () => {
    const url = autoMode
      ? "http://localhost:5000/api/devices/turnONautoLed"
      : "http://localhost:5000/api/devices/turnOFFautoLed";

    try {
      const response = await axios.post(url, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log(response.data);
      } else {
        console.error("Error:", response.data);
      }
    } catch (error) {
      console.error("Error in Auto LED API call:", error);
    }
  };

  useEffect(() => {
    if (!autoMode) {
      sendBrightnessLevel(brightness);
    }
  }, [brightness]);

  useEffect(() => {
    toggleAutoLed();
  }, [autoMode]);

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

            const storedData = JSON.parse(localStorage.getItem("deviceData")) || {};
            storedData.led = newBrightness;
            localStorage.setItem("deviceData", JSON.stringify(storedData));
          }}
          
          className="w-full cursor-pointer"
        />
        <p className="text-xs mt-1 text-gray-400">
          Brightness: {brightnessLabel[brightness]}
        </p>

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
