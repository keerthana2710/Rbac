import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Assuming your CSS is in a file named Register.css

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Viewer",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    // Generate a unique ID for the user
    const newUser = {
      id: Date.now(), // Unique ID based on the current timestamp
      ...formData,
    };

    // Store in localStorage
    const existingUsers = JSON.parse(localStorage.getItem("Users")) || [];
    localStorage.setItem("Users", JSON.stringify([...existingUsers, newUser]));

    // Save credentials to simulate login
    localStorage.setItem(
      "Credentials",
      JSON.stringify({ name: formData.name, role: formData.role })
    );

    // Navigate to the dashboard or login page
    navigate("/login");
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="register-btn">
          Register
        </button>
        <p
          className="register-link"
          onClick={() => {
            navigate("/login");
          }}
        >
          If you are already register then login here
        </p>
      </form>
    </div>
  );
};

export default Register;
