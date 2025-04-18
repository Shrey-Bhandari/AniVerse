import React from "react";
import styled, { keyframes } from "styled-components";
import AnimeCard from "./AnimeCard";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const AnimeList = ({ title, animes, showViewMore = true }) => {
  const scrollLeft = () => {
    const container = document.getElementById(`anime-list-${title.replace(/\s+/g, '-')}`);
    if (container) {
      container.scrollBy({ left: -600, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById(`anime-list-${title.replace(/\s+/g, '-')}`);
    if (container) {
      container.scrollBy({ left: 600, behavior: "smooth" });
    }
  };

  return (
    <ListContainer>
      <ListHeader>
        <ListTitle>{title}</ListTitle>
        {showViewMore && <ViewMoreButton>View More</ViewMoreButton>}
      </ListHeader>
      
      <ListContentWrapper>
        <ScrollButton left onClick={scrollLeft}>
          <FaChevronLeft />
        </ScrollButton>
        
        <ListContent id={`anime-list-${title.replace(/\s+/g, '-')}`}>
          {animes && animes.length > 0 ? (
            animes.map((anime, index) => (
              <AnimeCard 
                key={anime.id || index} 
                anime={anime} 
                showProgress={title === "Continue Watching"}
                showCheckmark={title === "Completed Series"}
              />
            ))
          ) : (
            <EmptyMessage>No anime found in this category</EmptyMessage>
          )}
        </ListContent>
        
        <ScrollButton right onClick={scrollRight}>
          <FaChevronRight />
        </ScrollButton>
      </ListContentWrapper>
    </ListContainer>
  );
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styled Components
const ListContainer = styled.div`
  margin-bottom: 40px;
  animation: ${fadeIn} 0.5s ease;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(255, 51, 51, 0.3);
`;

const ListTitle = styled.h2`
  font-size: 1.5rem;
  color: #ffffff;
  position: relative;
  padding-left: 15px;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background: linear-gradient(to bottom, #ff3333, #ff5555);
    border-radius: 2px;
  }
`;

const ViewMoreButton = styled.button`
  background: none;
  border: none;
  color: #ff3333;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: #ff3333;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #ff5555;
    transform: translateX(5px);
    
    &:after {
      width: 100%;
    }
  }
`;

const ListContentWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ListContent = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 1rem 0;
  scroll-behavior: smooth;
  
  /* Hide scrollbar but keep functionality */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  
  /* Space between items */
  & > div {
    margin-right: 15px;
  }
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  ${props => props.left ? 'left: -20px;' : 'right: -20px;'}
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(20, 20, 20, 0.8);
  color: white;
  border: 2px solid rgba(255, 51, 51, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  opacity: 0.7;
  
  &:hover {
    background: rgba(255, 51, 51, 0.8);
    opacity: 1;
    transform: translateY(-50%) ${props => props.left ? 'translateX(-5px)' : 'translateX(5px)'};
  }
`;

const EmptyMessage = styled.div`
  width: 100%;
  padding: 3rem;
  text-align: center;
  color: #b3b3b3;
  background: linear-gradient(90deg, rgba(30, 30, 30, 0) 0%, rgba(30, 30, 30, 0.5) 50%, rgba(30, 30, 30, 0) 100%);
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 8px;
`;

export default AnimeList;