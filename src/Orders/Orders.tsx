import React from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css"; // We'll make this identical to Dashboard.css

const Orders: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* SIDEBAR (EXACT COPY FROM DASHBOARD) */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Menu</h2> {/* Same title */}
        <nav className="sidebar-nav">
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            <li
              className="nav-link"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </li>
            <li
              className="nav-link active" /* "active" class for current page */
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

      {/* MAIN CONTENT (SAME STRUCTURE) */}
      <main className="main-content">
        <h1>Orders Page</h1>
        {/* Your orders content here */}
      </main>
    </div>
  );
};

export default Orders;