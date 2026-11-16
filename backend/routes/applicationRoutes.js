const express = require("express");
const router = express.Router();
const {
  applyForJob,
  getMyApplications,
  getEmployerApplications,
  getAllApplications,
  updateApplicationStatus,
  deleteApplication,
} = require("../controllers/applicationController");
const { protect, adminOnly, employerOrAdmin } = require("../middleware/authMiddleware");

// Job Seeker routes
router.post("/", protect, applyForJob);
router.get("/my", protect, getMyApplications);

// Employer & Admin routes
router.get("/employer", protect, employerOrAdmin, getEmployerApplications);
router.get("/", protect, adminOnly, getAllApplications);
router.put("/:id/status", protect, employerOrAdmin, updateApplicationStatus);
router.delete("/:id", protect, employerOrAdmin, deleteApplication);

module.exports = router;
