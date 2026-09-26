import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="logo" onClick={closeMenu}>
          JobPortal
        </Link>

        {/* Hamburger */}
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Navigation */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>

          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/jobs" onClick={closeMenu}>
            Jobs
          </Link>

          <Link to="/companies" onClick={closeMenu}>
            Companies
          </Link>

          {isLoggedIn && (
            <>
              <Link to="/saved-jobs" onClick={closeMenu}>
                Saved Jobs
              </Link>

              <Link to="/applications" onClick={closeMenu}>
                Applications
              </Link>

              <Link to="/profile" onClick={closeMenu}>
                Profile
              </Link>

              <span className="user-name">
                👤 {user?.name}
              </span>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>

              <Link to="/register" onClick={closeMenu}>
                Register
              </Link>
            </>
          )}

        </nav>
      </div>
    </header>
  );
}

export default Navbar;