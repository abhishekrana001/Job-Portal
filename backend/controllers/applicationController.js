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

// @desc  Get applications for employer's posted jobs or all (Admin)
// @route GET /api/applications/employer
// @access Private/Employer/Admin
const getEmployerApplications = async (req, res) => {
  try {
    let jobIds;
    if (req.user?.role === "admin") {
      const applications = await Application.find()
        .populate("job", "title company location salary type")
        .populate("applicant", "name email phone skills")
        .sort({ createdAt: -1 });
      return res.json(applications);
    }

    const postedJobs = await Job.find({ postedBy: req.user._id }).select("_id");
    jobIds = postedJobs.map((j) => j._id);

    const applications = await Application.find({ job: { $in: jobIds } })
      .populate("job", "title company location salary type")
      .populate("applicant", "name email phone skills")
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
      .populate("applicant", "name email phone")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update application status (Employer or Admin)
// @route PUT /api/applications/:id/status
// @access Private/Employer/Admin
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id).populate("job");
    if (!application) return res.status(404).json({ message: "Application not found" });

    // Ensure authorization
    if (
      req.user.role !== "admin" &&
      application.job?.postedBy &&
      application.job.postedBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized to update this application" });
    }

    application.status = status;
    await application.save();
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Delete application (Employer or Admin)
// @route DELETE /api/applications/:id
// @access Private/Employer/Admin
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
  getEmployerApplications,
  getAllApplications,
  updateApplicationStatus,
  deleteApplication,
};
