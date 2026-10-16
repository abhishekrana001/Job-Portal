const Job = require("../models/Job");

// @desc  Get all jobs (with filters)
// @route GET /api/jobs
// @access Public
const getAllJobs = async (req, res) => {
  try {
    const { search, location, type, category, page = 1, limit = 10 } = req.query;

    const query = { isActive: true };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { skills: { $in: [new RegExp(search, "i")] } },
      ];
    }

    if (location) query.location = { $regex: location, $options: "i" };
    if (type) query.type = type;
    if (category) query.category = { $regex: category, $options: "i" };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Job.countDocuments(query);

    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      jobs,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get single job by ID
// @route GET /api/jobs/:id
// @access Public
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Create new job (Admin only)
// @route POST /api/jobs
// @access Private/Admin
const createJob = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, postedBy: req.user?._id });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update job (Admin only)
// @route PUT /api/jobs/:id
// @access Private/Admin
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Delete job (Admin only)
// @route DELETE /api/jobs/:id
// @access Private/Admin
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Toggle save/unsave job for user
// @route POST /api/jobs/:id/save
// @access Private
const toggleSaveJob = async (req, res) => {
  try {
    const User = require("../models/User");
    const user = await User.findById(req.user._id);
    const jobId = req.params.id;

    const isSaved = user.savedJobs.includes(jobId);

    if (isSaved) {
      user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId);
    } else {
      user.savedJobs.push(jobId);
    }

    await user.save();
    res.json({ saved: !isSaved, savedJobs: user.savedJobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllJobs, getJobById, createJob, updateJob, deleteJob, toggleSaveJob };
