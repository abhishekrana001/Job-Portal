import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ArrowRight,
  Sparkles,
  Briefcase,
  ShieldCheck
} from "lucide-react";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Quick Demo fill
  const handleFillDemo = () => {
    setEmail("demo@jobportal.com");
    setPassword("Demo@123");
    showToast("Filled demo credentials!", "info");
  };

  // Quick Admin fill
  const handleFillAdmin = () => {
    setEmail("admin@jobportal.com");
    setPassword("Admin@123");
    showToast("Filled admin credentials!", "info");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = await login({ email, password });

      if (userData.role === "admin") {
        showToast("🛡️ Welcome, Admin!", "success");
        setTimeout(() => navigate("/admin/dashboard"), 400);
      } else {
        showToast(`🎉 Welcome back, ${userData.name}!`, "success");
        setTimeout(() => navigate("/"), 500);
      }
    } catch (err) {
      showToast(err.message || "Invalid email or password.", "error");
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
          <h1>Welcome Back</h1>
          <p>Sign in to manage your applications and saved jobs.</p>
        </div>

        {/* Demo Fast Login Helper */}
        <div className="demo-credentials-banner">
          <div>
            <span className="demo-label">Quick Login Options</span>
            <p>Fill credentials instantly for testing.</p>
          </div>
          <div className="demo-btn-group">
            <button
              type="button"
              className="btn-fill-demo"
              onClick={handleFillDemo}
            >
              <Sparkles size={13} /> Candidate
            </button>
            <button
              type="button"
              className="btn-fill-admin"
              onClick={handleFillAdmin}
            >
              <ShieldCheck size={13} /> Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form-modern">
          <div className="auth-field-group">
            <label htmlFor="login-email">Email Address</label>
            <div className="auth-input-wrap">
              <Mail size={18} className="auth-icon" />
              <input
                id="login-email"
                type="email"
                placeholder="e.g. user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth-field-group">
            <div className="label-flex">
              <label htmlFor="login-pass">Password</label>
            </div>
            <div className="auth-input-wrap">
              <Lock size={18} className="auth-icon" />
              <input
                id="login-pass"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <button
            type="submit"
            className="btn-auth-submit"
            disabled={loading}
          >
            <LogIn size={18} />
            <span>{loading ? "Signing in..." : "Sign In to JobPortal"}</span>
          </button>
        </form>

        <div className="auth-footer-prompt">
          <p>
            Don't have an account yet?{" "}
            <Link to="/register" className="auth-link-accent">
              Create an account <ArrowRight size={13} style={{ display: "inline" }} />
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;