"use client";
import React, { useEffect } from "react";
import { controlLEDBrightness } from "../services/deviceService";
import socket from "@/socket"; // giống như bạn làm ở TemperatureControl

const LedControl = ({ brightness, setBrightness, token }) => {
  const sendBrightnessLevel = async (level) => {
    await controlLEDBrightness(level, token);
  };

  // Gửi brightness mỗi khi thay đổi từ slider
  useEffect(() => {
    sendBrightnessLevel(brightness);
  }, [brightness]);

  // Lắng nghe từ socket: backend tự cập nhật LED
  useEffect(() => {
    socket.on("led:update", (data) => {
      console.log("LED update từ socket:", data);
      const parsedValue = parseInt(data.value); 
      if (!isNaN(parsedValue)) {
        setBrightness(parsedValue);
      }
    });

    return () => {
      socket.off("led:update");
    };
  }, []);

  const brightnessLabel = {
    0: "OFF",
    50: "MEDIUM",
    100: "HIGH",
    99: "HIGH",
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









