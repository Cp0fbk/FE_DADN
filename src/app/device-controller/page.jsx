"use client";
import React from "react";
import { FaThermometerHalf, FaPlus, FaLightbulb, FaFan } from "react-icons/fa";
import Sidebar from "../components/SideBar";
import DeviceCard from "../components/DeviceCard";
import Header from "../components/Header";

const deviceList = [
  {
    icon: FaLightbulb,
    name: "Light",
    description: "Adjust brightness.",
  },
  {
    icon: FaFan,
    name: "Fan",
    description: "Adjust rotation speed.",
  },
  {
    icon: FaThermometerHalf,
    name: "Air Conditioner",
    description: "Adjust temperature.",
  },
];

export default function DeviceController() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <Sidebar />
      <div className="md:ml-16 flex-1 p-6 md:mt-0">
        <Header name="Device Controller" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-0">
          {deviceList.map((device, index) => (
            <DeviceCard
              key={index}
              icon={device.icon}
              name={device.name}
              description={device.description}
            />
          ))}
        </div>
        <button className="fixed bottom-6 right-6 bg-blue-800 text-white p-4 mb-10 md:mb-0 md:p-4 rounded-full shadow-lg hover:bg-blue-600 z-50 motion-safe:hover:scale-110">
          <FaPlus size={24} />
        </button>
      </div>
    </div>
  );
}
