import React from "react";
import { Link } from "react-router-dom";
import "../styles/ItemCard.css";


function ItemCard({ item }) {


  return (

    <div className="item-card">


      {/* Item Image */}

      <div className="item-image">

        <img
          src={item.image}
          alt={item.title}
        />

      </div>




      {/* Item Content */}

      <div className="item-content">


        <div className="item-header">


          <h2>
            {item.title}
          </h2>



          <span
            className={
              item.status === "Lost"
              ? "lost-badge"
              : "found-badge"
            }
          >
            {item.status}
          </span>


        </div>





        <p>
          <strong>
            Category:
          </strong>{" "}
          {item.category}
        </p>




        <p>
          <strong>
            Location:
          </strong>{" "}
          {item.location}
        </p>




        <p>
          <strong>
            Date:
          </strong>{" "}
          {item.date}
        </p>






        <Link
          to={`/item/${item.id}`}
          className="details-btn"
        >
          View Details
        </Link>




      </div>


    </div>

  );

}


export default ItemCard;