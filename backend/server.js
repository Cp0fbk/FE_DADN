require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectMongoDB = require('./db/connectDB');
const app = express();
const PORT = process.env.PORT || 5000;
const deviceRoutes = require("./routes/deviceRoutes");
const sensorRoutes = require("./routes/sensorRoutes");
const authRoutes = require("./routes/authRoutes");


// Cấu hình CORS
app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
app.use(express.json({ limit: "5mb" }));    // chống ddos

// Middleware xử lý lỗi
app.use((err, req, res, next) => {  
    console.error(err);
    res.status(500).json({
        success: false,
        error: 'Something went wrong'
    });
});

// Routes xử lý request
app.use("/api/devices", deviceRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/auth", authRoutes);
// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});
