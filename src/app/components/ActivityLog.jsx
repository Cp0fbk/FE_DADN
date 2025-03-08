import React from "react";
import { FaHistory } from "react-icons/fa";

const ActivityLog = ({ logs }) => {
  return (
    <div>
      <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
        <FaHistory /> Activity Log
      </h2>
      <div className="relative border-l border-gray-700 ml-4 space-y-4 max-h-[678px] overflow-y-auto p-2">
        {logs.map((item, index) => (
          <div key={index} className="ml-6 relative">
            <div className="absolute -left-2 w-4 h-4 bg-green-500 rounded-full"></div>
            <div className="bg-gray-700 p-3 rounded-md shadow-md">
              <p className="text-sm text-gray-400">{item.date}</p>
              <p className="text-base font-semibold text-blue-400">
                {item.device}
              </p>
              <p className="text-base">{item.action}</p>
              <div className="text-sm text-gray-300">{item.details}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
