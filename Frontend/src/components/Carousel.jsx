import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import image1a from "../assets/images/1a.jpeg"; // Import the image

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState("next");

  // Ensure items exist before rendering
  if (!items || items.length === 0) {
    return <FallbackMessage>No items available</FallbackMessage>;
  }

  // Use the imported image for the first item if available
  const enhancedItems = items.map((item, index) => {
    if (index === 0) {
      return { ...item, imageUrl: image1a || item.imageUrl };
    }
    return item;
  });

  // Auto-rotate every 5 seconds (slower rotation)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        goToNext();
      }
    }, 5000); // Increased to 5 seconds for slower movement
    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  const goToPrev = () => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? "next" : "prev");
    setCurrentIndex(index);
  };

  return (
    <CarouselContainer
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <SlideContainer
        bgImage={enhancedItems[currentIndex]?.imageUrl}
        direction={direction}
      >
        <SlideContent>
          <AnimeTitleWrapper>
            <AnimeTitle>{enhancedItems[currentIndex]?.title}</AnimeTitle>
          </AnimeTitleWrapper>
          <AnimeDescriptionWrapper>
            <AnimeDescription>
              {enhancedItems[currentIndex]?.description?.substring(0, 150)}...
            </AnimeDescription>
          </AnimeDescriptionWrapper>
          <ButtonWrapper>
            <WatchNowButton>WATCH NOW</WatchNowButton>
          </ButtonWrapper>
        </SlideContent>
      </SlideContainer>

      <Navigation>
        <NavButton onClick={goToPrev} aria-label="Previous slide">
          <FaChevronLeft />
        </NavButton>
        <NavButton onClick={goToNext} aria-label="Next slide">
          <FaChevronRight />
        </NavButton>
      </Navigation>

      <Pagination>
        {enhancedItems.map((_, index) => (
          <PaginationDot
            key={index}
            active={index === currentIndex}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </Pagination>
    </CarouselContainer>
  );
};

// Enhanced Styled Components
const fadeInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0.6;
    transform: translateX(-5%) scale(1.05);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0.6;
    transform: translateX(5%) scale(1.05);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 70vh; /* Increased height */
  min-height: 450px;
  overflow: hidden;
  border-radius: 12px; /* Increased border radius */
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.2);
  margin: 30px auto;
  max-width: 1200px;
`;

const SlideContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      to right,
      rgba(10, 10, 10, 0.95) 20%,
      rgba(20, 20, 20, 0.7) 50%,
      rgba(20, 20, 20, 0.4) 100%
    ),
    url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 0 7%;
  animation: ${(props) =>
      props.direction === "next" ? slideInRight : slideInLeft}
    1s ease-out forwards;
  transition: all 0.8s ease-in-out;
`;

const SlideContent = styled.div`
  max-width: 55%;
  color: white;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AnimeTitleWrapper = styled.div`
  overflow: hidden;
`;

const AnimeTitle = styled.h2`
  font-size: 4rem;
  margin-bottom: 0.5rem;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.6);
  color: #ff5722;
  font-weight: 800;
  letter-spacing: 1px;
  animation: ${fadeInFromLeft} 0.8s ease-out forwards;
  animation-delay: 0.2s;
  opacity: 0;
  transform: translateX(-30px);
  background: linear-gradient(45deg, #ff5722, #ff9800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const AnimeDescriptionWrapper = styled.div`
  overflow: hidden;
`;

const AnimeDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.7;
  margin-bottom: 0.5rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9);
  animation: ${fadeInFromRight} 0.8s ease-out forwards;
  animation-delay: 0.4s;
  opacity: 0;
  transform: translateX(30px);
  font-weight: 300;
  letter-spacing: 0.5px;
`;

const ButtonWrapper = styled.div`
  overflow: hidden;
`;

const WatchNowButton = styled.button`
  background: linear-gradient(45deg, #ff5722, #ff9800);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 5px 15px rgba(255, 87, 34, 0.4);
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.8s ease-out forwards;
  animation-delay: 0.6s;
  opacity: 0;
  transform: translateY(20px);

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: all 0.6s;
  }

  &:hover {
    background: linear-gradient(45deg, #ff7043, #ffab40);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(255, 87, 34, 0.6);
    letter-spacing: 1px;
  }

  &:hover:before {
    left: 100%;
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(255, 87, 34, 0.4);
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
  opacity: 0.6;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const NavButton = styled.button`
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: rgba(255, 87, 34, 0.9);
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(255, 87, 34, 0.5);
  }
`;

const Pagination = styled.div`
  position: absolute;
  bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 12px;
  z-index: 3;
`;

const PaginationDot = styled.div`
  width: ${(props) => (props.active ? "16px" : "12px")};
  height: ${(props) => (props.active ? "16px" : "12px")};
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? "#ff5722" : "rgba(255, 255, 255, 0.5)"};
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  ${(props) =>
    props.active &&
    css`
      animation: ${pulse} 2s infinite ease-in-out;
    `}

  &:hover {
    transform: scale(1.3);
    background-color: ${(props) => (props.active ? "#ff5722" : "white")};
  }
`;

const FallbackMessage = styled.div`
  text-align: center;
  padding: 30px;
  font-size: 1.8rem;
  color: #ff5722;
  background: linear-gradient(45deg, #f5f5f5, #e0e0e0);
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

export default Carousel;
