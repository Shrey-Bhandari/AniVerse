import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaPlay, FaPlus, FaStar } from "react-icons/fa";
import backgroundImage from "../assets/images/1.jpg"; // Import the background image

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
  from { transform: translateY(15px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Styled Components
const CardContainer = styled.div`
  position: relative;
  width: 180px; /* Fixed width instead of 100% */
  height: 260px; /* Fixed height with 2:3 aspect ratio */
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  margin: 10px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // background: linear-gradient(
    //   135deg,
    //   rgba(20, 30, 48, 0.6),
    //   rgba(36, 59, 85, 0.6)
    // );
    z-index: 0;
  }

  &:hover {
    transform: scale(1.03) translateY(-5px);
    z-index: 10;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`;

const AnimeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  filter: brightness(0.95);

  ${CardContainer}:hover & {
    transform: scale(1.1);
    filter: brightness(1.05);
  }
`;

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 40%,
    rgba(0, 0, 0, 0.3) 80%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0.8rem;
  animation: ${fadeIn} 0.3s ease;
  backdrop-filter: blur(1px);
  z-index: 2;
`;

const TopBadges = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  display: flex;
  justify-content: space-between;
  z-index: 3;
`;

const Badge = styled.span`
  padding: 0.2rem 0.4rem;
  border-radius: 12px;
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const NewBadge = styled(Badge)`
  background: linear-gradient(135deg, #ff512f, #dd2476);
  color: white;
`;

const RatingBadge = styled(Badge)`
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffd700;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  backdrop-filter: blur(3px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const HoverContent = styled.div`
  animation: ${slideUp} 0.4s ease;
  position: relative;
  z-index: 2;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.7rem;
  margin-bottom: 0.8rem;
`;

const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  font-size: 0.8rem;
`;

const PlayButton = styled(ActionButton)`
  background: linear-gradient(135deg, #ff512f, #dd2476);
  color: white;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 3px 8px rgba(255, 87, 34, 0.4);
    animation: ${pulseAnimation} 1s infinite;
  }
`;

const AddButton = styled(ActionButton)`
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  backdrop-filter: blur(3px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
    transform: scale(1.1);
    box-shadow: 0 3px 8px rgba(255, 255, 255, 0.2);
  }
`;

const AnimeTitle = styled.h3`
  color: white;
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
`;

const AnimeDetails = styled.div`
  display: flex;
  gap: 0.6rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.7rem;
  font-weight: 500;
`;

const DetailItem = styled.span`
  position: relative;

  &:not(:last-child)::after {
    content: "•";
    position: absolute;
    right: -0.4rem;
  }
`;

const CardFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.8rem;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  backdrop-filter: blur(1px);
  z-index: 2;
`;

const FooterTitle = styled.div`
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
`;

const FooterRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #ffd700;
  font-size: 0.7rem;
  font-weight: 500;
  margin-top: 0.2rem;
`;

export default AnimeCard;
