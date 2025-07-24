import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./User.css";

// 1. Update the User interface to include booksSold and booksBought
interface User {
    id: number;
    username: string;
    mobile: string;
    email: string;
    profileImage: string;
    status: "Approved" | "Rejected" | "Pending";
    booksSold: number; // New property
    booksBought: number; // New property
}

const User: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            username: "john_doe",
            mobile: "+1 234 567 8901",
            email: "john@example.com",
            profileImage: "https://i.pravatar.cc/150?img=1",
            status: "Approved",
            booksSold: 15, // Example data
            booksBought: 30 // Example data
        },
        {
            id: 2,
            username: "jane_smith",
            mobile: "+1 345 678 9012",
            email: "jane@example.com",
            profileImage: "https://i.pravatar.cc/150?img=2",
            status: "Pending",
            booksSold: 5, // Example data
            booksBought: 12 // Example data
        },
        {
            id: 3,
            username: "bob_johnson",
            mobile: "+1 456 789 0123",
            email: "bob@example.com",
            profileImage: "https://i.pravatar.cc/150?img=3",
            status: "Rejected",
            booksSold: 0, // Example data
            booksBought: 2 // Example data
        },
        {
            id: 4,
            username: "alice_williams",
            mobile: "+1 567 890 1234",
            email: "alice@example.com",
            profileImage: "https://i.pravatar.cc/150?img=4",
            status: "Approved",
            booksSold: 22, // Example data
            booksBought: 45 // Example data
        },
        {
            id: 5,
            username: "charlie_brown",
            mobile: "+1 678 901 2345",
            email: "charlie@example.com",
            profileImage: "https://i.pravatar.cc/150?img=5",
            status: "Pending",
            booksSold: 8, // Example data
            booksBought: 18 // Example data
        }
    ]);

    const toggleBlockStatus = (userId: number, block: boolean) => {
        setUsers(users.map(user =>
            user.id === userId ? { ...user, status: block ? "Rejected" : "Approved" } : user
        ));
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2 className="admin-title">Admin</h2>
                <nav className="sidebar-nav">
                    <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                        <li className="nav-link" onClick={() => navigate("/dashboard")}>
                            Dashboard
                        </li>
                        <li className="nav-link active" onClick={() => navigate("/user")}>
                            User
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
                <h1 className="user-heading">User Management</h1>

                <div className="user-table-container">
                    <table className="user-management-table">
                        <thead>
                            <tr>
                                <th>Profile</th>
                                <th>Username</th>
                                <th>Mobile Number</th>
                                <th>Email</th>
                                <th>Books Sold</th> {/* New Table Header */}
                                <th>Books Bought</th> {/* New Table Header */}
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
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
                                    <td>{user.booksSold}</td> {/* Display Books Sold */}
                                    <td>{user.booksBought}</td> {/* Display Books Bought */}
                                    <td>
                                        <span className={`status-badge ${user.status.toLowerCase()}`}>
                                            {user.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="actions-cell">
                                        <div className="user-actions-vertical">
                                            <button
                                                className="action-button block-button"
                                                onClick={() => toggleBlockStatus(user.id, true)}
                                            >
                                                Block
                                            </button>
                                            <button
                                                className="action-button unblock-button"
                                                onClick={() => toggleBlockStatus(user.id, false)}
                                            >
                                                Unblock
                                            </button>
                                        </div>
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

export default User;