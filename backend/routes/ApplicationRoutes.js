const express = require("express");
const router = express.Router();
const multer = require("multer");
const { protect, authorize } = require("../middleware/authMiddleware");
const { applyJob, getAppliedJobs, getJobApplicants, updateApplicationStatus, getAllEmployerApplicants } = require("../Controllers/ApplicationController");

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Seeker routes
router.post("/apply", protect, authorize("seeker"), upload.single("resume"), applyJob);
router.get("/my-applications", protect, authorize("seeker"), getAppliedJobs);

// Employer routes
router.get("/employer/all-applicants", protect, authorize("employer", "admin"), getAllEmployerApplicants);
router.get("/job/:jobId/applicants", protect, authorize("employer", "admin"), getJobApplicants);
router.put("/:id/status", protect, authorize("employer", "admin"), updateApplicationStatus);

module.exports = router;
