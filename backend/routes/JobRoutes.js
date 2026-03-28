const express = require("express");
const router = express.Router();
const { createJob, getAllJobs, getJobById, getEmployerJobs, updateJobStatus } = require("../Controllers/JobController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Public routes
router.get("/all", getAllJobs);
router.get("/:id", getJobById);

// Employer routes
router.post("/create", protect, authorize("employer", "admin"), createJob);
router.get("/employer/all", protect, authorize("employer"), getEmployerJobs);

// Admin / Employer route for status update
router.put("/:id/status", protect, authorize("employer", "admin"), updateJobStatus);

module.exports = router;
