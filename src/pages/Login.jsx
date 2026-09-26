import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser =
      JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      alert("No account found. Please register first.");
      return;
    }

    if (
      email === savedUser.email &&
      password === savedUser.password
    ) {
      login(savedUser);

      alert("Login successful! 🎉");

      navigate("/");
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <main className="auth-page">

      <div className="auth-container">

        <div className="auth-heading">
          <h1>Welcome Back</h1>

          <p>
            Login to your JobPortal account.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            className="auth-btn"
          >
            Login
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </main>
  );
}

export default Login;