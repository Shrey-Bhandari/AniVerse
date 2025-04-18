import React from "react";
import "./App.css";

// Import all your components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AnimeCard from "./components/AnimeCard";
import AnimeList from "./components/AnimeList";
import Carousel from "./components/Carousel";
import ProfileCard from "./components/ProfileCard";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  // Temporary mock data for demonstration
  const mockAnime = {
    id: 1,
    title: "Attack on Titan",
    imageUrl: "https://via.placeholder.com/300x450?text=Anime+Poster",
    rating: 9.1,
    type: "TV",
    episodes: 16,
    year: 2023,
    isNew: true,
  };

  const mockUser = {
    username: "AnimeFan123",
    email: "user@example.com",
    avatar: "https://via.placeholder.com/150?text=User",
    stats: {
      watched: 156,
      watchlist: 24,
      favorites: 12,
    },
  };

  return (
    <div className="app">
      {/* Show all components for visualization */}
      <Navbar />

      <div className="layout">
        <Sidebar />

        <main className="main-content">
          <h1>AniVerse Components Demo</h1>

          <section className="component-section">
            <h2>Carousel</h2>
            <Carousel />
          </section>

          <section className="component-section">
            <h2>AnimeCard</h2>
            <AnimeCard
              anime={mockAnime}
              onCardClick={() => console.log("Card clicked")}
            />
          </section>

          <section className="component-section">
            <h2>AnimeList</h2>
            <AnimeList
              title="Popular Anime"
              animes={[mockAnime, mockAnime, mockAnime]}
            />
          </section>

          <section className="component-section">
            <h2>VideoPlayer</h2>
            <VideoPlayer 
              youtubeId="https://youtu.be/dQw4w9WgXcQ?si=Dopk1_PqRJaqf9m0" 
              
/>
          </section>

          <section className="component-section">
            <h2>ProfileCard</h2>
            <ProfileCard user={mockUser} />
          </section>
        </main>
      </div>
    </div>
  );
}



export default App;
