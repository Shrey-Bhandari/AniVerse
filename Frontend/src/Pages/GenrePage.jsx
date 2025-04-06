import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaChevronLeft, FaSearch, FaFilter } from "react-icons/fa";
import AnimeData from "../data/AnimeData";
import CategoriesData from "../data/CategoriesData";
import AnimeCard from "../components/AnimeCard";

const GenrePage = () => {
  const { genreName } = useParams();
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAnime, setFilteredAnime] = useState([]);

  // Find genre details from CategoriesData
  const genre = CategoriesData.find((cat) => cat.title === genreName) || {
    title: genreName,
    _id: "custom",
  };

  // Filter and sort anime
  useEffect(() => {
    let results = AnimeData.filter(
      (anime) =>
        anime.category === genreName &&
        anime.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort results
    switch (sortOption) {
      case "newest":
        results.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        break;
      case "rating":
        results.sort((a, b) => b.rate - a.rate);
        break;
      default: // 'popular'
        results.sort((a, b) => b.reviews - a.reviews);
    }

    setFilteredAnime(results);
  }, [genreName, searchQuery, sortOption]);

  return (
    <GenreContainer>
      {/* Genre Header */}
      <GenreHeader>
        <BackButton onClick={() => navigate(-1)}>
          <FaChevronLeft /> Back
        </BackButton>
        <GenreTitle>{genre.title} Anime</GenreTitle>
      </GenreHeader>

      {/* Search and Filter Bar */}
      <ActionBar>
        <SearchContainer>
          <FaSearch />
          <SearchInput
            type="text"
            placeholder={`Search ${genre.title} anime...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>

        <FilterContainer>
          <FaFilter />
          <FilterSelect
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
          </FilterSelect>
        </FilterContainer>
      </ActionBar>

      {/* Results Count */}
      <ResultsCount>
        {filteredAnime.length} {genre.title} anime found
      </ResultsCount>

      {/* Anime Grid */}
      {filteredAnime.length > 0 ? (
        <AnimeGrid>
          {filteredAnime.map((anime) => (
            <AnimeCard key={anime.name} anime={anime} />
          ))}
        </AnimeGrid>
      ) : (
        <NoResults>
          <h3>No {genre.title} anime found</h3>
          <p>Try adjusting your search or filter</p>
        </NoResults>
      )}

      {/* Related Genres */}
      <RelatedGenres>
        <h3>More Like {genre.title}</h3>
        <GenreTags>
          {CategoriesData.filter(
            (cat) =>
              cat.title !== genreName &&
              !["All", "Trending"].includes(cat.title)
          )
            .slice(0, 6)
            .map((category) => (
              <GenreTag
                key={category._id}
                onClick={() => navigate(`/genre/${category.title}`)}
              >
                {category.title}
              </GenreTag>
            ))}
        </GenreTags>
      </RelatedGenres>
    </GenreContainer>
  );
};

// Styled Components
const GenreContainer = styled.div`
  padding: 2rem 5%;
  background: #0f0f12;
  color: white;
  min-height: 100vh;
`;

const GenreHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const GenreTitle = styled.h1`
  font-size: 2rem;
  margin-left: 1.5rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 50px;
    height: 3px;
    background: #ff5722;
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 0.5rem 1rem;
  flex: 2;
  max-width: 500px;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: white;
  padding: 0.5rem;
  width: 100%;
  outline: none;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 0 1rem;
`;

const FilterSelect = styled.select`
  background: transparent;
  border: none;
  color: white;
  padding: 0.5rem;
  cursor: pointer;
  outline: none;

  option {
    background: #0f0f12;
  }
`;

const ResultsCount = styled.p`
  color: #aaa;
  margin-bottom: 1.5rem;
`;

const AnimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-bottom: 3rem;

  h3 {
    color: #ff5722;
    margin-bottom: 0.5rem;
  }

  p {
    color: #aaa;
  }
`;

const RelatedGenres = styled.div`
  margin-top: 3rem;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #aaa;
  }
`;

const GenreTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const GenreTag = styled.button`
  padding: 0.5rem 1rem;
  background: rgba(255, 87, 34, 0.2);
  border: none;
  border-radius: 20px;
  color: #ff5722;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 87, 34, 0.4);
  }
`;

export default GenrePage;
