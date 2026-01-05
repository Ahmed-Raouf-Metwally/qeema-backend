const express = require("express");
const authMiddleware = require("../../../middlewares/auth.middleware");
const roleMiddleware = require("../../../middlewares/role.middleware");
const adminLessonsController = require("./admin.lessons.controller");

const router = express.Router();

router.post(
  "/lessons",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminLessonsController.createLesson
);

router.get(
  "/lessons",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminLessonsController.getAllLessons
);
router.put(
  "/lessons/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminLessonsController.updateLesson
);

router.delete(
  "/lessons/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminLessonsController.deleteLesson
);

module.exports = router;
