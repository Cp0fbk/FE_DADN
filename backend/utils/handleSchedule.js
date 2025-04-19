const Schedule = require('../models/schedule');
const Device = require('../models/device');
require('dotenv').config();
const axios = require('axios');
const handleSchedule = async () => {
    try {
        const now = new Date();
        // console.log(now);
        
        const schedules = await Schedule.find({ done: false });

        for (const sch of schedules) {
            const scheduledTime = new Date(sch.time);
            // console.log("scheduledTime: ", scheduledTime);
            if (scheduledTime <= now) {
                console.log(`Đến giờ rồi: ${sch.action}`);

                const [type, valueStr] = sch.action.split('/');
                const value = parseInt(valueStr);
                let blynkUrl = "";
                if (type === 'led') {
                    if (value === 0) {
                        console.log("led turn off");
                        blynkUrl = process.env.LED + "0";
                    } else if (value > 0 && value < 99) {
                        console.log("led mid");
                        blynkUrl = process.env.LED + value.toString();
                    } else if (value >= 99) {
                        console.log("led max");
                        blynkUrl = process.env.LED + "99";
                    }
                } else if (type === 'fan') {
                    if (value >= 0 && value <= 255) {
                        console.log(`fan value: ${value}`);
                        blynkUrl = process.env.FAN + value.toString();
                    } else {
                        console.log("fan value out of range!");
                    }
                } else {
                    console.log("Unknown action type!");
                }
                console.log("blynkUrl", blynkUrl)
                try {
                    await axios.get(blynkUrl);
                    console.log("done"); 
                } catch (err) {
                    console.error("Error calling Blynk:", err.message);
                    // return res.status(500).json({ success: false, message: "Failed to trigger Blynk LED" });
                }
                // Lưu lịch sử thiết bị
                const device = await Device.findById(sch.deviceId);
                if (device) {
                    device.history.push({
                        value: value,
                        timestamp: new Date()
                    });
                    device.current_value = value.toString();
                    await device.save();
                }

                // Đánh dấu schedule đã hoàn tất
                sch.done = true;
                await sch.save();
            }
        }
    } catch (e) {
        console.error("Lỗi trong handleSchedule:", e);
    }
}

const handleSchedule_ = async () => {
    setInterval(handleSchedule, 5 * 1000);
}

module.exports = handleSchedule_;