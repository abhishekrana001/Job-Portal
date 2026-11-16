import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStoredApplications, deleteApplicationRecord } from "../utils/jobStorage";
import { useAuth } from "../context/AuthContext";
import {
  FileText,
  Building2,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
  Trash2,
  CheckCircle2,
  Sparkles,
  Inbox
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import "./Applications.css";

function Applications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState(() => getStoredApplications());
  const [activeFilter, setActiveFilter] = useState("All");
  const { showToast } = useToast();

  const loadApps = () => {
    const all = getStoredApplications();
    // If logged in as specific candidate, show user's applications or all applications
    const candidateEmail = user?.email?.toLowerCase();
    const userApps = candidateEmail
      ? all.filter((a) => !a.candidateEmail || a.candidateEmail.toLowerCase() === candidateEmail || a.email?.toLowerCase() === candidateEmail)
      : all;
    setApplications(userApps.length > 0 ? userApps : all);
  };

  useEffect(() => {
    loadApps();
    const handleSync = () => loadApps();
    window.addEventListener("applicationStorageUpdated", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("applicationStorageUpdated", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, [user?.email]);

  const handleWithdraw = (appId, jobTitle) => {
    deleteApplicationRecord(appId);
    loadApps();
    showToast(`Withdrew application for "${jobTitle}"`, "info");
  };

  const filteredApps = applications.filter((app) => {
    if (activeFilter === "All") return true;
    return app.status === activeFilter;
  });

  return (
    <main className="applications-page-modern">
      {/* Header Banner */}
      <section className="applications-hero-strip">
        <div className="applications-hero-inner">
          <span className="applications-badge">
            <Sparkles size={13} />
            Applicant Dashboard
          </span>
          <h1>My Job Applications</h1>
          <p>
            Track real-time status updates, recruiter reviews, and application submissions.
          </p>
        </div>
      </section>

      <div className="applications-container">
        {/* Applications Stats Cards */}
        {applications.length > 0 && (
          <div className="applications-stats-grid">
            <div className="app-stat-card">
              <span className="stat-label">Total Applied</span>
              <span className="stat-count">{applications.length}</span>
            </div>
            <div className="app-stat-card">
              <span className="stat-label">Awaiting Review</span>
              <span className="stat-count text-amber">
                {applications.filter((a) => a.status === "Applied").length}
              </span>
            </div>
            <div className="app-stat-card">
              <span className="stat-label">Interview Stage</span>
              <span className="stat-count text-emerald">
                {applications.filter((a) => a.status === "Interview").length}
              </span>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        {applications.length > 0 && (
          <div className="apps-filter-bar">
            {["All", "Applied", "In Review", "Interview", "Offer"].map((tab) => (
              <button
                key={tab}
                className={`app-filter-pill ${activeFilter === tab ? "active" : ""}`}
                onClick={() => setActiveFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Applications List */}
        {filteredApps.length === 0 ? (
          <div className="empty-applications-box">
            <div className="empty-app-icon">
              <Inbox size={36} />
            </div>
            <h2>No Applications Found</h2>
            <p>
              {applications.length === 0
                ? "You haven't applied for any positions yet. Find high-paying tech jobs tailored to your skills!"
                : "No applications match your selected status tab."}
            </p>
            <Link to="/jobs" className="btn-browse-jobs-app">
              <span>Browse Active Jobs</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="applications-list-grid">
            {filteredApps.map((app) => (
              <div className="modern-application-card" key={app.id}>
                <div className="app-card-header">
                  <div className="app-company-branding">
                    <div className="app-company-logo">
                      {app.company ? app.company.charAt(0).toUpperCase() : "J"}
                    </div>
                    <div>
                      <h2 className="app-job-title">{app.jobTitle}</h2>
                      <div className="app-company-meta">
                        <span className="app-company-name">
                          <Building2 size={13} /> {app.company}
                        </span>
                        <span className="app-location">
                          <MapPin size={13} /> {app.location}
                        </span>
                        {app.salary && (
                          <span className="app-salary-pill">{app.salary}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="app-status-badge">
                    <CheckCircle2 size={14} />
                    <span>{app.status || "Applied"}</span>
                  </div>
                </div>

                {/* Progress Stepper */}
                <div className="app-stepper">
                  <div className="stepper-step completed">
                    <span className="step-dot" />
                    <span className="step-label">Applied</span>
                  </div>
                  <div className="stepper-line" />
                  <div className="stepper-step">
                    <span className="step-dot" />
                    <span className="step-label">In Review</span>
                  </div>
                  <div className="stepper-line" />
                  <div className="stepper-step">
                    <span className="step-dot" />
                    <span className="step-label">Interview</span>
                  </div>
                  <div className="stepper-line" />
                  <div className="stepper-step">
                    <span className="step-dot" />
                    <span className="step-label">Decision</span>
                  </div>
                </div>

                {/* Card Footer Details */}
                <div className="app-card-footer">
                  <div className="app-footer-meta">
                    <span className="app-date">
                      <Clock size={13} /> Applied on {app.appliedDate || "Recently"}
                    </span>
                    {app.resume && (
                      <a
                        href={app.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="app-resume-link"
                      >
                        <FileText size={13} /> View Submitted Resume <ExternalLink size={11} />
                      </a>
                    )}
                  </div>

                  <div className="app-actions-group">
                    <button
                      className="btn-withdraw-app"
                      onClick={() => handleWithdraw(app.id, app.jobTitle)}
                      title="Withdraw Application"
                    >
                      <Trash2 size={15} />
                      <span>Withdraw</span>
                    </button>

                    <Link to={`/jobs/${app.jobId}`} className="btn-view-job-link">
                      <span>View Job</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Applications;