import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Ensure items exist before rendering
  if (!items || items.length === 0) {
    return <FallbackMessage>No items available</FallbackMessage>;
  }

  // Auto-rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        goToNext();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <CarouselContainer
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <SlideContainer bgImage={items[currentIndex]?.imageUrl}>
        <SlideContent>
          <AnimeTitle>{items[currentIndex]?.title}</AnimeTitle>
          <AnimeDescription>
            {items[currentIndex]?.description?.substring(0, 150)}...
          </AnimeDescription>
          <WatchNowButton>WATCH NOW</WatchNowButton>
        </SlideContent>
      </SlideContainer>

      <Navigation>
        <NavButton onClick={goToPrev}>
          <FaChevronLeft />
        </NavButton>
        <NavButton onClick={goToNext}>
          <FaChevronRight />
        </NavButton>
      </Navigation>

      <Pagination>
        {items.map((_, index) => (
          <PaginationDot
            key={index}
            active={index === currentIndex}
            onClick={() => goToSlide(index)}
          />
        ))}
      </Pagination>
    </CarouselContainer>
  );
};

// Styled Components
const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  min-height: 400px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
`;

const slideIn = keyframes`
  from {
    opacity: 0.6;
    transform: scale(1.02);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const SlideContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      to right,
      rgba(20, 20, 20, 0.9) 30%,
      rgba(20, 20, 20, 0.5) 100%
    ),
    url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 0 5%;
  animation: ${slideIn} 0.8s ease-out forwards;
`;

const SlideContent = styled.div`
  max-width: 50%;
  color: white;
  z-index: 2;
`;

const AnimeTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  color: #ff5722;
`;

const AnimeDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
`;

const WatchNowButton = styled.button`
  background-color: #ff5722;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff7043;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 87, 34, 0.4);
  }
`;

const Navigation = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  padding: 0 2%;
  z-index: 3;
`;

const NavButton = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 87, 34, 0.8);
    transform: scale(1.1);
  }
`;

const Pagination = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  z-index: 3;
`;

const PaginationDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? "#ff5722" : "rgba(255, 255, 255, 0.5)"};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.3);
    background-color: ${(props) => (props.active ? "#ff5722" : "white")};
  }
`;

const FallbackMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 1.5rem;
  color: #ff5722;
`;

export default Carousel;
