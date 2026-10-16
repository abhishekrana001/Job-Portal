import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  Bookmark,
  ArrowUpRight,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import "./JobCard.css";

function JobCard({ job }) {
  const [isSaved, setIsSaved] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
      const alreadySaved = savedJobs.some((savedJob) => savedJob.id === job.id);
      setIsSaved(alreadySaved);
    } catch (e) {
      setIsSaved(false);
    }
  }, [job.id]);

  const handleSaveJob = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

      if (isSaved) {
        const updatedJobs = savedJobs.filter((savedJob) => savedJob.id !== job.id);
        localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
        setIsSaved(false);
        showToast(`Removed "${job.title}" from saved jobs`, "info");
      } else {
        const updatedJobs = [...savedJobs, job];
        localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
        setIsSaved(true);
        showToast(`Saved "${job.title}" to bookmarks! 🌟`, "success");
      }
      // dispatch storage event so navbar counter updates
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error(err);
    }
  };

  const logoBackground =
    job.logoBg || "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)";

  return (
    <div className={`job-card-modern ${job.featured ? "is-featured" : ""}`}>
      {job.featured && (
        <div className="featured-badge">
          <Sparkles size={12} />
          <span>Featured</span>
        </div>
      )}

      {/* Card Header: Company Logo, Info & Save Button */}
      <div className="card-top">
        <div className="company-branding">
          <div
            className="company-avatar"
            style={{ background: logoBackground }}
            aria-hidden="true"
          >
            {job.company ? job.company.charAt(0).toUpperCase() : "J"}
          </div>
          <div className="company-meta">
            <h4 className="company-name-text">
              {job.company}
              <CheckCircle2 size={14} className="verified-icon" title="Verified Employer" />
            </h4>
            <div className="sub-meta">
              <span className="location-pill">
                <MapPin size={13} />
                {job.location}
              </span>
              {job.workplace && (
                <span className="workplace-pill">{job.workplace}</span>
              )}
            </div>
          </div>
        </div>

        <button
          className={`btn-save-bookmark ${isSaved ? "active" : ""}`}
          onClick={handleSaveJob}
          title={isSaved ? "Remove from bookmarks" : "Save to bookmarks"}
          aria-label={isSaved ? "Unsave job" : "Save job"}
        >
          <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Job Title & Short Description */}
      <div className="card-body">
        <Link to={`/jobs/${job.id}`} className="job-title-link">
          <h3 className="job-title-text">{job.title}</h3>
        </Link>

        {job.description && (
          <p className="job-excerpt">
            {job.description.length > 110
              ? `${job.description.substring(0, 110)}...`
              : job.description}
          </p>
        )}

        {/* Tags / Skills Row */}
        <div className="job-tags-row">
          <span className="type-tag">
            <Briefcase size={12} />
            {job.type}
          </span>
          {job.experience && (
            <span className="tag-pill">{job.experience}</span>
          )}
          {job.tags &&
            job.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="tag-pill">
                {tag}
              </span>
            ))}
        </div>
      </div>

      {/* Card Footer: Salary & Action Button */}
      <div className="card-footer">
        <div className="salary-box">
          <span className="salary-label">Compensation</span>
          <span className="salary-amount">{job.salary}</span>
        </div>

        <Link to={`/jobs/${job.id}`} className="btn-view-details">
          <span>View Details</span>
          <ArrowUpRight size={16} className="arrow-icon" />
        </Link>
      </div>
    </div>
  );
}

export default JobCard;