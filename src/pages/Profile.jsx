import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  User,
  Mail,
  Phone,
  FileText,
  Bookmark,
  Briefcase,
  Edit3,
  CheckCircle2,
  Sparkles,
  Save,
  X,
  Award
} from "lucide-react";
import "./Profile.css";

function Profile() {
  const { user, login } = useAuth();
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [appsCount, setAppsCount] = useState(0);

  const [formData, setFormData] = useState({
    name: user?.name || "Candidate Name",
    email: user?.email || "candidate@example.com",
    phone: user?.phone || "+91 98765 43210",
    bio:
      user?.bio ||
      "Full Stack Software Engineer enthusiastic about modern React ecosystems, scalable microservices, and clean UI engineering.",
    title: user?.title || "Senior Software Developer",
  });

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
      const apps = JSON.parse(localStorage.getItem("applications")) || [];
      setSavedCount(saved.length);
      setAppsCount(apps.length);
    } catch (e) {
      // ignore
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio,
      title: formData.title,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    login(updatedUser);
    setIsEditing(false);
    showToast("Profile details updated successfully! ✨", "success");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="profile-page-modern">
      <div className="profile-container-wrapper">
        {/* Profile Card Header */}
        <div className="profile-hero-card">
          <div className="profile-avatar-large">
            {getInitials(formData.name)}
          </div>

          <div className="profile-header-meta">
            <div className="profile-name-row">
              <h1>{formData.name}</h1>
              <CheckCircle2 size={18} className="profile-verified" title="Verified Candidate" />
            </div>
            <p className="profile-title-tag">{formData.title}</p>
            <div className="profile-strength-bar-wrap">
              <div className="strength-header">
                <span>Profile Strength</span>
                <span className="strength-score">90%</span>
              </div>
              <div className="strength-track">
                <div className="strength-progress" style={{ width: "90%" }} />
              </div>
            </div>
          </div>

          <div className="profile-header-actions">
            {!isEditing && (
              <button
                className="btn-edit-profile"
                onClick={() => setIsEditing(true)}
              >
                <Edit3 size={15} />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="profile-stats-row">
          <Link to="/saved-jobs" className="profile-stat-box">
            <div className="stat-icon-wrap bookmark-icon">
              <Bookmark size={20} />
            </div>
            <div>
              <span className="stat-number">{savedCount}</span>
              <span className="stat-title">Saved Jobs</span>
            </div>
          </Link>

          <Link to="/applications" className="profile-stat-box">
            <div className="stat-icon-wrap briefcase-icon">
              <Briefcase size={20} />
            </div>
            <div>
              <span className="stat-number">{appsCount}</span>
              <span className="stat-title">Applications</span>
            </div>
          </Link>

          <div className="profile-stat-box highlight-stat">
            <div className="stat-icon-wrap award-icon">
              <Sparkles size={20} />
            </div>
            <div>
              <span className="stat-number">Active</span>
              <span className="stat-title">Job Search Status</span>
            </div>
          </div>
        </div>

        {/* Profile Details or Edit Form */}
        <div className="profile-content-card">
          {!isEditing ? (
            <div className="profile-view-mode">
              <div className="detail-section">
                <h2>About & Summary</h2>
                <p className="bio-paragraph">{formData.bio}</p>
              </div>

              <div className="detail-divider" />

              <div className="detail-section">
                <h2>Contact Information</h2>
                <div className="contact-info-grid">
                  <div className="contact-info-item">
                    <Mail size={18} className="contact-icon" />
                    <div>
                      <span className="contact-label">Email Address</span>
                      <span className="contact-val">{formData.email}</span>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <Phone size={18} className="contact-icon" />
                    <div>
                      <span className="contact-label">Phone Number</span>
                      <span className="contact-val">{formData.phone}</span>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <User size={18} className="contact-icon" />
                    <div>
                      <span className="contact-label">Primary Role</span>
                      <span className="contact-val">{formData.title}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="profile-edit-form">
              <div className="edit-form-header">
                <h2>Update Profile Information</h2>
                <p>Keep your profile up to date to get matched with the best opportunities.</p>
              </div>

              <div className="form-fields-grid">
                <div className="profile-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="profile-field">
                  <label>Professional Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>

                <div className="profile-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="profile-field">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="profile-field">
                <label>Professional Bio / Summary</label>
                <textarea
                  name="bio"
                  rows="4"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Share a short bio, your tech stack, and what you are looking for..."
                />
              </div>

              <div className="profile-edit-buttons">
                <button type="submit" className="btn-save-changes">
                  <Save size={16} /> Save Changes
                </button>
                <button
                  type="button"
                  className="btn-cancel-edit"
                  onClick={() => setIsEditing(false)}
                >
                  <X size={16} /> Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;