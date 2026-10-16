import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  MapPin,
  Briefcase,
  Users,
  Search,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ExternalLink
} from "lucide-react";
import "./Companies.css";

const companiesData = [
  {
    id: 1,
    name: "Tech Solutions",
    location: "Chandigarh",
    industry: "Enterprise Cloud",
    jobsCount: 12,
    rating: 4.8,
    size: "500-1,000 Employees",
    est: "2015",
    color: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    banner: "linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)",
    description: "Global enterprise software solutions delivering cloud migration, microservices, and AI-assisted automation.",
  },
  {
    id: 2,
    name: "Digital Labs",
    location: "Mohali",
    industry: "Product SaaS",
    jobsCount: 8,
    rating: 4.9,
    size: "200-500 Employees",
    est: "2018",
    color: "linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)",
    banner: "linear-gradient(90deg, #0f766e 0%, #06b6d4 100%)",
    description: "High-growth digital product studio crafting next-generation analytics platforms and React SaaS applications.",
  },
  {
    id: 3,
    name: "CodeTech",
    location: "Bangalore",
    industry: "Cloud & Fintech",
    jobsCount: 15,
    rating: 4.9,
    size: "1,000+ Employees",
    est: "2014",
    color: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
    banner: "linear-gradient(90deg, #064e3b 0%, #10b981 100%)",
    description: "Cutting-edge infrastructure engineering building distributed transactional systems and low-latency APIs.",
  },
  {
    id: 4,
    name: "InnovateTech",
    location: "Pune",
    industry: "DevOps & Platform",
    jobsCount: 10,
    rating: 4.8,
    size: "300-800 Employees",
    est: "2017",
    color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    banner: "linear-gradient(90deg, #78350f 0%, #f59e0b 100%)",
    description: "Reliable platform engineering firm managing multi-cloud Kubernetes clusters, DevSecOps, and SRE.",
  },
  {
    id: 5,
    name: "WebWorks",
    location: "Delhi",
    industry: "Web & E-Commerce",
    jobsCount: 7,
    rating: 4.7,
    size: "100-250 Employees",
    est: "2020",
    color: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    banner: "linear-gradient(90deg, #4c1d95 0%, #8b5cf6 100%)",
    description: "Full-stack web engineering consultancy crafting fast, accessible web apps and headless commerce solutions.",
  },
  {
    id: 6,
    name: "Creative Studio",
    location: "Delhi",
    industry: "Design & UX",
    jobsCount: 5,
    rating: 4.6,
    size: "50-150 Employees",
    est: "2021",
    color: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)",
    banner: "linear-gradient(90deg, #881337 0%, #f43f5e 100%)",
    description: "Design-led product studio specializing in interactive design systems, mobile UX, and brand experiences.",
  },
];

function Companies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const industries = ["All", "Enterprise Cloud", "Product SaaS", "Cloud & Fintech", "Design & UX"];

  const filteredCompanies = useMemo(() => {
    return companiesData.filter((c) => {
      const q = searchTerm.toLowerCase().trim();
      const matchSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q);

      const matchIndustry =
        selectedIndustry === "All" || c.industry === selectedIndustry;

      return matchSearch && matchIndustry;
    });
  }, [searchTerm, selectedIndustry]);

  return (
    <div className="companies-page-modern">
      {/* Header Banner */}
      <section className="companies-hero-strip">
        <div className="companies-hero-inner">
          <span className="companies-badge">
            <Sparkles size={13} /> Top Hiring Employers
          </span>
          <h1>Explore Top Tech Companies</h1>
          <p>
            Learn about workplace culture, open opportunities, and engineering standards at verified
            tech companies.
          </p>
        </div>
      </section>

      <div className="companies-container">
        {/* Search & Filter Bar */}
        <div className="companies-filter-card">
          <div className="search-company-wrap">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search companies by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="industry-pills-row">
            {industries.map((ind, i) => (
              <button
                key={i}
                type="button"
                className={`industry-pill ${selectedIndustry === ind ? "active" : ""}`}
                onClick={() => setSelectedIndustry(ind)}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* Companies Grid */}
        <div className="companies-grid-modern">
          {filteredCompanies.map((company) => (
            <div className="company-card-modern" key={company.id}>
              {/* Card Banner */}
              <div
                className="company-banner"
                style={{ background: company.banner }}
              />

              <div className="company-content-inner">
                {/* Logo & Rating Header */}
                <div className="company-avatar-row">
                  <div
                    className="company-logo-box"
                    style={{ background: company.color }}
                  >
                    {company.name.charAt(0)}
                  </div>
                  <div className="company-rating-pill">
                    ★ {company.rating}
                  </div>
                </div>

                <div className="company-title-wrap">
                  <h2>
                    {company.name}
                    <CheckCircle2 size={16} className="verified-icon" title="Verified Employer" />
                  </h2>
                  <span className="industry-tag">{company.industry}</span>
                </div>

                <p className="company-desc-text">{company.description}</p>

                <div className="company-meta-tags">
                  <span className="meta-item">
                    <MapPin size={13} /> {company.location}
                  </span>
                  <span className="meta-item">
                    <Users size={13} /> {company.size}
                  </span>
                </div>

                <div className="company-card-footer">
                  <span className="open-jobs-pill">
                    <Briefcase size={13} />
                    {company.jobsCount} Open Positions
                  </span>

                  <Link
                    to={`/jobs?search=${encodeURIComponent(company.name)}`}
                    className="btn-view-company-jobs"
                  >
                    <span>View Jobs</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Companies;