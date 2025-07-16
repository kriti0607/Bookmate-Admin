import React from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css";

interface Order {
  bookName: string;
  uploadedBy: string;
  uploadedOn: string;
  currentStatus: "Sold" | "Rejected" | "Approved" | "InListing";
  buyerName: string;
  comments: string;
}

const sampleOrders: Order[] = [
  {
    bookName: "Atomic Habits",
    uploadedBy: "John Doe",
    uploadedOn: "2025-07-12",
    currentStatus: "Approved",
    buyerName: "Jane Smith",
    comments: "Book looks great!",
  },
  {
    bookName: "Deep Work",
    uploadedBy: "Alice Brown",
    uploadedOn: "2025-07-10",
    currentStatus: "Rejected",
    buyerName: "-",
    comments: "Low quality images",
  },
  {
    bookName: "Clean Code",
    uploadedBy: "Charlie Gray",
    uploadedOn: "2025-07-08",
    currentStatus: "InListing",
    buyerName: "-",
    comments: "",
  },
];

const Orders: React.FC = () => {
  const navigate = useNavigate();

  const handleNotify = (bookName: string) => {
    alert(`User notified again for: ${bookName}`);
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Menu</h2>
        <nav className="sidebar-nav">
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            <li className="nav-link" onClick={() => navigate("/dashboard")}>
              Dashboard
            </li>
            <li className="nav-link active" onClick={() => navigate("/orders")}>
              Orders
            </li>
            <li className="nav-link" onClick={() => navigate("/")}>
              Logout
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <h1>Orders</h1>
        <div className="orders-container">
          {sampleOrders.map((order, index) => (
            <div className="order-card" key={index}>
              <div><strong>Book Name:</strong> {order.bookName}</div>
              <div><strong>Uploaded By:</strong> {order.uploadedBy}</div>
              <div><strong>Uploaded On:</strong> {order.uploadedOn}</div>
              <div><strong>Status:</strong> {order.currentStatus}</div>
              <div><strong>Buyer:</strong> {order.buyerName}</div>
              <div><strong>Comments:</strong> {order.comments || "None"}</div>
              <button
                className="notify-button"
                disabled={
                  order.currentStatus !== "Approved" &&
                  order.currentStatus !== "InListing"
                }
                onClick={() => handleNotify(order.bookName)}
              >
                Notify User Again
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Orders;
