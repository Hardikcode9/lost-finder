import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Footer.css";


function Footer() {

  return (

    <footer className="footer">


      <div className="footer-container">


        {/* About Section */}

        <div className="footer-section">

          <h2>
            Lost<span>Finder</span>
          </h2>

          <p>
            A smart platform for students to report,
            search and recover lost items easily
            inside the college campus.
          </p>

        </div>





        {/* Quick Links */}

        <div className="footer-section">

          <h3>
            Quick Links
          </h3>


          <NavLink to="/">
            Home
          </NavLink>


          <NavLink to="/lost-items">
            Lost Items
          </NavLink>


          <NavLink to="/found-items">
            Found Items
          </NavLink>


          <NavLink to="/profile">
            Profile
          </NavLink>


        </div>





        {/* Report Links */}

        <div className="footer-section">

          <h3>
            Report
          </h3>


          <NavLink to="/report-lost">
            Report Lost Item
          </NavLink>


          <NavLink to="/report-found">
            Report Found Item
          </NavLink>


          <NavLink to="/my-reports">
            My Reports
          </NavLink>


        </div>





        {/* Contact Section */}

        <div className="footer-section">


          <h3>
            Contact Us
          </h3>


          <p>
            📍 College Campus
          </p>


          <p>
            📧 support@lostfinder.com
          </p>


          <p>
            📞 +91 9876543210
          </p>




          <div className="social-links">


            <a href="#">
              Facebook
            </a>


            <a href="#">
              Instagram
            </a>


            <a href="#">
              Twitter
            </a>


          </div>


        </div>



      </div>





      {/* Bottom Footer */}

      <div className="footer-bottom">


        <p>
          © {new Date().getFullYear()} LostFinder.
          All Rights Reserved.
        </p>


      </div>



    </footer>

  );

}


export default Footer;