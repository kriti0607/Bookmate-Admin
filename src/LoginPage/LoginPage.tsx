import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { loginUser } from "../service/services"; // ✅ Make sure this path is correct

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (username && password) {
      try {
        const result = await loginUser(username, password);
        if (result.token) {
          console.log("Login successful:", result);
          navigate("/Dashboard");
        } else {
          alert(result.message || "Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Something went wrong. Please try again later.");
      }
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div className="login-container">
      <img src="/abc.png" alt="Bookmate Logo" className="logo" />
      <div className="login-form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
