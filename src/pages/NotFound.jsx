import React from "react";
import { Link } from "react-router-dom";
import { Compass, ArrowLeft, Home as HomeIcon } from "lucide-react";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found-page-modern">
      <div className="not-found-content-card">
        <div className="not-found-badge">
          <Compass size={24} />
        </div>
        <span className="error-code">404 Error</span>
        <h1>Lost in Tech Space?</h1>
        <p>
          The page or job listing you're seeking may have migrated, expired, or doesn't exist.
        </p>

        <div className="not-found-buttons">
          <Link to="/" className="btn-primary-nf">
            <HomeIcon size={16} /> Return to Homepage
          </Link>
          <Link to="/jobs" className="btn-secondary-nf">
            Browse All Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;