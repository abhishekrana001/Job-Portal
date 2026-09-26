import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jobs from "../data/jobs";
import "./ApplyJob.css";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = jobs.find((job) => job.id === Number(id));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingApplications =
      JSON.parse(localStorage.getItem("applications")) || [];

    const newApplication = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      ...formData,
      status: "Applied",
    };

    localStorage.setItem(
      "applications",
      JSON.stringify([
        ...existingApplications,
        newApplication,
      ])
    );

    alert("Application submitted successfully! 🎉");

    navigate("/applications");
  };

  if (!job) {
    return <h2>Job Not Found</h2>;
  }

  return (
    <main className="apply-page">

      <div className="apply-container">

        <div className="apply-heading">
          <h1>Apply for {job.title}</h1>

          <p>
            {job.company} • {job.location}
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="form-group">
            <label>Resume</label>

            <input
              type="text"
              name="resume"
              placeholder="Enter resume link"
              value={formData.resume}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Cover Letter</label>

            <textarea
              name="coverLetter"
              rows="7"
              placeholder="Write your cover letter..."
              value={formData.coverLetter}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="submit-application"
          >
            Submit Application
          </button>

        </form>

      </div>

    </main>
  );
}

export default ApplyJob;