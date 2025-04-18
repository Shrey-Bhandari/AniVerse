import React, { useState, useContext } from "react";
import styled, { keyframes, css } from "styled-components";
import { FaPlay, FaPlus, FaStar, FaCheck, FaEllipsisH } from "react-icons/fa";
import backgroundImage from "../assets/images/1.jpg"; 
import { useNavigate } from "react-router-dom";
import { AnimeContext } from "../Context/AnimeContext";

const AnimeCard = ({ anime, showProgress, showCheckmark, showAddButton }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { selectAnime } = useContext(AnimeContext);
  
  // Map anime data to expected props with defaults
  const mappedAnime = {
    id: anime.id || anime.name || "solo-leveling",
    title: anime.name || anime.title || "Solo Leveling",
    imageUrl: anime.image || anime.imageUrl,
    rating: anime.rate || anime.rating || 9.5,
    type: anime.category || anime.type || "TV",
    episodes: anime.episodes || Math.floor(Math.random() * 12) + 1,
    year: anime.year || 2023,
    isNew: parseInt(anime.year || "2023") >= 2020,
    youtubeId: anime.video || anime.youtubeId || "XLFA7MWzYac" // Default fallback
  };

  const handleCardClick = () => {
    // Save selected anime to context
    selectAnime(mappedAnime);
    // Navigate to watch page
    navigate(`/watch/${mappedAnime.id}`);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <CardContainer
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsMenuOpen(false);
      }}
    >
      {/* Episode Progress */}
      {showProgress && (
        <Progress>
          <ProgressBar width={66} />
          <ProgressText>EP 8/12</ProgressText>
        </Progress>
      )}
      
      {/* Completion Mark */}
      {showCheckmark && (
        <CompleteBadge>
          <FaCheck /> Complete
        </CompleteBadge>
      )}
      
      <CardPoster src={mappedAnime.imageUrl || backgroundImage} alt={mappedAnime.title} />
      
      {/* Card Overlays */}
      <CardGradient $isHovered={isHovered} />
      
      <CardOverlay $isHovered={isHovered}>
        <OverlayTop>
          <TypeBadge>{mappedAnime.type}</TypeBadge>
          <CardMenu>
            <MoreButton onClick={toggleMenu}>
              <FaEllipsisH />
            </MoreButton>
            {isMenuOpen && (
              <MenuDropdown onClick={(e) => e.stopPropagation()}>
                <MenuItem>Add to List</MenuItem>
                <MenuItem>Add to Favorites</MenuItem>
                <MenuItem>Share</MenuItem>
              </MenuDropdown>
            )}
          </CardMenu>
        </OverlayTop>
        
        <CardActions>
          <ActionButton primary>
            <FaPlay />
            <ButtonText>Play</ButtonText>
          </ActionButton>
          {showAddButton ? (
            <ActionButton>
              <FaPlus />
            </ActionButton>
          ) : (
            <WatchlistButton added={anime.inWatchlist}>
              <FaPlus />
            </WatchlistButton>
          )}
        </CardActions>
        
        <CardInfo>
          <RatingContainer>
            <FaStar className="star-icon" />
            <RatingText>{mappedAnime.rating}</RatingText>
          </RatingContainer>
          
          <MetaInfo>
            <span>{mappedAnime.year}</span>
            <Dot />
            <span>{mappedAnime.episodes} EP</span>
          </MetaInfo>
          
          {mappedAnime.isNew && <NewBadge>NEW</NewBadge>}
        </CardInfo>
      </CardOverlay>
      
      <TitleContainer>
        <Title>{mappedAnime.title}</Title>
      </TitleContainer>
    </CardContainer>
  );
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const glowingEffect = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 51, 51, 0.5); }
  50% { box-shadow: 0 0 20px rgba(255, 51, 51, 0.8); }
  100% { box-shadow: 0 0 5px rgba(255, 51, 51, 0.5); }
`;

// Styled Components
const CardContainer = styled.div`
  position: relative;
  width: 100%;
  min-width: 160px;
  max-width: 240px;
  height: 320px;
  margin: 10px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #181818;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.7);
  }
`;

const CardPoster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${CardContainer}:hover & {
    transform: scale(1.1);
  }
`;

const CardGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 0) 100%);
  opacity: ${({ $isHovered }) => ($isHovered ? 1 : 0.7)};
  transition: all 0.3s ease;
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  opacity: ${({ $isHovered }) => ($isHovered ? 1 : 0.8)};
  transition: all 0.3s ease;
`;

const OverlayTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TypeBadge = styled.div`
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #ff3333;
  font-size: 0.7rem;
  font-weight: bold;
  border-radius: 3px;
  border: 1px solid rgba(255, 51, 51, 0.3);
`;

const CardMenu = styled.div`
  position: relative;
`;

const MoreButton = styled.button`
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 51, 51, 0.5);
    transform: rotate(90deg);
  }
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(20, 20, 20, 0.95);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  padding: 5px 0;
  margin-top: 5px;
  width: 150px;
  z-index: 10;
  animation: ${fadeIn} 0.2s ease;
  
  &:before {
    content: '';
    position: absolute;
    top: -5px;
    right: 10px;
    width: 10px;
    height: 10px;
    background: rgba(20, 20, 20, 0.95);
    transform: rotate(45deg);
  }
`;

const MenuItem = styled.div`
  padding: 8px 15px;
  color: #e0e0e0;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 51, 51, 0.2);
    color: #ff3333;
    padding-left: 20px;
  }
`;

const CardActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: auto;
  margin-bottom: 10px;
  transition: transform 0.3s ease;
  animation: ${slideUp} 0.3s ease;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${(props) => (props.primary ? '8px 20px' : '8px')};
  background-color: ${(props) => (props.primary ? '#ff3333' : 'rgba(255, 255, 255, 0.15)')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${(props) => (props.primary ? '#ff5555' : 'rgba(255, 255, 255, 0.25)')};
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ButtonText = styled.span`
  font-weight: bold;
  font-size: 0.9rem;
`;

const WatchlistButton = styled(ActionButton)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ added }) => (added ? '#ff3333' : 'rgba(255, 255, 255, 0.15)')};
  
  ${({ added }) => added && css`
    animation: ${pulse} 0.3s ease-in-out;
  `}

  &:hover {
    background-color: ${({ added }) => (added ? '#ff5555' : 'rgba(255, 255, 255, 0.25)')};
  }
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  
  .star-icon {
    color: gold;
  }
`;

const RatingText = styled.span`
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #e0e0e0;
  font-size: 0.8rem;
`;

const Dot = styled.div`
  width: 3px;
  height: 3px;
  background-color: #e0e0e0;
  border-radius: 50%;
`;

const NewBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #ff3333;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 3px 6px;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(255, 51, 51, 0.5);
  animation: ${glowingEffect} 2s infinite;
`;

const TitleContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: rgba(0, 0, 0, 0.8);
  transform: translateY(100%);
  transition: transform 0.3s ease;
  
  ${CardContainer}:hover & {
    transform: translateY(0);
  }
`;

const Title = styled.h3`
  margin: 0;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Progress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px;
  background: rgba(0, 0, 0, 0.8);
  z-index: 5;
`;

const ProgressBar = styled.div`
  height: 4px;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.width}%;
    background: linear-gradient(90deg, #ff3333, #ff5555);
  }
`;

const ProgressText = styled.div`
  color: #e0e0e0;
  font-size: 0.8rem;
  margin-top: 4px;
  text-align: center;
`;

const CompleteBadge = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background: linear-gradient(90deg, #4CAF50, #8BC34A);
  color: white;
  padding: 5px 8px;
  border-radius: 3px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 5px;
  z-index: 5;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.5);
`;

export default AnimeCard;
