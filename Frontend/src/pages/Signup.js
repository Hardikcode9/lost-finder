import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signup.css";

function Signup() {

  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    studentId: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });


  const handleChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(signupData.password !== signupData.confirmPassword){
      alert("Passwords do not match!");
      return;
    }

    try {
      // Send the data to your backend
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // We exclude confirmPassword since the database doesn't need it
        body: JSON.stringify({
          name: signupData.name,
          email: signupData.email,
          studentId: signupData.studentId,
          phone: signupData.phone,
          password: signupData.password
        }),
      });

      const data = await response.json();

      if (response.ok || data.success) {
        alert("Account Created Successfully!");
        navigate("/login");
      } else {
        // Show the error message from the backend if email already exists, etc.
        alert(data.message || "Failed to create account.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Server Error. Make sure your backend is running!");
    }
  };


  return (
    <div className="signup-container">

      <div className="signup-card">

        <h1>Create Account 🎓</h1>

        <p>
          Register for LostFinder College Portal
        </p>


        <form onSubmit={handleSubmit}>


          <label>Full Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={signupData.name}
            onChange={handleChange}
            required
          />



          <label>College Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your college email"
            value={signupData.email}
            onChange={handleChange}
            required
          />



          <label>Student ID</label>

          <input
            type="text"
            name="studentId"
            placeholder="Enter student ID"
            value={signupData.studentId}
            onChange={handleChange}
            required
          />



          <label>Phone Number</label>

          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={signupData.phone}
            onChange={handleChange}
            required
          />



          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={signupData.password}
            onChange={handleChange}
            required
          />



          <label>Confirm Password</label>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={signupData.confirmPassword}
            onChange={handleChange}
            required
          />



          <button type="submit">
            Register
          </button>


        </form>


        <div className="signup-links">

          <p>
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>

        </div>


      </div>

    </div>
  );
}

export default Signup;