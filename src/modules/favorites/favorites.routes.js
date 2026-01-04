const express = require("express");
const authMiddleware = require("../../middlewares/auth.middleware");
const controller = require("./favorites.controller");

const router = express.Router();

// add to favorites
router.post("/:lessonId", authMiddleware, controller.addToFavorites);

// remove from favorites
router.delete("/:lessonId", authMiddleware, controller.removeFromFavorites);

// get my favorites
router.get("/", authMiddleware, controller.getMyFavorites);

module.exports = router;
