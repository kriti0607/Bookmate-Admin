import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./User.css";

// User interface
interface User {
    id: number;
    username: string;
    mobile: string;
    email: string;
    profileImage: string;
    status: "Approved" | "Rejected" | "Pending";
    booksSold: number;
    booksBought: number;
    isBlocked?: boolean;
}

interface Book {
    id: number;
    title: string;
}

interface Address {
    id: number;
    address: string;
    dateUsed: string;
}

// Popup Component (unchanged)
const UserPopup: React.FC<{
    user: User | null;
    onClose: () => void;
}> = ({ user, onClose }) => {
    const [activeTab, setActiveTab] = useState<"orders" | "uploads" | "addresses">("orders");

    if (!user) return null;

    const orderedBooks: Book[] = [
        { id: 1, title: "Atomic Habits" },
        { id: 2, title: "The Psychology of Money" },
    ];

    const uploadedBooks: Book[] = [
        { id: 3, title: "Rich Dad Poor Dad" },
        { id: 4, title: "The Alchemist" },
    ];

    const addressHistory: Address[] = [
        { id: 1, address: "123 Main St, New York, NY", dateUsed: "2023-01-01" },
        { id: 2, address: "456 Oak Ave, Los Angeles, CA", dateUsed: "2024-03-15" },
    ];

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="popup-close" onClick={onClose}>X</button>
                <h2>{user.username}'s Details</h2>
                <div className="popup-tabs">
                    <button onClick={() => setActiveTab("orders")} className={activeTab === "orders" ? "active" : ""}>Ordered Books</button>
                    <button onClick={() => setActiveTab("uploads")} className={activeTab === "uploads" ? "active" : ""}>Uploaded Books</button>
                    <button onClick={() => setActiveTab("addresses")} className={activeTab === "addresses" ? "active" : ""}>Address History</button>
                </div>
                <div className="popup-tab-content">
                    {activeTab === "orders" && (
                        <ul>{orderedBooks.map(book => <li key={book.id}>{book.title}</li>)}</ul>
                    )}
                    {activeTab === "uploads" && (
                        <ul>{uploadedBooks.map(book => <li key={book.id}>{book.title}</li>)}</ul>
                    )}
                    {activeTab === "addresses" && (
                        <ul>
                            {addressHistory.map(addr => (
                                <li key={addr.id}>
                                    {addr.address}<br />
                                    <small>Used on: {addr.dateUsed}</small>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

const User: React.FC = () => {
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [processingUserId, setProcessingUserId] = useState<number | null>(null);
    const [processingAction, setProcessingAction] = useState<"block" | "unblock" | null>(null);

    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            username: "john_doe",
            mobile: "+1 234 567 8901",
            email: "john@example.com",
            profileImage: "https://i.pravatar.cc/150?img=1",
            status: "Approved",
            booksSold: 15,
            booksBought: 30,
            isBlocked: false
        },
        {
            id: 2,
            username: "jane_smith",
            mobile: "+1 345 678 9012",
            email: "jane@example.com",
            profileImage: "https://i.pravatar.cc/150?img=2",
            status: "Pending",
            booksSold: 5,
            booksBought: 12,
            isBlocked: false
        },
        {
            id: 3,
            username: "bob_johnson",
            mobile: "+1 456 789 0123",
            email: "bob@example.com",
            profileImage: "https://i.pravatar.cc/150?img=3",
            status: "Rejected",
            booksSold: 0,
            booksBought: 2,
            isBlocked: true
        },
        {
            id: 4,
            username: "alice_williams",
            mobile: "+1 567 890 1234",
            email: "alice@example.com",
            profileImage: "https://i.pravatar.cc/150?img=4",
            status: "Approved",
            booksSold: 22,
            booksBought: 45,
            isBlocked: false
        },
        {
            id: 5,
            username: "charlie_brown",
            mobile: "+1 678 901 2345",
            email: "charlie@example.com",
            profileImage: "https://i.pravatar.cc/150?img=5",
            status: "Pending",
            booksSold: 8,
            booksBought: 18,
            isBlocked: false
        }
    ]);

    const toggleBlockStatus = (userId: number, block: boolean) => {
        if (processingUserId === userId) return;

        setProcessingUserId(userId);
        setProcessingAction(block ? "block" : "unblock");

        setTimeout(() => {
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === userId
                        ? { ...user, isBlocked: block }
                        : user
                )
            );
            setProcessingUserId(null);
            setProcessingAction(null);
        }, 1000); // Simulated delay
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2 className="admin-title">Admin</h2>
                <nav className="sidebar-nav">
                    <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                        <li className="nav-link" onClick={() => navigate("/dashboard")}>Dashboard</li>
                        <li className="nav-link active" onClick={() => navigate("/user")}>User</li>
                        <li className="nav-link" onClick={() => navigate("/orders")}>Orders</li>
                        <li className="nav-link" onClick={() => navigate("/")}>Logout</li>
                    </ul>
                </nav>
            </aside>

            <main className="main-content">
                <h1 className="user-heading">User Management</h1>

                <div className="user-table-container">
                    <table className="user-management-table">
                        <thead>
                            <tr>
                                <th>Profile</th>
                                <th>Username</th>
                                <th>Mobile Number</th>
                                <th>Email</th>
                                <th>Books Sold</th>
                                <th>Books Bought</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} onClick={() => setSelectedUser(user)} style={{ cursor: "pointer" }}>
                                    <td>
                                        <img
                                            src={user.profileImage}
                                            alt={user.username}
                                            className="user-profile-img"
                                        />
                                    </td>
                                    <td>{user.username}</td>
                                    <td>{user.mobile}</td>
                                    <td>{user.email}</td>
                                    <td>{user.booksSold}</td>
                                    <td>{user.booksBought}</td>
                                    <td>
                                        <span className={`status-badge ${user.status.toLowerCase()}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="actions-cell">
                                        <div className="user-actions-vertical">
                                            <button
                                                className={`action-button ${user.isBlocked ? "unblock-button" : "block-button"}`}
                                                disabled={processingUserId === user.id && processingAction === (user.isBlocked ? "unblock" : "block")}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleBlockStatus(user.id, !user.isBlocked);
                                                }}
                                            >
                                                {user.isBlocked ? "Unblock" : "Block"}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedUser && (
                    <UserPopup user={selectedUser} onClose={() => setSelectedUser(null)} />
                )}
            </main>
        </div>
    );
};

export default User;

