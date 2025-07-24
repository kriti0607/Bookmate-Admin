import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage/LoginPage";
import Dashboard from "./Dashboard/Dashboard";
import Orders from "./Orders/Orders";
import User from "./User/User"; // Import the new User component

const App: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/user" element={<User />} /> {/* New User route */}
      </Routes>
  );
};

export default App;



