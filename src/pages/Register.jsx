import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!user.name || !user.email || !user.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const normalizedUser = {
        ...user,
        name: user.name.trim(),
        email: user.email.trim().toLowerCase(),
        password: user.password
      };

      const usersResponse = await api.get("/users");
      const users = Array.isArray(usersResponse.data) ? usersResponse.data : [];
      const alreadyExists = users.some(
        (existingUser) =>
          String(existingUser.email || "").toLowerCase() === normalizedUser.email
      );

      if (alreadyExists) {
        setError("User already exists with this email.");
        return;
      }

      await api.post("/users", normalizedUser);
      navigate("/login");
    } catch (err) {
      console.log("Registration error:", err);
      setError("Registration failed. Please try again.");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-badge">⚡ JOIN LAPTOP STORE</span>
          <h1>Create Account</h1>
          <p>Register to manage laptops and access admin features</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Teja Reddy"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="e.g. teja@gmail.com"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            Register Account →
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
