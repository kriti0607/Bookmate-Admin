import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Orders.css";

interface HistoryEvent {
  action: string;
  date: string;
  time: string;
  performedBy?: string;
  comments?: string;
}

interface Book {
  id: string;
  name: string;
  genre: string;
  price: string;
  status: string;
  description: string;
}

interface Order {
  bookName: string;
  uploadedBy: string;
  uploadedOn: string;
  currentStatus: "Sold" | "Rejected" | "Approved" | "InListing";
  buyerName: string;
  comments: string;
  price: string;
  bookHistory: HistoryEvent[];
  userProfileImage: string;
  otherBooks: Book[];
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
    bookHistory: [
      {
        action: "Uploaded",
        date: "2025-07-12",
        time: "10:30 AM",
        performedBy: "John Doe"
      },
      {
        action: "Reviewed",
        date: "2025-07-13",
        time: "02:15 PM",
        performedBy: "Admin",
        comments: "Pending quality check"
      },
      {
        action: "Approved",
        date: "2025-07-14",
        time: "11:00 AM",
        performedBy: "Admin",
        comments: "Book meets all requirements"
      }
    ],
    userProfileImage: "https://via.placeholder.com/50",
    otherBooks: [
      {
        id: "B001",
        name: "Deep Work",
        genre: "Self-help",
        price: "$999",
        status: "Available",
        description: "Focus in a distracted world"
      },
      {
        id: "B002",
        name: "The Power of Habit",
        genre: "Psychology",
        price: "$899",
        status: "Sold",
        description: "Understanding habit formation"
      }
    ],
  },
  {
    bookName: "Deep Work",
    uploadedBy: "Alice Brown",
    uploadedOn: "2025-07-10",
    currentStatus: "Rejected",
    buyerName: "-",
    comments: "Low quality images",
    price: "$999",
    bookHistory: [
      {
        action: "Uploaded",
        date: "2025-07-10",
        time: "09:45 AM",
        performedBy: "Alice Brown"
      },
      {
        action: "Reviewed",
        date: "2025-07-11",
        time: "04:20 PM",
        performedBy: "Admin",
        comments: "Images need improvement"
      },
      {
        action: "Rejected",
        date: "2025-07-12",
        time: "10:00 AM",
        performedBy: "Admin",
        comments: "Low quality images provided"
      }
    ],
    userProfileImage: "https://via.placeholder.com/50",
    otherBooks: [
      {
        id: "B003",
        name: "Digital Minimalism",
        genre: "Self-help",
        price: "$1099",
        status: "Available",
        description: "Living better with less technology"
      }
    ],
  },
];

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState<"history" | "list">("history");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleNotify = (bookName: string) => {
    alert(`User notified again for: ${bookName}`);
  };

  const handleBlockUser = (username: string) => {
    alert(`User ${username} has been blocked.`);
    closeModal();
  };

  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setActiveTab("history");
    setSelectedBook(null);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setSelectedBook(null);
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="admin-title">Admin</h2>
        <nav className="sidebar-nav">
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            <li
              className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </li>
            <li
              className={`nav-link ${location.pathname === "/user" ? "active" : ""}`}
              onClick={() => navigate("/user")}
            >
              User
            </li>
            <li
              className={`nav-link ${location.pathname === "/orders" ? "active" : ""}`}
              onClick={() => navigate("/orders")}
            >
              Orders
            </li>
            <li
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              onClick={() => navigate("/")}
            >
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
            <div className="modal-container" style={{ width: "70%", maxHeight: "85vh" }}>
              <div className="modal-top-box">
                <button className="modal-close" onClick={closeModal}>×</button>
                <button className="block-button" onClick={() => handleBlockUser(selectedOrder.uploadedBy)}>
                  Block User
                </button>
                <h2 className="modal-title">{selectedOrder.bookName}</h2>
                <div className="modal-info-line">
                  <span><strong>Uploaded by:</strong> {selectedOrder.uploadedBy}</span>
                  <span><strong>Uploaded on:</strong> {selectedOrder.uploadedOn}</span>
                  <span><strong>Price:</strong> ₹{selectedOrder.price.replace(/[^0-9]/g, "")}</span>
                  <span><strong>Status:</strong> {selectedOrder.currentStatus}</span>
                </div>
                <div className="modal-comments">
                  <p><strong>Comments:</strong> {selectedOrder.comments || "None"}</p>
                </div>
              </div>

              <div className="modal-bottom-box">
                <div className="modal-tabs">
                  <button
                    className={activeTab === "history" ? "active-tab" : ""}
                    onClick={() => {
                      setActiveTab("history");
                      setSelectedBook(null);
                    }}
                  >
                    Book History
                  </button>
                  <button
                    className={activeTab === "list" ? "active-tab" : ""}
                    onClick={() => {
                      setActiveTab("list");
                      setSelectedBook(null);
                    }}
                  >
                    Other Books
                  </button>
                </div>

                <div className="modal-tab-content" style={{ overflowY: "auto" }}>
                  {activeTab === "history" ? (
                    <table className="history-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Action</th>
                          <th>Performed By</th>
                          <th>Comments</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.bookHistory.map((event, idx) => (
                          <tr key={idx}>
                            <td>{event.date}</td>
                            <td>{event.time}</td>
                            <td>{event.action}</td>
                            <td>{event.performedBy || "-"}</td>
                            <td>{event.comments || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div>
                      {selectedBook ? (
                        <div className="book-details">
                          <h3>{selectedBook.name}</h3>
                          <p><strong>Genre:</strong> {selectedBook.genre}</p>
                          <p><strong>Price:</strong> {selectedBook.price}</p>
                          <p><strong>Status:</strong> {selectedBook.status}</p>
                          <p><strong>Description:</strong> {selectedBook.description}</p>
                          <button
                            onClick={() => setSelectedBook(null)}
                            style={{
                              marginTop: "10px",
                              padding: "8px 16px",
                              backgroundColor: "#7CB342",
                              color: "white",
                              border: "none",
                              borderRadius: "6px",
                              cursor: "pointer"
                            }}
                          >
                            Back to List
                          </button>
                        </div>
                      ) : (
                        <table className="orders-table" style={{ marginTop: "10px" }}>
                          <thead>
                            <tr>
                              <th>Book ID</th>
                              <th>Book Name</th>
                              <th>Genre</th>
                              <th>Price</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedOrder.otherBooks.map((book, idx) => (
                              <tr
                                key={idx}
                                onClick={() => handleBookClick(book)}
                                style={{ cursor: "pointer" }}
                              >
                                <td>{book.id}</td>
                                <td>{book.name}</td>
                                <td>{book.genre}</td>
                                <td>{book.price}</td>
                                <td>{book.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;

