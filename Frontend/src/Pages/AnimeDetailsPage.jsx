import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaPlay,
  FaPlus,
  FaShareAlt,
  FaBookmark,
  FaStar,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import VideoPlayer from "../components/VideoPlayer";
import EpisodeList from "../components/EpisodeList";

const AnimeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [trailerPlaying, setTrailerPlaying] = useState(false);

  // Fetch anime details
  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        const response = await fetch(`/api/anime/${id}`);
        const data = await response.json();
        setAnime(data);
        setSelectedEpisode(data.episodes[0]); // Select first episode by default
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleEpisodeSelect = (episode) => {
    setSelectedEpisode(episode);
    setTrailerPlaying(false);
  };

  const handlePlayTrailer = () => {
    setTrailerPlaying(true);
    setSelectedEpisode(null);
  };

  if (loading) return <Loading>Loading...</Loading>;
  if (error) return <Error>Error: {error}</Error>;
  if (!anime) return <NotFound>Anime not found</NotFound>;

  return (
    <DetailsContainer>
      {/* Hero Banner */}
      <HeroBanner bgImage={anime.bannerImage}>
        <HeroOverlay />
        <HeroContent>
          <AnimePoster src={anime.posterImage} alt={anime.title} />
          <HeroInfo>
            <AnimeTitle>{anime.title}</AnimeTitle>
            <AnimeMeta>
              <MetaItem>{anime.releaseYear}</MetaItem>
              <MetaItem>{anime.rating}</MetaItem>
              <MetaItem>{anime.episodes.length} episodes</MetaItem>
              <MetaItem>{anime.duration} min/episode</MetaItem>
            </AnimeMeta>
            <GenreList>
              {anime.genres.map((genre) => (
                <GenreTag key={genre}>{genre}</GenreTag>
              ))}
            </GenreList>
            <Rating>
              <FaStar color="#FFD700" />
              <span>{anime.score}/10</span>
              <span>({anime.scoredBy} users)</span>
            </Rating>
            <ActionButtons>
              <PrimaryButton onClick={handlePlayTrailer}>
                <FaPlay /> Play Trailer
              </PrimaryButton>
              <SecondaryButton>
                <FaPlus /> Add to List
              </SecondaryButton>
              <IconButton>
                <FaShareAlt />
              </IconButton>
              <IconButton>
                <FaBookmark />
              </IconButton>
            </ActionButtons>
          </HeroInfo>
        </HeroContent>
      </HeroBanner>

      {/* Main Content */}
      <MainContent>
        <LeftColumn>
          <Section>
            <SectionTitle>Synopsis</SectionTitle>
            <Description expanded={showFullDescription}>
              {showFullDescription
                ? anime.description
                : `${anime.description.substring(0, 300)}...`}
              <ToggleDescription onClick={toggleDescription}>
                {showFullDescription ? (
                  <>
                    Show less <FaChevronUp />
                  </>
                ) : (
                  <>
                    Read more <FaChevronDown />
                  </>
                )}
              </ToggleDescription>
            </Description>
          </Section>

          <Section>
            <SectionTitle>Characters</SectionTitle>
            <CharacterGrid>
              {anime.characters.slice(0, 6).map((character) => (
                <CharacterCard key={character.id}>
                  <CharacterImage src={character.image} alt={character.name} />
                  <CharacterName>{character.name}</CharacterName>
                  <CharacterRole>{character.role}</CharacterRole>
                </CharacterCard>
              ))}
            </CharacterGrid>
          </Section>
        </LeftColumn>

        <RightColumn>
          <Section>
            <SectionTitle>Details</SectionTitle>
            <InfoTable>
              <InfoRow>
                <InfoLabel>Type:</InfoLabel>
                <InfoValue>{anime.type}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Status:</InfoLabel>
                <InfoValue>{anime.status}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Studios:</InfoLabel>
                <InfoValue>{anime.studios.join(", ")}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Source:</InfoLabel>
                <InfoValue>{anime.source}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Age Rating:</InfoLabel>
                <InfoValue>{anime.ageRating}</InfoValue>
              </InfoRow>
            </InfoTable>
          </Section>

          <Section>
            <SectionTitle>Recommendations</SectionTitle>
            <RecommendationGrid>
              {anime.recommendations.slice(0, 4).map((rec) => (
                <RecommendationCard
                  key={rec.id}
                  onClick={() => navigate(`/anime/${rec.id}`)}
                >
                  <RecommendationImage src={rec.image} alt={rec.title} />
                  <RecommendationTitle>{rec.title}</RecommendationTitle>
                </RecommendationCard>
              ))}
            </RecommendationGrid>
          </Section>
        </RightColumn>
      </MainContent>

      {/* Video Player Section */}
      <VideoSection>
        {trailerPlaying ? (
          <VideoPlayer
            src={anime.trailerUrl}
            poster={anime.posterImage}
            title={`${anime.title} - Trailer`}
          />
        ) : (
          selectedEpisode && (
            <>
              <EpisodeTitle>
                Episode {selectedEpisode.number}: {selectedEpisode.title}
              </EpisodeTitle>
              <VideoPlayer
                src={selectedEpisode.videoUrl}
                poster={selectedEpisode.thumbnail}
                title={`${anime.title} - Episode ${selectedEpisode.number}`}
                onNext={() => {
                  const nextEp = anime.episodes.find(
                    (ep) => ep.number === selectedEpisode.number + 1
                  );
                  if (nextEp) setSelectedEpisode(nextEp);
                }}
                onPrev={() => {
                  const prevEp = anime.episodes.find(
                    (ep) => ep.number === selectedEpisode.number - 1
                  );
                  if (prevEp) setSelectedEpisode(prevEp);
                }}
              />
            </>
          )
        )}
      </VideoSection>

      {/* Episode List */}
      <EpisodeSection>
        <SectionTitle>Episodes ({anime.episodes.length})</SectionTitle>
        <EpisodeList
          episodes={anime.episodes}
          onSelectEpisode={handleEpisodeSelect}
          selectedEpisode={selectedEpisode?.number}
        />
      </EpisodeSection>
    </DetailsContainer>
  );
};

// Styled Components
const DetailsContainer = styled.div`
  color: #e0e0e0;
  background-color: #141414;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  color: white;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  color: #ff5722;
`;

const NotFound = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  color: white;
`;

const HeroBanner = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  background-image: linear-gradient(
      to top,
      rgba(20, 20, 20, 1),
      rgba(20, 20, 20, 0.5)
    ),
    url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 2rem;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to right,
    rgba(20, 20, 20, 0.9) 30%,
    rgba(20, 20, 20, 0.5) 100%
  );
`;

const HeroContent = styled.div`
  position: relative;
  display: flex;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 1;
`;

const AnimePoster = styled.img`
  width: 250px;
  height: 350px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const HeroInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const AnimeTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const AnimeMeta = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const MetaItem = styled.span`
  font-size: 0.9rem;
  color: #b3b3b3;
`;

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const GenreTag = styled.span`
  background-color: rgba(255, 87, 34, 0.2);
  color: #ff5722;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;

  span {
    margin-left: 0.3rem;
    color: #b3b3b3;
    font-size: 0.9rem;
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
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const PrimaryButton = styled(Button)`
  background-color: #ff5722;
  color: white;
  border: none;

  &:hover {
    background-color: #ff7043;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const IconButton = styled.button`
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const MainContent = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  gap: 2rem;
`;

const LeftColumn = styled.div`
  flex: 2;
`;

const RightColumn = styled.div`
  flex: 1;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  color: white;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: #ff5722;
  }
`;

const Description = styled.p`
  line-height: 1.6;
  margin: 0;
  color: #b3b3b3;
  white-space: pre-line;
`;

const ToggleDescription = styled.button`
  background: none;
  border: none;
  color: #ff5722;
  font-weight: 600;
  margin-top: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
`;

const CharacterCard = styled.div`
  background-color: #1a1a1a;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CharacterImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const CharacterName = styled.div`
  padding: 0.5rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CharacterRole = styled.div`
  padding: 0 0.5rem 0.5rem;
  font-size: 0.8rem;
  color: #b3b3b3;
`;

const InfoTable = styled.div`
  background-color: #1a1a1a;
  border-radius: 4px;
  padding: 1rem;
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const InfoLabel = styled.div`
  font-weight: 600;
  min-width: 100px;
  color: white;
`;

const InfoValue = styled.div`
  color: #b3b3b3;
`;

const RecommendationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const RecommendationCard = styled.div`
  background-color: #1a1a1a;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const RecommendationImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

const RecommendationTitle = styled.div`
  padding: 0.5rem;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const VideoSection = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const EpisodeTitle = styled.h3`
  font-size: 1.3rem;
  margin: 0 0 1rem 0;
  color: white;
`;

const EpisodeSection = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

export default AnimeDetailsPage;
