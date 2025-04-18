import React from "react";
import Sidebar from "../components/Sidebar";
import AnimeList from "../components/AnimeList";
import Carousel from "../components/Carousel";

function HomePage() {
  // Carousel items with proper data for each anime
  const carouselItems = [
    
    {
      id: "one-piece",
      title: "One Piece",
      description: "Follow Monkey D. Luffy and his swashbuckling crew in their search for the ultimate treasure, the One Piece, as they journey across a world of pirates, islands, and monsters on the Grand Line.",
      imageUrl: "https://4kwallpapers.com/images/wallpapers/one-piece-gear-5-luffy-3840x2160-12504.png",
      rating: 9.7,
      linkTo: "/watch/one-piece",
      videoId: "JYKbdHzAXRk"
    },
    {
      id: "solo-leveling",
      title: "Solo Leveling",
      description: "In a world where hunters with special abilities battle dangerous monsters to protect humanity, Sung Jin-Woo is the weakest of all hunters—until a mysterious System grants him the power to level up.",
      imageUrl: "https://4kwallpapers.com/images/wallpapers/sung-jinwoo-dragon-2560x1440-15351.jpg",
      rating: 9.5,
      linkTo: "/watch/solo-leveling",
      videoId: "XLFA7MWzYac"
    },
    {
      id: "attack-on-titan",
      title: "Attack on Titan",
      description: "In a world where humanity lives within cities surrounded by enormous walls due to the Titans, giant humanoid beings who devour humans seemingly without reason, Eren Yeager vows to reclaim the world.",
      imageUrl: "https://wallpapercat.com/w/full/1/7/0/25940-3840x2160-desktop-4k-attack-on-titan-the-final-season-wallpaper-image.jpg",
      rating: 9.4,
      linkTo: "/watch/attack-on-titan",
      videoId: "M_OauHnAFc8"
    },
    {
      id: "demon-slayer",
      title: "Demon Slayer",
      description: "After his family was brutally murdered and his sister turned into a demon, Tanjiro Kamado embarks on a journey to become a demon slayer and find a cure for his sister.",
      imageUrl: "https://wallpapers.com/images/featured/demon-slayer-4k-pictures-5v5lz47uso2tx2kr.jpg",
      rating: 9.3,
      linkTo: "/watch/demon-slayer",
      videoId: "VQGCKyvzIM4"
    }
  ];

  // Mock data for anime cards
  const mockAnime = {
    id: 1,
    title: "Attack on Titan",
    imageUrl: "https://via.placeholder.com/300x450?text=Anime+Poster",
    rating: 9.1,
    type: "TV",
    episodes: 16,
    year: 2023,
    isNew: true,
    youtubeId: "M_OauHnAFc8"
  };

  return (
    <div className="home-page">
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