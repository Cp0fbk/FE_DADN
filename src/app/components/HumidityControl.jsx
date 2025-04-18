"use client";
import React, { useEffect, useState } from "react";
import { FaWind } from "react-icons/fa";
import axios from "axios";
import { updateHumidity } from "../services/deviceService";

const HumidityControl = ({ renderScale, token }) => {
  const [humidity, setHumidity] = useState(50);

  useEffect(() => {
    const fetchHumidity = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/sensors/humi", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHumidity(res.data?.value ?? 50);
        updateHumidity(res.data?.value ?? 50, token);
      } catch (err) {
        console.error("Failed to fetch humidity:", err);
      }
    };

    fetchHumidity();

    const interval = setInterval(fetchHumidity, 5000);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <div className="mt-4">
      <div className="relative w-full h-6 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-500 rounded-full"
          style={{
            width: `${humidity}%`,
            background: "linear-gradient(to right, #b3e5fc, #4fc3f7, #0288d1)", // blue gradient
            borderRadius: "9999px",
          }}
        ></div>
        <FaWind className="absolute right-1 top-1/2 -translate-y-1/2 text-white text-xs" />
        <div className="absolute w-full left-0 flex justify-between text-[10px] text-gray-300 px-1">
          {renderScale(4, 0, 100)}
        </div>
      </div>
      <p className="text-xs mt-1 text-gray-400">{humidity}%</p>
    </div>
  );
};

export default HumidityControl;
