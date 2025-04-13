const express = require('express');
const router = express.Router();
const Course = require('../models/course'); // Make sure you have this Course model created

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('instructor', 'username')
      .sort({ createdAt: -1 }); // Sort by most recent first
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'username')
      .populate('students', 'username');
      
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json(course);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(500).send('Server error');
  }
});

// Create a new course
router.post('/', async (req, res) => {
  try {
    const { title, description, instructor, price, category, level } = req.body;
    
    const newCourse = new Course({
      title,
      description,
      instructor,
      price,
      category,
      level
    });
    
    const course = await newCourse.save();
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a course
router.put('/:id', async (req, res) => {
  try {
    const { title, description, price, category, level } = req.body;
    
    // Build course object
    const courseFields = {};
    if (title) courseFields.title = title;
    if (description) courseFields.description = description;
    if (price) courseFields.price = price;
    if (category) courseFields.category = category;
    if (level) courseFields.level = level;
    
    let course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Update
    course = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: courseFields },
      { new: true }
    );
    
    res.json(course);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(500).send('Server error');
  }
});

// Delete a course
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    await course.deleteOne();
    
    res.json({ message: 'Course removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(500).send('Server error');
  }
});

// Enroll a student in a course
router.post('/:id/enroll', async (req, res) => {
  try {
    const { studentId } = req.body;
    
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if student is already enrolled
    if (course.students.includes(studentId)) {
      return res.status(400).json({ message: 'Student already enrolled' });
    }
    
    // Add student to course
    course.students.push(studentId);
    await course.save();
    
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;