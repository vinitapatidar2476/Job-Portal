const express = require("express");
const router = express.Router();
const {
  createJob,
  getJobs,

  addJob,
} = require("../Controllers/JobController");

router.post("/create", createJob);
router.get("/list", getJobs);

router.post("/", addJob);

module.exports = router;
