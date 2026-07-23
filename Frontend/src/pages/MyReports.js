import React, { useState } from "react";
import ItemCard from "../components/ItemCard";
import "../styles/MyReports.css";

function MyReports() {

  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Blue Backpack",
      category: "Bag",
      location: "Central Library",
      date: "19 July 2026",
      status: "Lost",
      image: "https://via.placeholder.com/300x220?text=Backpack",
    },
    {
      id: 2,
      title: "Student ID Card",
      category: "ID Card",
      location: "Cafeteria",
      date: "18 July 2026",
      status: "Found",
      image: "https://via.placeholder.com/300x220?text=ID+Card",
    },
  ]);


  const deleteReport = (id) => {

    const updatedReports = reports.filter(
      (item) => item.id !== id
    );

    setReports(updatedReports);

  };


  return (

    <div className="reports-page">

      <h1>
        My Reports
      </h1>


      <p className="reports-subtitle">
        Manage your lost and found item reports
      </p>



      <div className="reports-grid">


        {
          reports.length > 0 ? (

            reports.map((item)=>(

              <div className="report-box" key={item.id}>

                <ItemCard item={item}/>


                <button
                  className="delete-btn"
                  onClick={() => deleteReport(item.id)}
                >
                  Delete Report
                </button>


              </div>

            ))

          ) : (

            <h3>
              No Reports Available
            </h3>

          )
        }


      </div>


    </div>

  );
}


export default MyReports;