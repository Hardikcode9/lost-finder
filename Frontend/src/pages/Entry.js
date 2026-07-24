import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "../styles/Entry.css";

function Entry() {
  const navigate = useNavigate();
  const [tiltStyle, setTiltStyle] = useState({});

  // Calculates 3D tilt based on mouse position
  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Get mouse position relative to the center of the card (-0.5 to 0.5)
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    // Multiply by max rotation degrees
    const tiltX = y * -20; // 20 deg max tilt on X axis
    const tiltY = x * 20;  // 20 deg max tilt on Y axis

    setTiltStyle({
      transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out" // Fast transition for smooth following
    });
  };

  // Reset card flat when mouse leaves
  const handleMouseLeave = () => {
    setTiltStyle({
      transform: `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)" // Slow spring back
    });
  };

  return (
    <div className="entry-canvas">
      
      {/* Animated Background Orbs */}
      <div className="entry-orb orb-cyan"></div>
      <div className="entry-orb orb-pink"></div>
      <div className="entry-orb orb-purple"></div>

      {/* 3D Perspective Wrapper */}
      <div className="entry-perspective-wrapper">
        <div 
          className="entry-card glass-panel" 
          style={tiltStyle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          
          <div className="entry-logo">
            Lost<span className="neon-text">Finder</span>
          </div>

          <h1>
            Every Lost Item <br />
            <span className="highlight-text">Deserves A Way Home</span>
          </h1>

          <p>
            The ultimate smart campus network. Report, discover, and recover lost belongings in seconds with immersive tracking.
          </p>

          <div className="floating-icons">
            <span className="float-icon i1">🔑</span>
            <span className="float-icon i2">🎒</span>
            <span className="float-icon i3">💻</span>
            <span className="float-icon i4">📱</span>
            <span className="float-icon i5">💳</span>
            <span className="float-icon i6">⌚</span>
          </div>

          <div className="entry-buttons">
            <button
              className="btn-primary gradient-btn"
              onClick={() => navigate("/login")}
            >
              <span>Login</span>
              <FaSignInAlt className="btn-icon" />
            </button>

            <button
              className="btn-secondary neon-outline-btn"
              onClick={() => navigate("/signup")}
            >
              <span>Create Account</span>
              <FaUserPlus className="btn-icon" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Entry;