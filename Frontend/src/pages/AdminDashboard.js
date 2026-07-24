import React, { useEffect, useState } from "react";
import api from "../services/api";
import { 
  FaUsers, 
  FaSearchLocation, 
  FaBoxOpen, 
  FaClipboardCheck, 
  FaTrashAlt, 
  FaShieldAlt 
} from "react-icons/fa";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalUsers: 0,
    lostItems: 0,
    foundItems: 0,
    totalReports: 0,
  });

  useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard = async () => {
  try {
    const response = await api.get("/items");

    if (response.data.success) {
      const items = response.data.items;

      setReports(items);

      const users = [
        ...new Set(items.map((item) => item.user?._id)),
      ];

      setStats({
        totalUsers: users.length,
        lostItems: items.filter((item) => item.type === "Lost").length,
        foundItems: items.filter((item) => item.type === "Found").length,
        totalReports: items.length,
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const deleteReport = async (id) => {
  try {
    const confirmDelete = window.confirm(
      "Delete this report?"
    );

    if (!confirmDelete) return;

    await api.delete(`/items/${id}`);

    fetchDashboard();
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Delete failed."
    );
  }
};

  return (
    <div className="admin-canvas">
      {/* Animated Background Orbs */}
      <div className="admin-orb orb-cyan"></div>
      <div className="admin-orb orb-purple"></div>

      <div className="admin-content">
        
        <div className="admin-header fade-up">
          <h1>
            <FaShieldAlt className="header-icon" /> 
            Admin <span className="neon-text-cyan">Dashboard</span>
          </h1>
          <p>System overview and report management command center.</p>
        </div>

        {/* 3D Stats Grid */}
        <div className="stats-container">
          
          <div className="stat-card glass-panel fade-up-stagger" style={{ "--delay": "0.1s" }}>
            <div className="stat-icon-wrapper cyan-glow">
              <FaUsers />
            </div>
            <div className="stat-info">
              <h2>{stats.totalUsers}</h2>
              <p>Total Users</p>
            </div>
          </div>

          <div className="stat-card glass-panel fade-up-stagger" style={{ "--delay": "0.2s" }}>
            <div className="stat-icon-wrapper red-glow">
              <FaSearchLocation />
            </div>
            <div className="stat-info">
              <h2 className="text-red">{stats.lostItems}</h2>
              <p>Lost Items</p>
            </div>
          </div>

          <div className="stat-card glass-panel fade-up-stagger" style={{ "--delay": "0.3s" }}>
            <div className="stat-icon-wrapper green-glow">
              <FaBoxOpen />
            </div>
            <div className="stat-info">
              <h2 className="text-green">{stats.foundItems}</h2>
              <p>Found Items</p>
            </div>
          </div>

          <div className="stat-card glass-panel fade-up-stagger" style={{ "--delay": "0.4s" }}>
            <div className="stat-icon-wrapper purple-glow">
              <FaClipboardCheck />
            </div>
            <div className="stat-info">
              <h2 className="text-purple">{stats.totalReports}</h2>
              <p>Total Reports</p>
            </div>
          </div>

        </div>

        {/* Manage Reports Table */}
        <div className="manage-section glass-panel fade-up" style={{ "--delay": "0.5s" }}>
          <div className="section-title">
            <h2>Manage Reports</h2>
          </div>

          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>User</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.length > 0 ? (
                  reports.map((report) => (
                    <tr key={report._id}>
                      <td className="item-title">{report.title}</td>
                      <td>
                        <span className="category-pill">{report.category}</span>
                      </td>
                      <td>
                        <span className={report.type === "Lost" ? "status-tag lost-tag" : "status-tag found-tag"}>
                          {report.type}
                        </span>
                      </td>
                      <td className="user-name">{report.user?.name}</td>
                      <td>
                        <button 
                          className="delete-btn" 
                          onClick={() => deleteReport(report._id)}
                          title="Delete Report"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty-table">
                      No reports found in the system.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;