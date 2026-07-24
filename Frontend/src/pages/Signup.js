import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaUser, 
  FaEnvelope, 
  FaIdBadge, 
  FaPhone, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaUserPlus 
} from "react-icons/fa";
import "../styles/Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    studentId: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(signupData.password !== signupData.confirmPassword){
      alert("Passwords do not match! ❌");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: signupData.name,
          email: signupData.email,
          studentId: signupData.studentId,
          phone: signupData.phone,
          password: signupData.password
        }),
      });

      const data = await response.json();

      if (response.ok || data.success) {
        alert("Account Created Successfully! 🎉");
        navigate("/login");
      } else {
        alert(data.message || "Failed to create account.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Server Error. Make sure your backend is running!");
    }

    setLoading(false);
  };

  return (
    <div className="signup-canvas">
      {/* Animated Background Orbs */}
      <div className="login-orb orb-cyan"></div>
      <div className="login-orb orb-pink"></div>

      <div className="signup-card glass-panel">
        <div className="signup-header">
          <h1>Create Account <span className="wave">🎓</span></h1>
          <p>Join the <span className="neon-text">LostFinder</span> Campus Network</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          
          {/* Full Width Fields */}
          <div className="input-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={signupData.name}
                onChange={handleChange}
                required
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
                placeholder="student@college.edu"
                value={signupData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* 2-Column Grid Fields */}
          <div className="form-row">
            <div className="input-group">
              <label>Student ID</label>
              <div className="input-wrapper">
                <FaIdBadge className="input-icon" />
                <input
                  type="text"
                  name="studentId"
                  placeholder="e.g. 2024CS101"
                  value={signupData.studentId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <div className="input-wrapper">
                <FaPhone className="input-icon" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={signupData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create password"
                  value={signupData.password}
                  onChange={handleChange}
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={signupData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="signup-btn gradient-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="loading-text">Creating Account...</span>
            ) : (
              <>
                <span>Register Now</span>
                <FaUserPlus className="btn-icon" />
              </>
            )}
          </button>
        </form>

        <div className="signup-links">
          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;