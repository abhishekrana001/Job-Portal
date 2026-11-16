import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getStoredJobs } from "../utils/jobStorage";
import JobCard from "../components/JobCard";
import {
  Search,
  MapPin,
  Briefcase,
  SlidersHorizontal,
  X,
  LayoutGrid,
  List,
  Sparkles,
  ArrowUpDown,
  Laptop
} from "lucide-react";
import "./Jobs.css";

const categoriesList = [
  "All",
  "React",
  "Java",
  "Backend",
  "Frontend",
  "UI/UX",
  "Software Engineer"
];

function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialLocation = searchParams.get("location") || "";
  const initialType = searchParams.get("type") || "";

  const [search, setSearch] = useState(initialSearch);
  const [location, setLocation] = useState(initialLocation);
  const [jobType, setJobType] = useState(initialType);
  const [workplace, setWorkplace] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [allJobs, setAllJobs] = useState(() => getStoredJobs());

  useEffect(() => {
    const handleUpdate = () => {
      setAllJobs(getStoredJobs());
    };
    window.addEventListener("jobStorageUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("jobStorageUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (search.trim()) params.search = search.trim();
    if (location.trim()) params.location = location.trim();
    if (jobType) params.type = jobType;
    setSearchParams(params);
  };

  const clearAllFilters = () => {
    setSearch("");
    setLocation("");
    setJobType("");
    setWorkplace("");
    setSelectedCategory("All");
    setSortBy("latest");
    setSearchParams({});
  };

  // Filter & sort logic
  const filteredJobs = useMemo(() => {
    return allJobs
      .filter((job) => {
        const query = search.toLowerCase().trim();
        const searchMatch =
          !query ||
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          (job.tags && job.tags.some((t) => t.toLowerCase().includes(query))) ||
          (job.category && job.category.toLowerCase().includes(query));

        const locQuery = location.toLowerCase().trim();
        const locationMatch =
          !locQuery ||
          job.location.toLowerCase().includes(locQuery) ||
          (job.workplace && job.workplace.toLowerCase().includes(locQuery));

        const typeMatch = !jobType || job.type === jobType;

        const workplaceMatch = !workplace || job.workplace === workplace;

        const categoryMatch =
          selectedCategory === "All" ||
          job.category?.toLowerCase() === selectedCategory.toLowerCase() ||
          job.title.toLowerCase().includes(selectedCategory.toLowerCase());

        return searchMatch && locationMatch && typeMatch && workplaceMatch && categoryMatch;
      })
      .sort((a, b) => {
        if (sortBy === "salary") {
          return b.id - a.id; // secondary order
        }
        if (sortBy === "company") {
          return a.company.localeCompare(b.company);
        }
        return b.id - a.id; // default latest
      });
  }, [search, location, jobType, workplace, selectedCategory, sortBy]);

  const hasActiveFilters =
    Boolean(search || location || jobType || workplace || selectedCategory !== "All");

  return (
    <div className="jobs-page-modern">
      {/* Header Banner */}
      <section className="jobs-hero-strip">
        <div className="jobs-hero-inner">
          <span className="strip-badge">
            <Sparkles size={13} />
            Verified Tech Listings
          </span>
          <h1>Explore Tech Opportunities</h1>
          <p>
            Find roles matching your exact skills, preferred work style, and compensation goals.
          </p>
        </div>
      </section>

      <div className="jobs-layout-container">
        {/* Search & Filter Bar */}
        <div className="filter-bar-card">
          <form className="search-form-row" onSubmit={handleSearchSubmit}>
            <div className="form-input-wrap flex-2">
              <Search size={18} className="input-icon" />
              <input
                type="text"
                placeholder="Search job title, skills (e.g. React, Java)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  type="button"
                  className="clear-input-icon"
                  onClick={() => setSearch("")}
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="form-input-wrap flex-1">
              <MapPin size={18} className="input-icon" />
              <input
                type="text"
                placeholder="City, State, or 'Remote'..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              {location && (
                <button
                  type="button"
                  className="clear-input-icon"
                  onClick={() => setLocation("")}
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="form-input-wrap flex-1 select-wrap">
              <Briefcase size={18} className="input-icon" />
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

            <div className="form-input-wrap flex-1 select-wrap">
              <Laptop size={18} className="input-icon" />
              <select
                value={workplace}
                onChange={(e) => setWorkplace(e.target.value)}
              >
                <option value="">All Workplaces</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <button type="submit" className="btn-jobs-search">
              <span>Search</span>
            </button>
          </form>

          {/* Category Chips Bar */}
          <div className="category-chips-row">
            <span className="chips-label">
              <SlidersHorizontal size={14} /> Categories:
            </span>
            <div className="chips-scroll">
              {categoriesList.map((cat, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`category-chip ${
                    selectedCategory === cat ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Controls Bar */}
        <div className="results-controls-bar">
          <div className="results-count-wrap">
            <h2>
              {filteredJobs.length}{" "}
              <span>{filteredJobs.length === 1 ? "Job Found" : "Jobs Available"}</span>
            </h2>

            {hasActiveFilters && (
              <button
                type="button"
                className="btn-clear-filters"
                onClick={clearAllFilters}
              >
                <X size={14} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="controls-right">
            {/* Sort Dropdown */}
            <div className="sort-dropdown-wrap">
              <ArrowUpDown size={15} className="sort-icon" />
              <label htmlFor="sortSelect" className="sr-only">Sort By</label>
              <select
                id="sortSelect"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="latest">Sort by: Latest</option>
                <option value="salary">Sort by: Salary</option>
                <option value="company">Sort by: Company</option>
              </select>
            </div>

            {/* View Mode Grid/List */}
            <div className="view-mode-toggle">
              <button
                type="button"
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                type="button"
                className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
                title="List View"
                aria-label="List View"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Jobs Results Display */}
        {filteredJobs.length > 0 ? (
          <div className={`jobs-container-layout ${viewMode}-mode`}>
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="empty-jobs-state">
            <div className="empty-icon-halo">
              <Search size={32} />
            </div>
            <h3>No Jobs Found Matching Your Criteria</h3>
            <p>
              We couldn't find any positions matching your selected filters. Try broadening your
              search query or resetting the filters.
            </p>
            <button
              type="button"
              className="btn-reset-empty"
              onClick={clearAllFilters}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;