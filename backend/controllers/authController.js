const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc  Register new user
// @route POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, role, companyName, title } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Determine normalized role
    const assignedRole = ["employer", "recruiter"].includes(role)
      ? "employer"
      : role === "admin"
      ? "admin"
      : "jobseeker";

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: assignedRole,
      companyName: companyName || "",
      title: title || "",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      title: user.title,
      companyName: user.companyName,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Login user
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for admin credentials from env
    const adminEmail = process.env.ADMIN_EMAIL || "admin@jobportal.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";

    if (
      email.toLowerCase() === adminEmail.toLowerCase() &&
      password === adminPassword
    ) {
      return res.json({
        _id: "admin-static",
        name: "Admin",
        email: adminEmail,
        role: "admin",
        token: generateToken("admin-static"),
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      bio: user.bio,
      title: user.title,
      skills: user.skills,
      location: user.location,
      companyName: user.companyName || "",
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get current user profile
// @route GET /api/auth/me
// @access Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password").populate("savedJobs");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update user profile
// @route PUT /api/auth/profile
// @access Private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, phone, bio, title, skills, location, linkedIn, github, portfolio } = req.body;

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.bio = bio || user.bio;
    user.title = title || user.title;
    user.skills = skills || user.skills;
    user.location = location || user.location;
    user.linkedIn = linkedIn || user.linkedIn;
    user.github = github || user.github;
    user.portfolio = portfolio || user.portfolio;

    // Update password if provided
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
      title: updatedUser.title,
      skills: updatedUser.skills,
      location: updatedUser.location,
      role: updatedUser.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getMe, updateProfile };
