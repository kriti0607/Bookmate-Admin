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
        <h2 className="sidebar-title">Admin</h2>
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
        <h1 className="orders-heading">Orders</h1>

        <div className="orders-box">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Uploaded By</th>
                <th>Uploaded On</th>
                <th>Status</th>
                <th>Buyer</th>
                <th>Comments</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sampleOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.bookName}</td>
                  <td>{order.uploadedBy}</td>
                  <td>{order.uploadedOn}</td>
                  <td>{order.currentStatus}</td>
                  <td>{order.buyerName}</td>
                  <td>{order.comments || "None"}</td>
                  <td>
                    <button
                      className="notify-button"
                      disabled={
                        order.currentStatus !== "Approved" &&
                        order.currentStatus !== "InListing"
                      }
                      onClick={() => handleNotify(order.bookName)}
                    >
                      Notify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Orders;

