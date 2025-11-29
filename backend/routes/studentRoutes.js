const express = require('express');
const { getStudents, createStudent } = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getStudents);
router.post('/', authMiddleware, createStudent);

module.exports = router;