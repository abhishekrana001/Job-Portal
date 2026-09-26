import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

function Profile() {
  const { user, login } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    login(updatedUser);

    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="profile-avatar">
          {formData.name.charAt(0).toUpperCase()}
        </div>

        {!isEditing ? (
          <>
            <h1>{formData.name}</h1>

            <p className="profile-email">
              📧 {formData.email}
            </p>

            <p>
              📱 {formData.phone || "Phone number not added"}
            </p>

            <p className="profile-bio">
              {formData.bio || "No bio added yet."}
            </p>

            <button
              className="edit-profile-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <div className="profile-form">

            <h2>Edit Profile</h2>

            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <label>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
            />

            <div className="profile-actions">
              <button
                className="save-profile-btn"
                onClick={handleSave}
              >
                Save Changes
              </button>

              <button
                className="cancel-profile-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>

          </div>
        )}

        {!isEditing && (
          <div className="profile-links">
            <Link to="/applications">
              My Applications
            </Link>

            <Link to="/saved-jobs">
              Saved Jobs
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;