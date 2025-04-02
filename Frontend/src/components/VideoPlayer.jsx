import React, { useState, useRef, useEffect } from "react";
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
  FaClosedCaptioning,
} from "react-icons/fa";
import { MdSpeed, MdHighQuality } from "react-icons/md";

const VideoPlayer = ({ src, poster, title, onNext, onPrev }) => {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState("auto");
  const [showSubtitle, setShowSubtitle] = useState(false);

  // Format time (seconds to MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Handle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle progress bar click
  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  // Toggle mute
  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  // Update progress bar
  const updateProgress = () => {
    const currentProgress =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(currentProgress);
    setCurrentTime(videoRef.current.currentTime);
  };

  // Handle keyboard shortcuts
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
        case "ArrowUp":
          videoRef.current.volume = Math.min(videoRef.current.volume + 0.1, 1);
          setVolume(videoRef.current.volume);
          setIsMuted(false);
          break;
        case "ArrowDown":
          videoRef.current.volume = Math.max(videoRef.current.volume - 0.1, 0);
          setVolume(videoRef.current.volume);
          setIsMuted(videoRef.current.volume === 0);
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
  }, [isPlaying, isMuted, isFullscreen]);

  // Hide controls after 3 seconds of inactivity
  useEffect(() => {
    let timeout;
    if (isPlaying) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  return (
    <PlayerContainer
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => {
        if (isPlaying) {
          setTimeout(() => setShowControls(false), 1000);
        }
      }}
    >
      <Video
        ref={videoRef}
        src={src}
        poster={poster}
        onClick={togglePlay}
        onTimeUpdate={updateProgress}
        onLoadedMetadata={() => setDuration(videoRef.current.duration)}
        onEnded={onNext}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {showControls && (
        <ControlsContainer>
          <TopControls>
            <VideoTitle>{title}</VideoTitle>
          </TopControls>

          <CenterControls>
            <ControlButton onClick={onPrev}>
              <FaStepBackward />
            </ControlButton>
            <ControlButton onClick={togglePlay}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </ControlButton>
            <ControlButton onClick={onNext}>
              <FaStepForward />
            </ControlButton>
          </CenterControls>

          <BottomControls>
            <ProgressBar ref={progressRef} onClick={handleProgressClick}>
              <Progress $progress={progress} />
              <ProgressHandle $progress={progress} />
            </ProgressBar>

            <TimeInfo>
              {formatTime(currentTime)} / {formatTime(duration)}
            </TimeInfo>

            <ControlGroup>
              <ControlButton onClick={toggleMute}>
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </ControlButton>
              <VolumeSlider
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
              />
            </ControlGroup>

            <ControlGroup>
              <ControlButton onClick={() => setShowSettings(!showSettings)}>
                <MdSpeed /> {playbackRate}x
              </ControlButton>
              {showSettings && (
                <SettingsMenu>
                  <SettingsItem
                    active={playbackRate === 0.5}
                    onClick={() => {
                      videoRef.current.playbackRate = 0.5;
                      setPlaybackRate(0.5);
                    }}
                  >
                    0.5x
                  </SettingsItem>
                  <SettingsItem
                    active={playbackRate === 1}
                    onClick={() => {
                      videoRef.current.playbackRate = 1;
                      setPlaybackRate(1);
                    }}
                  >
                    1x (Normal)
                  </SettingsItem>
                  <SettingsItem
                    active={playbackRate === 1.5}
                    onClick={() => {
                      videoRef.current.playbackRate = 1.5;
                      setPlaybackRate(1.5);
                    }}
                  >
                    1.5x
                  </SettingsItem>
                  <SettingsItem
                    active={playbackRate === 2}
                    onClick={() => {
                      videoRef.current.playbackRate = 2;
                      setPlaybackRate(2);
                    }}
                  >
                    2x
                  </SettingsItem>
                  <Divider />
                  <SettingsItem
                    active={quality === "auto"}
                    onClick={() => setQuality("auto")}
                  >
                    <MdHighQuality /> Auto Quality
                  </SettingsItem>
                  <SettingsItem
                    active={quality === "1080p"}
                    onClick={() => setQuality("1080p")}
                  >
                    1080p
                  </SettingsItem>
                  <SettingsItem
                    active={quality === "720p"}
                    onClick={() => setQuality("720p")}
                  >
                    720p
                  </SettingsItem>
                  <Divider />
                  <SettingsItem
                    active={showSubtitle}
                    onClick={() => setShowSubtitle(!showSubtitle)}
                  >
                    <FaClosedCaptioning /> Subtitles{" "}
                    {showSubtitle ? "ON" : "OFF"}
                  </SettingsItem>
                </SettingsMenu>
              )}
            </ControlGroup>

            <ControlButton onClick={toggleFullscreen}>
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </ControlButton>
          </BottomControls>
        </ControlsContainer>
      )}

      {!isPlaying && showControls && (
        <PlayOverlay onClick={togglePlay}>
          <FaPlay size={48} />
        </PlayOverlay>
      )}
    </PlayerContainer>
  );
};

// Styled Components
const PlayerContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #000;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 16/9;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  display: block;
  cursor: pointer;
`;

const ControlsContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: opacity 0.3s ease;
`;

const TopControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VideoTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
`;

const CenterControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const BottomControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProgressBar = styled.div`
  flex-grow: 1;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  cursor: pointer;
  position: relative;
`;

const Progress = styled.div`
  height: 100%;
  width: ${(props) => props.$progress}%;
  background-color: #ff5722;
  border-radius: 3px;
`;

const ProgressHandle = styled.div`
  position: absolute;
  top: 50%;
  left: ${(props) => props.$progress}%;
  width: 12px;
  height: 12px;
  background-color: #ff5722;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.2s ease;

  ${ProgressBar}:hover & {
    opacity: 1;
  }
`;

const TimeInfo = styled.span`
  color: white;
  font-size: 0.9rem;
  min-width: 100px;
  text-align: center;
`;

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #ff5722;
  }
`;

const VolumeSlider = styled.input`
  width: 80px;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  outline: none;
  opacity: 0;
  transition: opacity 0.2s ease, width 0.2s ease;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: #ff5722;
    border-radius: 50%;
    cursor: pointer;
  }

  ${ControlGroup}:hover & {
    opacity: 1;
    width: 100px;
  }
`;

const SettingsMenu = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  background-color: rgba(20, 20, 20, 0.95);
  border-radius: 4px;
  padding: 0.5rem;
  min-width: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

const SettingsItem = styled.div`
  color: ${(props) => (props.active ? "#ff5722" : "white")};
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 2px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: rgba(255, 87, 34, 0.2);
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 0.3rem 0;
`;

const PlayOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  z-index: 2;

  & > svg {
    color: white;
    opacity: 0.8;
    transition: all 0.2s ease;
  }

  &:hover > svg {
    opacity: 1;
    transform: scale(1.2);
    color: #ff5722;
  }
`;

export default VideoPlayer;
