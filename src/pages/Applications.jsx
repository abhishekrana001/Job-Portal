import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Applications.css";

function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const savedApplications =
      JSON.parse(localStorage.getItem("applications")) || [];

    setApplications(savedApplications);
  }, []);

  return (
    <main className="applications-page">

      <div className="applications-container">

        <div className="applications-heading">
          <h1>My Applications</h1>
          <p>
            Track all the jobs you have applied for.
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="no-applications">

            <h2>No Applications Yet</h2>

            <p>
              You haven't applied for any jobs yet.
            </p>

            <Link to="/jobs" className="browse-jobs-btn">
              Browse Jobs
            </Link>

          </div>
        ) : (

          <div className="applications-list">

            {applications.map((application) => (

              <div
                className="application-card"
                key={application.id}
              >

                <div className="application-info">

                  <div className="application-logo">
                    {application.company.charAt(0)}
                  </div>

                  <div>
                    <h2>{application.jobTitle}</h2>

                    <p className="company">
                      {application.company}
                    </p>

                    <p className="location">
                      📍 {application.location}
                    </p>
                  </div>

                </div>

                <div className="application-right">

                  <span className="status">
                    {application.status}
                  </span>

                  <Link
                    to={`/jobs/${application.jobId}`}
                    className="view-job-btn"
                  >
                    View Job
                  </Link>

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