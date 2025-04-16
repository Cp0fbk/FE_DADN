const Device = require('../models/device');
require('dotenv').config();
const axios = require('axios');

const turnONLed_medium = async (req, res) => {
    console.log("turnONLed")
    try{
        const userId = req.user._id;
        console.log(userId)
        const led = await Device.findOne({ owner_id: userId, type: 'led' });
        console.log(led)
        if (!led) {
            return res.status(404).json({ success: false, message: 'LED not found' });
        }
        led.current_value = "50";
        led.history.push({ value: "50", timestamp: new Date() });
        await led.save();
        const blynkUrl = process.env.LED + "50";
        console.log("blynkUrl", blynkUrl)
        try {
            await axios.get(blynkUrl);
            console.log("done"); 
        } catch (err) {
            console.error("Error calling Blynk:", err.message);
            return res.status(500).json({ success: false, message: "Failed to trigger Blynk LED" });
        }
        res.status(200).json({
            success: true,
            message: "turnONLed success"
        })
    }catch(error)
    {
        res.status(500).json({ success: false, message: error.message });
    }
}
const turnONLed_max = async (req, res) => {
    console.log("turnONLed")
    try{
        const userId = req.user._id;
        console.log(userId)
        const led = await Device.findOne({ owner_id: userId, type: 'led' });
        console.log(led)
        if (!led) {
            return res.status(404).json({ success: false, message: 'LED not found' });
        }
        led.current_value = "99";
        led.history.push({ value: "99", timestamp: new Date() });
        await led.save();
        const blynkUrl = process.env.LED + "99";
        console.log("blynkUrl", blynkUrl)
        try {
            await axios.get(blynkUrl);
            console.log("done"); 
        } catch (err) {
            console.error("Error calling Blynk:", err.message);
            return res.status(500).json({ success: false, message: "Failed to trigger Blynk LED" });
        }
        res.status(200).json({
            success: true,
            message: "turnONLed success"
        })
    }catch(error)
    {
        res.status(500).json({ success: false, message: error.message });
    }
}
const turnOFFLed = async (req, res) => {
    try{
        const userId = req.user._id;
        const led = await Device.findOne({ owner_id: userId, type: 'led' });
        if (!led) {
            return res.status(404).json({ success: false, message: 'LED not found' });
        }
        led.current_value = "0";
        led.history.push({ value: "0", timestamp: new Date() });
        led.save();
        const blynkUrl = process.env.LED + "0";
        await axios.get(blynkUrl);
        res.status(200).json({
            success: true,
            message: "turnOFFLed success"
        })
    }catch(error)
    {
        res.status(500).json({ success: false, message: error.message });
    }
}
const turnONAutoLed = async (req, res) => {
    try{
        const userId = req.user._id;
        const autoled = await Device.findOne({ owner_id: userId, type: 'autoled' });
        if (!autoled) {
            return res.status(404).json({ success: false, message: 'AUTOLED not found' });
        }
        autoled.history.push({ value: "on", timestamp: new Date() });
        autoled.status = "online";
        autoled.save();
        const blynkUrl = process.env.AUTOLED + "1";
        await axios.get(blynkUrl);
        res.status(200).json({
            success: true,
            message: "turnONAutoLed success"
        })
    }catch(error)
    {
        res.status(500).json({ success: false, message: error.message });
    }
}
const turnOFFAutoLed = async (req, res) => {
    try{
        const userId = req.user._id;
        const autoled = await Device.findOne({ owner_id: userId, type: 'autoled' });
        if (!autoled) {
            return res.status(404).json({ success: false, message: 'AUTOLED not found' });
        }
        autoled.history.push({ value: "off", timestamp: new Date() });
        autoled.status = "offline";
        autoled.save();
        const blynkUrl = process.env.AUTOLED + "0";
        await axios.get(blynkUrl);
        res.status(200).json({
            success: true,
            message: "turnOFFAutoLed success"
        })
    }catch(error)
    {
        res.status(500).json({ success: false, message: error.message });
    }
}
const turnONMotionMode = async (req, res) => {
    try{
        const userId = req.user._id;
        const motionMode = await Device.findOne({ owner_id: userId, type: 'motion' });
        if (!motionMode) {
            return res.status(404).json({ success: false, message: 'motionMode not found' });
        }
        motionMode.history.push({ value: "on", timestamp: new Date() });
        motionMode.status = "online";
        motionMode.save();
        const blynkUrl = process.env.MOTIONMODE + "1";
        await axios.get(blynkUrl);
        res.status(200).json({
            success: true,
            message: "turnONMotionMode success"
        })
    }catch(error)
    {
        res.status(500).json({ success: false, message: error.message });
    }
}
const turnOFFMotionMode = async (req, res) => {
    try{
        const userId = req.user._id;
        const motionMode = await Device.findOne({ owner_id: userId, type: 'motion' });
        if (!motionMode) {
            return res.status(404).json({ success: false, message: 'motionMode not found' });
        }
        motionMode.history.push({ value: "off", timestamp: new Date() });
        motionMode.status = "offline";
        motionMode.save();
        const blynkUrl = process.env.MOTIONMODE + "0";
        await axios.get(blynkUrl);
        res.status(200).json({
            success: true,
            message: "turnOFFMotionMode success"
        })
    }catch(error)
    {
        res.status(500).json({ success: false, message: error.message });
    }
}

const fanController = async (req,res) => {
    
    console.log("fanController")
    try{
        const value = req.params.value;
        const numericValue = parseInt(value, 10);
        console.log("fan value", value)
        if (numericValue < 0 || numericValue > 255) {
            return res.status(400).json({ success: false, message: 'Invalid fan value' });
        }
        const userId = req.user._id;
        const fan = await Device.findOne({ owner_id: userId, type: 'fan' });
        if (!fan) {
            return res.status(404).json({ success: false, message: 'fan not found' });
        }
        fan.history.push({ value, timestamp: new Date() });
        fan.current_value = value;
        fan.save();
        const blynkUrl = process.env.FAN + value;
        await axios.get(blynkUrl);
        res.status(200).json({
            success: true,
            message: "fan success"
        })
    }catch(error)
    {
        res.status(500).json({ success: false, message: error.message });
    }
}

const getAllDevicesHistorySorted = async (req, res) => {
    try {
        const userId = req.user._id;

        const devices = await Device.find({ owner_id: userId });

        let combinedHistory = [];

        devices.forEach(device => {
            const deviceHistory = device.history.map(entry => ({
                device_id: device._id,
                device_name: device.name,
                device_type: device.type,
                value: entry.value,
                timestamp: entry.timestamp
            }));
            combinedHistory.push(...deviceHistory);
        });

        combinedHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        res.status(200).json({
            success: true,
            history: combinedHistory
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    turnONLed_medium,
    turnONLed_max,
    turnOFFLed,
    turnONAutoLed,
    turnOFFAutoLed,
    turnONMotionMode,
    turnOFFMotionMode,
    fanController,
    getAllDevicesHistorySorted
}