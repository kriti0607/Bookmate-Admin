import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const sampleBooks = [
  {
    imageUrl: "https://via.placeholder.com/80",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    publisher: "MIT Press",
    genre: "Computer Science",
    price: "₹999",
    status: "Available",
    comments: "Core CS textbook",
  },
  {
    imageUrl: "https://via.placeholder.com/80",
    title: "Principles of Economics",
    author: "N. Gregory Mankiw",
    publisher: "Cengage",
    genre: "Economics",
    price: "₹850",
    status: "Out of Stock",
    comments: "1st-year syllabus",
  },
  {
    imageUrl: "https://via.placeholder.com/80",
    title: "Organic Chemistry",
    author: "Paula Y. Bruice",
    publisher: "Pearson",
    genre: "Chemistry",
    price: "₹1,250",
    status: "Available",
    comments: "UG science",
  },
  {
    imageUrl: "https://via.placeholder.com/80",
    title: "Engineering Mathematics",
    author: "B.S. Grewal",
    publisher: "Khanna Publishers",
    genre: "Mathematics",
    price: "₹630",
    status: "Available",
    comments: "Standard reference",
  },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [clicked, setClicked] = useState<Record<
    string,
    { approve: boolean; reject: boolean }
  >>({});

  const handleClick = (title: string, type: "approve" | "reject") => {
    setClicked((prev) => ({
      ...prev,
      [title]: {
        approve: type === "approve" ? true : prev[title]?.approve || false,
        reject: type === "reject" ? true : prev[title]?.reject || false,
      },
    }));
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="admin-title">Admin</h2>
        <nav className="sidebar-nav">
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            <li className="nav-link active" onClick={() => navigate("/dashboard")}>
              Dashboard
            </li>
            <li className="nav-link" onClick={() => navigate("/orders")}>
              Orders
            </li>
            <li className="nav-link" onClick={() => navigate("/")}>
              Logout
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>Uploaded Books</h1>

        {/* Header Row */}
        <div className="book-row header-row">
          <div className="book-col details">Details</div>
          <div className="book-col price">Price</div>
          <div className="book-col status">Status</div>
          <div className="book-col comments">Comments</div>
          <div className="book-col actions">Actions</div>
        </div>

        {/* Book Rows */}
        <div className="book-list">
          {sampleBooks.map((book, index) => (
            <div className="book-row" key={index}>
              <div className="book-col details">
                <img src={book.imageUrl} alt={book.title} className="book-img" />
                <div>
                  <strong>{book.title}</strong>
                  <p>Author: {book.author}</p>
                  <p>Publisher: {book.publisher}</p>
                  <p>Genre: {book.genre}</p>
                </div>
              </div>

              <div className="book-col price">
                <p>{book.price}</p>
              </div>

              <div className="book-col status">
                <span
                  className={`status-badge ${
                    book.status.toLowerCase() === "available" ? "available" : "out"
                  }`}
                >
                  {book.status}
                </span>
              </div>

              <div className="book-col comments">
                <p>{book.comments}</p>
              </div>

              <div className="book-col actions">
                <button
                  className={`approve-button ${clicked[book.title]?.approve ? "clicked" : ""}`}
                  onClick={() => handleClick(book.title, "approve")}
                >
                  Approve
                </button>
                <button
                  className={`reject-button ${clicked[book.title]?.reject ? "clicked" : ""}`}
                  onClick={() => handleClick(book.title, "reject")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
