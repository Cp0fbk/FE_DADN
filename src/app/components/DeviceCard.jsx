import React, { useState } from "react";
import { FaLightbulb, FaFan, FaCamera, FaThermometerHalf } from "react-icons/fa";

const DeviceCard = ({ icon: Icon, name, description }) => {
  const [isOn, setIsOn] = useState(false);
  const [brightness, setBrightness] = useState(50);
  const [speed, setSpeed] = useState(3);
  const [temperature, setTemperature] = useState(24);

  const togglePower = () => setIsOn(!isOn);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-sm md:text-base text-white">
      <div className="flex justify-between items-center mb-3">
        <Icon className="text-2xl md:text-3xl" />
        {/* Toggle Switch */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={isOn} onChange={togglePower} className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-600 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer 
              peer-checked:bg-green-500 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white 
              after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5">
          </div>
        </label>
      </div>
      <p className="text-lg font-semibold">{name}</p>
      <p className="text-xs md:text-sm text-gray-400">{description}</p>

      {name === "Light" && (
        <div className="mt-3">
          <label className="block text-xs mb-1">Brightness</label>
          <input
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
            className="w-full"
            disabled={!isOn}
          />
          <p className="text-xs mt-1 text-gray-400">Brightness: {brightness}%</p>
        </div>
      )}

      {name === "Fan" && (
        <div className="mt-3">
          <label className="block text-xs mb-1">Speed</label>
          <input
            type="range"
            min="1"
            max="5"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            className="w-full"
            disabled={!isOn}
          />
          <p className="text-xs mt-1 text-gray-400">Speed: {speed}</p>
        </div>
      )}

      {name === "Air Conditioner" && (
        <div className="mt-3">
          <label className="block text-xs mb-1">Temperature</label>
          <input
            type="range"
            min="16"
            max="30"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            className="w-full"
            disabled={!isOn}
          />
          <p className="text-xs mt-1 text-gray-400">Temperature: {temperature}°C</p>
        </div>
      )}
    </div>
  );
};

export default DeviceCard;
