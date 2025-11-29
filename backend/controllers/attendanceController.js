const Attendance = require('../models/Attendance');

const submitAttendance = async (req, res) => {
  try {
    const { studentId, status } = req.body;
    const attendance = new Attendance({
      studentId,
      status,
      teacherId: req.user.id
    });
    await attendance.save();
    res.json({ message: 'Attendance submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAttendanceSummary = async (req, res) => {
  try {
    const summary = await Attendance.aggregate([
      { $match: { teacherId: req.user.id } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitAttendance, getAttendanceSummary };