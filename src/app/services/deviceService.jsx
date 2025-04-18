"use client";
import axios from "axios";
import React from "react";

const BASE_URL = "http://localhost:5000";

// Update temperature
const updateTemperature = async (value, token) => {
  try {
    await axios.post(
      `${BASE_URL}/api/sensors/temp/update`,
      { value },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.error("Failed to update temperature:", err);
  }
};

// Update humidity
const updateHumidity = async (value, token) => {
  try {
    await axios.post(
      `${BASE_URL}/api/sensors/humi/update`,
      { value },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.error("Failed to update humidity:", err);
  }
};

// Get all schedules
const getAllSchedules = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/schedules/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (err) {
    console.error("Failed to fetch schedules:", err);
    return [];
  }
};

// Turn ON motion mode
const turnOnMotionMode = async (token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/devices/turnONmotionMode`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Failed to turn ON motion mode:", err);
  }
};

// Turn OFF motion mode
const turnOffMotionMode = async (token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/devices/turnOFFmotionMode`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Failed to turn OFF motion mode:", err);
  }
};

export {
  updateTemperature,
  updateHumidity,
  getAllSchedules,
  turnOnMotionMode,
  turnOffMotionMode,
};
