import React from "react";
import { useParams, Link } from "react-router-dom";
import jobs from "../data/jobs";
import "./JobDetails.css";

function JobDetails() {
  const { id } = useParams();

  const job = jobs.find((job) => job.id === Number(id));

  if (!job) {
    return (
      <div className="job-not-found">
        <h2>Job Not Found</h2>
        <Link to="/jobs">Back to Jobs</Link>
      </div>
    );
  }

  return (
    <main className="job-details-page">

      <div className="job-details-container">

        <div className="job-details-header">

          <div className="company-logo large">
            {job.company.charAt(0)}
          </div>

          <div>
            <h1>{job.title}</h1>
            <p>{job.company}</p>
          </div>

        </div>

        <div className="job-meta">

          <div>
            <span>📍</span>
            <p>{job.location}</p>
          </div>

          <div>
            <span>💼</span>
            <p>{job.type}</p>
          </div>

          <div>
            <span>💰</span>
            <p>{job.salary}</p>
          </div>

        </div>

        <section className="details-section">

          <h2>Job Description</h2>

          <p>
            We are looking for a talented and motivated{" "}
            {job.title} to join our growing team.
            The candidate will be responsible for developing,
            maintaining and improving applications.
          </p>

          <p>
            You will work closely with developers, designers
            and other team members to build high-quality
            software solutions.
          </p>

        </section>

        <section className="details-section">

          <h2>Required Skills</h2>

          <div className="skills">

            <span>JavaScript</span>
            <span>React</span>
            <span>HTML</span>
            <span>CSS</span>
            <span>Git</span>

          </div>

        </section>

        <section className="details-section">

          <h2>Responsibilities</h2>

          <ul>
            <li>Develop and maintain web applications.</li>
            <li>Write clean and reusable code.</li>
            <li>Fix bugs and improve application performance.</li>
            <li>Work with other team members.</li>
            <li>Participate in code reviews.</li>
          </ul>

        </section>

        <div className="apply-section">

            <Link
                to={`/jobs/${job.id}/apply`}
                className="apply-btn"
                >
                Apply Now
            </Link>

          <button className="save-job-btn">
            ♡ Save Job
          </button>

        </div>

      </div>

    </main>
  );
}

export default JobDetails;