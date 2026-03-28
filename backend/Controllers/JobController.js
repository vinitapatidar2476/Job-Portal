const Job = require("../models/job");

const createJob = async (req, res) => {
  const { title, description, company, location, salary, category, skills, experience, jobType } = req.body;

  try {
    const newJob = new Job({
      title,
      description,
      company,
      location,
      salary,
      category,
      skills,
      experience,
      jobType,
      postedBy: req.user.id,
      status: "pending", // Manager posts, Admin approves
    });

    await newJob.save();
    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ message: "Job creation failed", error: error.message });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const { 
      keyword, 
      category, 
      location, 
      experience, 
      jobType, 
      page = 1, 
      limit = 10 
    } = req.query;

    const query = { status: "approved" };

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { company: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    if (category) query.category = category;
    if (location) query.location = { $regex: location, $options: "i" };
    if (experience) query.experience = experience;
    if (jobType) query.jobType = jobType;

    const skip = (page - 1) * limit;

    const jobs = await Job.find(query)
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Job.countDocuments(query);

    res.json({
      jobs,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Fetching jobs failed", error: error.message });
  }
};

const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate("postedBy", "name email");
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: "Fetching job failed", error: error.message });
    }
};

const updateJobStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const job = await Job.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.json({ message: "Job status updated", job });
    } catch (error) {
        res.status(500).json({ message: "Updating job status failed", error: error.message });
    }
};

const getEmployerJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ postedBy: req.user.id }).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Fetching jobs failed", error: error.message });
    }
};

module.exports = { createJob, getAllJobs, getJobById, updateJobStatus, getEmployerJobs };
