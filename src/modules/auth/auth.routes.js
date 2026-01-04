// Dependencies
const express = require("express");
const authController = require("./auth.controller");

// Router
const router = express.Router();

// Routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Auth middleware
const authMiddleware = require("../../middlewares/auth.middleware");

// Test route to get current user info
router.get("/me", authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user });
});

// Export
module.exports = router;
