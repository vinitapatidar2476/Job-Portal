const Application = require("../models/Application");
const Job = require("../models/job");
const sendEmail = require("../utils/sendEmail");

const applyJob = async (req, res) => {
  const { jobId, coverLetter } = req.body;
  const resume = req.file ? req.file.path : null;

  try {
    if (!resume) return res.status(400).json({ message: "Resume is required" });

    const newApplication = new Application({
      user: req.user.id,
      jobId,
      coverLetter,
      resume,
      status: "pending",
    });

    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully", application: newApplication });
  } catch (error) {
    res.status(500).json({ message: "Application failed", error: error.message });
  }
};

const getAppliedJobs = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id })
      .populate("jobId", "title company location salary status")
      .sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Fetching applications failed", error: error.message });
  }
};

const getJobApplicants = async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId })
      .populate("user", "name email")
      .sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Fetching applicants failed", error: error.message });
  }
};

const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true })
      .populate("user", "name email")
      .populate("jobId", "title company");

    if (!application) return res.status(404).json({ message: "Application not found" });

    // Send notification email
    const emailOptions = {
      email: application.user.email,
      subject: `Application Status Update: ${application.jobId.title}`,
      message: `Hi ${application.user.name},\n\nYour application status for the job "${application.jobId.title}" at "${application.jobId.company}" has been updated to: ${status.toUpperCase()}.\n\nBest regards,\nJob Portal Team`,
    };

    try {
      await sendEmail(emailOptions);
    } catch (emailErr) {
      console.log("Email failed to send:", emailErr.message);
    }

    res.json({ message: `Application ${status}`, application });
  } catch (error) {
    res.status(500).json({ message: "Updating status failed", error: error.message });
  }
};

// Get ALL applicants across all jobs posted by the logged-in employer
const getAllEmployerApplicants = async (req, res) => {
  try {
    const Job = require("../models/job");
    // Find all jobs belonging to this employer
    const employerJobs = await Job.find({ postedBy: req.user.id }).select("_id title");
    const jobIds = employerJobs.map(j => j._id);

    if (jobIds.length === 0) return res.json([]);

    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate("user", "name email")
      .populate("jobId", "title company")
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Fetching all applicants failed", error: error.message });
  }
};

module.exports = { applyJob, getAppliedJobs, getJobApplicants, updateApplicationStatus, getAllEmployerApplicants };
