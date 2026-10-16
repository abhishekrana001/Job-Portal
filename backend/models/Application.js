const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Applicant details snapshot at time of application
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    coverLetter: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    experience: { type: String, default: "" },
    linkedIn: { type: String, default: "" },
    portfolio: { type: String, default: "" },

    status: {
      type: String,
      enum: ["Pending", "Under Review", "Shortlisted", "Rejected", "Hired"],
      default: "Pending",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Prevent duplicate applications
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
