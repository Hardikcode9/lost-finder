import React, { useState } from "react";
import "../styles/AdminDashboard.css";

function AdminDashboard() {


  const [reports, setReports] = useState([
    {
      id:1,
      title:"Blue Backpack",
      category:"Bag",
      status:"Lost",
      user:"Rahul Sharma"
    },
    {
      id:2,
      title:"Student ID Card",
      category:"ID Card",
      status:"Found",
      user:"Amit Kumar"
    },
    {
      id:3,
      title:"Laptop",
      category:"Electronics",
      status:"Lost",
      user:"Priya Singh"
    }
  ]);



  const deleteReport = (id)=>{

    setReports(
      reports.filter(
        (report)=>report.id !== id
      )
    );

  };



  return (

    <div className="admin-page">


      <h1>
        Admin Dashboard
      </h1>



      <div className="stats-container">


        <div className="stat-card">

          <h2>
            120
          </h2>

          <p>
            Total Users
          </p>

        </div>



        <div className="stat-card lost">

          <h2>
            45
          </h2>

          <p>
            Lost Items
          </p>

        </div>




        <div className="stat-card found">

          <h2>
            75
          </h2>

          <p>
            Found Items
          </p>

        </div>



        <div className="stat-card">

          <h2>
            15
          </h2>

          <p>
            Pending Claims
          </p>

        </div>



      </div>




      <div className="manage-section">


        <h2>
          Manage Reports
        </h2>



        <table>


          <thead>

            <tr>

              <th>
                Item
              </th>

              <th>
                Category
              </th>

              <th>
                Status
              </th>

              <th>
                User
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>



          <tbody>


          {
            reports.map((report)=>(

              <tr key={report.id}>

                <td>
                  {report.title}
                </td>

                <td>
                  {report.category}
                </td>

                <td>

                  <span
                  className={
                    report.status==="Lost"
                    ?"lost-tag"
                    :"found-tag"
                  }
                  >
                    {report.status}
                  </span>

                </td>


                <td>
                  {report.user}
                </td>


                <td>

                  <button
                  className="delete"
                  onClick={()=>deleteReport(report.id)}
                  >
                    Delete
                  </button>


                </td>


              </tr>

            ))
          }


          </tbody>


        </table>


      </div>



    </div>

  );
}


export default AdminDashboard;