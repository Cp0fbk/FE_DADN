import React, { useState } from "react";
import DeviceIcon from "./DeviceIcon";
import PowerSwitch from "./PowerSwitch";
import FanControl from "./FanControl";
import TemperatureControl from "./TemperatureControl";
import HumidityControl from "./HumidityControl";
import LedControl from "./LedControl"; 

const DeviceCard = ({ icon: Icon, name, description, token }) => {
  const [isOn, setIsOn] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [brightness, setBrightness] = useState(80);
  const [autoMode, setAutoMode] = useState(false);

  const togglePower = () => setIsOn(!isOn);


  const renderScale = (steps, min, max) =>
    Array.from({ length: steps + 1 }).map((_, i) => {
      const percent = (i / steps) * 100;
      const value = Math.round(min + ((max - min) * i) / steps);
      return (
        <div
          key={i}
          className="absolute top-full text-[10px] text-gray-300"
          style={{ left: `${percent}%`, transform: "translateX(-50%)" }}
        >
          {value}
        </div>
      );
    });

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-sm md:text-base text-white relative">
      <div className="flex justify-between items-center mb-3">
        <DeviceIcon icon={Icon} name={name} isOn={isOn} />
        {name !== "Temperature" && name !== "Humidity" && (
          <PowerSwitch isOn={isOn} togglePower={togglePower} />
        )}
      </div>

      <p className="text-lg font-semibold">{name}</p>
      <p className="text-xs md:text-sm text-gray-400">{description}</p>

      {name === "Fan" && (
        <FanControl
          speed={speed}
          setSpeed={setSpeed}
          isOn={isOn}
          token={token}
        />
      )}
      {name === "Temperature" && (
        <TemperatureControl
          renderScale={renderScale}
          token={token}
        />
      )}

      {name === "Humidity" && (
        <HumidityControl
          renderScale={renderScale}
          token={token}
        />
      )}
      {name === "LED" && (
        <LedControl
          brightness={brightness}
          setBrightness={setBrightness}
          isOn={isOn}
          autoMode={autoMode}
          setAutoMode={setAutoMode}
          token={token}
        />
      )}
    </div>
  );
};

export default DeviceCard;
