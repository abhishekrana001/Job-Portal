const express = require("express");
const router = express.Router();
const {
  applyForJob,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
  deleteApplication,
} = require("../controllers/applicationController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// User routes
router.post("/", protect, applyForJob);
router.get("/my", protect, getMyApplications);

// Admin routes
router.get("/", protect, adminOnly, getAllApplications);
router.put("/:id/status", protect, adminOnly, updateApplicationStatus);
router.delete("/:id", protect, adminOnly, deleteApplication);

module.exports = router;
