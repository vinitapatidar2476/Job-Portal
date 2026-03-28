const express = require("express");
const router = express.Router();
const { getAnalytics, getAllUsers, getAllJobsAdmin, deleteUser, approveJob, rejectJob } = require("../Controllers/AdminController");
const { protect, authorize } = require("../middleware/authMiddleware");

// All admin routes are protected and restricted to 'admin' role
router.use(protect, authorize("admin"));

router.get("/analytics", getAnalytics);
router.get("/users", getAllUsers);
router.get("/jobs", getAllJobsAdmin);
router.delete("/user/:id", deleteUser);
router.put("/job/approve/:id", approveJob);
router.put("/job/reject/:id", rejectJob);

module.exports = router;
