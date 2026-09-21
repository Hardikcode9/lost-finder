import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaTags, 
  FaAlignLeft,
  FaCheckCircle,
  FaExclamationCircle,
  FaUserAlt,
  FaPhoneAlt,
  FaEnvelope
} from "react-icons/fa";
import "../styles/ItemDetails.css";
import api from "../services/api";

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Modal & Submission State
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await api.get(`/items/${id}`);
      if (response.data.success) {
        setItem(response.data.item);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimClick = () => {
    setShowModal(true); // Open the custom 3D modal instead of alert
  };

  const confirmClaim = () => {
    setIsSubmitting(true);
    // Simulate processing time before showing success
    setTimeout(() => {
      setIsSubmitting(false);
      setShowModal(false);
      alert("Claim request sent successfully! ✨");
      navigate(-1); // Go back to the previous page
    }, 1500);
  };

  if (loading) {
    return (
      <div className="details-canvas center-content">
        <div className="loader-ring"></div>
        <h2 className="loading-text">Decrypting item data...</h2>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="details-canvas center-content">
        <h2 style={{ color: "white" }}>Item not found in the database.</h2>
        <Link to="/" className="back-btn neon-outline-btn mt-4">Return Home</Link>
      </div>
    );
  }

  // Determine theme based on status
  const isLost = item.status === "Lost";
  const themeClass = isLost ? "theme-lost" : "theme-found";

  return (
    <div className="details-canvas">
      {/* Animated Background Orbs */}
      <div className="details-orb orb-1"></div>
      <div className="details-orb orb-2"></div>

      <div className="details-wrapper fade-up">
        
        {/* Navigation */}
        <button className="back-btn glass-panel" onClick={() => navigate(-1)}>
          <FaArrowLeft /> <span>Back to List</span>
        </button>

        {/* Main Details Glass Card */}
        <div className={`details-card glass-panel ${themeClass}`} style={{ "--delay": "0.1s" }}>
          
          <div className="details-grid">
            {/* LEFT: Image Section */}
            <div className="details-image-container">
              <img
                src={
                  item.image
                    ? `http://localhost:5000/uploads/${item.image}`
                    : "/no-image.png"
                }
                alt={item.title}
                onError={(e) => {
                  e.target.src = "/no-image.png";
                }}
              />
              <div className="status-badge-absolute glass-panel">
                <span className="status-text">{item.status}</span>
              </div>
            </div>

            {/* RIGHT: Info Section */}
            <div className="details-info-container">
              
              <div className="info-header">
                <span className="category-tag"><FaTags /> {item.category}</span>
                <h1>{item.title}</h1>
              </div>

              <div className="info-body">
                <div className="info-row">
                  <div className="icon-box"><FaMapMarkerAlt /></div>
                  <div>
                    <h4>Location</h4>
                    <p>{item.location}</p>
                  </div>
                </div>

                <div className="info-row">
                  <div className="icon-box"><FaCalendarAlt /></div>
                  <div>
                    <h4>Date</h4>
                    <p>{new Date(item.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>

                <div className="info-row description-row">
                  <div className="icon-box"><FaAlignLeft /></div>
                  <div>
                    <h4>Description</h4>
                    <p>{item.description || "No specific details provided."}</p>
                  </div>
                </div>
              </div>

              <hr className="glass-divider" />

              <div className="contact-info">
                <h3>Contact Information</h3>
                <div className="contact-grid">
                  <p><FaUserAlt className="contact-icon" /> {item.user?.name || "Unknown User"}</p>
                  <p><FaPhoneAlt className="contact-icon" /> {item.contact || "N/A"}</p>
                  <p><FaEnvelope className="contact-icon" /> {item.user?.email || "N/A"}</p>
                </div>
              </div>

              <div className="action-section">
                <button 
                  className="claim-trigger-btn gradient-btn-dynamic"
                  onClick={handleClaimClick}
                >
                  <span>{isLost ? "I Found This Item" : "Claim This Item"}</span>
                  <FaCheckCircle className="btn-icon" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 3D Glassmorphism Popup Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel">
            <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
            
            <div className={`modal-icon ${themeClass}`}>
              <FaExclamationCircle />
            </div>
            
            <h2>Confirm Action</h2>
            <p>
              Are you sure you want to <strong>{isLost ? "report that you found" : "claim"}</strong> the <strong>{item.title}</strong>? 
              This will notify the original poster and initiate contact.
            </p>

            <div className="modal-buttons">
              <button 
                className="cancel-btn" 
                onClick={() => setShowModal(false)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                className="confirm-btn gradient-btn-dynamic" 
                onClick={confirmClaim}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Yes, Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemDetails;