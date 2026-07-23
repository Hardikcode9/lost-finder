import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (data.success) {
        // Save Token
        localStorage.setItem("token", data.token);

        // Save User
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login Successful!");

        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);

      alert("Server Error");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1>Welcome Back 👋</h1>

        <p>Login to your LostFinder account</p>

        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your college email"
            value={loginData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        <div className="login-links">

          <Link to="/forgot-password">
            Forgot Password?
          </Link>

          <p>
            Don't have an account?{" "}
            <Link to="/signup">
              Register
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;