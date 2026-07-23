import React, { useState } from "react";
import "../styles/ReportLost.css";

function ReportLost() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    date: "",
    contact: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Lost Item Report Submitted Successfully!");

    setFormData({
      title: "",
      category: "",
      description: "",
      location: "",
      date: "",
      contact: "",
      image: null,
    });
  };

  return (
    <div className="report-lost">
      <div className="report-card">
        <h1>Report Lost Item</h1>
        <p>
          Fill in the details below to report your lost item.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Item Name</label>
          <input
            type="text"
            name="title"
            placeholder="Enter item name"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option>Mobile</option>
            <option>Laptop</option>
            <option>Bag</option>
            <option>Books</option>
            <option>ID Card</option>
            <option>Wallet</option>
            <option>Keys</option>
            <option>Bottle</option>
            <option>Clothes</option>
            <option>Others</option>
          </select>

          <label>Description</label>
          <textarea
            name="description"
            rows="4"
            placeholder="Describe your item..."
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <label>Lost Location</label>
          <input
            type="text"
            name="location"
            placeholder="Where did you lose it?"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <label>Date Lost</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label>Contact Number</label>
          <input
            type="tel"
            name="contact"
            placeholder="Enter contact number"
            value={formData.contact}
            onChange={handleChange}
            required
          />

          <label>Upload Item Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />

          <button type="submit">
            Submit Report
          </button>

        </form>
      </div>
    </div>
  );
}

export default ReportLost;