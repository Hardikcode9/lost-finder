import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.css";

function NotFound() {
  return (
    <div className="notfound-page">

      <div className="notfound-card">

        <div className="error-code">
          404
        </div>

        <h1>
          Page Not Found
        </h1>

        <p>
          Sorry, the page you are looking for does not exist.
          It may have been removed or the URL might be incorrect.
        </p>


        <Link 
          to="/"
          className="home-btn"
        >
          Go Back Home
        </Link>


      </div>

    </div>
  );
}

export default NotFound;