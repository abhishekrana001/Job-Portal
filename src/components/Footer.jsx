import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Sparkles,
  Send,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import "./Footer.css";

function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const { showToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      showToast("🎉 Subscribed for weekly top tech job alerts!", "success");
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="footer-modern">
      {/* Newsletter Strip */}
      <div className="footer-newsletter-wrap">
        <div className="newsletter-container">
          <div className="newsletter-text">
            <span className="newsletter-tag">
              <Sparkles size={14} /> Weekly Career Intelligence
            </span>
            <h3>Get Hand-Picked Tech Jobs Directly In Your Inbox</h3>
            <p>Join 45,000+ engineers receiving curated high-growth engineering roles weekly.</p>
          </div>

          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your work email address..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-newsletter-submit">
              <span>Subscribe</span>
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main-container">
        <div className="footer-cols-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand-logo">
              <div className="footer-logo-icon">
                <Briefcase size={20} />
              </div>
              <span className="footer-logo-title">
                Job<span className="footer-logo-accent">Portal</span>
              </span>
            </Link>
            <p className="footer-about-text">
              The modern destination for software engineers, product designers, and tech leaders to
              discover vetted high-impact careers worldwide.
            </p>
            <div className="footer-security-pill">
              <ShieldCheck size={16} className="text-emerald" />
              <span>100% Free For Job Seekers</span>
            </div>
          </div>

          {/* Col 1 */}
          <div className="footer-links-col">
            <h4>For Candidates</h4>
            <ul>
              <li><Link to="/jobs">Browse All Jobs</Link></li>
              <li><Link to="/jobs?search=Remote">Remote Tech Jobs</Link></li>
              <li><Link to="/companies">Verified Employers</Link></li>
              <li><Link to="/saved-jobs">Bookmarked Roles</Link></li>
              <li><Link to="/applications">Application Status</Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="footer-links-col">
            <h4>Categories</h4>
            <ul>
              <li><Link to="/jobs?search=React">React & Frontend</Link></li>
              <li><Link to="/jobs?search=Java">Java & Cloud Systems</Link></li>
              <li><Link to="/jobs?search=Backend">Backend & Distributed</Link></li>
              <li><Link to="/jobs?search=Python">AI & Machine Learning</Link></li>
              <li><Link to="/jobs?search=UI/UX">UI / UX & Product Design</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="footer-links-col">
            <h4>Company & Support</h4>
            <ul>
              <li><Link to="/">Platform Overview</Link></li>
              <li><Link to="/profile">My Candidate Profile</Link></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#contact">Candidate Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} JobPortal Inc. All rights reserved. Crafted for tech
            professionals.
          </p>

          <div className="system-status-indicator">
            <span className="status-dot-live" />
            <span>All Hiring Services Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;