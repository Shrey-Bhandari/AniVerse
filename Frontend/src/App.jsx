import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

// Import pages
import HomePage from "./Pages/HomePage";
import WatchPage from "./Pages/WatchPage";
import ProfilePage from "./Pages/ProfilePage";
import NotFoundPage from "./Pages/NotFoundPage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import GenrePage from "./Pages/GenrePage";
import AnimeDetailsPage from "./Pages/AnimeDetailsPage";

// Import navbar as it will be present on most pages
import Navbar from "./components/Navbar";
import { AnimeProvider } from "./Context/AnimeContext";

// Component to conditionally render navbar
const AppContent = () => {
  const location = useLocation();
  const isWatchPage = location.pathname.includes('/watch');
  
  return (
    <div className="app">
      {!isWatchPage && <Navbar />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/genre/:genreName" element={<GenrePage />} />
        <Route path="/anime/:id" element={<AnimeDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

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
<<<<<<< HEAD
    <AnimeProvider>
      <Router>
        <AppContent />
      </Router>
    </AnimeProvider>
=======
    <Router>
      <AppContent />
    </Router>
>>>>>>> e4fd799667452bdb6e5647939e4b119d8350288d
  );
}

export default App;