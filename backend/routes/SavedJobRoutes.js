const express = require("express");
const router = express.Router();
const {
  saveJob,
  getSavedJobs,
  unsaveJob,
} = require("../Controllers/SavedJobController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/save", authMiddleware, saveJob);
router.get("/my", authMiddleware, getSavedJobs);
router.delete("/unsave/:jobId", authMiddleware, unsaveJob);

module.exports = router;
