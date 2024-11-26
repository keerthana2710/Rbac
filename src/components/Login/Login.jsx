import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem("Users")) || [];
    const adminAccount = {
      id: "admin",
      name: "Administrator",
      email: "admin@gmail.com",
      password: "admin",
      role: "Admin",
      status: "Active",
    };

    const isAdminPresent = existingUsers.some(
      (user) => user.email === adminAccount.email
    );

    if (!isAdminPresent) {
      const updatedUsers = [...existingUsers, adminAccount];
      localStorage.setItem("Users", JSON.stringify(updatedUsers));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem("Users")) || [];
    const user = existingUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem(
        "Credentials",
        JSON.stringify({ email: user.email, role: user.role })
      );
      navigate("/"); 
    } else {
      alert("User not found. Please register first.");
      navigate("/register");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
        <p
          className="register-link"
          onClick={() => {
            navigate("/register");
          }}
        >
          Don't have an account? Register here
        </p>
      </form>
    </div>
  );
};

export default Login;
