const mongoose = require('mongoose');
const Student = require('./models/Student');
const User = require('./models/User');
require('dotenv').config();

const seedStudents = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find a teacher user
    const teacher = await User.findOne();
    if (!teacher) {
      console.log('No teacher found. Please create a teacher account first.');
      return;
    }

    const sampleStudents = [
      { name: 'John Smith', class: 'Grade 5A', teacherId: teacher._id },
      { name: 'Emma Johnson', class: 'Grade 5A', teacherId: teacher._id },
      { name: 'Michael Brown', class: 'Grade 5B', teacherId: teacher._id },
      { name: 'Sarah Davis', class: 'Grade 5B', teacherId: teacher._id },
      { name: 'David Wilson', class: 'Grade 5A', teacherId: teacher._id }
    ];

    await Student.deleteMany({ teacherId: teacher._id });
    await Student.insertMany(sampleStudents);

    console.log('Sample students added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding students:', error);
    process.exit(1);
  }
};

seedStudents();