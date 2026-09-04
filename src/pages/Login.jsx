import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { isAdminCredentials } from "../services/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      let matchedUser = null;

      if (isAdminCredentials(email, password)) {
        matchedUser = {
          name: "Sam",
          email: "samram5626@gmail.com",
          isAdmin: true
        };
      } else {
        const response = await api.get("/users");
        const users = Array.isArray(response.data) ? response.data : [];
        matchedUser = users.find(
          (user) =>
            String(user.email || "").toLowerCase() === email.trim().toLowerCase() &&
            String(user.password || "") === password
        );
      }

      if (matchedUser) {
        localStorage.setItem("user", JSON.stringify(matchedUser));
        navigate("/");
        window.location.reload();
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.log("Login error:", err);
      setError("Failed to connect to server. Please try again.");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-badge">⚡ WELCOME BACK</span>
          <h1>Login to Account</h1>
          <p>Enter your credentials to manage laptop store</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="e.g. teja@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            Login →
          </button>
        </form>

        <p className="auth-footer-text">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
