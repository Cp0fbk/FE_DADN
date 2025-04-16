"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSnowflake } from "react-icons/fa";

const TemperatureControl = ({ renderScale, token }) => {
  const [temperature, setTemperature] = useState(24);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/sensors/temp", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTemperature(res.data?.value ?? 24);
      } catch (err) {
        console.error("Failed to fetch temperature:", err);
      }
    };

    fetchTemperature();

    const interval = setInterval(fetchTemperature, 5000);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <div className="mt-4">
      <div className="relative w-full h-6 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${((temperature - 16) / 14) * 100}%`,
            background: "linear-gradient(to right, #00bfff, #f9d423, #ff4e50)",
            borderRadius: "9999px"
          }}
        ></div>
        <FaSnowflake className="absolute right-1 top-1/2 -translate-y-1/2 text-white text-xs" />
        <div className="absolute w-full left-0 flex justify-between text-[10px] text-gray-300 px-1">
          {renderScale(4, 16, 30)}
        </div>
      </div>
      <p className="text-xs mt-1 text-gray-400">{temperature}°C</p>
    </div>
  );
};

export default TemperatureControl;
