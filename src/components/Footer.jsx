import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-about">
          <h2>Job<span>Portal</span></h2>
          <p>
            Find your dream job and take the next step
            in your career with JobPortal.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/jobs">Jobs</a>
          <a href="/companies">Companies</a>
          <a href="/about">About</a>
        </div>

        <div className="footer-links">
          <h3>For Job Seekers</h3>
          <a href="/jobs">Browse Jobs</a>
          <a href="/saved-jobs">Saved Jobs</a>
          <a href="/applications">My Applications</a>
          <a href="/profile">My Profile</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 JobPortal. All rights reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;