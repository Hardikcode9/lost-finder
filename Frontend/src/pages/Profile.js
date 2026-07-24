import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { 
  FaUser, 
  FaEnvelope, 
  FaIdCard, 
  FaPhoneAlt, 
  FaGraduationCap, 
  FaEdit, 
  FaSave, 
  FaClipboardList,
  FaUserGraduate
} from "react-icons/fa";
import "../styles/Profile.css";

function Profile() {
const [user, setUser] = useState({
  name: "",
  email: "",
  studentId: "",
  phone: "",
  course: "",
});

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  fetchProfile();
}, []);

const fetchProfile = async () => {
  try {
    const response = await api.get("/users/profile");

    if (response.data.success) {
      setUser(response.data.user);
    }
  } catch (error) {
    console.log(error);
  }
};

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
  try {
    setLoading(true);

    const response = await api.put("/users/profile", user);

    if (response.data.success) {
      alert("Profile Updated Successfully!");

      setUser(response.data.user);

      setEditMode(false);
    }
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Failed to update profile."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="profile-canvas">
      {/* Animated Background Orbs (Purple & Pink for Profile Theme) */}
      <div className="profile-orb orb-purple"></div>
      <div className="profile-orb orb-pink"></div>

      <div className="profile-card glass-panel fade-up">
        
        <div className="profile-header">
          <div className="avatar-wrapper">
            <div className="profile-avatar">
              <FaUserGraduate />
            </div>
            <div className="avatar-ring"></div>
          </div>
          <h1>{user.name}</h1>
          <p className="neon-text-purple">Student Account</p>
        </div>

        <div className="profile-form">
          
          <div className="form-row">
            <div className="input-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  disabled={!editMode}
                  onChange={handleChange}
                  className={editMode ? "editable" : ""}
                />
              </div>
            </div>

            <div className="input-group">
              <label>College Email</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  disabled={!editMode}
                  onChange={handleChange}
                  className={editMode ? "editable" : ""}
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Student ID</label>
              <div className="input-wrapper">
                <FaIdCard className="input-icon" />
                <input
                  type="text"
                  name="studentId"
                  value={user.studentId}
                  disabled={!editMode}
                  onChange={handleChange}
                  className={editMode ? "editable" : ""}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <div className="input-wrapper">
                <FaPhoneAlt className="input-icon" />
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  disabled={!editMode}
                  onChange={handleChange}
                  className={editMode ? "editable" : ""}
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <label>Course / Major</label>
            <div className="input-wrapper">
              <FaGraduationCap className="input-icon" />
              <input
                type="text"
                name="course"
                value={user.course}
                disabled={!editMode}
                onChange={handleChange}
                className={editMode ? "editable" : ""}
              />
            </div>
          </div>

        </div>

        <div className="profile-buttons">
          {editMode ? (
            <button 
              className="action-btn gradient-btn-purple" 
              onClick={handleSave}
              disabled={loading}
            >
              <span>{loading ? "Saving..." : "Save Profile"}</span>
              {!loading && <FaSave className="btn-icon" />}
            </button>
          ) : (
            <button 
              className="action-btn gradient-btn-purple" 
              onClick={() => setEditMode(true)}
            >
              <span>Edit Profile</span>
              <FaEdit className="btn-icon" />
            </button>
          )}

          <Link to="/my-reports" className="action-btn neon-outline-btn">
            <span>My Reports</span>
            <FaClipboardList className="btn-icon" />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Profile;