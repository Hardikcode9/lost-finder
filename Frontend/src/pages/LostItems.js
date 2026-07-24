import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaArrowRight, 
  FaSearchLocation,
  FaSadTear
} from "react-icons/fa";
import "../styles/LostItems.css";

function LostItems() {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
  fetchLostItems();
}, []);

  const fetchLostItems = async () => {
    try {
      const response = await api.get("/items?type=Lost");

      if (response.data.success) {
        setLostItems(response.data.items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [lostItems, setLostItems] = useState([]);

  const filteredItems = lostItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lost-canvas">
      {/* Animated Background Orbs */}
      <div className="lost-orb orb-red"></div>
      <div className="lost-orb orb-purple"></div>

      <div className="lost-page-content">
        
        {/* Header Section */}
        <div className="lost-header fade-up">
          <h1>
            <FaSearchLocation className="header-icon" /> 
            Active <span className="neon-text-red">Lost Items</span>
          </h1>
          <p>Help your peers by checking if you have seen any of these missing belongings across the campus.</p>
        </div>

        {/* Glassmorphism Search Bar */}
        <div className="search-container fade-up" style={{ "--delay": "0.1s" }}>
          <div className="search-wrapper glass-panel">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by item name, category, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm("")}>
                &times;
              </button>
            )}
          </div>
        </div>

        {/* 3D Item Grid */}
        <div className="lost-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div 
                className="item-card glass-panel fade-up-stagger" 
                key={item._id}
                style={{ "--delay": `${0.2 + (index * 0.1)}s` }}
              >
                <div className="card-image">
                <img
                  src={
                    item.image
                      ? `http://192.168.0.100:5000/uploads/${item.image}`
                      : "/no-image.png"
                  }
                  alt={item.title}
                  onError={(e) => {
                    e.target.src = "/no-image.png";
                  }}
                />
                  <span className="badge-lost glass-badge">Missing</span>
                </div>

                <div className="card-body">
                  <span className="category-label">{item.category}</span>
                  <h3>{item.title}</h3>

                  <div className="card-info">
                    <p>
                      <span className="info-icon-box"><FaMapMarkerAlt /></span> 
                      {item.location}
                    </p>
                    <p>
                      <span className="info-icon-box"><FaCalendarAlt /></span> 
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>

                  <Link to={`/item/${item._id}`} className="details-btn gradient-btn-red">
                    <span>Report as Found</span>
                    <FaArrowRight className="btn-arrow" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-message glass-panel fade-up" style={{ "--delay": "0.2s" }}>
              <FaSadTear className="empty-icon" />
              <h3>No matching items found</h3>
              <p>We couldn't find any lost items matching "{searchTerm}".</p>
              <button 
                className="gradient-btn-red clear-btn" 
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default LostItems;