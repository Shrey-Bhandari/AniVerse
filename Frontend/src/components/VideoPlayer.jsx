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
} from "react-icons/fa";

const VideoPlayer = ({ youtubeId, onNext, onPrev }) => {
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState(null);
  const [player, setPlayer] = useState(null);

  // Extract YouTube ID from URL if full URL is provided
  const extractVideoId = (url) => {
    if (!url) return '';
    
    // Handle various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const videoId = extractVideoId(youtubeId);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Initialize player once API is ready
    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player(playerRef.current, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          enablejsapi: 1,
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
        }
      });
      setPlayer(newPlayer);
    };

    // If API is already loaded
    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
    }

    return () => {
      if (player) {
        player.destroy();
      }
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
    };
  }, [videoId]);

  const onPlayerReady = (event) => {
    const duration = event.target.getDuration();
    setDuration(duration);
    updateProgressBar();
    event.target.setVolume(volume);
    if (isMuted) {
      event.target.mute();
    }
  };

  const onPlayerStateChange = (event) => {
    switch (event.data) {
      case window.YT.PlayerState.PLAYING:
        setIsPlaying(true);
        startProgressTimer();
        break;
      case window.YT.PlayerState.PAUSED:
        setIsPlaying(false);
        stopProgressTimer();
        break;
      case window.YT.PlayerState.ENDED:
        setIsPlaying(false);
        stopProgressTimer();
        if (onNext) onNext();
        break;
      default:
        break;
    }
  };

  let progressInterval;
  const startProgressTimer = () => {
    stopProgressTimer(); // Clear existing interval if any
    progressInterval = setInterval(updateProgressBar, 1000);
  };

  const stopProgressTimer = () => {
    if (progressInterval) {
      clearInterval(progressInterval);
    }
  };

  const updateProgressBar = () => {
    if (player && typeof player.getCurrentTime === 'function') {
      try {
        const current = player.getCurrentTime();
        const duration = player.getDuration();
        setCurrentTime(current);
        setProgress((current / duration) * 100);
      } catch (e) {
        console.error("Error updating progress:", e);
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
    setControlsTimeout(
      setTimeout(() => {
        setShowControls(false);
      }, 3000)
    );
  };

  const togglePlay = () => {
    if (!player) return;
    
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    if (!player) return;
    
    player.setVolume(newVolume);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (!player) return;
    
    if (isMuted) {
      player.unMute();
      setVolume(volume > 0 ? volume : 50);
    } else {
      player.mute();
    }
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    
    if (!isFullscreen) {
      if (playerContainerRef.current.requestFullscreen) {
        playerContainerRef.current.requestFullscreen();
      } else if (playerContainerRef.current.webkitRequestFullscreen) {
        playerContainerRef.current.webkitRequestFullscreen();
      } else if (playerContainerRef.current.msRequestFullscreen) {
        playerContainerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleProgressClick = (e) => {
    if (!player || !player.getDuration) return;
    
    const rect = e.target.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    player.seekTo(player.getDuration() * pos, true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <PlayerContainer 
      ref={playerContainerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      <YouTubeContainer ref={playerRef} />
      
      {showControls && (
        <ControlsContainer>
          <ProgressBar onClick={handleProgressClick}>
            <Progress progress={progress} />
          </ProgressBar>
          
          <BottomControls>
            <TimeInfo>
              {formatTime(currentTime)} / {formatTime(duration)}
            </TimeInfo>
            
            <ControlGroup>
              {onPrev && <ControlButton onClick={onPrev}><FaStepBackward /></ControlButton>}
              <ControlButton onClick={togglePlay}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </ControlButton>
              {onNext && <ControlButton onClick={onNext}><FaStepForward /></ControlButton>}
            </ControlGroup>
            
            <ControlGroup>
              <VolumeContainer>
                <ControlButton onClick={toggleMute}>
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </ControlButton>
                <VolumeSlider
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                />
              </VolumeContainer>
              <ControlButton onClick={toggleFullscreen}>
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </ControlButton>
            </ControlGroup>
          </BottomControls>
        </ControlsContainer>
      )}
    </PlayerContainer>
  );
};

const PlayerContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  background-color: #000;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 16/9;
  &:hover {
    cursor: pointer;
  }
`;

const YouTubeContainer = styled.div`
  width: 100%;
  height: 100%;
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const ControlsContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 10px;
  transition: opacity 0.3s;
  z-index: 10;
`;

const BottomControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    outline: none;
  }
`;

const ProgressBar = styled.div`
  height: 5px;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  cursor: pointer;
  margin-bottom: 8px;
`;

const Progress = styled.div`
  height: 100%;
  width: ${props => props.progress}%;
  background: #ff0000;
  border-radius: 3px;
  transition: width 0.2s ease;
`;

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const VolumeSlider = styled.input`
  width: 70px;
  -webkit-appearance: none;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
  }
  
  &:hover {
    opacity: 1;
  }
`;

const TimeInfo = styled.span`
  color: white;
  font-size: 0.9rem;
  min-width: 100px;
  text-align: center;
`;

export default VideoPlayer;

