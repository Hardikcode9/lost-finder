import React from "react";
import { Link } from "react-router-dom";
import "../styles/Hero.css";


function Hero() {

  return (

    <section className="hero">


      <div className="hero-overlay">


        <div className="hero-content">


          <h1>
            Find Your Lost Items
            <br />
            <span>With LostFinder</span>
          </h1>



          <p>
            A smart college lost and found platform
            where students can report lost items,
            find missing belongings, and help others
            recover their things easily.
          </p>




          <div className="hero-buttons">


            <Link
              to="/report-lost"
              className="hero-btn lost-btn"
            >
              Report Lost Item
            </Link>




            <Link
              to="/report-found"
              className="hero-btn found-btn"
            >
              Report Found Item
            </Link>



          </div>



        </div>



      </div>


    </section>

  );

}


export default Hero;