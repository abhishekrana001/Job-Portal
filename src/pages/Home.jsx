import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import jobs from "../data/jobs";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    navigate(`/jobs?${params.toString()}`);
  };

  const handleCategory = (category) => {
    navigate(`/jobs?search=${category}`);
  };

  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">

          <h1>
            Find Your <span>Dream Job</span>
          </h1>

          <p>
            Discover the right job and take the next step in your career.
          </p>

          <form
            className="search-box"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Job title, skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <button type="submit">
              Search Jobs
            </button>
          </form>

        </div>
      </section>


      {/* Popular Categories */}
      <section className="categories">

        <div className="section-heading">
          <h2>Popular Job Categories</h2>

          <p>
            Explore opportunities in popular fields
          </p>
        </div>

        <div className="category-container">

          <div
            className="category-card"
            onClick={() => handleCategory("Java")}
          >
            <h3>💻 Java Development</h3>
            <p>
              Find Java and Spring Boot developer jobs.
            </p>
          </div>

          <div
            className="category-card"
            onClick={() => handleCategory("React")}
          >
            <h3>⚛️ React Development</h3>
            <p>
              Explore React and frontend development jobs.
            </p>
          </div>

          <div
            className="category-card"
            onClick={() => handleCategory("Backend")}
          >
            <h3>⚙️ Backend Development</h3>
            <p>
              Find backend and API development opportunities.
            </p>
          </div>

          <div
            className="category-card"
            onClick={() => handleCategory("Frontend")}
          >
            <h3>🎨 Frontend Development</h3>
            <p>
              Explore frontend and web development jobs.
            </p>
          </div>

          <div
            className="category-card"
            onClick={() => handleCategory("UI/UX")}
          >
            <h3>🎨 UI/UX Design</h3>
            <p>
              Find creative design and UI/UX opportunities.
            </p>
          </div>

          <div
            className="category-card"
            onClick={() => handleCategory("Software Engineer")}
          >
            <h3>🚀 Software Engineering</h3>
            <p>
              Discover software engineering opportunities.
            </p>
          </div>

        </div>

      </section>


      {/* Featured Jobs */}
      <section className="featured-jobs">

        <div className="section-heading">
          <h2>Featured Jobs</h2>

          <p>
            Explore some of our latest job opportunities
          </p>
        </div>

        <div className="jobs-container">

          {jobs.slice(0, 3).map((job) => (
            <JobCard
              key={job.id}
              job={job}
            />
          ))}

        </div>

      </section>

    </div>
  );
}

export default Home;