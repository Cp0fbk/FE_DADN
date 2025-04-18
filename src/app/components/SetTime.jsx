import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ActionTimeline from "../utils/ActionTimeline";
import { getAllSchedules } from "../services/deviceService";
import LoadingAtom from "../utils/LoadingAtom";
import toast from "react-hot-toast";

export function SetTime() {
  const [devices] = useState(["Fan", "LED"]);
  const [selectedDevice, setSelectedDevice] = useState("Fan");
  const [timer, setTimer] = useState("");
  const [scheduledTimes, setScheduledTimes] = useState([]);
  const [fanValue, setFanValue] = useState(0);
  const [ledValue, setLedValue] = useState("OFF");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  dayjs.extend(utc);

  const fetchScheduledTimes = async () => {
    try {
      const data = await getAllSchedules(token);
      setScheduledTimes(data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduledTimes();
  }, []);

  const handleDeviceChange = (e) => {
    setSelectedDevice(e.target.value);
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    const now = new Date();

    const [hours, minutes] = selectedTime.split(":").map(Number);

    const scheduledDate = new Date(now);
    scheduledDate.setHours(hours);
    scheduledDate.setMinutes(minutes);
    scheduledDate.setSeconds(0);
    scheduledDate.setMilliseconds(0);

    if (
      hours < now.getHours() ||
      (hours === now.getHours() && minutes <= now.getMinutes())
    ) {
      scheduledDate.setDate(scheduledDate.getDate() + 1);
    }

    const utcISOString = dayjs(scheduledDate).utc().toISOString();

    setTimer(utcISOString);
  };

  const handleFanValueChange = (e) => {
    setFanValue(e.target.value);
  };

  const handleLedValueChange = (e) => {
    setLedValue(e.target.value);
  };

  const handleSetTimer = async () => {
    const scheduleData = {
      time: timer,
      value:
        selectedDevice === "Fan"
          ? fanValue
          : ledValue === "OFF"
          ? 0
          : ledValue === "MEDIUM"
          ? 50
          : 99,
    };
    console.log("scheduleData to send:", scheduleData);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        selectedDevice === "Fan"
          ? "http://localhost:5000/api/schedules/createFanSchedule"
          : "http://localhost:5000/api/schedules/createLedSchedule",
        scheduleData,
        config
      );

      if (response.data.success) {
        toast.success("Set schedule success!");
        await fetchScheduledTimes();
      }
    } catch (error) {
      toast.error("Failed!");
      console.error("Error setting timer:", error);
    }
  };

  return (
    <div className="flex flex-col space-y-6 sm:flex-row sm:space-x-8">
      {/* Left Side: Device Selection and Timer Setup */}
      <div className="bg-[#303030] rounded-xl p-4 shadow w-full sm:w-1/2 md:mb-0">
        <h2 className="text-xl font-semibold mb-4">Set Device Timer</h2>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="deviceSelect" className="block mb-1">
                Select Device
              </label>
              <select
                id="deviceSelect"
                className="w-full p-2 rounded bg-gray-600 text-white border border-white"
                value={selectedDevice}
                onChange={handleDeviceChange}
              >
                {devices.map((device, index) => (
                  <option key={index} value={device}>
                    {device}
                  </option>
                ))}
              </select>
            </div>

            {selectedDevice === "Fan" ? (
              <div className="flex-1">
                <label htmlFor="fanValue" className="block mb-1">
                  Set Fan Value (0-255)
                </label>
                <input
                  type="number"
                  id="fanValue"
                  className="w-full p-2 rounded bg-gray-600 text-white border border-white"
                  value={fanValue}
                  min={0}
                  max={255}
                  onChange={handleFanValueChange}
                />
              </div>
            ) : (
              <div className="flex-1">
                <label htmlFor="ledValue" className="block mb-1">
                  Set LED Value
                </label>
                <select
                  id="ledValue"
                  className="w-full p-2 rounded bg-gray-600 text-white border border-white"
                  value={ledValue}
                  onChange={handleLedValueChange}
                >
                  <option value="OFF">OFF</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </select>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="timerInput" className="block mb-1">
              Set Time
            </label>
            <input
              type="time"
              id="timerInput"
              className="w-full p-2 rounded bg-gray-600 text-white border border-white"
              value={timer ? dayjs(timer).local().format("HH:mm") : ""}
              onChange={handleTimeChange}
            />
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white mt-2"
            onClick={handleSetTimer}
          >
            Set Timer
          </button>
        </div>
      </div>

      {/* Right Side: Display Scheduled Times */}
      <div className="bg-[#303030] rounded-xl p-4 shadow w-full sm:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Scheduled Times</h2>
        <div className="max-h-[200px] overflow-y-auto scrollbar-hidden">
          {loading ? (
            <LoadingAtom />
          ) : (
            <ActionTimeline scheduledTimes={scheduledTimes} />
          )}
        </div>
      </div>
    </div>
  );
}
