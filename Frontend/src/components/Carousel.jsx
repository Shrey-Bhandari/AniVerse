import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes, css } from "styled-components";
import { FaPlay, FaChevronLeft, FaChevronRight, FaPlus, FaInfoCircle } from "react-icons/fa";
import image1a from "../assets/images/1a.jpeg";
import { Link } from 'react-router-dom';
import { AnimeContext } from "../Context/AnimeContext";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState("next");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { selectAnime } = useContext(AnimeContext);

  // Ensure items exist before proceeding
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

  // Auto-rotate every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && !isTransitioning) {
        goToNext();
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, isTransitioning]);

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection("prev");
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500); // Match animation duration
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection("next");
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500); // Match animation duration
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setDirection(index > currentIndex ? "next" : "prev");
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500); // Match animation duration
  };

  const handleWatchNow = (item) => {
    // Convert the carousel item to an anime object for the context
    const animeObject = {
      id: item.id || item.title.toLowerCase().replace(/\s+/g, '-'),
      title: item.title,
      rating: item.rating,
      imageUrl: item.imageUrl,
      description: item.description,
      episodes: 13, // Default value
      year: 2023, // Default value
      type: "TV", // Default value
      youtubeId: item.videoId || "XLFA7MWzYac" // Default fallback 
    };
    
    // Update the context with the selected anime
    selectAnime(animeObject);
  };

  const currentItem = enhancedItems[currentIndex];

  return (
    <CarouselContainer
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <SlideContainer
        bgImage={currentItem.imageUrl}
        direction={direction}
        $isTransitioning={isTransitioning}
      >
        <SlideGradient />
        <SlideContent>
          <AnimeBadge>Featured Anime</AnimeBadge>
          <AnimeTitle>{currentItem.title}</AnimeTitle>
          <AnimeDescription>
            {currentItem.description?.substring(0, 180)}...
          </AnimeDescription>
          <ButtonGroup>
            <Link to={currentItem.linkTo || `/watch/${currentItem.id || currentItem.title.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => handleWatchNow(currentItem)}>
              <WatchButton>
                <FaPlay /> WATCH NOW
              </WatchButton>
            </Link>
            <SecondaryButton>
              <FaInfoCircle /> DETAILS
            </SecondaryButton>
            <AddButton>
              <FaPlus />
            </AddButton>
          </ButtonGroup>
          <MetaInfo>
            <MetaBadge>HD</MetaBadge>
            <MetaBadge>{currentItem.rating}</MetaBadge>
            <MetaBadge accent>2023</MetaBadge>
          </MetaInfo>
        </SlideContent>
      </SlideContainer>

      <Navigation>
        <NavButton prev onClick={goToPrev} aria-label="Previous slide">
          <FaChevronLeft />
        </NavButton>
        <NavButton next onClick={goToNext} aria-label="Next slide">
          <FaChevronRight />
        </NavButton>
      </Navigation>

      <Pagination>
        {enhancedItems.map((_, index) => (
          <PaginationDot
            key={index}
            $active={index === currentIndex}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </Pagination>
      
      <ProgressBar>
        <Progress $duration={6} $active={!isPaused && !isTransitioning} key={currentIndex} />
      </ProgressBar>
    </CarouselContainer>
  );
};

// Animations
const slideInNext = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInPrev = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const progressAnimation = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const FallbackMessage = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #121212;
  color: #e0e0e0;
  font-size: 1.2rem;
  border-radius: 12px;
  border: 1px dashed #333;
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  background-color: #000;
  
  @media (max-width: 768px) {
    height: 400px;
  }
`;

const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-image: ${(props) => `url(${props.bgImage})`};
  background-size: cover;
  background-position: center;
  animation: ${(props) => {
    if (props.$isTransitioning) {
      return props.direction === "next" 
        ? css`${slideInNext} 0.5s ease forwards`
        : css`${slideInPrev} 0.5s ease forwards`;
    }
    return 'none';
  }};
`;

const SlideGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 30%,
    rgba(0, 0, 0, 0.4) 60%,
    rgba(0, 0, 0, 0.1) 100%
  );
`;

const SlideContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 7%;
  color: white;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 0 5%;
  }
`;

const AnimeBadge = styled.div`
  display: inline-block;
  background: #ff3333;
  color: white;
  padding: 5px 10px;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 4px;
  margin-bottom: 1rem;
  animation: ${fadeIn} 0.3s ease 0.1s both;
`;

const AnimeTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  margin: 0 0 1rem;
  background: linear-gradient(to right, #fff, #ccc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 30px rgba(0, 0, 0, 0.7);
  animation: ${fadeIn} 0.3s ease 0.2s both;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const AnimeDescription = styled.p`
  max-width: 600px;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0 0 2rem;
  color: #e0e0e0;
  animation: ${fadeIn} 0.3s ease 0.3s both;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    max-width: 100%;
    margin-bottom: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.3s ease 0.4s both;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
`;

const WatchButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 2rem;
  background: linear-gradient(90deg, #ff3333, #ff5555);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 51, 51, 0.4);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(255, 51, 51, 0.6);
    animation: ${pulse} 1s infinite;
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const SecondaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const AddButton = styled.button`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 51, 51, 0.3);
    transform: rotate(90deg);
  }
  
  @media (max-width: 768px) {
    width: 38px;
    height: 38px;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 1rem;
  animation: ${fadeIn} 0.3s ease 0.5s both;
`;

const MetaBadge = styled.div`
  padding: 5px 10px;
  background: ${props => props.accent ? 'rgba(255, 51, 51, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.accent ? '#ff5555' : 'white'};
  border: 1px solid ${props => props.accent ? 'rgba(255, 51, 51, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 4px;
  font-size: 0.85rem;
`;

const Navigation = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 2;
  pointer-events: none;
`;

const NavButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
  
  &:hover {
    background-color: rgba(255, 51, 51, 0.7);
    border-color: rgba(255, 255, 255, 0.5);
    transform: ${props => props.prev ? 'translateX(-5px)' : 'translateX(5px)'} scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const Pagination = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
`;

const PaginationDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.$active ? '#ff3333' : 'rgba(255, 255, 255, 0.3)'};
  border: 2px solid ${(props) => props.$active ? '#ff3333' : 'rgba(255, 255, 255, 0.2)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${(props) => props.$active ? '#ff5555' : 'rgba(255, 255, 255, 0.5)'};
    transform: scale(1.2);
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: 2;
`;

const Progress = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #ff3333, #ff5555);
  animation: ${props => props.$active ? css`${progressAnimation} ${props.$duration}s linear` : 'none'};
  animation-play-state: ${props => props.$active ? 'running' : 'paused'};
`;

export default Carousel;
