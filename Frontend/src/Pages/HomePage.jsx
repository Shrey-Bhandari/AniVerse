import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FaChevronRight,
  FaChevronLeft,
  FaFire,
  FaClock,
  FaStar,
} from "react-icons/fa";
import AnimeData from "../data/AnimeData";
import CategoriesData from "../data/CategoriesData";
import AnimeCard from "../components/AnimeCard";
import Carousel from "../components/Carousel";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [recentAnime, setRecentAnime] = useState([]);

  // Filter anime by category
  const filteredAnime =
    activeCategory === "All"
      ? AnimeData
      : AnimeData.filter((anime) => anime.category === activeCategory);

  // Get trending anime (sorted by rating)
  useEffect(() => {
    const sortedByRating = [...AnimeData].sort((a, b) => b.rate - a.rate);
    setTrendingAnime(sortedByRating.slice(0, 8));
  }, []);

  // Get recently added anime (sorted by year)
  useEffect(() => {
    const sortedByYear = [...AnimeData].sort((a, b) => b.year - a.year);
    setRecentAnime(sortedByYear.slice(0, 8));
  }, []);

  // Carousel items
  const carouselItems = AnimeData.slice(0, 5).map((anime) => ({
    image: anime.image,
    title: anime.name,
    description: anime.desc,
    meta: `${anime.year} • ${anime.category} • ⭐ ${anime.rate}`,
    buttonText: "Watch Now",
  }));

  return (
    <HomeContainer>
      {/* Hero Carousel */}
      <Carousel items={carouselItems} autoRotate={true} interval={5000} />

      {/* Category Filter */}
      <Section>
        <SectionTitle>
          <FaFire /> Browse Categories
        </SectionTitle>
        <CategoryFilter>
          <CategoryButton
            active={activeCategory === "All"}
            onClick={() => setActiveCategory("All")}
          >
            All
          </CategoryButton>
          {CategoriesData.map((category) => (
            <CategoryButton
              key={category._id}
              active={activeCategory === category.title}
              onClick={() => setActiveCategory(category.title)}
            >
              {category.title}
            </CategoryButton>
          ))}
        </CategoryFilter>
      </Section>

      {/* Trending Anime */}
      <Section>
        <SectionHeader>
          <SectionTitle>
            <FaFire /> Trending Now
          </SectionTitle>
          <ViewAllLink href="/trending">
            View All <FaChevronRight />
          </ViewAllLink>
        </SectionHeader>
        <AnimeGrid>
          {trendingAnime.map((anime) => (
            <AnimeCard key={anime.name} anime={anime} showTrendingBadge />
          ))}
        </AnimeGrid>
      </Section>

      {/* Recently Added */}
      <Section>
        <SectionHeader>
          <SectionTitle>
            <FaClock /> Recently Added
          </SectionTitle>
          <ViewAllLink href="/recent">
            View All <FaChevronRight />
          </ViewAllLink>
        </SectionHeader>
        <AnimeGrid>
          {recentAnime.map((anime) => (
            <AnimeCard key={anime.name} anime={anime} showNewBadge />
          ))}
        </AnimeGrid>
      </Section>

      {/* Popular Categories */}
      <Section>
        <SectionTitle>
          <FaStar /> Popular Categories
        </SectionTitle>
        <CategoryGrid>
          {[
            "Action",
            "Adventure",
            "Fantasy",
            "Romance",
            "Horror",
            "Comedy",
          ].map((cat) => (
            <CategoryTile key={cat} onClick={() => setActiveCategory(cat)}>
              <CategoryImage
                src={AnimeData.find((a) => a.category === cat)?.image}
              />
              <CategoryOverlay>
                <CategoryName>{cat}</CategoryName>
              </CategoryOverlay>
            </CategoryTile>
          ))}
        </CategoryGrid>
      </Section>
    </HomeContainer>
  );
};

// Styled Components
const HomeContainer = styled.div`
  padding-bottom: 3rem;
  background: #0f0f12;
  color: white;
`;

const Section = styled.section`
  padding: 2rem 5%;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  margin: 0;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: #ff5722;
  }
`;

const ViewAllLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #aaa;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    color: #ff5722;
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

const CategoryButton = styled.button`
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 20px;
  background: ${(props) =>
    props.active ? "#FF5722" : "rgba(255, 255, 255, 0.1)"};
  color: ${(props) => (props.active ? "white" : "#aaa")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) =>
      props.active ? "#FF5722" : "rgba(255, 255, 255, 0.2)"};
  }
`;

const AnimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const CategoryTile = styled.div`
  position: relative;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(255, 87, 34, 0.2);
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CategoryOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
`;

const CategoryName = styled.h3`
  margin: 0;
  color: white;
  font-size: 1.2rem;
`;

export default HomePage;
