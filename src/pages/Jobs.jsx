import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import jobs from "../data/jobs";
import JobCard from "../components/JobCard";
import "./Jobs.css";

function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialLocation = searchParams.get("location") || "";

  const [search, setSearch] = useState(initialSearch);
  const [location, setLocation] = useState(initialLocation);
  const [jobType, setJobType] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const params = {};

    if (search.trim()) {
      params.search = search.trim();
    }

    if (location.trim()) {
      params.location = location.trim();
    }

    if (jobType) {
      params.type = jobType;
    }

    setSearchParams(params);
  };

  const filteredJobs = jobs.filter((job) => {
    const searchMatch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const locationMatch =
      job.location.toLowerCase().includes(location.toLowerCase());

    const typeMatch =
      jobType === "" || job.type === jobType;

    return searchMatch && locationMatch && typeMatch;
  });

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setJobType("");
    setSearchParams({});
  };

  return (
    <div className="jobs-page">

      <h1>Find Jobs</h1>

      <form className="jobs-filter" onSubmit={handleSearch}>

        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option value="">All Job Types</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Internship">Internship</option>
        </select>

        <button type="submit">
          Search
        </button>

        <button
          type="button"
          onClick={clearFilters}
          className="clear-btn"
        >
          Clear
        </button>

      </form>

      <div className="jobs-header">
        <h2>
          {filteredJobs.length} Jobs Found
        </h2>
      </div>

      {filteredJobs.length > 0 ? (
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
            />
          ))}
        </div>
      ) : (
        <div className="no-jobs">
          <h2>No Jobs Found</h2>

          <p>
            Try searching with a different job title or location.
          </p>
        </div>
      )}

    </div>
  );
}

export default Jobs;