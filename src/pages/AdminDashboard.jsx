import React, { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  getStoredJobs,
  saveJobListing,
  deleteJobListing,
  getStoredApplications,
  updateApplicationStatus,
  deleteApplicationRecord,
} from "../utils/jobStorage";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  Building2,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  TrendingUp,
  TrendingDown,
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Filter,
  Download,
  Bell,
  Shield,
  ChevronRight,
  ArrowUpRight,
  Activity,
  Zap,
  Menu,
  X,
  MoreVertical,
  RefreshCw,
  CircleDot
} from "lucide-react";
import "./AdminDashboard.css";

// ---------- Simulated Backend Data ----------
const getStoredUsers = () => {
  try {
    const registered = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const defaults = [
      { id: 1, name: "Alex Morgan", email: "alex.developer@example.com", role: "Candidate", status: "Active", joined: "2026-09-12", applications: 5 },
      { id: 2, name: "Priya Sharma", email: "priya.s@example.com", role: "Candidate", status: "Active", joined: "2026-10-01", applications: 3 },
      { id: 3, name: "Rahul Verma", email: "rahul.v@example.com", role: "Recruiter", status: "Active", joined: "2026-08-20", applications: 0 },
      { id: 4, name: "Sneha Patel", email: "sneha.p@example.com", role: "Candidate", status: "Inactive", joined: "2026-07-15", applications: 1 },
      { id: 5, name: "Karan Malhotra", email: "karan.m@example.com", role: "Candidate", status: "Active", joined: "2026-10-10", applications: 7 },
    ];
    return [...registered, ...defaults];
  } catch {
    return [];
  }
};

// ---------- Stat Card ----------
function StatCard({ icon, label, value, change, changeType, color }) {
  return (
    <div className="admin-stat-card">
      <div className="stat-card-top">
        <div className="stat-icon-box" style={{ background: color }}>
          {icon}
        </div>
        <div className={`stat-change ${changeType}`}>
          {changeType === "up" ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          <span>{change}</span>
        </div>
      </div>
      <div className="stat-card-body">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-label">{label}</p>
      </div>
    </div>
  );
}

// ---------- Status Badge ----------
function StatusBadge({ status }) {
  const map = {
    "Active": "badge-success",
    "Inactive": "badge-muted",
    "Under Review": "badge-warning",
    "Shortlisted": "badge-info",
    "Hired": "badge-success",
    "Rejected": "badge-danger",
    "Open": "badge-success",
    "Closed": "badge-danger",
    "Featured": "badge-info",
  };
  return <span className={`status-badge ${map[status] || "badge-muted"}`}>{status}</span>;
}

// ---------- Job Form Modal ----------
function JobFormModal({ job, onSave, onClose }) {
  const [form, setForm] = useState(
    job || {
      title: "",
      company: "",
      location: "",
      type: "Full Time",
      workplace: "Hybrid",
      salary: "",
      experience: "",
      category: "Frontend",
      description: "",
      tags: "",
      featured: false,
    }
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      id: job?.id || Date.now(),
      rating: job?.rating || 4.5,
      applicantsCount: job?.applicantsCount || 0,
      postedTime: job ? job.postedTime : "Just now",
      logoBg: job?.logoBg || "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
      tags: typeof form.tags === "string" ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : form.tags,
      skills: typeof form.skills === "string" ? form.skills.split(",").map((t) => t.trim()).filter(Boolean) : (form.skills || []),
      responsibilities: typeof form.responsibilities === "string" ? form.responsibilities.split("\n").filter(Boolean) : (form.responsibilities || []),
      benefits: typeof form.benefits === "string" ? form.benefits.split("\n").filter(Boolean) : (form.benefits || []),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{job ? "Edit Job Listing" : "Post New Job"}</h2>
          <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row-2">
            <div className="form-field">
              <label>Job Title *</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Senior React Developer" required />
            </div>
            <div className="form-field">
              <label>Company *</label>
              <input name="company" value={form.company} onChange={handleChange} placeholder="e.g. Tech Solutions" required />
            </div>
          </div>
          <div className="form-row-3">
            <div className="form-field">
              <label>Location *</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Bangalore" required />
            </div>
            <div className="form-field">
              <label>Job Type</label>
              <select name="type" value={form.type} onChange={handleChange}>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
            </div>
            <div className="form-field">
              <label>Workplace</label>
              <select name="workplace" value={form.workplace} onChange={handleChange}>
                <option>Remote</option>
                <option>Hybrid</option>
                <option>On-site</option>
              </select>
            </div>
          </div>
          <div className="form-row-2">
            <div className="form-field">
              <label>Salary Range</label>
              <input name="salary" value={form.salary} onChange={handleChange} placeholder="e.g. ₹12 - ₹18 LPA" />
            </div>
            <div className="form-field">
              <label>Experience Required</label>
              <input name="experience" value={form.experience} onChange={handleChange} placeholder="e.g. 2-4 Years" />
            </div>
          </div>
          <div className="form-row-2">
            <div className="form-field">
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange}>
                <option>Frontend</option>
                <option>Backend</option>
                <option>React</option>
                <option>Java</option>
                <option>UI/UX</option>
                <option>Software Engineer</option>
                <option>Data Science</option>
              </select>
            </div>
            <div className="form-field form-check-row">
              <label className="check-label">
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
                <span>Mark as Featured</span>
              </label>
            </div>
          </div>
          <div className="form-field">
            <label>Tags (comma separated)</label>
            <input name="tags" value={typeof form.tags === "object" ? form.tags.join(", ") : form.tags} onChange={handleChange} placeholder="React, TypeScript, Node.js" />
          </div>
          <div className="form-field">
            <label>Job Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Describe the role and responsibilities..." required />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-modal-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-modal-save">
              <CheckCircle2 size={16} />
              {job ? "Save Changes" : "Post Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ========== Main AdminDashboard ==========
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAdmin, isEmployer, isLoggedIn, logout, user } = useAuth();
  const { showToast } = useToast();

  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState(() => getStoredJobs());
  const [users, setUsers] = useState(() => getStoredUsers());
  const [applications, setApplications] = useState(() => getStoredApplications());
  const [jobSearch, setJobSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [appSearch, setAppSearch] = useState("");
  const [jobModal, setJobModal] = useState(null); // null | "add" | job object
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [appStatusFilter, setAppStatusFilter] = useState("All");

  // Auth guard
  useEffect(() => {
    if (!isLoggedIn || (!isAdmin && !isEmployer)) {
      navigate("/login");
    }
  }, [isLoggedIn, isAdmin, isEmployer, navigate]);

  // Handle URL tab parameters (e.g. ?tab=post-job)
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "post-job") {
      setActiveSection("jobs");
      setJobModal("add");
    } else if (tab === "jobs") {
      setActiveSection("jobs");
    } else if (tab === "applications") {
      setActiveSection("applications");
    }
  }, [searchParams]);

  // Sync data on changes
  useEffect(() => {
    const syncAll = () => {
      setJobs(getStoredJobs());
      setApplications(getStoredApplications());
    };
    window.addEventListener("jobStorageUpdated", syncAll);
    window.addEventListener("applicationStorageUpdated", syncAll);
    window.addEventListener("storage", syncAll);
    return () => {
      window.removeEventListener("jobStorageUpdated", syncAll);
      window.removeEventListener("applicationStorageUpdated", syncAll);
      window.removeEventListener("storage", syncAll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Job CRUD with unified storage
  const handleSaveJob = (jobData) => {
    const existingId = jobModal && typeof jobModal === "object" ? jobModal.id : null;
    const finalJob = {
      ...jobData,
      company: jobData.company || user?.companyName || "TechCorp",
      postedBy: user?.name || "Recruiter",
    };
    const updated = saveJobListing(finalJob, existingId);
    setJobs(updated);
    setJobModal(null);
    showToast(existingId ? "✅ Job updated successfully!" : "🚀 Job posted successfully!", "success");
  };

  const handleDeleteJob = (id) => {
    const updated = deleteJobListing(id);
    setJobs(updated);
    setDeleteConfirm(null);
    showToast("🗑️ Job deleted.", "info");
  };

  const handleToggleFeatured = (id) => {
    const current = jobs.find((j) => j.id === id);
    if (!current) return;
    const updated = saveJobListing({ ...current, featured: !current.featured }, id);
    setJobs(updated);
    showToast("⭐ Featured status updated.", "success");
  };

  // Application status update
  const handleUpdateAppStatus = (id, newStatus) => {
    const updated = updateApplicationStatus(id, newStatus);
    setApplications(updated);
    showToast(`Application marked as ${newStatus}`, "success");
  };

  // Toggle user status
  const handleToggleUserStatus = (id) => {
    const updated = users.map((u) => u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u);
    setUsers(updated);
    localStorage.setItem("adminUsers", JSON.stringify(updated));
    showToast("User status updated.", "success");
  };

  // Filtered data
  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
      j.company.toLowerCase().includes(jobSearch.toLowerCase())
  );

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredApps = applications.filter((a) => {
    const candidateName = (a.candidate || a.candidateName || a.name || "").toLowerCase();
    const jobName = (a.job || a.jobTitle || "").toLowerCase();
    const companyName = (a.company || "").toLowerCase();
    const q = appSearch.toLowerCase();
    const matchSearch =
      candidateName.includes(q) || jobName.includes(q) || companyName.includes(q);
    const matchStatus = appStatusFilter === "All" || a.status === appStatusFilter;
    return matchSearch && matchStatus;
  });

  // Stats
  const totalJobs = jobs.length;
  const featuredJobs = jobs.filter((j) => j.featured).length;
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Active").length;
  const totalApps = applications.length;
  const hiredCount = applications.filter((a) => a.status === "Hired").length;

  const navItems = [
    { id: "overview", icon: <LayoutDashboard size={18} />, label: "Overview" },
    { id: "jobs", icon: <Briefcase size={18} />, label: "Job Listings" },
    { id: "applications", icon: <FileText size={18} />, label: "Applications" },
    { id: "users", icon: <Users size={18} />, label: "Users" },
    { id: "analytics", icon: <BarChart3 size={18} />, label: "Analytics" },
  ];

  return (
    <div className="admin-root">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <Building2 size={20} />
          </div>
          <div>
            <span className="sidebar-brand-name">JobPortal</span>
            <span className="sidebar-brand-sub">Recruiter & Companies</span>
          </div>
          <button className="sidebar-close-mobile" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activeSection === item.id ? "active" : ""}`}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
            >
              {item.icon}
              <span>{item.id === "jobs" ? "My Job Listings" : item.id === "applications" ? "Candidate Applications" : item.label}</span>
              {activeSection === item.id && <ChevronRight size={14} className="nav-chevron" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user-info">
            <div className="sidebar-avatar">
              {(user?.name || "R")[0]?.toUpperCase()}
            </div>
            <div>
              <p className="sidebar-user-name">{user?.name || "Recruiter"}</p>
              <p className="sidebar-user-email">{user?.companyName ? user.companyName : user?.email || "recruiter@portal.com"}</p>
            </div>
          </div>
          <button className="sidebar-logout-btn" onClick={handleLogout} title="Logout">
            <LogOut size={17} />
          </button>
        </div>
      </aside>

      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <main className="admin-main">
        {/* Top Bar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <button className="topbar-menu-btn" onClick={() => setSidebarOpen(true)}>
              <Menu size={22} />
            </button>
            <div className="topbar-breadcrumb">
              <span className="breadcrumb-parent">Recruiter</span>
              <ChevronRight size={14} />
              <span className="breadcrumb-current">
                {navItems.find((n) => n.id === activeSection)?.label}
              </span>
            </div>
          </div>
          <div className="topbar-right">
            <div className="topbar-notification">
              <Bell size={19} />
              <span className="notif-dot" />
            </div>
            <Link to="/" className="topbar-view-site">
              <Eye size={15} />
              <span>View Site</span>
            </Link>
            <div className="topbar-admin-chip">
              <Building2 size={14} />
              <span>{user?.companyName || "Recruiter / Company"}</span>
            </div>
          </div>
        </header>

        <div className="admin-content-area">

          {/* ===== OVERVIEW ===== */}
          {activeSection === "overview" && (
            <div className="section-overview">
              <div className="section-page-head">
                <div>
                  <h1>Dashboard Overview</h1>
                  <p>Welcome back! Here's what's happening on JobPortal today.</p>
                </div>
                <button
                  className="btn-admin-primary"
                  onClick={() => { setActiveSection("jobs"); setTimeout(() => setJobModal("add"), 100); }}
                >
                  <Plus size={16} />
                  <span>Post New Job</span>
                </button>
              </div>

              <div className="stats-grid">
                <StatCard
                  icon={<Briefcase size={20} />}
                  label="Total Job Listings"
                  value={totalJobs}
                  change="+2 this week"
                  changeType="up"
                  color="linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
                />
                <StatCard
                  icon={<Users size={20} />}
                  label="Registered Users"
                  value={totalUsers}
                  change={`${activeUsers} active`}
                  changeType="up"
                  color="linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)"
                />
                <StatCard
                  icon={<FileText size={20} />}
                  label="Total Applications"
                  value={totalApps}
                  change="+12% this month"
                  changeType="up"
                  color="linear-gradient(135deg, #10b981 0%, #047857 100%)"
                />
                <StatCard
                  icon={<Star size={20} />}
                  label="Successful Hires"
                  value={hiredCount}
                  change="98% match rate"
                  changeType="up"
                  color="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                />
              </div>

              {/* Quick Stats Row */}
              <div className="overview-grid-2">
                {/* Recent Applications */}
                <div className="admin-card">
                  <div className="card-head">
                    <h3>Recent Applications</h3>
                    <button className="btn-text-link" onClick={() => setActiveSection("applications")}>
                      View All <ArrowUpRight size={14} />
                    </button>
                  </div>
                  <div className="mini-app-list">
                    {applications.slice(0, 5).map((app) => (
                      <div key={app.id} className="mini-app-item">
                        <div className="mini-app-avatar">{app.candidate[0]}</div>
                        <div className="mini-app-info">
                          <p className="mini-app-name">{app.candidate}</p>
                          <p className="mini-app-job">{app.job}</p>
                        </div>
                        <StatusBadge status={app.status} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Job Stats */}
                <div className="admin-card">
                  <div className="card-head">
                    <h3>Job Listing Summary</h3>
                    <button className="btn-text-link" onClick={() => setActiveSection("jobs")}>
                      Manage <ArrowUpRight size={14} />
                    </button>
                  </div>
                  <div className="job-summary-list">
                    <div className="job-summary-item">
                      <CircleDot size={14} className="dot-success" />
                      <span>Featured Jobs</span>
                      <strong>{featuredJobs}</strong>
                    </div>
                    <div className="job-summary-item">
                      <CircleDot size={14} className="dot-info" />
                      <span>Remote Positions</span>
                      <strong>{jobs.filter((j) => j.workplace === "Remote").length}</strong>
                    </div>
                    <div className="job-summary-item">
                      <CircleDot size={14} className="dot-warning" />
                      <span>Hybrid Roles</span>
                      <strong>{jobs.filter((j) => j.workplace === "Hybrid").length}</strong>
                    </div>
                    <div className="job-summary-item">
                      <CircleDot size={14} className="dot-muted" />
                      <span>Internships</span>
                      <strong>{jobs.filter((j) => j.type === "Internship").length}</strong>
                    </div>
                    <div className="job-summary-item">
                      <CircleDot size={14} className="dot-success" />
                      <span>Total Applicants</span>
                      <strong>{jobs.reduce((sum, j) => sum + (j.applicantsCount || 0), 0)}</strong>
                    </div>
                  </div>

                  <div className="quick-actions-grid">
                    <button className="quick-action-btn" onClick={() => { setActiveSection("jobs"); setTimeout(() => setJobModal("add"), 100); }}>
                      <Plus size={15} /> Post Job
                    </button>
                    <button className="quick-action-btn" onClick={() => setActiveSection("applications")}>
                      <Eye size={15} /> Applications
                    </button>
                    <button className="quick-action-btn" onClick={() => setActiveSection("users")}>
                      <Users size={15} /> Users
                    </button>
                    <button className="quick-action-btn" onClick={() => setActiveSection("analytics")}>
                      <BarChart3 size={15} /> Analytics
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== JOB LISTINGS ===== */}
          {activeSection === "jobs" && (
            <div className="section-jobs">
              <div className="section-page-head">
                <div>
                  <h1>Job Listings</h1>
                  <p>{jobs.length} total jobs · {featuredJobs} featured</p>
                </div>
                <button className="btn-admin-primary" onClick={() => setJobModal("add")}>
                  <Plus size={16} />
                  <span>Post New Job</span>
                </button>
              </div>

              <div className="table-toolbar">
                <div className="search-input-wrap">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search jobs by title or company..."
                    value={jobSearch}
                    onChange={(e) => setJobSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Job Title</th>
                      <th>Company</th>
                      <th>Location</th>
                      <th>Type</th>
                      <th>Salary</th>
                      <th>Applicants</th>
                      <th>Featured</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.map((job) => (
                      <tr key={job.id}>
                        <td>
                          <div className="job-title-cell">
                            <div
                              className="job-logo-mini"
                              style={{ background: job.logoBg }}
                            >
                              <Briefcase size={12} />
                            </div>
                            <span>{job.title}</span>
                          </div>
                        </td>
                        <td>{job.company}</td>
                        <td>
                          <span className="location-cell">
                            <MapPin size={12} /> {job.location}
                          </span>
                        </td>
                        <td><span className="type-chip">{job.type}</span></td>
                        <td className="salary-cell">{job.salary}</td>
                        <td className="count-cell">{job.applicantsCount || 0}</td>
                        <td>
                          <button
                            className={`featured-toggle ${job.featured ? "on" : "off"}`}
                            onClick={() => handleToggleFeatured(job.id)}
                          >
                            <Star size={14} />
                            {job.featured ? "Yes" : "No"}
                          </button>
                        </td>
                        <td>
                          <div className="action-btns">
                            <button
                              className="action-btn edit"
                              onClick={() => setJobModal(job)}
                              title="Edit"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              className="action-btn delete"
                              onClick={() => setDeleteConfirm(job.id)}
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredJobs.length === 0 && (
                      <tr>
                        <td colSpan={8} className="empty-table-row">No jobs found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== APPLICATIONS ===== */}
          {activeSection === "applications" && (
            <div className="section-applications">
              <div className="section-page-head">
                <div>
                  <h1>Applications</h1>
                  <p>{applications.length} total · {hiredCount} hired</p>
                </div>
              </div>

              <div className="table-toolbar">
                <div className="search-input-wrap">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search by candidate or job title..."
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                  />
                </div>
                <div className="filter-tabs-row">
                  {["All", "Under Review", "Shortlisted", "Hired", "Rejected"].map((s) => (
                    <button
                      key={s}
                      className={`filter-tab-btn ${appStatusFilter === s ? "active" : ""}`}
                      onClick={() => setAppStatusFilter(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Candidate</th>
                      <th>Job Role</th>
                      <th>Company</th>
                      <th>Applied</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApps.map((app) => {
                      const cName = app.candidate || app.candidateName || app.name || "Candidate";
                      const jTitle = app.job || app.jobTitle || "Role";
                      const appDate = app.applied || app.appliedDate || "Recently";
                      const candidateEmail = app.candidateEmail || app.email;
                      return (
                        <tr key={app.id}>
                          <td>
                            <div className="candidate-cell">
                              <div className="candidate-avatar">{cName[0]?.toUpperCase()}</div>
                              <div>
                                <span style={{ fontWeight: 600 }}>{cName}</span>
                                {candidateEmail && (
                                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted, #94a3b8)" }}>
                                    {candidateEmail}
                                  </div>
                                )}
                                {app.resume && (
                                  <a
                                    href={app.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ fontSize: "0.78rem", color: "#3b82f6", display: "inline-block", marginTop: "2px" }}
                                  >
                                    📄 Resume Preview
                                  </a>
                                )}
                              </div>
                            </div>
                          </td>
                          <td>{jTitle}</td>
                          <td>{app.company}</td>
                          <td>
                            <span className="date-cell"><Clock size={12} /> {appDate}</span>
                          </td>
                          <td><StatusBadge status={app.status} /></td>
                          <td>
                            <select
                              className="status-select"
                              value={app.status}
                              onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                            >
                              <option>Pending</option>
                              <option>Under Review</option>
                              <option>Shortlisted</option>
                              <option>Hired</option>
                              <option>Rejected</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredApps.length === 0 && (
                      <tr>
                        <td colSpan={6} className="empty-table-row">No applications found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== USERS ===== */}
          {activeSection === "users" && (
            <div className="section-users">
              <div className="section-page-head">
                <div>
                  <h1>User Management</h1>
                  <p>{users.length} total users · {activeUsers} active</p>
                </div>
              </div>

              <div className="table-toolbar">
                <div className="search-input-wrap">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Applications</th>
                      <th>Joined</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id}>
                        <td>
                          <div className="candidate-cell">
                            <div className="candidate-avatar">{u.name[0]}</div>
                            <span>{u.name}</span>
                          </div>
                        </td>
                        <td className="email-cell">{u.email}</td>
                        <td><span className="role-chip">{u.role}</span></td>
                        <td className="count-cell">{u.applications}</td>
                        <td className="date-cell"><Clock size={12} /> {u.joined}</td>
                        <td><StatusBadge status={u.status} /></td>
                        <td>
                          <button
                            className={`toggle-status-btn ${u.status === "Active" ? "deactivate" : "activate"}`}
                            onClick={() => handleToggleUserStatus(u.id)}
                          >
                            {u.status === "Active" ? (
                              <><XCircle size={13} /> Deactivate</>
                            ) : (
                              <><CheckCircle2 size={13} /> Activate</>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan={7} className="empty-table-row">No users found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== ANALYTICS ===== */}
          {activeSection === "analytics" && (
            <div className="section-analytics">
              <div className="section-page-head">
                <div>
                  <h1>Analytics & Reports</h1>
                  <p>Platform performance and job market insights.</p>
                </div>
              </div>

              <div className="analytics-grid">
                {/* Application Status Breakdown */}
                <div className="admin-card analytics-card">
                  <div className="card-head">
                    <h3>Application Status Breakdown</h3>
                    <Activity size={18} className="card-head-icon" />
                  </div>
                  <div className="breakdown-list">
                    {[
                      { label: "Under Review", color: "#f59e0b", count: applications.filter((a) => a.status === "Under Review").length },
                      { label: "Shortlisted", color: "#06b6d4", count: applications.filter((a) => a.status === "Shortlisted").length },
                      { label: "Hired", color: "#10b981", count: applications.filter((a) => a.status === "Hired").length },
                      { label: "Rejected", color: "#ef4444", count: applications.filter((a) => a.status === "Rejected").length },
                    ].map((item) => (
                      <div key={item.label} className="breakdown-row">
                        <div className="breakdown-label-wrap">
                          <span className="breakdown-dot" style={{ background: item.color }} />
                          <span>{item.label}</span>
                        </div>
                        <div className="breakdown-bar-wrap">
                          <div
                            className="breakdown-bar"
                            style={{
                              width: `${(item.count / Math.max(applications.length, 1)) * 100}%`,
                              background: item.color,
                            }}
                          />
                        </div>
                        <strong>{item.count}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Jobs by Category */}
                <div className="admin-card analytics-card">
                  <div className="card-head">
                    <h3>Jobs by Category</h3>
                    <BarChart3 size={18} className="card-head-icon" />
                  </div>
                  <div className="breakdown-list">
                    {["Frontend", "Backend", "React", "Java", "UI/UX", "Software Engineer"].map((cat) => {
                      const count = jobs.filter((j) => j.category === cat).length;
                      return (
                        <div key={cat} className="breakdown-row">
                          <div className="breakdown-label-wrap">
                            <span>{cat}</span>
                          </div>
                          <div className="breakdown-bar-wrap">
                            <div
                              className="breakdown-bar"
                              style={{
                                width: `${(count / Math.max(jobs.length, 1)) * 100}%`,
                                background: "var(--accent-gradient)",
                              }}
                            />
                          </div>
                          <strong>{count}</strong>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Platform Metrics */}
                <div className="admin-card analytics-card analytics-card-full">
                  <div className="card-head">
                    <h3>Platform Key Metrics</h3>
                    <Zap size={18} className="card-head-icon" />
                  </div>
                  <div className="metrics-overview-grid">
                    {[
                      { label: "Total Jobs Posted", value: totalJobs, icon: <Briefcase size={20} />, color: "#4f46e5" },
                      { label: "Featured Listings", value: featuredJobs, icon: <Star size={20} />, color: "#f59e0b" },
                      { label: "Remote Jobs", value: jobs.filter((j) => j.workplace === "Remote").length, icon: <MapPin size={20} />, color: "#06b6d4" },
                      { label: "Total Applications", value: totalApps, icon: <FileText size={20} />, color: "#10b981" },
                      { label: "Hire Rate", value: `${Math.round((hiredCount / Math.max(totalApps, 1)) * 100)}%`, icon: <CheckCircle2 size={20} />, color: "#8b5cf6" },
                      { label: "Avg Applicants/Job", value: Math.round(jobs.reduce((sum, j) => sum + (j.applicantsCount || 0), 0) / Math.max(jobs.length, 1)), icon: <Users size={20} />, color: "#f43f5e" },
                    ].map((m) => (
                      <div key={m.label} className="metric-overview-card" style={{ "--m-color": m.color }}>
                        <div className="metric-ov-icon" style={{ color: m.color }}>{m.icon}</div>
                        <div className="metric-ov-value">{m.value}</div>
                        <div className="metric-ov-label">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Job Form Modal */}
      {jobModal && (
        <JobFormModal
          job={typeof jobModal === "object" && jobModal !== "add" ? jobModal : null}
          onSave={handleSaveJob}
          onClose={() => setJobModal(null)}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon">
              <Trash2 size={28} />
            </div>
            <h3>Delete Job Listing?</h3>
            <p>This action cannot be undone. The job listing will be permanently removed.</p>
            <div className="confirm-actions">
              <button className="btn-modal-cancel" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn-delete-confirm" onClick={() => handleDeleteJob(deleteConfirm)}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
