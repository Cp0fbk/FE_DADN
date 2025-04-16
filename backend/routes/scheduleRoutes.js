const express = require('express');
const router = express.Router();
const {
    createLedSchedule,
    createFanSchedule,
    deleteSchedule,
} = require('../controllers/scheduleController');
const { authenticateMiddleware } = require('../middleware/auth');
router.post('/createLedSchedule', authenticateMiddleware, createLedSchedule);
router.post('/createFanSchedule', authenticateMiddleware, createFanSchedule);
router.delete('/deleteSchedule/:scheduleId', authenticateMiddleware, deleteSchedule);
module.exports = router;