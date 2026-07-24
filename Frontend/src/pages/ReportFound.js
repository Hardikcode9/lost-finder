import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { 
  FaBoxOpen, 
  FaTags, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUserAlt,
  FaPhoneAlt,
  FaAlignLeft, 
  FaCamera, 
  FaPaperPlane,
  FaHandHoldingHeart
} from "react-icons/fa";
import "../styles/ReportFound.css";

function ReportFound() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    date: "",
    contact: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("type", "Found");
    data.append("location", formData.location);
    data.append("date", formData.date);
    data.append("contact", formData.contact);

    if (formData.image) {
      data.append("image", formData.image);
    }

    const response = await api.post("/items", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert(response.data.message);

    setFormData({
      title: "",
      category: "",
      description: "",
      location: "",
      date: "",
      contact: "",
      image: null,
    });

    navigate("/found-items");
  } catch (error) {
    alert(
      error.response?.data?.message || "Something went wrong."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="report-found-canvas">
      {/* Animated Background Orbs (Green/Cyan for Found Theme) */}
      <div className="report-orb orb-green"></div>
      <div className="report-orb orb-cyan"></div>

      <div className="report-card glass-panel fade-up">
        
        <div className="report-header">
          <h1>
            Report <span className="neon-text-green">Found Item</span>
          </h1>
          <p>You found something! <FaHandHoldingHeart className="heart-icon"/> Fill out the details below to help return it to its owner.</p>
        </div>

        <form onSubmit={handleSubmit} className="report-form">
          
          {/* Item Name */}
          <div className="input-group">
            <label>Item Name</label>
            <div className="input-wrapper">
              <FaBoxOpen className="input-icon" />
              <input
                type="text"
                name="title"
                placeholder="e.g. Black Leather Wallet"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* 2-Column Grid: Category & Date */}
          <div className="form-row">
            <div className="input-group">
              <label>Category</label>
              <div className="input-wrapper">
                <FaTags className="input-icon" />
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Bag">Bag</option>
                  <option value="Books">Books</option>
                  <option value="ID Card">ID Card</option>
                  <option value="Wallet">Wallet</option>
                  <option value="Keys">Keys</option>
                  <option value="Bottle">Bottle</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label>Date Found</label>
              <div className="input-wrapper">
                <FaCalendarAlt className="input-icon" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="input-group">
            <label>Found Location</label>
            <div className="input-wrapper">
              <FaMapMarkerAlt className="input-icon" />
              <input
                type="text"
                name="location"
                placeholder="e.g. College Canteen near window"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* 2-Column Grid: Finder Details */}
          <div className="form-row">

            <div className="input-group">
              <label>Contact Number</label>
              <div className="input-wrapper">
                <FaPhoneAlt className="input-icon" />
                <input
                  type="tel"
                  name="contact"
                  placeholder="Enter contact number"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="input-group">
            <label>Item Description</label>
            <div className="input-wrapper textarea-wrapper">
              <FaAlignLeft className="input-icon textarea-icon" />
              <textarea
                name="description"
                placeholder="Describe the condition, brand, or any distinct features..."
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          {/* Image Upload */}
          <div className="input-group">
            <label>Upload Item Image</label>
            <div className="input-wrapper file-wrapper">
              <FaCamera className="input-icon" />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="file-input"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="submit-btn gradient-btn-green"
            disabled={loading}
          >
            {loading ? (
              <span className="loading-text">Submitting...</span>
            ) : (
              <>
                <span>Submit Found Report</span>
                <FaPaperPlane className="btn-icon" />
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}

export default ReportFound;