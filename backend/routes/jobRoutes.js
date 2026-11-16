const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  getMyPostedJobs,
  createJob,
  updateJob,
  deleteJob,
  toggleSaveJob,
} = require("../controllers/jobController");
const { protect, employerOrAdmin } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getAllJobs);
router.get("/my/posted", protect, employerOrAdmin, getMyPostedJobs);
router.get("/:id", getJobById);

// Private routes (Job seeker)
router.post("/:id/save", protect, toggleSaveJob);

// Employer & Admin routes
router.post("/", protect, employerOrAdmin, createJob);
router.put("/:id", protect, employerOrAdmin, updateJob);
router.delete("/:id", protect, employerOrAdmin, deleteJob);

module.exports = router;
