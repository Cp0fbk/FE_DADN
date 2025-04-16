import React, { useState } from "react";
import DeviceIcon from "./DeviceIcon";
import FanControl from "./FanControl";
import TemperatureControl from "./TemperatureControl";
import HumidityControl from "./HumidityControl";
import LedControl from "./LedControl"; 

const DeviceCard = ({ icon: Icon, name, description, token }) => {
  const [speed, setSpeed] = useState(0);
  const [brightness, setBrightness] = useState(0);
  const [autoMode, setAutoMode] = useState(false);


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
        <DeviceIcon icon={Icon} name={name} brightness={brightness} speed={speed} />
        {/* {name !== "Temperature" && name !== "Humidity" && name!="LED" && (
          <PowerSwitch isOn={isOn} togglePower={togglePower} />
        )} */}
      </div>

      <p className="text-lg font-semibold">{name}</p>
      <p className="text-xs md:text-sm text-gray-400">{description}</p>

      {name === "Fan" && (
        <FanControl
          speed={speed}
          setSpeed={setSpeed}
          // isOn={isOn}
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
          autoMode={autoMode}
          setAutoMode={setAutoMode}
          token={token}
        />
      )}
    </div>
  );
};

export default DeviceCard;
