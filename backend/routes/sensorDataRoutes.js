const express = require("express");
const SensorData = require("../models/sensor_data");
const router = express.Router();

// Thêm dữ liệu cảm biến mới
router.post("/", async (req, res) => {
  try {
    const sensorData = new SensorData(req.body);
    await sensorData.save();
    res.status(201).json({ success: true, data: sensorData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Lấy dữ liệu cảm biến theo sensor_id
router.get("/:sensor_id", async (req, res) => {
  try {
    const sensorData = await SensorData.find({ sensor_id: req.params.sensor_id });
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ success: true, data: sensorData }, null, 2)); 
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
