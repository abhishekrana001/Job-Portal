import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SavedJobs.css";

function SavedJobs() {

  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {

    const jobs =
      JSON.parse(localStorage.getItem("savedJobs")) || [];

    setSavedJobs(jobs);

  }, []);

  const handleRemove = (id) => {

    const updatedJobs = savedJobs.filter(
      (job) => job.id !== id
    );

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(updatedJobs)
    );

    setSavedJobs(updatedJobs);
  };

  return (
    <main className="saved-jobs-page">

      <div className="saved-jobs-container">

        <div className="saved-heading">

          <h1>Saved Jobs</h1>

          <p>
            Jobs you've saved for later.
          </p>

        </div>

        {savedJobs.length === 0 ? (

          <div className="no-saved-jobs">

            <div className="empty-icon">
              ♡
            </div>

            <h2>No Saved Jobs</h2>

            <p>
              You haven't saved any jobs yet.
            </p>

            <Link
              to="/jobs"
              className="browse-btn"
            >
              Browse Jobs
            </Link>

          </div>

        ) : (

          <div className="saved-jobs-list">

            {savedJobs.map((job) => (

              <div
                className="saved-job-card"
                key={job.id}
              >

                <div className="saved-job-info">

                  <div className="saved-company-logo">
                    {job.company.charAt(0)}
                  </div>

                  <div>

                    <h2>{job.title}</h2>

                    <p>
                      {job.company}
                    </p>

                    <span>
                      📍 {job.location}
                    </span>

                  </div>

                </div>

                <div className="saved-job-actions">

                  <Link
                    to={`/jobs/${job.id}`}
                    className="view-saved-btn"
                  >
                    View Job
                  </Link>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      handleRemove(job.id)
                    }
                  >
                    Remove
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