import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import jobs from "../data/jobs";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  User,
  Mail,
  Phone,
  Link as LinkIcon,
  FileText,
  Send,
  Building2,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import "./ApplyJob.css";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const job = jobs.find((j) => j.id === Number(id));

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    resume: "",
    coverLetter: "",
  });

  const [submitting, setSubmitting] = useState(false);

  if (!job) {
    return (
      <div className="apply-page-modern">
        <div className="apply-card not-found-card">
          <h2>Job Listing Not Found</h2>
          <p>The job you're trying to apply for could not be found.</p>
          <Link to="/jobs" className="btn-back">
            <ArrowLeft size={16} /> Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFillSampleResume = () => {
    setFormData((prev) => ({
      ...prev,
      resume: "https://drive.google.com/file/d/sample-resume-preview.pdf",
    }));
    showToast("Sample resume link inserted!", "info");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const existingApplications =
        JSON.parse(localStorage.getItem("applications")) || [];

      const newApplication = {
        id: Date.now(),
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        appliedDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        status: "Applied",
        ...formData,
      };

      localStorage.setItem(
        "applications",
        JSON.stringify([newApplication, ...existingApplications])
      );

      showToast(`🎉 Application for ${job.title} submitted successfully!`, "success");

      setTimeout(() => {
        navigate("/applications");
      }, 800);
    } catch (err) {
      console.error(err);
      showToast("Failed to submit application. Please try again.", "error");
      setSubmitting(false);
    }
  };

  return (
    <main className="apply-page-modern">
      <div className="apply-container-wrapper">
        <Link to={`/jobs/${job.id}`} className="btn-back-breadcrumb">
          <ArrowLeft size={16} /> Back to Job Details
        </Link>

        {/* Job Summary Banner */}
        <div className="apply-job-header-card">
          <div
            className="apply-job-avatar"
            style={{
              background:
                job.logoBg || "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
            }}
          >
            {job.company ? job.company.charAt(0).toUpperCase() : "J"}
          </div>
          <div className="apply-job-info">
            <span className="applying-for-badge">
              <Sparkles size={13} />
              Applying For
            </span>
            <h1>{job.title}</h1>
            <div className="apply-meta-row">
              <span>
                <Building2 size={14} /> {job.company}
              </span>
              <span>
                <MapPin size={14} /> {job.location}
              </span>
              <span className="apply-salary-badge">{job.salary}</span>
            </div>
          </div>
        </div>

        {/* Application Form Card */}
        <div className="apply-form-card">
          <div className="form-card-header">
            <h2>Candidate Application Form</h2>
            <p>
              Please fill out your verified details. Your resume and note will be sent directly to{" "}
              {job.company}'s recruitment desk.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="modern-apply-form">
            <div className="form-row-2col">
              <div className="field-group">
                <label htmlFor="name">
                  Full Name <span className="req">*</span>
                </label>
                <div className="input-with-icon">
                  <User size={18} className="field-icon" />
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="e.g. Abhishek Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="email">
                  Email Address <span className="req">*</span>
                </label>
                <div className="input-with-icon">
                  <Mail size={18} className="field-icon" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="e.g. yourname@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-row-2col">
              <div className="field-group">
                <label htmlFor="phone">
                  Phone Number <span className="req">*</span>
                </label>
                <div className="input-with-icon">
                  <Phone size={18} className="field-icon" />
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <div className="label-with-action">
                  <label htmlFor="resume">
                    Resume Link (PDF / Drive) <span className="req">*</span>
                  </label>
                  <button
                    type="button"
                    className="btn-quick-sample"
                    onClick={handleFillSampleResume}
                  >
                    Use Sample URL
                  </button>
                </div>
                <div className="input-with-icon">
                  <LinkIcon size={18} className="field-icon" />
                  <input
                    id="resume"
                    type="url"
                    name="resume"
                    placeholder="https://drive.google.com/file/..."
                    value={formData.resume}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="coverLetter">Cover Note / Introduction (Optional)</label>
              <div className="textarea-with-icon">
                <FileText size={18} className="field-icon textarea-icon" />
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows="5"
                  placeholder="Share a brief overview of your projects, achievements, and why you are excited for this role..."
                  value={formData.coverLetter}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-submit-row">
              <button
                type="submit"
                className="btn-submit-application"
                disabled={submitting}
              >
                <Send size={18} />
                <span>{submitting ? "Submitting..." : "Submit Application"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default ApplyJob;