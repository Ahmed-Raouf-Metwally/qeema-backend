// Services
const adminLessonsService = require("./admin.lessons.service");

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

module.exports = { createLesson, updateLesson, deleteLesson };