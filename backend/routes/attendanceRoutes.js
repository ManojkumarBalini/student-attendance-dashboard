const express = require('express');
const { submitAttendance, getAttendanceSummary } = require('../controllers/attendanceController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, submitAttendance);
router.get('/summary', authMiddleware, getAttendanceSummary);

module.exports = router;