import React, { useState, useEffect } from "react";

// Extracts YouTube video ID from a URL
const extractYouTubeID = (url) => {
  if (!url) return null;
  
  // Handle standard YouTube URLs
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
};

const VideoPlayer = ({ videoUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [videoId, setVideoId] = useState(null);
  
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    
    try {
      const id = extractYouTubeID(videoUrl);
      setVideoId(id);
      if (!id) {
        setHasError(true);
      }
    } catch (error) {
      console.error("Error processing video URL:", error);
      setHasError(true);
    }
  }, [videoUrl]);
  
  const handleIframeLoad = () => {
    setIsLoading(false);
  };
  
  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="video-player-wrapper" style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      paddingBottom: '0', /* Remove padding to fill container completely */
      backgroundColor: '#000',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          color: '#fff',
          zIndex: 2
        }}>
          Loading video...
        </div>
      )}
      
      {hasError && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          color: '#f44336',
          zIndex: 2
        }}>
          Error loading video. Please try another server.
        </div>
      )}
      
      {videoId && (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0&color=red`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1
          }}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      )}
    </div>
  );
};

export default VideoPlayer;