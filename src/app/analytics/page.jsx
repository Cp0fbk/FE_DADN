"use client";
import Sidebar from "../components/SideBar";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import axios from "axios";
import ProtectedRoute from "../components/ProtectedRoute";
import { useRouter } from "next/navigation";

export default function Analytics() {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchTemperatureData = async () => {
      try {
        if (!token) {
          router.push("/");
          return;
        }
        const response = await axios.get(
          "http://localhost:5000/api/sensors/temp/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          const formattedData = response.data.values.map((item) => ({
            time: new Date(item.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            temperature: item.value,
          }));
          setTemperatureData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching temperature data:", error);
      }
    };

    const fetchHumidityData = async () => {
      try {
        if (!token) {
          router.push("/"); // Chuyển hướng nếu không có token
          return;
        }
        const response = await axios.get(
          "http://localhost:5000/api/sensors/humi/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          const formattedData = response.data.value.map((item) => ({
            time: new Date(item.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            humidity: item.value,
          }));
          setHumidityData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching humidity data:", error);
      }
    };

    fetchTemperatureData();
    fetchHumidityData();
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
        <Sidebar />
        <div className="md:ml-16 flex-1 p-6 md:mt-0">
          <Header name="Activity Analysis" />

          {/* Humidity Chart */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
            <h2 className="text-lg font-semibold mb-4">Humidity Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={humidityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="time" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="#29b6f6"
                  strokeWidth={2}
                  name="Humidity (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Temperature Chart */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-10 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">
              Temperature Over Time
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="time" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#fdd835"
                  strokeWidth={2}
                  name="Temperature (°C)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
