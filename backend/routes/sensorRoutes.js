const express = require("express");
const Sensor = require("../models/sensor");
const router = express.Router();

// Thêm sensor mới
router.post("/", async (req, res) => {
  try {
    const sensor = new Sensor(req.body);
    await sensor.save();
    res.status(201).json({ success: true, data: sensor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Lấy danh sách sensor
router.get("/", async (req, res) => {
  try {
    const sensors = await Sensor.find();
    res.json({ success: true, data: sensors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
