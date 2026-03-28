const express = require("express");
const router = express.Router();
const { saveJob, getSavedJobs, unsaveJob } = require("../Controllers/SavedJobController");
const { protect } = require("../middleware/authMiddleware");

router.post("/save", protect, saveJob);
router.get("/my", protect, getSavedJobs);
router.delete("/unsave/:jobId", protect, unsaveJob);

module.exports = router;
