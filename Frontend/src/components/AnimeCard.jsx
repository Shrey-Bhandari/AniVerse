import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaPlay, FaPlus, FaStar } from "react-icons/fa";

const AnimeCard = ({ anime, onCardClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Map your AnimeData structure to match the expected props
  const mappedAnime = {
    title: anime.name,
    imageUrl: anime.image,
    rating: anime.rate,
    type: anime.category,
    episodes: Math.floor(Math.random() * 12) + 1, // Example: Random episode count
    year: anime.year,
    isNew: parseInt(anime.year) >= 2020, // Mark as "NEW" if year >= 2020
  };

  return (
    <CardContainer
      onClick={() => onCardClick(anime)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ImageContainer>
        <AnimeImage src={mappedAnime.imageUrl} alt={mappedAnime.title} />

        {isHovered && (
          <HoverOverlay>
            <TopBadges>
              {mappedAnime.isNew && <NewBadge>NEW</NewBadge>}
              <RatingBadge>
                <FaStar /> {mappedAnime.rating}
              </RatingBadge>
            </TopBadges>

            <HoverContent>
              <ActionButtons>
                <PlayButton>
                  <FaPlay />
                </PlayButton>
                <AddButton>
                  <FaPlus />
                </AddButton>
              </ActionButtons>

              <AnimeTitle>{mappedAnime.title}</AnimeTitle>
              <AnimeDetails>
                <DetailItem>{mappedAnime.type}</DetailItem>
                <DetailItem>{mappedAnime.episodes} eps</DetailItem>
                <DetailItem>{mappedAnime.year}</DetailItem>
              </AnimeDetails>
            </HoverContent>
          </HoverOverlay>
        )}
      </ImageContainer>

      {!isHovered && (
        <CardFooter>
          <FooterTitle>{mappedAnime.title}</FooterTitle>
          <FooterRating>
            <FaStar color="#FFD700" /> {mappedAnime.rating}
          </FooterRating>
        </CardFooter>
      )}
    </CardContainer>
  );
};

// Animations
const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `;

const slideUp = keyframes`
    from { transform: translateY(10px); }
    to { transform: translateY(0); }
  `;

// Styled Components
const CardContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2/3;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.05) translateY(-5px);
    z-index: 10;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const AnimeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${CardContainer}:hover & {
    transform: scale(1.1);
  }
`;

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5));
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  animation: ${fadeIn} 0.3s ease;
`;

const TopBadges = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
`;

const Badge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const NewBadge = styled(Badge)`
  background-color: #ff5722;
  color: white;
`;

const RatingBadge = styled(Badge)`
  background-color: rgba(0, 0, 0, 0.7);
  color: #ffd700;
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

const HoverContent = styled.div`
  animation: ${slideUp} 0.3s ease;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1rem;
`;

const ActionButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const PlayButton = styled(ActionButton)`
  background-color: #ff5722;
  color: white;

  &:hover {
    background-color: #ff7043;
    transform: scale(1.1);
  }
`;

const AddButton = styled(ActionButton)`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const AnimeTitle = styled.h3`
  color: white;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AnimeDetails = styled.div`
  display: flex;
  gap: 0.8rem;
  color: #aaa;
  font-size: 0.8rem;
`;

const DetailItem = styled.span`
  &:not(:last-child)::after {
    content: "•";
    margin-left: 0.8rem;
  }
`;

const CardFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.8rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
`;

const FooterTitle = styled.div`
  color: white;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FooterRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #ffd700;
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;

export default AnimeCard;
