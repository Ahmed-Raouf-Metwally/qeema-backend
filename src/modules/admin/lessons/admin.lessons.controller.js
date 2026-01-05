// Services
const adminLessonsService = require("./admin.lessons.service");
const lessonsService = require("../../lessons/lessons.service");

// Get all lessons (for admin table)
const getAllLessons = async (req, res, next) => {
  try {
    // Admin might want all without filters, or use search.
    // Reusing public getLessons service for now which supports pagination/search
    const result = await lessonsService.getLessons(req.query);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

// Create lesson
const createLesson = async (req, res, next) => {
  try {
    const lesson = await adminLessonsService.createLesson(req.body);

    res.status(201).json({
      success: true,
      data: lesson,
    });
  } catch (err) {
    next(err);
  }
};

// Update lesson
const updateLesson = async (req, res, next) => {
  try {
    const lesson = await adminLessonsService.updateLesson(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      data: lesson,
    });
  } catch (err) {
    next(err);
  }
};

// Delete lesson
const deleteLesson = async (req, res, next) => {
  try {
    await adminLessonsService.deleteLesson(req.params.id);

    res.status(200).json({
      success: true,
      message: "Lesson deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createLesson, updateLesson, deleteLesson, getAllLessons };