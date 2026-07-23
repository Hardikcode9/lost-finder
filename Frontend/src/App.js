import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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



function App() {


  return (

    <BrowserRouter>


      <div className="App">


        {/* Navbar appears on every page */}

        <Navbar />



        <main className="main-content">


          <Routes>



            {/* Home */}

            <Route
              path="/"
              element={<Home />}
            />



            {/* Items Pages */}

            <Route
              path="/lost-items"
              element={<LostItems />}
            />


            <Route
              path="/found-items"
              element={<FoundItems />}
            />




            {/* Report Pages */}

            <Route
              path="/report-lost"
              element={<ReportLost />}
            />


            <Route
              path="/report-found"
              element={<ReportFound />}
            />




            {/* Authentication */}

            <Route
              path="/login"
              element={<Login />}
            />


            <Route
              path="/signup"
              element={<Signup />}
            />




            {/* User Profile */}

            <Route
              path="/profile"
              element={<Profile />}
            />


            <Route
              path="/my-reports"
              element={<MyReports />}
            />




            {/* Single Item Details */}

            <Route
              path="/item/:id"
              element={<ItemDetails />}
            />




            {/* Admin */}

            <Route
              path="/admin-dashboard"
              element={<AdminDashboard />}
            />




            {/* 404 Page */}

            <Route
              path="*"
              element={<NotFound />}
            />


          </Routes>


        </main>



        {/* Footer appears on every page */}

        <Footer />


      </div>


    </BrowserRouter>

  );

}


export default App;