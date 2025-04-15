import { FaDoorOpen } from "react-icons/fa";

export function DoorSensor() {
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow flex items-center justify-between">
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

      {/* Status */}
      <div className="bg-green-500 text-white px-4 py-2 rounded-xl font-semibold">
        OPEN
      </div>
    </div>
  );
}
