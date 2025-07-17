import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css";

interface Order {
  bookName: string;
  uploadedBy: string;
  uploadedOn: string;
  currentStatus: "Sold" | "Rejected" | "Approved" | "InListing";
  buyerName: string;
  comments: string;
  price: string;
  bookHistory: string[];
  userProfileImage: string;
  otherBooks: string[];
}

const sampleOrders: Order[] = [
  {
    bookName: "Atomic Habits",
    uploadedBy: "John Doe",
    uploadedOn: "2025-07-12",
    currentStatus: "Approved",
    buyerName: "Jane Smith",
    comments: "Book looks great!",
    price: "1299",
    bookHistory: ["Uploaded", "Reviewed", "Approved"],
    userProfileImage: "https://via.placeholder.com/50",
    otherBooks: ["Deep Work", "The Power of Habit"],
  },
  {
    bookName: "Deep Work",
    uploadedBy: "Alice Brown",
    uploadedOn: "2025-07-10",
    currentStatus: "Rejected",
    buyerName: "-",
    comments: "Low quality images",
    price: "$999",
    bookHistory: ["Uploaded", "Reviewed", "Rejected"],
    userProfileImage: "https://via.placeholder.com/50",
    otherBooks: ["Digital Minimalism"],
  },
  {
    bookName: "Clean Code",
    uploadedBy: "Charlie Gray",
    uploadedOn: "2025-07-08",
    currentStatus: "InListing",
    buyerName: "-",
    comments: "",
    price: "$1450",
    bookHistory: ["Uploaded"],
    userProfileImage: "https://via.placeholder.com/50",
    otherBooks: ["Refactoring", "The Pragmatic Programmer"],
  },
];

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleNotify = (bookName: string) => {
    alert(`User notified again for: ${bookName}`);
  };

  const handleBlockUser = (username: string) => {
    alert(`User ${username} has been blocked.`);
    closeModal();
  };

  const openModal = (order: Order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
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
                <tr key={index} onClick={() => openModal(order)} style={{ cursor: "pointer" }}>
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNotify(order.bookName);
                      }}
                    >
                      Notify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedOrder && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
              <h2>{selectedOrder.bookName}</h2>
              <p><strong>Uploaded by:</strong> {selectedOrder.uploadedBy}</p>
              <p><strong>Price:</strong> {selectedOrder.price}</p>

              <div className="user-profile">
                <img src={selectedOrder.userProfileImage} alt="User" />
                <div>
                  <p><strong>{selectedOrder.uploadedBy}</strong></p>
                  <p>Uploader Profile</p>
                </div>
              </div>

              <div>
                <h4>Book History</h4>
                <ul>
                  {selectedOrder.bookHistory.map((event, i) => (
                    <li key={i}>{event}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4>Other Books by User</h4>
                <ul>
                  {selectedOrder.otherBooks.map((book, i) => (
                    <li key={i}>{book}</li>
                  ))}
                </ul>
              </div>

              <button className="block-button" onClick={() => handleBlockUser(selectedOrder.uploadedBy)}>
                Block User
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;

