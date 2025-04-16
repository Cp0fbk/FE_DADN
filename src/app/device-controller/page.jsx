"use client";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaThermometerHalf,
  FaLightbulb,
  FaTint,
  FaClock,
} from "react-icons/fa";
import { PiFanFill } from "react-icons/pi";
import Sidebar from "../components/SideBar";
import DeviceCard from "../components/DeviceCard";
import Header from "../components/Header";
import { DoorSensor } from "../components/DoorSensor";
import { SetTime } from "../components/SetTime";
import ProtectedRoute from "../components/ProtectedRoute";

const deviceList = [
  {
    icon: FaLightbulb,
    name: "LED",
    description: "In living-room",
  },
  {
    icon: PiFanFill,
    name: "Fan",
    description: "Adjust rotation speed.",
  },
  {
    icon: FaThermometerHalf,
    name: "Temperature",
    description: "Adjust temperature.",
  },
  {
    icon: FaTint,
    name: "Humidity",
    description: "Moisture level in the air",
  },
];

export default function DeviceController() {
  const [token, setToken] = useState(null);
  const [time, setTime] = useState(null); // Khai báo state time
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      router.push("/"); 
    } else {
      setToken(storedToken);
    }
    const interval = setInterval(() => {
      const currentTime = new Date();
      setTime(currentTime);
    }, 1000); 

    return () => clearInterval(interval);
  }, [router]);

  if (!isClient) {
    return null; 
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <Sidebar />

        <div className="md:ml-16 flex-1 p-6 md:mt-0">
          <Header name="Device Controller" />

          {/* hình ảnh + thời gian */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative rounded-xl overflow-hidden bg-[#0a0c2c]">
              <Image
                src="/living-room.jpg"
                alt="Living room"
                width={800}
                height={500}
                className="w-full object-cover"
              />

              {/* Block time */}
              {isClient && time && (
                <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md px-4 py-2 rounded-xl shadow text-right text-white text-sm">
                  <div className="flex items-center justify-end gap-2">
                    <span>
                      <FaClock size={22} />
                    </span>
                    <div>
                      <div className="text-lg font-semibold leading-tight">
                        {time.toLocaleTimeString()}
                      </div>
                      <div className="text-xs opacity-75">
                        {time.toLocaleDateString("en-GB", {
                          weekday: "long",
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Danh sách device */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {deviceList.map((device, index) => (
                <DeviceCard
                  key={index}
                  icon={device.icon}
                  name={device.name}
                  description={device.description}
                  token={token}
                />
              ))}
            </div>
          </div>
          {/* Khung hẹn giờ và cảm biến cửa */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 mb-10 md:mb-0">
            <SetTime />

            <DoorSensor />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
