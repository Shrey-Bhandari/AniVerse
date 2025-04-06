import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaStepForward,
  FaStepBackward,
  FaList,
} from "react-icons/fa";
import AnimeData from "../data/AnimeData";

const WatchPage = () => {
  const { animeId, episodeNumber } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    isMuted: false,
    volume: 1,
    currentTime: 0,
    duration: 0,
    isFullscreen: false,
    showEpisodes: true,
    playbackRate: 1,
    quality: "1080p",
  });

  // Find current anime and episode
  const anime = AnimeData.find(
    (a) => a.name.replace(/\s+/g, "-").toLowerCase() === animeId
  );
  const episode = {
    number: parseInt(episodeNumber),
    title: `Episode ${episodeNumber}`,
    duration: "24:00",
    thumbnail: anime.image,
  };

  // Mock episodes data
  const episodes = Array.from({ length: 12 }, (_, i) => ({
    number: i + 1,
    title: `Episode ${i + 1}`,
    duration: "24:00",
    thumbnail: anime.image,
  }));

  // Handle play/pause
  const togglePlay = () => {
    if (playerState.isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlayerState({ ...playerState, isPlaying: !playerState.isPlaying });
  };

  // Handle time update
  const handleTimeUpdate = () => {
    setPlayerState({
      ...playerState,
      currentTime: videoRef.current.currentTime,
      duration: videoRef.current.duration,
    });
  };

  // Handle seeking
  const handleSeek = (e) => {
    const newTime = e.target.value;
    videoRef.current.currentTime = newTime;
    setPlayerState({ ...playerState, currentTime: newTime });
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setPlayerState({
      ...playerState,
      volume: newVolume,
      isMuted: newVolume === 0,
    });
  };

  // Toggle mute
  const toggleMute = () => {
    videoRef.current.muted = !playerState.isMuted;
    setPlayerState({ ...playerState, isMuted: !playerState.isMuted });
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!playerState.isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setPlayerState({ ...playerState, isFullscreen: !playerState.isFullscreen });
  };

  // Change episode
  const changeEpisode = (epNum) => {
    navigate(`/watch/${animeId}/${epNum}`);
  };

  // Format time
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!videoRef.current) return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowRight":
          videoRef.current.currentTime += 5;
          break;
        case "ArrowLeft":
          videoRef.current.currentTime -= 5;
          break;
        case "f":
          toggleFullscreen();
          break;
        case "m":
          toggleMute();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [playerState]);

  return (
    <WatchContainer isFullscreen={playerState.isFullscreen}>
      <VideoContainer>
        {/* Video Player */}
        <video
          ref={videoRef}
          src="https://example.com/video-stream.mp4" // Replace with actual video source
          poster={episode.thumbnail}
          onTimeUpdate={handleTimeUpdate}
          onClick={togglePlay}
          onEnded={() => setPlayerState({ ...playerState, isPlaying: false })}
        />

        {/* Video Controls */}
        <ControlsContainer>
          {/* Progress Bar */}
          <ProgressBar
            type="range"
            min="0"
            max={playerState.duration || 100}
            value={playerState.currentTime}
            onChange={handleSeek}
          />

          {/* Bottom Controls */}
          <BottomControls>
            <LeftControls>
              <ControlButton onClick={togglePlay}>
                {playerState.isPlaying ? <FaPause /> : <FaPlay />}
              </ControlButton>

              <VolumeControl>
                <ControlButton onClick={toggleMute}>
                  {playerState.isMuted || playerState.volume === 0 ? (
                    <FaVolumeMute />
                  ) : (
                    <FaVolumeUp />
                  )}
                </ControlButton>
                <VolumeSlider
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={playerState.isMuted ? 0 : playerState.volume}
                  onChange={handleVolumeChange}
                />
              </VolumeControl>

              <TimeDisplay>
                {formatTime(playerState.currentTime)} /{" "}
                {formatTime(playerState.duration)}
              </TimeDisplay>
            </LeftControls>

            <RightControls>
              <PlaybackRateSelect
                value={playerState.playbackRate}
                onChange={(e) => {
                  videoRef.current.playbackRate = e.target.value;
                  setPlayerState({
                    ...playerState,
                    playbackRate: e.target.value,
                  });
                }}
              >
                <option value="0.5">0.5x</option>
                <option value="0.75">0.75x</option>
                <option value="1">1x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </PlaybackRateSelect>

              <QualitySelect
                value={playerState.quality}
                onChange={(e) =>
                  setPlayerState({ ...playerState, quality: e.target.value })
                }
              >
                <option value="360p">360p</option>
                <option value="480p">480p</option>
                <option value="720p">720p</option>
                <option value="1080p">1080p</option>
              </QualitySelect>

              <ControlButton
                onClick={() =>
                  setPlayerState({
                    ...playerState,
                    showEpisodes: !playerState.showEpisodes,
                  })
                }
              >
                <FaList />
              </ControlButton>

              <ControlButton onClick={toggleFullscreen}>
                {playerState.isFullscreen ? <FaCompress /> : <FaExpand />}
              </ControlButton>
            </RightControls>
          </BottomControls>
        </ControlsContainer>
      </VideoContainer>

      {/* Episode List */}
      {playerState.showEpisodes && (
        <EpisodeListContainer>
          <EpisodeListHeader>
            <h3>{anime.name}</h3>
            <span>Episode {episode.number}</span>
          </EpisodeListHeader>

          <EpisodesScroll>
            {episodes.map((ep) => (
              <EpisodeCard
                key={ep.number}
                active={ep.number === episode.number}
                onClick={() => changeEpisode(ep.number)}
              >
                <EpisodeThumbnail
                  src={ep.thumbnail}
                  alt={`Episode ${ep.number}`}
                />
                <EpisodeInfo>
                  <EpisodeNumber>Episode {ep.number}</EpisodeNumber>
                  <EpisodeDuration>{ep.duration}</EpisodeDuration>
                </EpisodeInfo>
              </EpisodeCard>
            ))}
          </EpisodesScroll>
        </EpisodeListContainer>
      )}
    </WatchContainer>
  );
};

// Styled Components
const WatchContainer = styled.div`
  display: flex;
  height: ${(props) => (props.isFullscreen ? "100vh" : "calc(100vh - 60px)")};
  background: #000;
  color: white;
  position: relative;
`;

const VideoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;

  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: #000;
    cursor: pointer;
  }
`;

const ControlsContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${VideoContainer}:hover & {
    opacity: 1;
  }
`;

const ProgressBar = styled.input`
  width: 100%;
  height: 5px;
  -webkit-appearance: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ff5722;
    cursor: pointer;
  }
`;

const BottomControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ControlButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    color: #ff5722;
    transform: scale(1.1);
  }
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const VolumeSlider = styled.input`
  width: 80px;
  -webkit-appearance: none;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ff5722;
    cursor: pointer;
  }
`;

const TimeDisplay = styled.span`
  font-size: 0.9rem;
  color: #aaa;
`;

const PlaybackRateSelect = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.3rem;
  border-radius: 4px;
  cursor: pointer;
`;

const QualitySelect = styled(PlaybackRateSelect)`
  margin-right: 0.5rem;
`;

const EpisodeListContainer = styled.div`
  width: 350px;
  background: #0f0f12;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  overflow-y: auto;

  @media (max-width: 1200px) {
    width: 300px;
  }
`;

const EpisodeListHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  h3 {
    margin: 0 0 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    color: #ff5722;
    font-size: 0.9rem;
  }
`;

const EpisodesScroll = styled.div`
  padding: 0.5rem;
  height: calc(100% - 60px);
  overflow-y: auto;
`;

const EpisodeCard = styled.div`
  display: flex;
  gap: 0.8rem;
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  background: ${(props) =>
    props.active ? "rgba(255, 87, 34, 0.2)" : "transparent"};
  border: ${(props) =>
    props.active ? "1px solid #FF5722" : "1px solid transparent"};
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const EpisodeThumbnail = styled.img`
  width: 80px;
  height: 45px;
  object-fit: cover;
  border-radius: 4px;
`;

const EpisodeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EpisodeNumber = styled.span`
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
`;

const EpisodeDuration = styled.span`
  font-size: 0.8rem;
  color: #aaa;
`;

export default WatchPage;
