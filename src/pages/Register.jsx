import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();

  const [role, setRole] = useState("jobseeker"); // "jobseeker" or "employer"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    title: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      showToast("Password must be at least 6 characters long.", "error");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match! Please verify.", "error");
      return;
    }

    if (role === "employer" && !formData.companyName.trim()) {
      showToast("Please enter your Company Name.", "error");
      return;
    }

    setLoading(true);

    try {
      const userData = await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: role,
        companyName: role === "employer" ? formData.companyName.trim() : "",
        title: role === "employer"
          ? formData.title.trim() || "Talent Acquisition / HR"
          : formData.title.trim() || "Software Engineer",
      });

      if (userData.role === "employer") {
        showToast(`🏢 Welcome, ${userData.name}! Employer account ready.`, "success");
        setTimeout(() => navigate("/admin/dashboard"), 600);
      } else {
        showToast(`🎉 Welcome, ${userData.name}! Account created!`, "success");
        setTimeout(() => navigate("/jobs"), 600);
      }
    } catch (err) {
      showToast(err.message || "Failed to create account. Please try again.", "error");
      setLoading(false);
    }
  };

  return (
    <main className="auth-page-modern">
      <div className="auth-mesh-glow" />

      <div className="auth-card-modern">
        {/* Brand Header */}
        <div className="auth-brand-head">
          <div className="auth-logo-badge">
            <Briefcase size={22} />
          </div>
          <h1>Join JobPortal</h1>
          <p>India's leading career platform matching talent with top companies.</p>
        </div>

        {/* User Role Selection Tabs - Naukri / Indeed style */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginBottom: "22px",
          background: "var(--card-bg, #111827)",
          padding: "6px",
          borderRadius: "14px",
          border: "1px solid rgba(255, 255, 255, 0.08)"
        }}>
          <button
            type="button"
            onClick={() => setRole("jobseeker")}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontWeight: "600",
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
              background: role === "jobseeker" ? "linear-gradient(135deg, #3b82f6, #1d4ed8)" : "transparent",
              color: role === "jobseeker" ? "#ffffff" : "var(--text-muted, #94a3b8)",
              boxShadow: role === "jobseeker" ? "0 4px 12px rgba(59, 130, 246, 0.3)" : "none"
            }}
          >
            <User size={16} />
            <span>Job Seeker</span>
          </button>

          <button
            type="button"
            onClick={() => setRole("employer")}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontWeight: "600",
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
              background: role === "employer" ? "linear-gradient(135deg, #10b981, #047857)" : "transparent",
              color: role === "employer" ? "#ffffff" : "var(--text-muted, #94a3b8)",
              boxShadow: role === "employer" ? "0 4px 12px rgba(16, 185, 129, 0.3)" : "none"
            }}
          >
            <Building2 size={16} />
            <span>Employer / Recruiter</span>
          </button>
        </div>

        <div style={{
          textAlign: "center",
          fontSize: "0.82rem",
          color: "var(--text-secondary, #94a3b8)",
          marginBottom: "18px",
          padding: "6px 12px",
          background: "rgba(255, 255, 255, 0.03)",
          borderRadius: "8px"
        }}>
          {role === "jobseeker"
            ? "🔍 Search thousands of jobs, save listings & apply with resume."
            : "📢 Post unlimited job openings, manage candidates & hire top talent."}
        </div>

        <form onSubmit={handleSubmit} className="auth-form-modern">
          <div className="auth-field-group">
            <label htmlFor="reg-name">{role === "employer" ? "Contact Person Name" : "Full Name"}</label>
            <div className="auth-input-wrap">
              <User size={18} className="auth-icon" />
              <input
                id="reg-name"
                type="text"
                name="name"
                placeholder={role === "employer" ? "e.g. Vikram Sharma (HR)" : "e.g. Abhishek Sharma"}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {role === "employer" ? (
            <div className="auth-field-group">
              <label htmlFor="reg-company">Company / Organization Name *</label>
              <div className="auth-input-wrap">
                <Building2 size={18} className="auth-icon" />
                <input
                  id="reg-company"
                  type="text"
                  name="companyName"
                  placeholder="e.g. Infosys, TechCorp, or Startup Ltd."
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          ) : (
            <div className="auth-field-group">
              <label htmlFor="reg-title">Target Role / Professional Title</label>
              <div className="auth-input-wrap">
                <Briefcase size={18} className="auth-icon" />
                <input
                  id="reg-title"
                  type="text"
                  name="title"
                  placeholder="e.g. React Developer / Backend Engineer"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <div className="auth-field-group">
            <label htmlFor="reg-email">{role === "employer" ? "Official Work Email" : "Email Address"}</label>
            <div className="auth-input-wrap">
              <Mail size={18} className="auth-icon" />
              <input
                id="reg-email"
                type="email"
                name="email"
                placeholder={role === "employer" ? "e.g. hr@yourcompany.com" : "e.g. yourname@gmail.com"}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="auth-field-group">
            <label htmlFor="reg-pass">Create Password</label>
            <div className="auth-input-wrap">
              <Lock size={18} className="auth-icon" />
              <input
                id="reg-pass"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="btn-toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="auth-field-group">
            <label htmlFor="reg-confirm">Confirm Password</label>
            <div className="auth-input-wrap">
              <Lock size={18} className="auth-icon" />
              <input
                id="reg-confirm"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-auth-submit"
            disabled={loading}
            style={{
              background: role === "employer"
                ? "linear-gradient(135deg, #10b981, #059669)"
                : undefined
            }}
          >
            <UserPlus size={18} />
            <span>
              {loading
                ? "Creating Account..."
                : role === "employer"
                ? "Register as Employer"
                : "Create Candidate Account"}
            </span>
          </button>
        </form>

        <div className="auth-footer-prompt">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link-accent">
              Sign In <ArrowRight size={13} style={{ display: "inline" }} />
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Register;