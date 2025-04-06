import React from "react";
import styled from "styled-components";
import {
  FaPlay,
  FaPlus,
  FaStar,
  FaChevronDown,
  FaShareAlt,
} from "react-icons/fa";

const AnimeDetailsPage = ({ anime }) => {
  return (
    <DetailsContainer>
      {/* Hero Banner */}
      <HeroBanner bgImage={anime.image}>
        <GradientOverlay />
        <HeroContent>
          <AnimeTitle>{anime.name}</AnimeTitle>
          <MetaInfo>
            <span>{anime.year}</span>
            <span>•</span>
            <span>{anime.time}</span>
            <span>•</span>
            <span>{anime.category}</span>
          </MetaInfo>
          <Rating>
            <FaStar color="#FFD700" />
            <span>{anime.rate}</span>
            <span>({anime.reviews} reviews)</span>
          </Rating>
          <ActionButtons>
            <PrimaryButton>
              <FaPlay /> Watch Now
            </PrimaryButton>
            <SecondaryButton>
              <FaPlus /> Watchlist
            </SecondaryButton>
          </ActionButtons>
        </HeroContent>
      </HeroBanner>

      {/* Main Content */}
      <ContentWrapper>
        <LeftColumn>
          <Synopsis>
            <SectionTitle>Synopsis</SectionTitle>
            <p>{anime.desc}</p>
          </Synopsis>

          <DetailsSection>
            <DetailItem>
              <strong>Type:</strong> TV Series
            </DetailItem>
            <DetailItem>
              <strong>Studios:</strong> Studio Pierrot
            </DetailItem>
            <DetailItem>
              <strong>Status:</strong> Ongoing
            </DetailItem>
            <DetailItem>
              <strong>Age Rating:</strong> 16+
            </DetailItem>
          </DetailsSection>
        </LeftColumn>

        <RightColumn>
          <EpisodeSelector>
            <EpisodeHeader>
              <h3>Episodes</h3>
              <SelectWrapper>
                <span>Season 1</span>
                <FaChevronDown />
              </SelectWrapper>
            </EpisodeHeader>
            <EpisodeList>
              {[...Array(12)].map((_, i) => (
                <Episode key={i}>
                  <span>Episode {i + 1}</span>
                  <PlayIcon>
                    <FaPlay size={10} />
                  </PlayIcon>
                </Episode>
              ))}
            </EpisodeList>
          </EpisodeSelector>

          <ShareSection>
            <ShareButton>
              <FaShareAlt /> Share
            </ShareButton>
          </ShareSection>
        </RightColumn>
      </ContentWrapper>
    </DetailsContainer>
  );
};

// Styled Components
const DetailsContainer = styled.div`
  color: white;
  background: #0f0f12;
  min-height: 100vh;
`;

const HeroBanner = styled.div`
  position: relative;
  height: 70vh;
  background: linear-gradient(to top, #0f0f12, transparent),
    url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 0 5%;
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(to top, #0f0f12, transparent);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  padding-bottom: 3rem;
`;

const AnimeTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #aaa;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;

  span {
    margin-right: 1rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const PrimaryButton = styled(Button)`
  background: #ff5722;
  border: none;
  color: white;

  &:hover {
    background: #ff7043;
  }
`;

const SecondaryButton = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  padding: 2rem 5%;
  gap: 2rem;
`;

const LeftColumn = styled.div`
  flex: 2;
`;

const RightColumn = styled.div`
  flex: 1;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
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

const Synopsis = styled.div`
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const DetailsSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
`;

const DetailItem = styled.div`
  margin-bottom: 0.8rem;
`;

const EpisodeSelector = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
`;

const EpisodeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #aaa;
`;

const EpisodeList = styled.div`
  max-height: 500px;
  overflow-y: auto;
`;

const Episode = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const PlayIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShareSection = styled.div`
  margin-top: 1.5rem;
`;

const ShareButton = styled(Button)`
  width: 100%;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export default AnimeDetailsPage;
