import React from "react";
import Sidebar from "../components/Sidebar";
import AnimeList from "../components/AnimeList";
import Carousel from "../components/Carousel";

function HomePage() {
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
    description: "In a world where humanity lives within cities surrounded by enormous walls due to the Titans, giant humanoid beings who devour humans seemingly without reason."
  };
  
  // Create carousel items with proper structure
  // Better placeholder images
  const carouselItems = [
    {
      id: 1,
      title: "One Piece",
      description: "Follow Monkey D. Luffy and his swashbuckling crew in their search for the ultimate treasure, the One Piece, as they journey across a world of pirates, islands, and monsters on the Grand Line.",
      imageUrl: "https://via.placeholder.com/1200x600/0066cc/ffffff?text=One+Piece",
      rating: 9.7,
      linkTo: "/watch/one-piece"
    },
    {
      id: 2,
      title: "Solo Leveling",
      description: "In a world where hunters with special abilities battle dangerous monsters to protect humanity, Sung Jin-Woo is the weakest of all hunters—until a mysterious System grants him the power to level up.",
      imageUrl: "https://images6.alphacoders.com/137/1372163.jpeg",
      rating: 9.5,
      linkTo: "/watch/solo-leveling"
    },
    {
      id: 3,
      title: "Attack on Titan",
      description: "In a world where humanity lives within cities surrounded by enormous walls due to the Titans, giant humanoid beings who devour humans seemingly without reason, Eren Yeager vows to reclaim the world.",
      imageUrl: "https://wallpapercat.com/w/full/1/7/0/25940-3840x2160-desktop-4k-attack-on-titan-the-final-season-wallpaper-image.jpg",
      rating: 9.4,
      linkTo: "/watch/attack-on-titan"
    },
    {
      id: 4,
      title: "Demon Slayer",
      description: "After his family was brutally murdered and his sister turned into a demon, Tanjiro Kamado embarks on a journey to become a demon slayer and find a cure for his sister.",
      imageUrl: "https://wallpapers.com/images/featured/demon-slayer-4k-pictures-5v5lz47uso2tx2kr.jpg",
      rating: 9.3,
      linkTo: "/watch/demon-slayer"
    }
  ];
  return (
    <div className="layout">
      <Sidebar />
      
      <main className="main-content">
        <section className="hero-section">
          <Carousel items={carouselItems} />
        </section>
        
        <section className="anime-section">
          <AnimeList
            title="Trending Now"
            animes={[mockAnime, {...mockAnime, id: 2, title: "Demon Slayer"}, {...mockAnime, id: 3, title: "My Hero Academia"}, {...mockAnime, id: 4, title: "Jujutsu Kaisen"}]}
          />
        </section>
        
        <section className="anime-section">
          <AnimeList
            title="New Releases"
            animes={[{...mockAnime, id: 5, title: "Chainsaw Man"}, {...mockAnime, id: 6, title: "Blue Lock"}, {...mockAnime, id: 7, title: "Spy x Family"}, {...mockAnime, id: 8, title: "Tokyo Revengers"}]}
          />
        </section>
        
        <section className="anime-section">
          <AnimeList
            title="Popular This Season"
            animes={[{...mockAnime, id: 9, title: "Solo Leveling"}, {...mockAnime, id: 10, title: "Boruto"}, {...mockAnime, id: 11, title: "One Piece"}, {...mockAnime, id: 12, title: "Naruto"}]}
          />
        </section>
        
        <section className="anime-section">
          <AnimeList
            title="All Time Favorites"
            animes={[{...mockAnime, id: 13, title: "Fullmetal Alchemist"}, {...mockAnime, id: 14, title: "Death Note"}, {...mockAnime, id: 15, title: "Hunter x Hunter"}, {...mockAnime, id: 16, title: "Steins;Gate"}]}
          />
        </section>
      </main>
    </div>
  );
}

export default HomePage;