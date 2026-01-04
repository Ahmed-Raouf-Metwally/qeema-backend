const express = require("express");
const authMiddleware = require("../../../middlewares/auth.middleware");
const roleMiddleware = require("../../../middlewares/role.middleware");
const controller = require("./admin.dashboard.controller");

const router = express.Router();

router.get(
    "/dashboard/stats",
    authMiddleware,
    roleMiddleware("ADMIN"),
    controller.getStats
);

module.exports = router;
