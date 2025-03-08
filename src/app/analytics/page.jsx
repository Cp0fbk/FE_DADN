"use client";
import Sidebar from "../components/SideBar";
import React from "react";
import Header from "../components/Header";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

const data = [
  { time: "08:00", brightness: 20, temperature: 22 },
  { time: "10:00", brightness: 50, temperature: 24 },
  { time: "12:00", brightness: 80, temperature: 25 },
  { time: "14:00", brightness: 60, temperature: 26 },
  { time: "16:00", brightness: 40, temperature: 24 },
  { time: "18:00", brightness: 30, temperature: 23 },
  { time: "20:00", brightness: 70, temperature: 22 },
  { time: "22:00", brightness: 90, temperature: 21 },
];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
      <Sidebar />
      <div className="md:ml-16 flex-1 p-6 md:mt-0">
        <Header name="Activity Analysis" />

        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-lg font-semibold mb-4">Brightness Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="time" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="brightness" stroke="#fdd835" strokeWidth={2} name="Brightness (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-10 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">Temperature Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="time" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#29b6f6" strokeWidth={2} name="Temperature (°C)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
