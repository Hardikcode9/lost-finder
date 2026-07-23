import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";


function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);


  const closeMenu = () => {
    setMenuOpen(false);
  };


  return (

    <nav className="navbar">


      <div className="navbar-container">


        {/* Logo */}

        <NavLink 
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          Lost<span>Finder</span>
        </NavLink>




        {/* Mobile Menu Button */}

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>





        {/* Navigation Links */}

        <div
          className={
            menuOpen 
            ? "nav-links active"
            : "nav-links"
          }
        >


          <NavLink
            to="/"
            onClick={closeMenu}
          >
            Home
          </NavLink>



          <NavLink
            to="/lost-items"
            onClick={closeMenu}
          >
            Lost Items
          </NavLink>



          <NavLink
            to="/found-items"
            onClick={closeMenu}
          >
            Found Items
          </NavLink>




          <NavLink
            to="/report-lost"
            onClick={closeMenu}
          >
            Report Lost
          </NavLink>




          <NavLink
            to="/report-found"
            onClick={closeMenu}
          >
            Report Found
          </NavLink>





          <NavLink
            to="/profile"
            onClick={closeMenu}
          >
            Profile
          </NavLink>





          <NavLink
            to="/admin-dashboard"
            onClick={closeMenu}
          >
            Admin
          </NavLink>





          <div className="auth-buttons">


            <NavLink
              to="/login"
              className="login-btn"
              onClick={closeMenu}
            >
              Login
            </NavLink>



            <NavLink
              to="/signup"
              className="signup-btn"
              onClick={closeMenu}
            >
              Signup
            </NavLink>


          </div>



        </div>


      </div>


    </nav>

  );

}


export default Navbar;