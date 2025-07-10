import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

type BookStatus = "Available" | "Out of Stock";

interface Book {
  imageUrl: string;
  title: string;
  author: string;
  publisher: string;
  genre: string;
  price: string;
  status: BookStatus;
  comments: string;
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
  {
    imageUrl: "https://via.placeholder.com/80",
    title: "Modern Physics",
    author: "Kenneth Krane",
    publisher: "Wiley",
    genre: "Physics",
    price: "₹720",
    status: "Out of Stock",
    comments: "Conceptual physics",
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

  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    filteredBooks = filteredBooks.filter((book) => {
      const status = clicked[book.title]?.approve
        ? "Approved"
        : clicked[book.title]?.reject
        ? "Rejected"
        : "Pending";
      return status === statusFilter;
    });
  }

  if (priceSort === "low-high") {
    filteredBooks.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  } else if (priceSort === "high-low") {
    filteredBooks.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  }

  const allGenres = [...new Set(sampleBooks.map((b) => b.genre))];

  const openModal = (book: Book) => {
    setSelectedBook({
      ...book,
      images: [
        book.imageUrl,
        "https://via.placeholder.com/300x400?text=Page+1",
        "https://via.placeholder.com/300x400?text=Page+2",
        "https://via.placeholder.com/300x400?text=Page+3",
      ],
    });
    setCurrentImageIndex(0);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === selectedBook.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedBook.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="dashboard-container">
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

      <main className="main-content">
        <h1 className="dashboard-heading">Uploaded Books</h1>

        <div className="filters-inline">
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

        <div className="book-row header-row">
          <div className="book-col details">Details</div>
          <div className="book-col price">Price</div>
          <div className="book-col status">Status</div>
          <div className="book-col comments">Comments</div>
          <div className="book-col actions">Actions</div>
        </div>

        <div className="book-list">
          {filteredBooks.map((book, index) => {
            const approvalStatus = clicked[book.title]?.approve
              ? "Approved"
              : clicked[book.title]?.reject
              ? "Rejected"
              : "Pending";

            return (
              <div className="book-row" key={index}>
                <div className="book-col details">
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="book-img"
                    onClick={() => openModal(book)}
                    style={{ cursor: "pointer" }}
                  />
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
                  <span className={`status-badge ${approvalStatus.toLowerCase()}`}>
                    {approvalStatus}
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
            );
          })}
        </div>
      </main>

      {showModal && selectedBook && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>×</button>

            <div className="image-slider">
              <button onClick={prevImage} className="slider-btn">❮</button>
              <img
                src={selectedBook.images[currentImageIndex]}
                alt={`Slide ${currentImageIndex + 1}`}
                className="modal-image"
              />
              <button onClick={nextImage} className="slider-btn">❯</button>
            </div>

            <div className="image-count">{currentImageIndex + 1} / {selectedBook.images.length}</div>

            <h2 className="popup-book-title">{selectedBook?.title}</h2>

            <div className="book-info-box">
              <div className="info-item"><span className="info-label">Author</span><span className="info-value">{selectedBook.author}</span></div>
              <div className="info-item"><span className="info-label">Edition</span><span className="info-value">Lorem ipsum</span></div>
              <div className="info-item"><span className="info-label">Publisher</span><span className="info-value">{selectedBook.publisher}</span></div>
              <div className="info-item"><span className="info-label">Upload Date</span><span className="info-value">3 June 2023</span></div>
              <div className="info-item"><span className="info-label">Price</span><span className="info-value">{selectedBook.price}</span></div>
              <div className="info-item"><span className="info-label">Location</span><span className="info-value">3.2 km</span></div>
              <div className="info-item"><span className="info-label">Condition</span><span className="info-value">Good</span></div>
            </div>

            <div className="popup-actions">
              <button
                className="approve-button"
                onClick={() => {
                  handleClick(selectedBook.title, "approve");
                  closeModal();
                }}
              >
                Approve
              </button>
              <button
                className="reject-button"
                onClick={() => {
                  handleClick(selectedBook.title, "reject");
                  closeModal();
                }}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
