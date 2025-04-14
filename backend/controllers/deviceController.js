const Device = require('../models/device');
require('dotenv').config();
const axios = require('axios');
const turnONLed = async (req, res) => {
    try{
        const userId = req.user._id;
        const led = await Device.findOne({ owner_id: userId, type: 'led' });
        if (!led) {
            return res.status(404).json({ success: false, message: 'LED not found' });
        }
        led.status = "online";
        led.save();
        const blynkUrl = process.env.LED + "1";
        await axios.post(blynkUrl);
        res.status(200).json({
            success: true,
            messafe: "turnONLed success"
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
        led.status = "offline";
        led.save();
        const blynkUrl = process.env.LED + "0";
        await axios.post(blynkUrl);
        res.status(200).json({
            success: true,
            messafe: "turnOFFLed success"
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
        autoled.status = "online";
        autoled.save();
        const blynkUrl = process.env.AUTOLED + "1";
        await axios.post(blynkUrl);
        res.status(200).json({
            success: true,
            messafe: "turnONAutoLed success"
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
        autoled.status = "offline";
        autoled.save();
        const blynkUrl = process.env.AUTOLED + "0";
        await axios.post(blynkUrl);
        res.status(200).json({
            success: true,
            messafe: "turnOFFAutoLed success"
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
        motionMode.status = "online";
        motionMode.save();
        const blynkUrl = process.env.MOTIONMODE + "1";
        await axios.post(blynkUrl);
        res.status(200).json({
            success: true,
            messafe: "turnONMotionMode success"
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
        motionMode.status = "offline";
        motionMode.save();
        const blynkUrl = process.env.MOTIONMODE + "0";
        await axios.post(blynkUrl);
        res.status(200).json({
            success: true,
            messafe: "turnOFFMotionMode success"
        })
    }catch(error)
    {
        res.status(500).json({ success: false, message: error.message });
    }
}
const fanController = async (req,res) => {
    try{
        const value = req.param.value;
        const userId = req.user._id;
        const fan = await Device.findOne({ owner_id: userId, type: 'fan' });
        if (!fan) {
            return res.status(404).json({ success: false, message: 'fan not found' });
        }
        fan.current_value = value;
        fan.save();
        const blynkUrl = process.env.FAN + value;
        await axios.post(blynkUrl);
        res.status(200).json({
            success: true,
            messafe: "fan success"
        })
    }catch(error)
    {
        res.status(500).json({ success: false, message: error.message });
    }
}
module.exports = {
    turnONLed,
    turnOFFLed,
    turnONAutoLed,
    turnOFFAutoLed,
    turnONMotionMode,
    turnOFFMotionMode,
    fanController
}