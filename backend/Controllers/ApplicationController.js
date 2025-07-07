const Application = require("../models/Application");

const applyToJob = async (req, res) => {
  const userId = req.user.id;

  try {
    const { jobId, coverLetter } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const alreadyApplied = await Application.findOne({ jobId, user: userId });
    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const newApplication = new Application({
      jobId,
      user: userId,
      coverLetter,
      resume: req.file.path,
    });

    await newApplication.save();

    res.status(201).json({
      message: "Application submitted successfully",
      application: newApplication,
    });
  } catch (err) {
    console.error("Error in applyToJob:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await Application.find({ user: userId }).populate(
      "jobId"
    );
    res.status(200).json({ applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { applyToJob, getMyApplications };
