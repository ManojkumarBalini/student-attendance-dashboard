const Student = require('../models/Student');

const getStudents = async (req, res) => {
  try {
    console.log('Fetching students for teacher:', req.user.id);
    const students = await Student.find({ teacherId: req.user.id });
    console.log('Found students:', students.length);
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error fetching students' });
  }
};

const createStudent = async (req, res) => {
  try {
    const { name, class: studentClass } = req.body;
    const teacherId = req.user.id;

    console.log('Creating student:', { name, studentClass, teacherId });

    if (!name || !studentClass) {
      return res.status(400).json({ message: 'Name and class are required' });
    }

    if (!teacherId) {
      return res.status(401).json({ message: 'Teacher not authenticated' });
    }

    const student = new Student({
      name: name.trim(),
      class: studentClass.trim(),
      teacherId: teacherId
    });

    const savedStudent = await student.save();
    console.log('Student saved successfully:', savedStudent);
    
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error('Error creating student:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Student already exists' });
    }
    
    res.status(500).json({ 
      message: 'Server error creating student: ' + error.message 
    });
  }
};

module.exports = { getStudents, createStudent };