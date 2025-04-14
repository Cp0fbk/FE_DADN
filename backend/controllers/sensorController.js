require('dotenv').config();
const axios = require('axios');
const Sensor = require('../models/sensor')

const updateTempValue = async (req,res) => {
    try{
        const userId = req.user._id;
        const item = await Sensor.findOne({ owner_id: userId, type: 'temp' });
        if (!item) {
            return res.status(404).json({ success: false, message: 'Temp not found' });
        }

        const { value } = req.body;
        const timestamp = new Date();

        item.value.push({ value, timestamp });
        await item.save();

        const blynkUrl = process.env.TEMPERATURE_UPDATE + value;
        await axios.post(blynkUrl);
        res.status(200).json({
            success: true,
            messafe: "updateTempValue success"
        })
    }catch(error)
    {
        res.status(500).json({ success: false, message: error.message });
    }
}
const getTempValue = async (req,res) => {
    try{
        const userId = req.user._id;
        const item = await Sensor.findOne({ owner_id: userId, type: 'temp' });
        if (!item) {
            return res.status(404).json({ success: false, message: 'Temp not found' });
        }
        const blynkUrl = process.env.TEMPERATURE_GET;
        const tempValue = await axios.get(blynkUrl);
        res.status(200).json({
            success: true,
            value: tempValue
        })
    }catch(error)
    {
        res.status(500).json({ success: false, message: error.message });
    }
}
const updateHumiValue = async (req,res) => {
    try{
        const userId = req.user._id;
        const item = await Sensor.findOne({ owner_id: userId, type: 'humi' });
        if (!item) {
            return res.status(404).json({ success: false, message: 'Humi not found' });
        }

        const { value } = req.body;
        const timestamp = new Date();

        item.value.push({ value, timestamp });
        await item.save();

        const blynkUrl = process.env.HUMI_UPDATE + value;
        await axios.post(blynkUrl);
        res.status(200).json({
            success: true,
            messafe: "updateHumiValue success"
        })
    }catch(error)
    {
        res.status(500).json({ success: false, message: error.message });
    }
}
const getHumiValue = async (req,res) => {
    try{
        const userId = req.user._id;
        const item = await Sensor.findOne({ owner_id: userId, type: 'humi' });
        if (!item) {
            return res.status(404).json({ success: false, message: 'Humi not found' });
        }
        const blynkUrl = process.env.HUMI_GET;
        const humiValue = await axios.get(blynkUrl);
        res.status(200).json({
            success: true,
            value: humiValue
        })
    }catch(error)
    {
        res.status(500).json({ success: false, message: error.message });
    }
}
const getALLTempValue = async (req,res) => {
    try{
        const userId = req.user._id;
        const item = await Sensor.findOne({ owner_id: userId, type: 'temp' });
        if (!item) {
            return res.status(404).json({ success: false, message: 'Temp not found' });
        }
        res.status(200).json({
            success: true,
            value: item.value
        })
    }catch(error)
    {
        res.status(500).json({ success: false, message: error.message });
    }
}
const getALLHumiValue = async (req,res) => {
    try{
        const userId = req.user._id;
        const item = await Sensor.findOne({ owner_id: userId, type: 'humi' });
        if (!item) {
            return res.status(404).json({ success: false, message: 'Humi not found' });
        }
        res.status(200).json({
            success: true,
            value: item.value
        })
    }catch(error)
    {
        res.status(500).json({ success: false, message: error.message });
    }
}
module.exports = {
    updateTempValue,
    getTempValue,
    updateHumiValue,
    getHumiValue,
    getALLTempValue,
    getALLHumiValue
}