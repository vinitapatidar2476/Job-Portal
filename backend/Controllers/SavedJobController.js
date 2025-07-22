const SavedJob = require("../models/SaveJob");

const saveJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobId = req.body.jobId;

    const alreadySaved = await SavedJob.findOne({ user: userId, job: jobId });
    if (alreadySaved) {
      return res.status(400).json({ message: "Job already saved" });
    }

    const saved = new SavedJob({ user: userId, job: jobId });
    await saved.save();

    res.status(201).json({ message: "Job saved successfully", saved });
  } catch (error) {
    console.error("Save job error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getSavedJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    const savedJobs = await SavedJob.find({ user: userId }).populate("job");
    res.status(200).json({ savedJobs });
  } catch (error) {
    console.error("Get saved jobs error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const unsaveJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.jobId;

    await SavedJob.findOneAndDelete({ user: userId, job: jobId });

    res.status(200).json({ message: "Job unsaved successfully" });
  } catch (error) {
    console.error("Unsave job error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = { saveJob, getSavedJobs, unsaveJob };
