import React from "react";
import { Link } from "react-router-dom";
import "./Companies.css";

const companies = [
  {
    id: 1,
    name: "Tech Solutions",
    location: "Chandigarh",
    jobs: 12,
    description: "Software development and IT solutions company.",
  },
  {
    id: 2,
    name: "Digital Labs",
    location: "Mohali",
    jobs: 8,
    description: "Digital products and web development company.",
  },
  {
    id: 3,
    name: "CodeTech",
    location: "Bangalore",
    jobs: 15,
    description: "Technology company focused on backend and cloud solutions.",
  },
  {
    id: 4,
    name: "InnovateTech",
    location: "Pune",
    jobs: 10,
    description: "Product-based technology and software company.",
  },
  {
    id: 5,
    name: "WebWorks",
    location: "Delhi",
    jobs: 7,
    description: "Web development and digital services company.",
  },
  {
    id: 6,
    name: "Creative Studio",
    location: "Delhi",
    jobs: 5,
    description: "Creative design and UI/UX solutions company.",
  },
];

function Companies() {
  return (
    <div className="companies-page">
      <div className="companies-header">
        <h1>Top Companies</h1>
        <p>Explore companies and find your next opportunity.</p>
      </div>

      <div className="companies-grid">
        {companies.map((company) => (
          <div className="company-card" key={company.id}>
            <div className="company-logo">
              {company.name.charAt(0)}
            </div>

            <h2>{company.name}</h2>

            <p className="company-location">
              📍 {company.location}
            </p>

            <p>{company.description}</p>

            <p className="company-jobs">
              💼 {company.jobs} Open Jobs
            </p>

            <Link to="/jobs" className="company-btn">
              View Jobs
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Companies;