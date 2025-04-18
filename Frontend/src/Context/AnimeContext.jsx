import React, { createContext, useState } from "react";

export const AnimeContext = createContext();

export const AnimeProvider = ({ children }) => {
  const [currentAnime, setCurrentAnime] = useState(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("https://www.youtube.com/watch?v=XLFA7MWzYac");

  const selectAnime = (anime) => {
    setCurrentAnime(anime);
    setCurrentVideoUrl(`https://www.youtube.com/watch?v=${anime.youtubeId || "XLFA7MWzYac"}`);
  };

  return (
    <AnimeContext.Provider value={{ 
      currentAnime, 
      currentVideoUrl, 
      selectAnime,
      setCurrentVideoUrl 
    }}>
      {children}
    </AnimeContext.Provider>
  );
};