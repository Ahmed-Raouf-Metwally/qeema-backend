// Dependencies
const authService = require("./auth.service");

// Registration controller
const register = async (req, res, next) => {
  try {
    const result = await authService.registerStudent(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

// Login controller
const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

// Export
module.exports = { register, login };
