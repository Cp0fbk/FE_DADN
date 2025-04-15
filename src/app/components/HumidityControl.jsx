import React from "react";
import { FaWind } from "react-icons/fa";

const HumidityControl = ({ humidity, renderScale, getHumidityColor }) => (
  <div className="mt-4">
    <div className="relative w-full h-6 bg-gray-700 rounded-full overflow-hidden">
      <div
        className={`h-full ${getHumidityColor()} rounded-full transition-all`}
        style={{ width: `${humidity}%` }}
      ></div>
      <FaWind className="absolute right-1 top-1/2 -translate-y-1/2 text-white text-xs" />
      <div className="absolute w-full left-0 flex justify-between text-[10px] text-gray-300 px-1">
        {renderScale(4, 0, 100)}
      </div>
    </div>
    <p className="text-xs mt-1 text-gray-400">{humidity}%</p>
  </div>
);

export default HumidityControl;
