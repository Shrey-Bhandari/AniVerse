import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaSearch, FaFilter, FaTimes, FaStar } from "react-icons/fa";
import AnimeData from "../data/AnimeData";
import CategoriesData from "../data/CategoriesData";
import AnimeCard from "../components/AnimeCard";

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAnime, setFilteredAnime] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "All",
    year: "All",
    rating: 0,
  });

  // Get search query from URL
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("q") || "";
    setSearchQuery(query);
    applyFilters(query, filters);
  }, [location.search]);

  // Apply all filters
  const applyFilters = (query, filterSettings) => {
    let results = AnimeData.filter(
      (anime) =>
        anime.name.toLowerCase().includes(query.toLowerCase()) ||
        anime.desc.toLowerCase().includes(query.toLowerCase())
    );

    if (filterSettings.category !== "All") {
      results = results.filter(
        (anime) => anime.category === filterSettings.category
      );
    }

    if (filterSettings.year !== "All") {
      results = results.filter((anime) => anime.year === filterSettings.year);
    }

    if (filterSettings.rating > 0) {
      results = results.filter((anime) => anime.rate >= filterSettings.rating);
    }

    setFilteredAnime(results);
  };

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    applyFilters(searchQuery, newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      category: "All",
      year: "All",
      rating: 0,
    };
    setFilters(resetFilters);
    applyFilters(searchQuery, resetFilters);
  };

  // Get unique years from anime data
  const years = [...new Set(AnimeData.map((anime) => anime.year))].sort(
    (a, b) => b - a
  );

  return (
    <SearchResultsContainer>
      {/* Search Header */}
      <SearchHeader>
        <SearchBox>
          <FaSearch />
          <SearchInput
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
            }}
            placeholder="Search for anime..."
          />
          <FilterToggle onClick={() => setShowFilters(!showFilters)}>
            <FaFilter /> Filters
          </FilterToggle>
        </SearchBox>

        {/* Filters Panel */}
        {showFilters && (
          <FiltersPanel>
            <FilterGroup>
              <FilterLabel>Category</FilterLabel>
              <FilterSelect
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
              >
                <option value="All">All Categories</option>
                {CategoriesData.map((category) => (
                  <option key={category._id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Year</FilterLabel>
              <FilterSelect
                value={filters.year}
                onChange={(e) => handleFilterChange("year", e.target.value)}
              >
                <option value="All">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Minimum Rating</FilterLabel>
              <RatingFilter>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    active={star <= filters.rating}
                    onClick={() => handleFilterChange("rating", star)}
                  >
                    <FaStar />
                  </Star>
                ))}
              </RatingFilter>
            </FilterGroup>

            <ClearFilters onClick={clearFilters}>
              <FaTimes /> Clear Filters
            </ClearFilters>
          </FiltersPanel>
        )}
      </SearchHeader>

      {/* Results Count */}
      <ResultsInfo>
        <ResultsCount>
          {filteredAnime.length}{" "}
          {filteredAnime.length === 1 ? "result" : "results"} found
          {searchQuery && ` for "${searchQuery}"`}
        </ResultsCount>
        {filters.category !== "All" ||
        filters.year !== "All" ||
        filters.rating > 0 ? (
          <ActiveFilters>
            Active filters:
            {filters.category !== "All" && (
              <FilterTag>{filters.category}</FilterTag>
            )}
            {filters.year !== "All" && <FilterTag>{filters.year}</FilterTag>}
            {filters.rating > 0 && <FilterTag>⭐ {filters.rating}+</FilterTag>}
          </ActiveFilters>
        ) : null}
      </ResultsInfo>

      {/* Results Grid */}
      {filteredAnime.length > 0 ? (
        <ResultsGrid>
          {filteredAnime.map((anime) => (
            <AnimeCard key={anime.name} anime={anime} />
          ))}
        </ResultsGrid>
      ) : (
        <NoResults>
          <h3>No anime found</h3>
          <p>Try adjusting your search or filters</p>
        </NoResults>
      )}
    </SearchResultsContainer>
  );
};

// Styled Components
const SearchResultsContainer = styled.div`
  padding: 2rem 5%;
  background: #0f0f12;
  color: white;
  min-height: 100vh;
`;

const SearchHeader = styled.div`
  margin-bottom: 2rem;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  gap: 1rem;
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  outline: none;
`;

const FilterToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 87, 34, 0.2);
  border: none;
  color: #ff5722;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 87, 34, 0.3);
  }
`;

const FiltersPanel = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const FilterGroup = styled.div`
  margin-bottom: 1rem;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #aaa;
  font-size: 0.9rem;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 4px;
  cursor: pointer;

  option {
    background: #0f0f12;
  }
`;

const RatingFilter = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Star = styled.div`
  color: ${(props) => (props.active ? "#FFD700" : "#aaa")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const ClearFilters = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  color: #aaa;
  margin-top: auto;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #ff5722;
  }
`;

const ResultsInfo = styled.div`
  margin-bottom: 1.5rem;
`;

const ResultsCount = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const ActiveFilters = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #aaa;
  font-size: 0.9rem;
`;

const FilterTag = styled.span`
  background: rgba(255, 87, 34, 0.2);
  color: #ff5722;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;

  h3 {
    color: #ff5722;
    margin-bottom: 0.5rem;
  }

  p {
    color: #aaa;
  }
`;

export default SearchResultsPage;
