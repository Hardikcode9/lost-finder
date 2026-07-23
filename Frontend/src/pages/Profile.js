import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Profile.css";

function Profile() {

  const [user, setUser] = useState({
    name: "Priyanshu Rawat",
    email: "priyashu.rwt014@gmail.com",
    studentId: "03596203124",
    phone: "9876543210",
    course: "Information Technology",
  });


  const [editMode, setEditMode] = useState(false);


  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };


  const handleSave = () => {
    setEditMode(false);
    alert("Profile Updated Successfully!");
  };


  return (
    <div className="profile-page">

      <div className="profile-card">


        <div className="profile-header">

          <div className="profile-avatar">
            👤
          </div>

          <h1>{user.name}</h1>

          <p>Student Account</p>

        </div>



        <div className="profile-details">


          <label>
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={user.name}
            disabled={!editMode}
            onChange={handleChange}
          />



          <label>
            College Email
          </label>

          <input
            type="email"
            name="email"
            value={user.email}
            disabled={!editMode}
            onChange={handleChange}
          />



          <label>
            Student ID
          </label>

          <input
            type="text"
            name="studentId"
            value={user.studentId}
            disabled={!editMode}
            onChange={handleChange}
          />



          <label>
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={user.phone}
            disabled={!editMode}
            onChange={handleChange}
          />



          <label>
            Course
          </label>

          <input
            type="text"
            name="course"
            value={user.course}
            disabled={!editMode}
            onChange={handleChange}
          />



        </div>



        <div className="profile-buttons">


          {
            editMode ? (

              <button onClick={handleSave}>
                Save Profile
              </button>

            ) : (

              <button onClick={() => setEditMode(true)}>
                Edit Profile
              </button>

            )

          }


          <Link to="/my-reports">
            My Reports
          </Link>


        </div>


      </div>


    </div>
  );
}

export default Profile;