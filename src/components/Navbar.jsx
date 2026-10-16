import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Briefcase,
  Compass,
  Building2,
  Bookmark,
  FileText,
  User,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  X,
  Sparkles,
  Shield
} from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  // Update saved jobs count when storage changes or navigation happens
  useEffect(() => {
    const updateSavedCount = () => {
      try {
        const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
        setSavedCount(saved.length);
      } catch (e) {
        setSavedCount(0);
      }
    };

    updateSavedCount();
    window.addEventListener("storage", updateSavedCount);
    return () => window.removeEventListener("storage", updateSavedCount);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => {
    setMenuOpen(false);
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
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={closeMenu}>
          <div className="logo-icon">
            <Briefcase size={20} className="logo-svg" />
            <span className="logo-sparkle"><Sparkles size={12} /></span>
          </div>
          <div className="logo-text">
            <span>Job</span>
            <span className="logo-accent">Portal</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <Compass size={17} />
            <span>Explore</span>
          </NavLink>

          <NavLink
            to="/jobs"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <Briefcase size={17} />
            <span>Jobs</span>
          </NavLink>

          <NavLink
            to="/companies"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <Building2 size={17} />
            <span>Companies</span>
          </NavLink>

          {isLoggedIn && !isAdmin && (
            <>
              <NavLink
                to="/saved-jobs"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                <Bookmark size={17} />
                <span>Saved</span>
                {savedCount > 0 && (
                  <span className="nav-badge">{savedCount}</span>
                )}
              </NavLink>

              <NavLink
                to="/applications"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                <FileText size={17} />
                <span>Applications</span>
              </NavLink>
            </>
          )}

          {isLoggedIn && isAdmin && (
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => `nav-link nav-link-admin ${isActive ? "active" : ""}`}
            >
              <Shield size={17} />
              <span>Admin Panel</span>
            </NavLink>
          )}
        </nav>

        {/* Right Auth / Profile Section */}
        <div className="nav-actions">
          {isLoggedIn ? (
            <div className="user-profile-menu">
              <Link to="/profile" className="user-pill" title="View Profile">
                <div className="user-avatar-sm">
                  {getInitials(user?.name)}
                </div>
                <span className="user-display-name">
                  {user?.name?.split(" ")[0] || "User"}
                </span>
              </Link>
              <button
                className="btn-icon-logout"
                onClick={handleLogout}
                title="Logout"
                aria-label="Logout"
              >
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-secondary-nav">
                <LogIn size={16} />
                <span>Sign In</span>
              </Link>
              <Link to="/register" className="btn-primary-nav">
                <UserPlus size={16} />
                <span>Get Started</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        <div className="mobile-drawer-content">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}
            onClick={closeMenu}
          >
            <Compass size={18} />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/jobs"
            className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}
            onClick={closeMenu}
          >
            <Briefcase size={18} />
            <span>Find Jobs</span>
          </NavLink>

          <NavLink
            to="/companies"
            className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}
            onClick={closeMenu}
          >
            <Building2 size={18} />
            <span>Top Companies</span>
          </NavLink>

          {isLoggedIn ? (
            <>
              <div className="mobile-divider" />

              {isAdmin ? (
                <>
                  <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) => `mobile-nav-item mobile-nav-admin ${isActive ? "active" : ""}`}
                    onClick={closeMenu}
                  >
                    <Shield size={18} />
                    <span>Admin Dashboard</span>
                  </NavLink>
                  <button className="mobile-logout-btn" onClick={handleLogout}>
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/saved-jobs"
                    className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}
                    onClick={closeMenu}
                  >
                    <Bookmark size={18} />
                    <span>Saved Jobs</span>
                    {savedCount > 0 && <span className="nav-badge">{savedCount}</span>}
                  </NavLink>

                  <NavLink
                    to="/applications"
                    className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}
                    onClick={closeMenu}
                  >
                    <FileText size={18} />
                    <span>My Applications</span>
                  </NavLink>

                  <NavLink
                    to="/profile"
                    className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}
                    onClick={closeMenu}
                  >
                    <User size={18} />
                    <span>My Profile ({user?.name})</span>
                  </NavLink>

                  <button className="mobile-logout-btn" onClick={handleLogout}>
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="mobile-auth-grid">
              <Link to="/login" className="btn-secondary-nav w-full" onClick={closeMenu}>
                <LogIn size={16} />
                <span>Sign In</span>
              </Link>
              <Link to="/register" className="btn-primary-nav w-full" onClick={closeMenu}>
                <UserPlus size={16} />
                <span>Get Started Free</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;