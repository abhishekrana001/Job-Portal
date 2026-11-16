import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getJobById, getStoredJobs } from "../utils/jobStorage";
import JobCard from "../components/JobCard";
import {
  MapPin,
  Briefcase,
  Clock,
  Bookmark,
  Share2,
  CheckCircle2,
  Building2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Check,
  Gift,
  Users
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import "./JobDetails.css";

function JobDetails() {
  const { id } = useParams();
  const { showToast } = useToast();

  const [isSaved, setIsSaved] = useState(false);

  const job = getJobById(id);
  const allJobs = getStoredJobs();

  useEffect(() => {
    if (!job) return;
    try {
      const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
      setIsSaved(savedJobs.some((s) => s.id === job.id));
    } catch (e) {
      setIsSaved(false);
    }
  }, [job]);

  if (!job) {
    return (
      <div className="job-not-found-page">
        <div className="not-found-box">
          <h2>Job Opportunity Not Found</h2>
          <p>The job listing you are looking for might have been closed or removed.</p>
          <Link to="/jobs" className="btn-back-jobs">
            <ArrowLeft size={16} />
            <span>Back to All Jobs</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveToggle = () => {
    try {
      const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
      if (isSaved) {
        const updated = savedJobs.filter((s) => s.id !== job.id);
        localStorage.setItem("savedJobs", JSON.stringify(updated));
        setIsSaved(false);
        showToast("Job removed from bookmarks", "info");
      } else {
        const updated = [...savedJobs, job];
        localStorage.setItem("savedJobs", JSON.stringify(updated));
        setIsSaved(true);
        showToast("Job saved to your bookmarks! 🔖", "success");
      }
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Job link copied to clipboard! 📋", "success");
    } else {
      showToast("Link: " + window.location.href, "info");
    }
  };

  const logoBackground =
    job.logoBg || "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)";

  // Similar jobs
  const similarJobs = allJobs
    .filter((j) => Number(j.id) !== Number(job.id) && (j.category === job.category || j.type === job.type))
    .slice(0, 3);

  return (
    <div className="job-details-page-modern">
      {/* Breadcrumb Navigation */}
      <div className="details-breadcrumb-container">
        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <span className="crumb-sep">/</span>
          <Link to="/jobs">Jobs</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-active">{job.title}</span>
        </div>
      </div>

      <div className="details-main-container">
        {/* Header Hero Card */}
        <div className="details-header-card">
          <div className="header-left-content">
            <div
              className="details-company-avatar"
              style={{ background: logoBackground }}
            >
              {job.company ? job.company.charAt(0).toUpperCase() : "J"}
            </div>

            <div className="header-titles">
              <div className="company-verified-row">
                <span className="details-company-name">{job.company}</span>
                <CheckCircle2 size={16} className="verified-badge-icon" title="Verified Employer" />
                <span className="rating-badge">★ {job.rating || "4.8"}</span>
              </div>
              <h1 className="details-job-title">{job.title}</h1>
              <div className="details-meta-tags">
                <span className="meta-tag">
                  <MapPin size={14} />
                  {job.location}
                </span>
                <span className="meta-tag">
                  <Briefcase size={14} />
                  {job.type}
                </span>
                {job.workplace && (
                  <span className="meta-tag accent">
                    {job.workplace}
                  </span>
                )}
                {job.postedTime && (
                  <span className="meta-tag">
                    <Clock size={14} />
                    Posted {job.postedTime}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="header-actions-group">
            <Link to={`/jobs/${job.id}/apply`} className="btn-details-apply">
              <span>Apply Now</span>
              <ArrowRight size={17} />
            </Link>

            <button
              type="button"
              className={`btn-details-save ${isSaved ? "saved" : ""}`}
              onClick={handleSaveToggle}
              title={isSaved ? "Remove from bookmarks" : "Save job"}
            >
              <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>

            <button
              type="button"
              className="btn-details-share"
              onClick={handleShare}
              title="Share job listing"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* 2-Column Content Layout */}
        <div className="details-grid-layout">
          {/* Main Content Column */}
          <div className="details-main-column">
            {/* Quick Metrics Grid */}
            <div className="metrics-box-card">
              <div className="metric-item">
                <span className="metric-label">Offered Salary</span>
                <span className="metric-value highlight">{job.salary}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Experience Needed</span>
                <span className="metric-value">{job.experience || "2+ Years"}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Work Mode</span>
                <span className="metric-value">{job.workplace || "Hybrid"}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Applicants</span>
                <span className="metric-value">
                  <Users size={14} style={{ display: "inline", marginRight: "4px" }} />
                  {job.applicantsCount || 24} applied
                </span>
              </div>
            </div>

            {/* Job Description */}
            <section className="details-content-section">
              <h2>Role Overview</h2>
              <p className="description-text">
                {job.description ||
                  `We are actively searching for an outstanding ${job.title} to join our growing engineering team at ${job.company}. You will play a crucial role in building high-performance, fault-tolerant web architectures.`}
              </p>
            </section>

            {/* Responsibilities */}
            <section className="details-content-section">
              <h2>Key Responsibilities</h2>
              <ul className="custom-checklist">
                {job.responsibilities && job.responsibilities.length > 0 ? (
                  job.responsibilities.map((resp, i) => (
                    <li key={i}>
                      <span className="check-icon-wrap"><Check size={14} /></span>
                      <span>{resp}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <span className="check-icon-wrap"><Check size={14} /></span>
                      <span>Architect, develop, and maintain clean and scalable software components.</span>
                    </li>
                    <li>
                      <span className="check-icon-wrap"><Check size={14} /></span>
                      <span>Collaborate closely with cross-functional product and design teams.</span>
                    </li>
                    <li>
                      <span className="check-icon-wrap"><Check size={14} /></span>
                      <span>Optimize application performance and latency across production services.</span>
                    </li>
                    <li>
                      <span className="check-icon-wrap"><Check size={14} /></span>
                      <span>Write comprehensive unit, automated, and end-to-end test suites.</span>
                    </li>
                  </>
                )}
              </ul>
            </section>

            {/* Skills & Technologies */}
            <section className="details-content-section">
              <h2>Skills & Technologies</h2>
              <div className="skills-badge-list">
                {(job.skills || ["React", "JavaScript", "TypeScript", "Node.js", "Git", "REST APIs"]).map(
                  (skill, idx) => (
                    <span key={idx} className="skill-pill-modern">
                      {skill}
                    </span>
                  )
                )}
              </div>
            </section>

            {/* Benefits & Perks */}
            <section className="details-content-section">
              <h2>Perks & Benefits</h2>
              <div className="benefits-grid">
                {(job.benefits || [
                  "Competitive compensation & equity options",
                  "Comprehensive health & life coverage",
                  "Flexible remote / hybrid schedule",
                  "Annual wellness & education budget"
                ]).map((benefit, idx) => (
                  <div key={idx} className="benefit-card-item">
                    <span className="benefit-icon-box">
                      <Gift size={16} />
                    </span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <aside className="details-sidebar-column">
            {/* About Company Card */}
            <div className="sidebar-card">
              <div className="company-sidebar-header">
                <Building2 size={22} className="company-sidebar-icon" />
                <div>
                  <h3>About {job.company}</h3>
                  <span className="location-sidebar">📍 {job.location}</span>
                </div>
              </div>
              <p className="sidebar-company-desc">
                Leading software and innovation company committed to creating world-class digital
                solutions and empowering talented engineers.
              </p>
              <div className="sidebar-divider" />
              <Link to="/companies" className="btn-sidebar-view-company">
                <span>View Company Profile</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Quick Apply Summary Card */}
            <div className="sidebar-card apply-cta-sidebar">
              <h3>Interested in this role?</h3>
              <p>
                Applications are reviewed on a rolling basis. Submit your details today to get
                interviewed faster.
              </p>
              <Link to={`/jobs/${job.id}/apply`} className="btn-sidebar-apply">
                Apply For Position
              </Link>
            </div>

            {/* Safety Guarantee */}
            <div className="safety-guarantee-card">
              <ShieldCheck size={20} className="safety-icon" />
              <div>
                <h4>Verified Job Listing</h4>
                <p>Protected by JobPortal Candidate Safety Guarantee. Free of recruiter fees.</p>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar Jobs Section */}
        {similarJobs.length > 0 && (
          <section className="similar-jobs-section">
            <div className="similar-header">
              <h2>Similar Opportunities You Might Like</h2>
              <Link to="/jobs" className="view-more-link">
                View All Jobs →
              </Link>
            </div>
            <div className="similar-jobs-grid">
              {similarJobs.map((simJob) => (
                <JobCard key={simJob.id} job={simJob} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default JobDetails;