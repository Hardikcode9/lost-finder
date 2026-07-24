import { useEffect, useState } from "react";
import Entry from "./pages/Entry";
import React from "react";
import { useLocation } from "react-router-dom";
// 1. Import Navigate here
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import MyReports from "./pages/MyReports";
import ItemDetails from "./pages/ItemDetails";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import EditReport from "./pages/EditReport";

// ==========================================
// 🔒 PROTECTED ROUTE WRAPPER
// ==========================================
// This checks if the user is logged in. If not, it forces them to the Login page.
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function Layout() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  const token = localStorage.getItem("token");

  return (
    <>
      {!hideLayout || token ? <Navbar /> : null}

      <main className="main-content">
        <Routes>

          {/* PUBLIC */}
          <Route
            path="/login"
            element={
              token ? <Navigate to="/" replace /> : <Login />
            }
          />

          <Route
            path="/signup"
            element={
              token ? <Navigate to="/" replace /> : <Signup />
            }
          />

          <Route
            path="/"
            element={
              token ? (
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              ) : (
                <Entry />
              )
            }
          />

          {/* Keep ALL your remaining routes exactly as they are */}

          <Route
            path="/lost-items"
            element={<ProtectedRoute><LostItems /></ProtectedRoute>}
          />

          <Route
            path="/found-items"
            element={<ProtectedRoute><FoundItems /></ProtectedRoute>}
          />

          <Route
            path="/report-lost"
            element={<ProtectedRoute><ReportLost /></ProtectedRoute>}
          />

          <Route
            path="/report-found"
            element={<ProtectedRoute><ReportFound /></ProtectedRoute>}
          />

          <Route
            path="/profile"
            element={<ProtectedRoute><Profile /></ProtectedRoute>}
          />

          <Route
            path="/my-reports"
            element={<ProtectedRoute><MyReports /></ProtectedRoute>}
          />

          <Route
            path="/item/:id"
            element={<ProtectedRoute><ItemDetails /></ProtectedRoute>}
          />

          <Route
            path="/admin-dashboard"
            element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
          />

          <Route path="*" element={<NotFound />} />

          <Route
            path="/edit-report/:id"
            element={
              <ProtectedRoute>
                <EditReport />
              </ProtectedRoute>
            }
          />

        </Routes>
      </main>

      {!hideLayout || token ? <Footer /> : null}
    </>
  );
}

function App() {
  const [introFinished, setIntroFinished] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setIntroFinished(true);
  }, 3000);

  return () => clearTimeout(timer);
}, []);

const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      {/* 🎬 THE MAGIC INTRO SCREEN */}
      {!introFinished && (
  <div className="cinematic-intro">
        <h1 className="intro-logo">
          Lost<span>Finder</span>
        </h1>
      </div>
      )}
      <div className="App">
        <Layout />
      </div>
    </BrowserRouter>
  );
}

export default App;