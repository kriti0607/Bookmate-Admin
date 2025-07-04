
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import LoginPage from './LoginPage/LoginPage';
import HomePage from './HomePage/HomePage';

const App: React.FC = () => {

  return (
  
      <div>
        {/* Logo Section */}
        {/* Navigation for Routing */}
        <nav style={{ marginTop: "20px" }}>
          <Link to="/">Login</Link> | <Link to="/home">Home</Link>
        </nav>

        {/* Routing Section */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>

  );
};

export default App;
