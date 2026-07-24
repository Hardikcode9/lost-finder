import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"; 
import { 
  FaHome, 
  FaSearch, 
  FaBoxOpen, 
  FaPlusCircle, 
  FaUserAlt, 
  FaUserShield, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaMapMarkedAlt
} from "react-icons/fa";
import "../styles/Navbar.css"; 

function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const token = localStorage.getItem("token");

  // Detect scroll to trigger glassmorphism background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        
        {/* Animated Neon Logo */}
        <Link to="/" className="logo" onClick={closeMenu}>
          Lost<span className="neon-text">Finder</span>
        </Link>

        {token && (
          <>
            {/* Mobile Menu Toggle */}
            <button 
              className={`menu-btn ${isMobileMenuOpen ? "open" : ""}`} 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Navigation Links */}
            <div className={`nav-links-container ${isMobileMenuOpen ? "active" : ""}`}>
              <div className="nav-links">
                <NavLink to="/" onClick={closeMenu} end>
                  <FaHome className="nav-icon" /> <span>Home</span>
                </NavLink>
                <NavLink to="/lost-items" onClick={closeMenu}>
                  <FaSearch className="nav-icon" /> <span>Lost Items</span>
                </NavLink>
                <NavLink to="/found-items" onClick={closeMenu}>
                  <FaBoxOpen className="nav-icon" /> <span>Found Items</span>
                </NavLink>
                <NavLink to="/report-lost" onClick={closeMenu}>
                  <FaMapMarkedAlt className="nav-icon" /> <span>Report Lost</span>
                </NavLink>
                <NavLink to="/report-found" onClick={closeMenu}>
                  <FaPlusCircle className="nav-icon" /> <span>Report Found</span>
                </NavLink>
                <NavLink to="/profile" onClick={closeMenu}>
                  <FaUserAlt className="nav-icon" /> <span>Profile</span>
                </NavLink>
                <NavLink to="/admin-dashboard" onClick={closeMenu}>
                  <FaUserShield className="nav-icon" /> <span>Admin</span>
                </NavLink>
              </div>

              {/* Action Buttons */}
              <div className="auth-buttons">
                <button onClick={handleLogout} className="logout-btn">
                  <FaSignOutAlt className="logout-icon" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;