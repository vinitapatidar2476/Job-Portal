const User = require("../models/User");
const Job = require("../models/job");
const Application = require("../models/Application");

const getAnalytics = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalApplications = await Application.countDocuments();
    
    const usersByRole = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ]);

    res.json({
      totalJobs,
      totalUsers,
      totalApplications,
      usersByRole
    });
  } catch (error) {
    res.status(500).json({ message: "Fetching analytics failed", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Fetching users failed", error: error.message });
  }
};

const getAllJobsAdmin = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Fetching jobs failed", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Deleting user failed", error: error.message });
  }
};

const approveJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job approved", job });
  } catch (error) {
    res.status(500).json({ message: "Approving job failed", error: error.message });
  }
};

const rejectJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job rejected", job });
  } catch (error) {
    res.status(500).json({ message: "Rejecting job failed", error: error.message });
  }
};

module.exports = { getAnalytics, getAllUsers, getAllJobsAdmin, deleteUser, approveJob, rejectJob };
