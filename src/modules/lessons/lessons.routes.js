// Dependencies
const express = require("express");
const lessonsController = require("./lessons.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

// Router
const router = express.Router();

// Student can view lessons only
router.get("/", authMiddleware, lessonsController.getLessons);

// Export
module.exports = router;
