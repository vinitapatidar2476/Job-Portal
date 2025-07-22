const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Job = require("../models/job");
const Application = require("../models/Application");
const User = require("../models/User");

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id, role: "admin" }, "admin123");

    res.json({
      message: "Admin login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching jobs", error: err.message });
  }
};

const approveJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findByIdAndUpdate(
      jobId,
      { status: "approved" },
      { new: true }
    );

    if (!job) return res.status(404).json({ message: "Job not found" });

    await Application.updateMany({ jobId }, { status: "Approved" });

    res.status(200).json({ message: "Job and Applications approved", job });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error approving job", error: err.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findByIdAndDelete(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting job", error: err.message });
  }
};
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("user", "name email")
      .populate("jobId", "title");

    res.json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    await Application.findByIdAndDelete(id);
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
const getAllJobsWithApplications = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    const jobsWithApplications = await Promise.all(
      jobs.map(async (job) => {
        const applications = await Application.find({
          jobId: job._id,
        }).populate("user", "name email");

        if (applications.length > 0) {
          return {
            job,
            applications,
          };
        } else {
          return null;
        }
      })
    );

    const filteredJobs = jobsWithApplications.filter((item) => item !== null);

    res.status(200).json(filteredJobs);
  } catch (err) {
    console.error("Error fetching applied jobs only:", err);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  adminLogin,
  getAllJobs,
  approveJob,
  deleteJob,
  getAllApplications,
  deleteApplication,
  getAllUsers,
  getAllJobsWithApplications,
};
