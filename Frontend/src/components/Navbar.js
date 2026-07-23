import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"; 
import "../styles/Navbar.css"; // (Or whatever your correct CSS path was from the last step!)

function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if the user is currently logged in
  const token = localStorage.getItem("token");

  // Handle logging out
  const handleLogout = () => {
    // 1. Remove the token and user data from the browser
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // 2. Redirect back to the login page
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* The Logo is always visible to everyone */}
        <Link to="/" className="logo">
          Lost<span>Finder</span>
        </Link>

        {/* The rest of the Navbar ONLY renders if the user is logged in */}
        {token && (
          <>
            <button 
              className="menu-btn" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              ☰
            </button>

            <div className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
              <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
              <NavLink to="/lost-items" onClick={() => setIsMobileMenuOpen(false)}>Lost Items</NavLink>
              <NavLink to="/found-items" onClick={() => setIsMobileMenuOpen(false)}>Found Items</NavLink>
              <NavLink to="/report-lost" onClick={() => setIsMobileMenuOpen(false)}>Report Lost</NavLink>
              <NavLink to="/report-found" onClick={() => setIsMobileMenuOpen(false)}>Report Found</NavLink>
              <NavLink to="/profile" onClick={() => setIsMobileMenuOpen(false)}>Profile</NavLink>
              <NavLink to="/admin-dashboard" onClick={() => setIsMobileMenuOpen(false)}>Admin</NavLink>
            </div>

            <div className="auth-buttons">
              <button onClick={handleLogout} className="login-btn">
                Logout
              </button>
            </div>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;