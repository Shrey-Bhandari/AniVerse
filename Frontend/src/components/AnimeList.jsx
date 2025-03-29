import React, { useRef } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AnimeCard from "./AnimeCard";

const AnimeList = ({ title, animes }) => {
  const listRef = useRef(null);

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <ListContainer>
      <ListHeader>
        <ListTitle>{title}</ListTitle>
        <NavArrows>
          <NavButton onClick={scrollLeft}>
            <FaChevronLeft />
          </NavButton>
          <NavButton onClick={scrollRight}>
            <FaChevronRight />
          </NavButton>
        </NavArrows>
      </ListHeader>

      <ListContent ref={listRef}>
        {animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </ListContent>
    </ListContainer>
  );
};

// Styled Components
const ListContainer = styled.div`
  margin: 2rem 0;
  position: relative;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 1rem;
`;

const ListTitle = styled.h2`
  font-size: 1.5rem;
  color: white;
  margin: 0;
`;

const NavArrows = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const NavButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ff5722;
    transform: scale(1.1);
  }
`;

const ListContent = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding: 0 1rem;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export default AnimeList;