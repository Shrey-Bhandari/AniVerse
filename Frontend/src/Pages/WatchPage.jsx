import React, { useState, useRef, useEffect, useContext } from 'react';
import VideoPlayer from "../components2/VideoPlayer"; 
import { useParams } from "react-router-dom";
import { AnimeContext } from "../Context/AnimeContext";
import AnimeVideoData from '../data/AnimeVideoData';
import styled from 'styled-components';

// Import icons directly to avoid Lucide dependency
const icons = {
  Play: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  ),
  Pause: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
  ),
  Volume: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
    </svg>
  ),
  Mute: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <line x1="23" y1="9" x2="17" y2="15"></line>
      <line x1="17" y1="9" x2="23" y2="15"></line>
    </svg>
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
  Fullscreen: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
    </svg>
  ),
  Star: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="gold" stroke="gold" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  ),
  SkipBack: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="19 20 9 12 19 4 19 20"></polygon>
      <line x1="5" y1="19" x2="5" y2="5"></line>
    </svg>
  ),
  SkipForward: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 4 15 12 5 20 5 4"></polygon>
      <line x1="19" y1="5" x2="19" y2="19"></line>
    </svg>
  ),
  List: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"></line>
      <line x1="8" y1="12" x2="21" y2="12"></line>
      <line x1="8" y1="18" x2="21" y2="18"></line>
      <line x1="3" y1="6" x2="3.01" y2="6"></line>
      <line x1="3" y1="12" x2="3.01" y2="12"></line>
      <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  )
};

export default function WatchPage() {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeEpisode, setActiveEpisode] = useState(1);
  const [activeTab, setActiveTab] = useState('SUB');
  const [currentServer, setCurrentServer] = useState('HD-1');
  const [currentVideoUrl, setCurrentVideoUrl] = useState("https://www.youtube.com/watch?v=XLFA7MWzYac");
  const [animeInfo, setAnimeInfo] = useState({
    title: "Solo Leveling",
    episodes: 13,
    description: "Sung Jin-Woo, dubbed the weakest hunter of all mankind, grows stronger by the day with the supernatural powers he has gained.",
    rating: 9.7
  });

  useEffect(() => {
    if (id && AnimeVideoData[id]) {
      const firstEpisode = AnimeVideoData[id].episodes[0];
      if (firstEpisode) {
        setCurrentVideoUrl(`https://www.youtube.com/watch?v=${firstEpisode.videoId}`);
        setActiveEpisode(firstEpisode.num);
      }
      setAnimeInfo({
        title: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        episodes: AnimeVideoData[id].episodes.length,
        description: "An amazing anime series that you must watch!",
        rating: 9.5
      });
    }
  }, [id]);

  const handleEpisodeClick = (episodeNum) => {
    setActiveEpisode(episodeNum);
    if (id && AnimeVideoData[id]) {
      const episode = AnimeVideoData[id].episodes.find(ep => ep.num === episodeNum);
      if (episode) {
        setCurrentVideoUrl(`https://www.youtube.com/watch?v=${episode.videoId}`);
      }
    }
  };

  const episodes = id && AnimeVideoData[id] 
    ? AnimeVideoData[id].episodes 
    : [
        { num: 1, title: "You aren't e-rank, are you?" },
        { num: 2, title: "I suppose you aren't aware" },
        { num: 3, title: "Still a long way to go" },
      ];
  
  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <WatchPageContainer className="watch-page-container">
      <Sidebar>
        <SidebarHeader>
          <SidebarTitle>List of episodes:</SidebarTitle>
          <SearchContainer>
            <SearchInput 
              type="text" 
              placeholder="Number of ep"
            />
            <SearchIcon>
              <icons.Search />
            </SearchIcon>
          </SearchContainer>
        </SidebarHeader>
        
        <EpisodesList>
          {episodes.map((episode) => (
            <EpisodeItem 
              key={episode.num}
              onClick={() => handleEpisodeClick(episode.num)}
              active={activeEpisode === episode.num}
            >
              <EpisodeNumber>{episode.num}</EpisodeNumber>
              <EpisodeTitle>{episode.title}</EpisodeTitle>
              {activeEpisode === episode.num && (
                <PlayIcon>
                  <icons.Play />
                </PlayIcon>
              )}
            </EpisodeItem>
          ))}
        </EpisodesList>
      </Sidebar>
      
      <MainContent>
        <VideoContainer>
          <VideoPlayer videoUrl={currentVideoUrl} />
        </VideoContainer>
          
        <PlayerOptions>
          <ControlGroup>
            <OptionButton>
              <OptionIcon><icons.List /></OptionIcon>
              Expand
            </OptionButton>
            <OptionButton>
              Light: On
            </OptionButton>
            <OptionButton>
              Auto Play: On
            </OptionButton>
            <OptionButton>
              Auto Next: On
            </OptionButton>
            <OptionButton>
              Auto Skip Intro: On
            </OptionButton>
          </ControlGroup>
          
          <ControlGroup>
            <NavButton 
              onClick={() => handleEpisodeClick(activeEpisode > 1 ? activeEpisode - 1 : activeEpisode)}
              disabled={activeEpisode === 1}
            >
              <icons.SkipBack />
            </NavButton>
            <NavButton 
              onClick={() => handleEpisodeClick(activeEpisode < episodes.length ? activeEpisode + 1 : activeEpisode)}
              disabled={activeEpisode === episodes.length}
            >
              <icons.SkipForward />
            </NavButton>
          </ControlGroup>
        </PlayerOptions>
      
        <EpisodeInfoBanner>
          <EpisodeInfoText>You are watching Episode {activeEpisode}</EpisodeInfoText>
          <EpisodeInfoSubtext>If current server doesn't work please try other servers</EpisodeInfoSubtext>
        </EpisodeInfoBanner>
        
        <ServerOptionsContainer>
          <TabsContainer>
            <Tab 
              active={activeTab === 'SUB'}
              onClick={() => setActiveTab('SUB')}
            >
              SUB:
            </Tab>
            <Tab
              active={activeTab === 'DUB'}
              onClick={() => setActiveTab('DUB')}
            >
              DUB:
            </Tab>
          </TabsContainer>
          
          <ServerButtons>
            <ServerButton 
              active={currentServer === 'HD-1'}
              onClick={() => setCurrentServer('HD-1')}
            >
              HD-1
            </ServerButton>
            <ServerButton 
              active={currentServer === 'HD-2'}
              onClick={() => setCurrentServer('HD-2')}
            >
              HD-2
            </ServerButton>
          </ServerButtons>
        </ServerOptionsContainer>
        
        <AnimeInfoContainer>
          <AnimeInfoContent>
            <AnimeImage 
              src={`https://via.placeholder.com/180x240/151515/ff5722?text=${animeInfo.title.replace(/\s+/g, '+')}`}
              alt={animeInfo.title} 
            />
            
            <AnimeDetails>
              <AnimeTitle>{animeInfo.title}</AnimeTitle>
              
              <MetadataTags>
                <MetadataTag type="r">R</MetadataTag>
                <MetadataTag type="hd">HD</MetadataTag>
                <MetadataTag type="lang">
                  <LangCounter>{animeInfo.episodes}</LangCounter> 🗣️
                </MetadataTag>
                <MetadataTag type="ep">{animeInfo.episodes}</MetadataTag>
                <MetadataTag type="tv">TV</MetadataTag>
                <DurationTag>• 24m</DurationTag>
              </MetadataTags>
              
              <AnimeDescription>
                {animeInfo.description}
              </AnimeDescription>
              
              <AnimeExtraInfo>
                Aniverse is the best site to watch <HighlightedText>{animeInfo.title}</HighlightedText> SUB 
                online, or you can even watch <HighlightedText>{animeInfo.title}</HighlightedText> DUB in HD quality. 
                You can also find <HighlightedText>A-1 Pictures</HighlightedText> anime on HiAnime website.
              </AnimeExtraInfo>
              
              <ViewDetailButton>View detail</ViewDetailButton>
              
              <RatingContainer>
                <RatingStarContainer>
                  <icons.Star />
                  <RatingNumber>{animeInfo.rating}</RatingNumber>
                </RatingStarContainer>
                <VoteButton>Vote now</VoteButton>
              </RatingContainer>
            </AnimeDetails>
          </AnimeInfoContent>
        </AnimeInfoContainer>
      </MainContent>
    </WatchPageContainer>
  );
}

const WatchPageContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #000000;
  color: #e0e0e0;
  font-family: Arial, sans-serif;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 300px;
  background-color: #0f0f0f;
  border-right: 1px solid #3a0000;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #121212;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ff3333;
    border-radius: 3px;
  }
  
  @media (max-width: 768px) {
    width: 230px;
  }
`;

const SidebarHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #3a0000;
  background-color: #0a0a0a;
`;

const SidebarTitle = styled.h3`
  color: #ff3333;
  font-weight: bold;
  margin-bottom: 8px;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-top: 8px;
`;

const SearchInput = styled.input`
  width: 100%;
  background-color: #1e1e1e;
  border: 1px solid #3a0000;
  color: #e0e0e0;
  padding: 8px 30px 8px 12px;
  border-radius: 4px;
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #ff3333;
    box-shadow: 0 0 0 2px rgba(255, 51, 51, 0.2);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #ff3333;
`;

const EpisodesList = styled.div`
  padding: 8px 0;
`;

const EpisodeItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #222;
  cursor: pointer;
  background-color: ${props => props.active ? 'rgba(255, 51, 51, 0.1)' : 'transparent'};
  border-left: ${props => props.active ? '4px solid #ff3333' : '4px solid transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? 'rgba(255, 51, 51, 0.15)' : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const EpisodeNumber = styled.div`
  margin-right: 12px;
  font-weight: bold;
  font-size: 18px;
  min-width: 24px;
  color: #ff3333;
`;

const EpisodeTitle = styled.div`
  flex: 1;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlayIcon = styled.div`
  margin-left: 8px;
  color: #ff3333;
  width: 18px;
  height: 18px;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #0a0a0a;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ff3333;
    border-radius: 4px;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: #000;
  overflow: hidden;
  max-width: 100%;
  margin: 0 auto;
  min-height: 75vh; /* Make the video much larger */
  
  /* Make the video more prominent */
  .video-player-wrapper {
    border-radius: 0;
    overflow: hidden;
    height: 100%;
  }
  
  /* Ensure the iframe takes full width and height */
  iframe {
    display: block;
    visibility: visible;
    opacity: 1;
    z-index: 1;
  }
`;

const PlayerOptions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #0f0f0f;
  border-bottom: 1px solid #222;
`;

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    gap: 4px;
  }
`;

const OptionButton = styled.button`
  background-color: rgba(255, 255, 255, 0.05);
  color: #e0e0e0;
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 51, 51, 0.1);
    border-color: rgba(255, 51, 51, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 11px;
  }
`;

const OptionIcon = styled.span`
  margin-right: 4px;
  width: 14px;
  height: 14px;
`;

const NavButton = styled.button`
  background-color: rgba(255, 255, 255, 0.05);
  color: ${props => props.disabled ? '#666' : '#e0e0e0'};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background-color: rgba(255, 51, 51, 0.1);
    border-color: rgba(255, 51, 51, 0.3);
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

const EpisodeInfoBanner = styled.div`
  background-color: rgba(255, 51, 51, 0.1);
  padding: 12px;
  text-align: center;
  border-top: 1px solid rgba(255, 51, 51, 0.2);
  border-bottom: 1px solid rgba(255, 51, 51, 0.2);
`;

const EpisodeInfoText = styled.p`
  color: #ff3333;
  font-weight: bold;
  margin: 0;
`;

const EpisodeInfoSubtext = styled.p`
  color: #e0e0e0;
  font-size: 12px;
  margin: 4px 0 0;
`;

const ServerOptionsContainer = styled.div`
  padding: 16px;
  background-color: #0f0f0f;
  border-bottom: 1px solid #222;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const Tab = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  background-color: ${props => props.active ? '#222' : '#0f0f0f'};
  color: ${props => props.active ? '#ff3333' : '#e0e0e0'};
  border-bottom: ${props => props.active ? '2px solid #ff3333' : 'none'};
  transition: all 0.2s ease;
  
  &:hover {
    color: ${props => props.active ? '#ff3333' : '#ff5555'};
  }
`;

const ServerButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ServerButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background-color: ${props => props.active ? '#ff3333' : '#222'};
  color: ${props => props.active ? 'white' : '#e0e0e0'};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#ff5555' : '#333'};
    transform: translateY(-2px);
  }
`;

const AnimeInfoContainer = styled.div`
  padding: 24px 16px;
  background-color: #0f0f0f;
`;

const AnimeInfoContent = styled.div`
  display: flex;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AnimeImage = styled.img`
  margin-right: 16px;
  height: 240px;
  width: 180px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #3a0000;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  
  @media (max-width: 768px) {
    margin: 0 auto 16px;
    width: 150px;
    height: 200px;
  }
`;

const AnimeDetails = styled.div`
  flex: 1;
`;

const AnimeTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #ff3333;
  margin-top: 0;
  margin-bottom: 12px;
`;

const MetadataTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const MetadataTag = styled.span`
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  background-color: ${props => {
    switch(props.type) {
      case 'hd': return '#cc0000';
      case 'lang': return '#005a00';
      case 'ep': return '#00008b';
      default: return '#222';
    }
  }};
  color: white;
  display: flex;
  align-items: center;
`;

const LangCounter = styled.span`
  margin-right: 4px;
`;

const DurationTag = styled.span`
  font-size: 12px;
  color: #999;
`;

const AnimeDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
  color: #e0e0e0;
`;

const AnimeExtraInfo = styled.div`
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
  color: #999;
`;

const HighlightedText = styled.span`
  color: #ff3333;
`;

const ViewDetailButton = styled.button`
  background-color: #ff3333;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #ff5555;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(255, 51, 51, 0.3);
  }
`;

const RatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const RatingStarContainer = styled.div`
  display: flex;
  align-items: center;
  color: gold;
`;

const RatingNumber = styled.span`
  margin-left: 4px;
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const VoteButton = styled.button`
  background-color: #ff3333;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #ff5555;
    transform: translateY(-2px);
  }
`;