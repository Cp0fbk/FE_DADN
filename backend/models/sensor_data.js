const mongoose = require("mongoose");

const SensorDataSchema = new mongoose.Schema({
  sensor_id: { type: mongoose.Schema.Types.ObjectId, ref: "Sensor", required: true },
  timestamp: { type: Date, default: Date.now },
  value: { type: String, required: true },
});

module.exports = mongoose.model("SensorData", SensorDataSchema);
