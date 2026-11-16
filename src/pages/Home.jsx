import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import JobCard from "../components/JobCard";
import { getStoredJobs } from "../utils/jobStorage";
import {
  Search,
  MapPin,
  Briefcase,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Layers,
  Code2,
  Cpu,
  Palette,
  Terminal,
  Server,
  ShieldCheck,
  Zap,
  Users
} from "lucide-react";
import "./Home.css";

const categories = [
  {
    id: "java",
    name: "Java & Cloud Backend",
    keyword: "Java",
    count: "180+ Jobs",
    icon: <Server size={22} />,
    color: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    desc: "Spring Boot, Microservices, Enterprise Architecture"
  },
  {
    id: "react",
    name: "React & Next.js",
    keyword: "React",
    count: "240+ Jobs",
    icon: <Code2 size={22} />,
    color: "linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)",
    desc: "Frontend engineering, modern hooks & state management"
  },
  {
    id: "backend",
    name: "Backend & Systems",
    keyword: "Backend",
    count: "210+ Jobs",
    icon: <Terminal size={22} />,
    color: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
    desc: "Go, Python, distributed systems & high-throughput APIs"
  },
  {
    id: "ai",
    name: "AI & Machine Learning",
    keyword: "Python",
    count: "130+ Jobs",
    icon: <Cpu size={22} />,
    color: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    desc: "LLMs, PyTorch, RAG pipelines & Vector Databases"
  },
  {
    id: "uiux",
    name: "UI / UX & Product Design",
    keyword: "UI/UX",
    count: "95+ Jobs",
    icon: <Palette size={22} />,
    color: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)",
    desc: "Figma design systems, interactive prototypes & research"
  },
  {
    id: "devops",
    name: "DevOps & Cloud Infra",
    keyword: "Software Engineer",
    count: "115+ Jobs",
    icon: <Layers size={22} />,
    color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    desc: "AWS, Kubernetes, Terraform & CI/CD automation"
  }
];

const trustedCompanies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Stripe",
  "Razorpay",
  "Swiggy",
  "Flipkart"
];

function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [jobs, setJobs] = useState(() => getStoredJobs());

  useEffect(() => {
    const handleSync = () => setJobs(getStoredJobs());
    window.addEventListener("jobStorageUpdated", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("jobStorageUpdated", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (location.trim()) params.set("location", location.trim());
    if (jobType) params.set("type", jobType);

    navigate(`/jobs?${params.toString()}`);
  };

  const handleCategoryClick = (categoryKeyword) => {
    navigate(`/jobs?search=${encodeURIComponent(categoryKeyword)}`);
  };

  // Filter jobs based on active tab
  const getTabJobs = () => {
    if (activeTab === "remote") {
      return jobs.filter((j) => j.workplace === "Remote" || j.location.toLowerCase().includes("remote"));
    }
    if (activeTab === "frontend") {
      return jobs.filter((j) => j.category === "Frontend" || j.category === "React");
    }
    if (activeTab === "backend") {
      return jobs.filter((j) => j.category === "Backend" || j.category === "Java");
    }
    return jobs;
  };

  const tabJobs = getTabJobs().slice(0, 6);

  return (
    <div className="home-page-modern">
      {/* Hero Section */}
      <section className="hero-hero">
        <div className="hero-glow" />
        <div className="hero-container">
          <div className="hero-announcement">
            <span className="announcement-pill">
              <Sparkles size={14} className="sparkle-icon" />
              Over 15,000+ Verified Tech Opportunities
            </span>
          </div>

          <h1 className="hero-title">
            Land Your Dream Role At{" "}
            <span className="hero-gradient-text">Top Tech Companies</span>
          </h1>

          <p className="hero-subtitle">
            Connecting ambitious engineers, designers, and innovators with high-impact
            roles at vetted tech leaders and high-growth startups worldwide.
          </p>

          {/* Search Box Card */}
          <form className="hero-search-card" onSubmit={handleSearch}>
            <div className="search-field">
              <Search size={18} className="field-icon" />
              <input
                type="text"
                placeholder="Job title, tech stack (e.g. React, Java)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="search-divider" />

            <div className="search-field">
              <MapPin size={18} className="field-icon" />
              <input
                type="text"
                placeholder="Location or 'Remote'..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="search-divider" />

            <div className="search-field select-field">
              <Briefcase size={18} className="field-icon" />
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="">All Job Types</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <button type="submit" className="btn-hero-search">
              <span>Find Jobs</span>
              <ArrowRight size={17} />
            </button>
          </form>

          {/* Quick Trending Tags */}
          <div className="trending-tags-row">
            <span className="trending-label">
              <TrendingUp size={14} /> Trending:
            </span>
            {["React", "Remote", "Java", "Python", "Full Time", "UI/UX", "Bangalore"].map(
              (tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="quick-tag-chip"
                  onClick={() => navigate(`/jobs?search=${tag}`)}
                >
                  {tag}
                </button>
              )
            )}
          </div>

          {/* Stats Bar */}
          <div className="hero-metrics-grid">
            <div className="metric-box">
              <h3>15,000+</h3>
              <p>Active Verified Jobs</p>
            </div>
            <div className="metric-divider" />
            <div className="metric-box">
              <h3>1,200+</h3>
              <p>Vetted Tech Companies</p>
            </div>
            <div className="metric-divider" />
            <div className="metric-box">
              <h3>₹16 LPA</h3>
              <p>Average Tech Package</p>
            </div>
            <div className="metric-divider" />
            <div className="metric-box">
              <h3>98%</h3>
              <p>Candidate Match Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Logos Strip */}
      <section className="trusted-section">
        <p className="trusted-title">TRUSTED BY LEADING TECH HUBS & RAPID SCALE-UPS</p>
        <div className="trusted-logos-flex">
          {trustedCompanies.map((c, i) => (
            <span key={i} className="company-logo-badge">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-container">
        <div className="section-head-modern">
          <div className="section-head-text">
            <span className="section-pill">Browse By Specialty</span>
            <h2>Explore Popular Job Categories</h2>
            <p>Find specialized roles tailored to your stack and experience level.</p>
          </div>
          <Link to="/jobs" className="btn-outline-link">
            <span>View All Categories</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="categories-grid-modern">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="category-card-modern"
              onClick={() => handleCategoryClick(cat.keyword)}
            >
              <div className="cat-top">
                <div
                  className="cat-icon-box"
                  style={{ background: cat.color }}
                >
                  {cat.icon}
                </div>
                <span className="cat-count-badge">{cat.count}</span>
              </div>
              <h3 className="cat-title">{cat.name}</h3>
              <p className="cat-desc">{cat.desc}</p>
              <div className="cat-footer">
                <span className="cat-action">Explore Roles</span>
                <ArrowRight size={15} className="cat-arrow" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="featured-section-wrap">
        <div className="section-container">
          <div className="section-head-modern">
            <div className="section-head-text">
              <span className="section-pill">Top Picks</span>
              <h2>Featured Opportunities</h2>
              <p>Hand-picked, high-growth positions with competitive salaries.</p>
            </div>

            {/* Filter Tabs */}
            <div className="filter-tab-buttons">
              <button
                className={`filter-tab ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All Jobs
              </button>
              <button
                className={`filter-tab ${activeTab === "remote" ? "active" : ""}`}
                onClick={() => setActiveTab("remote")}
              >
                Remote Only
              </button>
              <button
                className={`filter-tab ${activeTab === "frontend" ? "active" : ""}`}
                onClick={() => setActiveTab("frontend")}
              >
                Frontend
              </button>
              <button
                className={`filter-tab ${activeTab === "backend" ? "active" : ""}`}
                onClick={() => setActiveTab("backend")}
              >
                Backend
              </button>
            </div>
          </div>

          <div className="jobs-grid-modern">
            {tabJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="view-more-center">
            <Link to="/jobs" className="btn-explore-all">
              <span>Browse All Open Jobs</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-container">
        <div className="section-center-head">
          <span className="section-pill">Simple Workflow</span>
          <h2>How JobPortal Works For You</h2>
          <p>Get hired in 3 simple steps without endless recruiter ghosting.</p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-icon-box">
              <Users size={24} />
            </div>
            <h3>Create Profile & Resume</h3>
            <p>
              Set up your developer profile, skills, and portfolio in under 2 minutes.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-icon-box step-icon-accent">
              <Zap size={24} />
            </div>
            <h3>Explore & Match</h3>
            <p>
              Discover curated jobs with transparent salary ranges and tech stack details.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-icon-box step-icon-success">
              <ShieldCheck size={24} />
            </div>
            <h3>1-Click Apply & Track</h3>
            <p>
              Submit verified applications directly to hiring managers and track progress in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-container cta-section">
        <div className="cta-banner-card">
          <div className="cta-content">
            <span className="cta-pill">Ready for your next jump?</span>
            <h2>Take Your Tech Career To The Next Level</h2>
            <p>
              Join thousands of engineers and designers who secured high-growth roles at
              innovative startups and tech pioneers.
            </p>
            <div className="cta-buttons-group">
              <Link to="/register" className="btn-cta-primary">
                <span>Create Free Candidate Profile</span>
                <ArrowRight size={17} />
              </Link>
              <Link to="/jobs" className="btn-cta-secondary">
                <span>Explore Open Positions</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;