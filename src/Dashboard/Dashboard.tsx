import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

type BookStatus = "Available" | "Out of Stock";
type ApprovalStatus = "Pending" | "Approved" | "Rejected";

interface Book {
  imageUrl: string;
  title: string;
  author: string;
  publisher: string;
  genre: string;
  price: string;
  status: BookStatus;
  comments: string;
  approval: ApprovalStatus;
}

const sampleBooks: Book[] = [
  {
    imageUrl: "https://via.placeholder.com/80",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    publisher: "MIT Press",
    genre: "Computer Science",
    price: "₹999",
    status: "Available",
    comments: "Core CS textbook",
    approval: "Pending",
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
    approval: "Approved",
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
    approval: "Rejected",
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
    approval: "Pending",
  },
  {
    imageUrl: "https://via.placeholder.com/80",
    title: "Modern Physics",
    author: "Kenneth Krane",
    publisher: "Wiley",
    genre: "Physics",
    price: "₹720",
    status: "Out of Stock",
    comments: "Conceptual physics",
    approval: "Approved",
  },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [clicked, setClicked] = useState<Record<
    string,
    { approve: boolean; reject: boolean }
  >>({});
  const [priceSort, setPriceSort] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleClick = (title: string, type: "approve" | "reject") => {
    setClicked((prev) => ({
      ...prev,
      [title]: {
        approve: type === "approve" ? true : prev[title]?.approve || false,
        reject: type === "reject" ? true : prev[title]?.reject || false,
      },
    }));
  };

  const parsePrice = (price: string) => Number(price.replace(/[₹,]/g, ""));

  let filteredBooks = [...sampleBooks];

  if (genreFilter) {
    filteredBooks = filteredBooks.filter((book) => book.genre === genreFilter);
  }

  if (statusFilter) {
    filteredBooks = filteredBooks.filter((book) => book.approval === statusFilter);
  }

  if (priceSort === "low-high") {
    filteredBooks.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  } else if (priceSort === "high-low") {
    filteredBooks.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  }

  const allGenres = [...new Set(sampleBooks.map((b) => b.genre))];

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
        <h1 style={{ marginBottom: "50px" }}>Uploaded Books</h1>

        {/* Filters */}
        <div className="filters" style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
          <select onChange={(e) => setPriceSort(e.target.value)} value={priceSort}>
            <option value="">Sort by Price</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>

          <select onChange={(e) => setGenreFilter(e.target.value)} value={genreFilter}>
            <option value="">All Categories</option>
            {allGenres.map((genre) => (
              <option key={genre}>{genre}</option>
            ))}
          </select>

          <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
            <option value="">All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>

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
          {filteredBooks.map((book, index) => (
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
                    book.status === "Available" ? "available" : "out"
                  }`}
                >
                  {book.approval}
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
