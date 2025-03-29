// AnimeContext.js
import { createContext, useState } from "react";

export const AnimeContext = createContext();

export const AnimeProvider = ({ children }) => {
  const [currentAnime, setCurrentAnime] = useState(null);

  return (
    <AnimeContext.Provider value={{ currentAnime, setCurrentAnime }}>
      {children}
    </AnimeContext.Provider>
  );
};
