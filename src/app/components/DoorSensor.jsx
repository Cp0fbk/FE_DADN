"use client";
import { useState, useEffect } from "react";
import { FaDoorOpen } from "react-icons/fa";
import { turnOnMotionMode, turnOffMotionMode } from "../services/deviceService";
import toast from "react-hot-toast";

export function DoorSensor({ token }) {
  const [motionStatus, setMotionStatus] = useState("offline");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("deviceData"));
    if (storedData && typeof storedData.motionSensor === "string") {
      setMotionStatus(storedData.motionSensor);
    }
  }, []);

  const toggleMotion = async () => {
    const storedData = JSON.parse(localStorage.getItem("deviceData")) || {};

    try {
      if (motionStatus === "online") {
        await turnOffMotionMode(token);
        storedData.motionSensor = "offline";
        // toast.success("Motion sensor turned OFF");
      } else {
        await turnOnMotionMode(token);
        storedData.motionSensor = "online";
        // toast.success("Motion sensor turned ON");
      }

      localStorage.setItem("deviceData", JSON.stringify(storedData));
      setMotionStatus(storedData.motionSensor);
    } catch (err) {
      toast.error("Failed to toggle motion mode");
      console.error("Motion toggle error:", err.message);
    }
  };

  return (
    <div className="bg-[#303030] rounded-xl p-4 shadow flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Door icon */}
        <FaDoorOpen size={64} className="text-green-500" />

        {/* Text content */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Door Sensor</h2>
          <p className="text-sm text-gray-400">
            Real-time monitoring of door status
          </p>
        </div>
      </div>

      {/* Toggle Motion Button */}
      <button
        onClick={toggleMotion}
        className={`${
          motionStatus === "online" ? "bg-green-500" : "bg-gray-500"
        } text-white px-4 py-2 rounded-xl font-semibold cursor-pointer`}
      >
        {motionStatus === "online" ? "ON" : "OFF"}
      </button>
    </div>
  );
}
