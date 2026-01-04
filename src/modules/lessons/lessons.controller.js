// Dependencies
const lessonsService = require("./lessons.service");

// Get lessons controller
const getLessons = async (req, res, next) => {
  try {
    const result = await lessonsService.getLessons(req.query);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Export
module.exports = { getLessons };
