import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./JobCard.css";

function JobCard({ job }) {

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedJobs =
      JSON.parse(localStorage.getItem("savedJobs")) || [];

    const alreadySaved = savedJobs.some(
      (savedJob) => savedJob.id === job.id
    );

    setIsSaved(alreadySaved);
  }, [job.id]);

  const handleSaveJob = () => {

    const savedJobs =
      JSON.parse(localStorage.getItem("savedJobs")) || [];

    if (isSaved) {

      const updatedJobs = savedJobs.filter(
        (savedJob) => savedJob.id !== job.id
      );

      localStorage.setItem(
        "savedJobs",
        JSON.stringify(updatedJobs)
      );

      setIsSaved(false);

    } else {

      const updatedJobs = [
        ...savedJobs,
        job
      ];

      localStorage.setItem(
        "savedJobs",
        JSON.stringify(updatedJobs)
      );

      setIsSaved(true);
    }
  };

  return (
    <div className="job-card">

      <div className="job-header">

        <div className="company-logo">
          {job.company.charAt(0)}
        </div>

        <button
          className={`save-btn ${
            isSaved ? "saved" : ""
          }`}
          onClick={handleSaveJob}
        >
          {isSaved ? "♥" : "♡"}
        </button>

      </div>

      <h3>{job.title}</h3>

      <p className="company-name">
        {job.company}
      </p>

      <div className="job-info">

        <span>📍 {job.location}</span>

        <span>💼 {job.type}</span>

      </div>

      <div className="job-bottom">

        <span className="salary">
          {job.salary}
        </span>

        <Link
          to={`/jobs/${job.id}`}
          className="details-btn"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default JobCard;