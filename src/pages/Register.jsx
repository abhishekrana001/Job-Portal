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
  CheckCircle2
} from "lucide-react";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    title: "",
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

    setLoading(true);

    try {
      const userData = await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        title: formData.title.trim() || "Software Engineer",
      });

      showToast(`🎉 Welcome, ${userData.name}! Account created!`, "success");
      setTimeout(() => navigate("/"), 600);
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
          <h1>Create Candidate Account</h1>
          <p>Join thousands of professionals finding tech opportunities daily.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form-modern">
          <div className="auth-field-group">
            <label htmlFor="reg-name">Full Name</label>
            <div className="auth-input-wrap">
              <User size={18} className="auth-icon" />
              <input
                id="reg-name"
                type="text"
                name="name"
                placeholder="e.g. Abhishek Sharma"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="auth-field-group">
            <label htmlFor="reg-title">Professional Title (Optional)</label>
            <div className="auth-input-wrap">
              <Briefcase size={18} className="auth-icon" />
              <input
                id="reg-title"
                type="text"
                name="title"
                placeholder="e.g. React Developer / UI Designer"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="auth-field-group">
            <label htmlFor="reg-email">Email Address</label>
            <div className="auth-input-wrap">
              <Mail size={18} className="auth-icon" />
              <input
                id="reg-email"
                type="email"
                name="email"
                placeholder="e.g. yourname@gmail.com"
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
          >
            <UserPlus size={18} />
            <span>{loading ? "Creating Account..." : "Create Free Account"}</span>
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