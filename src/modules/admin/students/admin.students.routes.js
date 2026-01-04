const express = require("express");
const authMiddleware = require("../../../middlewares/auth.middleware");
const roleMiddleware = require("../../../middlewares/role.middleware");
const controller = require("./admin.students.controller");

const router = express.Router();

// list students
router.get(
  "/students",
  authMiddleware,
  roleMiddleware("ADMIN"),
  controller.getStudents
);

// create student
router.post(
  "/students",
  authMiddleware,
  roleMiddleware("ADMIN"),
  controller.createStudent
);

// update student
router.put(
  "/students/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  controller.updateStudent
);

// delete student
router.delete(
  "/students/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  controller.deleteStudent
);

module.exports = router;
