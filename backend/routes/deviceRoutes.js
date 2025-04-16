const express = require('express');
const router = express.Router();
const {
  turnONLed_medium,
  turnONLed_max,
  turnOFFLed,
  turnONAutoLed,
  turnOFFAutoLed,
  turnONMotionMode,
  turnOFFMotionMode,
  fanController,
  getAllLed,
  getAllAutoLed,
  getAllMotionMode,
  getAllFan
} = require('../controllers/deviceController');
const { authenticateMiddleware } = require('../middleware/auth');

// LED control
router.post('/turnONled_high', authenticateMiddleware, turnONLed_max);
router.post('/turnONled_medium', authenticateMiddleware, turnONLed_medium);
router.post('/turnOFFled', authenticateMiddleware, turnOFFLed);

// History control
router.get('/getAllHistoryLed', authenticateMiddleware, getAllLed);
router.get('/getAllHistoryAutoLed', authenticateMiddleware, getAllAutoLed); 
router.get('/getAllHistoryMotionMode', authenticateMiddleware, getAllMotionMode); 
router.get('/getAllHistoryFan', authenticateMiddleware, getAllFan);

// Auto LED control
router.post('/turnONautoLed', authenticateMiddleware, turnONAutoLed);
router.post('/turnOFFautoLed', authenticateMiddleware, turnOFFAutoLed);

// Motion mode control
router.post('/turnONmotionMode', authenticateMiddleware, turnONMotionMode);
router.post('/turnOFFmotionMode', authenticateMiddleware, turnOFFMotionMode);

// Fan controller
router.post('/fan/:value', authenticateMiddleware, fanController);


module.exports = router;
