import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bookmark,
  Building2,
  MapPin,
  Briefcase,
  Trash2,
  ArrowRight,
  Sparkles,
  Inbox
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import "./SavedJobs.css";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
      setSavedJobs(jobs);
    } catch (e) {
      setSavedJobs([]);
    }
  }, []);

  const handleRemove = (id, title) => {
    try {
      const updated = savedJobs.filter((j) => j.id !== id);
      localStorage.setItem("savedJobs", JSON.stringify(updated));
      setSavedJobs(updated);
      showToast(`Removed "${title}" from bookmarks`, "info");
      window.dispatchEvent(new Event("storage"));
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all saved jobs?")) {
      localStorage.setItem("savedJobs", JSON.stringify([]));
      setSavedJobs([]);
      showToast("All bookmarked jobs cleared", "info");
      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <main className="saved-jobs-page-modern">
      {/* Header Banner */}
      <section className="saved-hero-strip">
        <div className="saved-hero-inner">
          <span className="saved-badge">
            <Sparkles size={13} />
            Bookmarks
          </span>
          <h1>My Saved Opportunities</h1>
          <p>
            Positions you've bookmarked for later review. Apply before the listings close!
          </p>
        </div>
      </section>

      <div className="saved-container">
        {savedJobs.length > 0 && (
          <div className="saved-top-bar">
            <h2>
              {savedJobs.length} {savedJobs.length === 1 ? "Job Saved" : "Jobs Saved"}
            </h2>
            <button
              type="button"
              className="btn-clear-all-saved"
              onClick={handleClearAll}
            >
              <Trash2 size={14} /> Clear All
            </button>
          </div>
        )}

        {savedJobs.length === 0 ? (
          <div className="empty-saved-box">
            <div className="empty-bookmark-halo">
              <Bookmark size={36} />
            </div>
            <h2>No Saved Jobs Yet</h2>
            <p>
              Keep track of roles you're interested in by clicking the bookmark button on any job card.
            </p>
            <Link to="/jobs" className="btn-browse-saved">
              <span>Browse Active Jobs</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="saved-jobs-list-grid">
            {savedJobs.map((job) => (
              <div className="modern-saved-card" key={job.id}>
                <div className="saved-left-info">
                  <div
                    className="saved-avatar"
                    style={{
                      background:
                        job.logoBg || "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    }}
                  >
                    {job.company ? job.company.charAt(0).toUpperCase() : "J"}
                  </div>
                  <div>
                    <h2 className="saved-job-title">{job.title}</h2>
                    <div className="saved-meta-row">
                      <span>
                        <Building2 size={13} /> {job.company}
                      </span>
                      <span>
                        <MapPin size={13} /> {job.location}
                      </span>
                      {job.type && (
                        <span>
                          <Briefcase size={13} /> {job.type}
                        </span>
                      )}
                      {job.salary && (
                        <span className="saved-salary-tag">{job.salary}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="saved-right-actions">
                  <Link to={`/jobs/${job.id}/apply`} className="btn-quick-apply-saved">
                    Apply Now
                  </Link>

                  <Link to={`/jobs/${job.id}`} className="btn-view-saved">
                    View Details
                  </Link>

                  <button
                    className="btn-remove-saved"
                    onClick={() => handleRemove(job.id, job.title)}
                    title="Remove from bookmarks"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default SavedJobs;