import api from "../services/api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaBoxOpen, 
  FaTags, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaAlignLeft, 
  FaCamera, 
  FaPaperPlane 
} from "react-icons/fa";
import "../styles/ReportLost.css";

function ReportLost() {
const navigate = useNavigate();
const [formData, setFormData] = useState({
  title: "",
  category: "Bag",
  date: "",
  location: "",
  description: "",
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
  setLoading(true);

  try {
    const token = localStorage.getItem("token");

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("type", "Lost");
    data.append("location", formData.location);
    data.append("date", formData.date);
    data.append("contact", formData.contact);

    if (formData.image) {
      data.append("image", formData.image);
    }

      const response = await api.post(
        "/items",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      alert("Lost Item Reported Successfully 🎉");

      setFormData({
        title: "",
        category: "Bag",
        date: "",
        location: "",
        description: "",
        contact: "",
        image: null,
      });

      navigate("/lost-items");
    }
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Something went wrong."
    );
  }

  setLoading(false);
};

  return (
    <div className="report-canvas">
      {/* Animated Background Orbs (Red/Orange for Lost Theme) */}
      <div className="report-orb orb-red"></div>
      <div className="report-orb orb-orange"></div>

      <div className="report-card glass-panel fade-up">
        
        <div className="report-header">
          <h1>
            Report <span className="neon-text-red">Lost Item</span>
          </h1>
          <p>Provide the details of what you lost to alert the campus network.</p>
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
                placeholder="e.g. Blue Nike Backpack"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* 2-Column Grid */}
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
                  <option value="Bag">Bag</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Wallet">Wallet</option>
                  <option value="Keys">Keys</option>
                  <option value="ID Card">ID Card</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Books">Books</option>
                  <option value="Bottle">Bottle</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label>Date Lost</label>
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
            <label>Last Seen Location</label>
            <div className="input-wrapper">
              <FaMapMarkerAlt className="input-icon" />
              <input
                type="text"
                name="location"
                placeholder="e.g. 2nd Floor Central Library"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="input-group">
            <label>Detailed Description</label>
            <div className="input-wrapper textarea-wrapper">
              <FaAlignLeft className="input-icon textarea-icon" />
              <textarea
                name="description"
                placeholder="Describe any unique features, colors, or contents..."
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <div className="input-group">
            <label>Contact Number</label>

            <div className="input-wrapper">
              <input
                type="text"
                name="contact"
                placeholder="Enter contact number"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="input-group">
            <label>Upload Image (Optional)</label>
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
            className="submit-btn gradient-btn-red"
            disabled={loading}
          >
            {loading ? (
              <span className="loading-text">Broadcasting...</span>
            ) : (
              <>
                <span>Submit Report</span>
                <FaPaperPlane className="btn-icon" />
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}

export default ReportLost;