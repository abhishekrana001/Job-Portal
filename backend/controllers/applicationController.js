const Application = require("../models/Application");
const Job = require("../models/Job");

// @desc  Apply for a job
// @route POST /api/applications
// @access Private
const applyForJob = async (req, res) => {
  try {
    const { jobId, fullName, email, phone, coverLetter, experience, linkedIn, portfolio } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Check for duplicate application
    const existing = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    });
    if (existing) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      fullName,
      email,
      phone,
      coverLetter,
      experience,
      linkedIn,
      portfolio,
    });

    // Add application ref to job
    job.applicants.push(application._id);
    await job.save();

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get my applications (logged-in user)
// @route GET /api/applications/my
// @access Private
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate("job", "title company location type salary")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get all applications (Admin only)
// @route GET /api/applications
// @access Private/Admin
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("job", "title company location")
      .populate("applicant", "name email")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update application status (Admin only)
// @route PUT /api/applications/:id/status
// @access Private/Admin
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!application) return res.status(404).json({ message: "Application not found" });
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Delete application (Admin only)
// @route DELETE /api/applications/:id
// @access Private/Admin
const deleteApplication = async (req, res) => {
  try {
    const app = await Application.findByIdAndDelete(req.params.id);
    if (!app) return res.status(404).json({ message: "Application not found" });
    res.json({ message: "Application deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
  deleteApplication,
};
