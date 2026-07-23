import React from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/ItemDetails.css";

function ItemDetails() {

  const { id } = useParams();


  // Temporary Data (replace with API later)
  const item = {
    id: id,
    title: "Blue Backpack",
    category: "Bag",
    description:
      "A blue college backpack with a laptop compartment and two side pockets.",
    location: "Central Library",
    date: "19 July 2026",
    status: "Lost",
    image: "https://via.placeholder.com/500x350?text=Backpack",
    name: "Rahul Sharma",
    contact: "9876543210",
    email: "rahul@college.edu",
  };


  const handleClaim = () => {

    alert("Claim request sent successfully!");

  };


  return (

    <div className="details-page">

      <div className="details-card">


        <div className="details-image">

          <img
            src={item.image}
            alt={item.title}
          />

        </div>



        <div className="details-content">


          <h1>
            {item.title}
          </h1>


          <span
            className={
              item.status === "Lost"
              ? "lost-status"
              : "found-status"
            }
          >
            {item.status}
          </span>



          <p>
            <strong>Category:</strong> {item.category}
          </p>


          <p>
            <strong>Description:</strong> {item.description}
          </p>


          <p>
            <strong>Location:</strong> {item.location}
          </p>


          <p>
            <strong>Date:</strong> {item.date}
          </p>



          <hr />



          <h3>
            Contact Information
          </h3>


          <p>
            👤 {item.name}
          </p>


          <p>
            📞 {item.contact}
          </p>


          <p>
            📧 {item.email}
          </p>



          <button
            className="claim-btn"
            onClick={handleClaim}
          >
            Claim Item
          </button>



          <Link
            to="/"
            className="back-btn"
          >
            Back To Home
          </Link>


        </div>


      </div>


    </div>

  );
}


export default ItemDetails;