const express = require("express");
const Device = require("../models/device");
const router = express.Router();

// Thêm thiết bị mới
router.post("/", async (req, res) => {
  try {
    const device = new Device(req.body);
    await device.save();
    res.status(201).json({ success: true, data: device });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Lấy danh sách thiết bị
router.get("/", async (req, res) => {
  try {
    const devices = await Device.find();
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ success: true, data: devices }, null, 2)); 
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


module.exports = router;
