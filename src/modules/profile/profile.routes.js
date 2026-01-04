// Dependencies
const express = require("express");
const authMiddleware = require("../../middlewares/auth.middleware");
const profileController = require("./profile.controller");

// Router   
const router = express.Router();

// get my profile
router.get("/", authMiddleware, profileController.getMyProfile);

// update my profile
router.put("/", authMiddleware, profileController.updateMyProfile);

// Export
module.exports = router;
