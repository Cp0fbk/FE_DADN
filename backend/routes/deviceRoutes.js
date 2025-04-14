const express = require('express');
const router = express.Router();
const {
  turnONLed,
  turnOFFLed,
  turnONAutoLed,
  turnOFFAutoLed,
  turnONMotionMode,
  turnOFFMotionMode,
  fanController
} = require('../controllers/deviceController');
const { authenticateMiddleware } = require('../middleware/auth');

// LED control
router.post('/turnONled', authenticateMiddleware, turnONLed);
router.post('/turnOFFled', authenticateMiddleware, turnOFFLed);

// Auto LED control
router.post('/turnONautoLed', authenticateMiddleware, turnONAutoLed);
router.post('/turnOFFautoLed', authenticateMiddleware, turnOFFAutoLed);

// Motion mode control
router.post('/turnONmotionMode', authenticateMiddleware, turnONMotionMode);
router.post('/turnOFFmotionMode', authenticateMiddleware, turnOFFMotionMode);

// Fan controller
router.post('/fan', authenticateMiddleware, fanController);

module.exports = router;
