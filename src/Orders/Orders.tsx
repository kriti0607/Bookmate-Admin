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
  userProfile: {
    name: string;
    email: string;
    image: string;
  };
  userBooks: string[];
  otherDetails: string;
}

const sampleOrders: Order[] = [
  {
    bookName: "Atomic Habits",
    uploadedBy: "John Doe",
    uploadedOn: "2025-07-12",
    currentStatus: "Approved",
    buyerName: "Jane Smith",
    comments: "Book looks great!",
    price: "$12.99",
    bookHistory: ["Uploaded on 2025-07-12", "Approved on 2025-07-14"],
    userProfile: {
      name: "John Doe",
      email: "john@example.com",
      image: "https://via.placeholder.com/100",
    },
    userBooks: ["Deep Work", "The Alchemist"],
    otherDetails: "Hardcover, 320 pages",
  },
  {
    bookName: "Deep Work",
    uploadedBy: "Alice Brown",
    uploadedOn: "2025-07-10",
    currentStatus: "Rejected",
    buyerName: "-",
    comments: "Low quality images",
    price: "$9.99",
    bookHistory: ["Uploaded on 2025-07-10", "Rejected on 2025-07-11"],
    userProfile: {
      name: "Alice Brown",
      email: "alice@example.com",
      image: "https://via.placeholder.com/100",
    },
    userBooks: ["Clean Code", "Atomic Habits"],
    otherDetails: "Paperback, 250 pages",
  },
  {
    bookName: "Clean Code",
    uploadedBy: "Charlie Gray",
    uploadedOn: "2025-07-08",
    currentStatus: "InListing",
    buyerName: "-",
    comments: "",
    price: "$14.49",
    bookHistory: ["Uploaded on 2025-07-08"],
    userProfile: {
      name: "Charlie Gray",
      email: "charlie@example.com",
      image: "https://via.placeholder.com/100",
    },
    userBooks: ["Deep Work", "Refactoring"],
    otherDetails: "Softcover, 464 pages",
  },
];

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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
                <tr
                  key={index}
                  onClick={() => setSelectedOrder(order)}
                  className="order-row"
                >
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
          <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedOrder(null)}>×</button>
              <h2>{selectedOrder.bookName}</h2>
              <p><strong>Uploaded By:</strong> {selectedOrder.uploadedBy}</p>
              <p><strong>Price:</strong> {selectedOrder.price}</p>

              <p><strong>Book History:</strong></p>
              <ul>
                {selectedOrder.bookHistory.map((event, i) => (
                  <li key={i}>{event}</li>
                ))}
              </ul>

              <div className="user-profile">
                <img src={selectedOrder.userProfile.image} alt="User" />
                <p>{selectedOrder.userProfile.name}</p>
                <p>{selectedOrder.userProfile.email}</p>
              </div>

              <p><strong>Other Books by User:</strong></p>
              <ul>
                {selectedOrder.userBooks.map((book, i) => (
                  <li key={i}>{book}</li>
                ))}
              </ul>

              <p><strong>Other Details:</strong> {selectedOrder.otherDetails}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;
