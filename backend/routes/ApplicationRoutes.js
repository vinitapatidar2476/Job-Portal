const express = require("express");
const router = express.Router();
const {
  applyToJob,
  getMyApplications,
} = require("../Controllers/ApplicationController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploads");
router.post("/apply", authMiddleware, upload.single("resume"), applyToJob);
router.get("/my", authMiddleware, getMyApplications);

module.exports = router;
