import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

// Import pages
import HomePage from "./Pages/HomePage";
import WatchPage from "./Pages/WatchPage";

// Import navbar as it will be present on all pages
import Navbar from "./components/Navbar";

// Wrapper component to conditionally render Navbar
const AppContent = () => {
  const location = useLocation();
  const isWatchPage = location.pathname.includes('/watch');
  
  return (
    <div className="app">
      {!isWatchPage && <Navbar />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;