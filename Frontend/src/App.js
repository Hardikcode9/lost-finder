import React from "react";
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

function App() {
  return (
    <BrowserRouter>
      {/* 🎬 THE MAGIC INTRO SCREEN */}
      <div className="cinematic-intro">
        <h1 className="intro-logo">
          Lost<span>Finder</span>
        </h1>
      </div>

      <div className="App">
        <Navbar />

        <main className="main-content">
          <Routes>
            
            {/* 🟢 PUBLIC ROUTES (Anyone can access these to log in/sign up) */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* 🔴 PROTECTED ROUTES (Must be logged in to see these) */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/lost-items" 
              element={ <ProtectedRoute><LostItems /></ProtectedRoute> } 
            />
            
            <Route 
              path="/found-items" 
              element={ <ProtectedRoute><FoundItems /></ProtectedRoute> } 
            />

            <Route 
              path="/report-lost" 
              element={ <ProtectedRoute><ReportLost /></ProtectedRoute> } 
            />
            
            <Route 
              path="/report-found" 
              element={ <ProtectedRoute><ReportFound /></ProtectedRoute> } 
            />

            <Route 
              path="/profile" 
              element={ <ProtectedRoute><Profile /></ProtectedRoute> } 
            />
            
            <Route 
              path="/my-reports" 
              element={ <ProtectedRoute><MyReports /></ProtectedRoute> } 
            />

            <Route 
              path="/item/:id" 
              element={ <ProtectedRoute><ItemDetails /></ProtectedRoute> } 
            />

            <Route 
              path="/admin-dashboard" 
              element={ <ProtectedRoute><AdminDashboard /></ProtectedRoute> } 
            />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;