import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Ensure this CSS matches Orders.css EXACTLY

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* SIDEBAR (NOW IDENTICAL TO ORDERS) */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Menu</h2> {/* Added to match Orders */}
        <nav className="sidebar-nav">
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            <li
              className="nav-link active" /* Highlight current page */
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </li>
            <li
              className="nav-link"
              onClick={() => navigate("/orders")}
            >
              Orders
            </li>
            <li
              className="nav-link"
              onClick={() => navigate("/")}
            >
              Logout
            </li>
          </ul>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <h1>Welcome to Dashboard</h1>
        {/* Add your dashboard content here */}
      </main>
    </div>
  );
};

export default Dashboard;