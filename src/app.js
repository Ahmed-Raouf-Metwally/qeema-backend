const express = require("express");
const path = require("path");
const authRoutes = require("./modules/auth/auth.routes");
const lessonsRoutes = require("./modules/lessons/lessons.routes");
const adminLessonsRoutes = require("./modules/admin/lessons/admin.lessons.routes");
const profileRoutes = require("./modules/profile/profile.routes");
const adminStudentsRoutes = require("./modules/admin/students/admin.students.routes");
const favoritesRoutes = require("./modules/favorites/favorites.routes");
const adminDashboardRoutes = require("./modules/admin/dashboard/admin.dashboard.routes");
const adminSchoolRoutes = require("./modules/admin/school/admin.school.routes");
const errorHandler = require("./middlewares/error.middleware");
const cors = require("cors");

// App
const app = express();

// Health Check (Root)
app.get("/", (req, res) => {
    res.send("✅ Backend is running successfully on Vercel!");
});

// cors 
app.use(cors()); // Allow all origins, no credentials (Bearer token doesn't need credentials)

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/lessons", lessonsRoutes);
app.use("/api/admin", adminLessonsRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminStudentsRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/admin", adminDashboardRoutes);
app.use("/api/admin", adminSchoolRoutes);

// API 404 Handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: "API Endpoint Not Found" });
});

// Error Handler
app.use(errorHandler);


// Export   
module.exports = app;
