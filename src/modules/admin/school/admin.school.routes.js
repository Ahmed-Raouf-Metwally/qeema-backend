const express = require("express");
const authMiddleware = require("../../../middlewares/auth.middleware");
const roleMiddleware = require("../../../middlewares/role.middleware");
const controller = require("./admin.school.controller");

const router = express.Router();

router.get(
    "/school",
    authMiddleware,
    roleMiddleware("ADMIN"),
    controller.getSchoolProfile
);

router.post(
    "/school",
    authMiddleware,
    roleMiddleware("ADMIN"),
    controller.updateSchoolProfile
);

module.exports = router;
