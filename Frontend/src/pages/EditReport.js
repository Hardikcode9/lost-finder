import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import {
  FaBoxOpen,
  FaTags,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaAlignLeft,
  FaCamera,
  FaPaperPlane,
  FaPhoneAlt,
  FaEdit,
  FaSpinner,
  FaArrowLeft
} from "react-icons/fa";
import "../styles/EditReport.css";

function EditReport() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Bag",
    date: "",
    location: "",
    description: "",
    contact: "",
    image: null,
    type: "Lost",
  });

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const response = await api.get(`/items/${id}`);

      if (response.data.success) {
        const item = response.data.item;

        setFormData({
          title: item.title,
          category: item.category,
          date: item.date?.split("T")[0],
          location: item.location,
          description: item.description,
          contact: item.contact,
          image: null,
          type: item.type,
        });
      }
    } catch (error) {
      console.log(error);
      alert("Failed to load report.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("type", formData.type);
      data.append("location", formData.location);
      data.append("date", formData.date);
      data.append("contact", formData.contact);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const response = await api.put(`/items/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        alert("Report Updated Successfully 🎉");
        navigate("/my-reports");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update report.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-canvas center-content">
        <FaSpinner className="spinner-icon" />
        <h2>Loading Report Data...</h2>
      </div>
    );
  }

  return (
    <div className="edit-canvas">
      {/* Animated Background Orbs */}
      <div className="edit-orb orb-blue"></div>
      <div className="edit-orb orb-purple"></div>

      <div className="edit-container">
        
        {/* Back Button */}
        <button className="back-btn glass-panel fade-up" onClick={() => navigate(-1)}>
          <FaArrowLeft /> <span>Cancel Edit</span>
        </button>

        <div className="edit-card glass-panel fade-up" style={{ "--delay": "0.1s" }}>
          
          <div className="edit-header">
            <h1>
              <FaEdit className="header-icon" /> 
              Edit <span className="neon-text-blue">Report</span>
            </h1>
            <p>Update the details of your {formData.type.toLowerCase()} item report.</p>
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
                <label>Date {formData.type === "Lost" ? "Lost" : "Found"}</label>
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
              <label>Location</label>
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

            {/* Contact Number */}
            <div className="input-group">
              <label>Contact Number</label>
              <div className="input-wrapper">
                <FaPhoneAlt className="input-icon" />
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
              <label>Update Image (Optional)</label>
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
              className="submit-btn gradient-btn-blue"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading-text">Updating...</span>
              ) : (
                <>
                  <span>Save Changes</span>
                  <FaPaperPlane className="btn-icon" />
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default EditReport;