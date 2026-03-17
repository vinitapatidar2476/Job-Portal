const express = require("express");
const router = express.Router();
const {
  adminLogin,
  getAllJobs,
  approveJob,
  deleteJob,
  getAllApplications,
  deleteApplication,
  getAllUsers,
  getAllJobsWithApplications,
} = require("../Controllers/AdminController");
const Job = require("../models/job");
const Application = require("../models/Application");
const User = require("../models/User");
const adminMiddleware = require("../middleware/authMiddleware");

router.post("/login", adminLogin);
router.get("/jobs", getAllJobs);
router.put("/jobs/:id/approve", approveJob);
router.delete("/jobs/:id", deleteJob);
router.get("/users", getAllUsers);
router.get("/applications", getAllApplications);
router.delete("/applications/:id", deleteApplication);
router.get("/applied-jobs", adminMiddleware, getAllJobsWithApplications);

router.get("/adminDashboard", async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();
    const totalUsers = await User.countDocuments();

    const recentActivities = [
      "User JohnDoe applied for Web Developer",
      "New job posted: React Developer",
      "User JaneSmith registered",
    ];

    res.json({
      totalJobs,
      totalApplications,
      totalUsers,
      recentActivities,
    });
  } catch (err) {
    res.status(500).json({
      message: "Dashboard data error",
      error: err.message,
    });
  }
});
module.exports = router;
