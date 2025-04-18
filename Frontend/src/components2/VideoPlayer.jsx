import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Handle loading state
  const handleReady = () => {
    setIsLoading(false);
  };
  
  // Handle errors
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="video-player-wrapper" style={{
      position: 'relative',
      paddingTop: '56.25%', /* 16:9 Aspect Ratio */
      width: '100%',
      height: '0',
      backgroundColor: '#000'
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
      
      <ReactPlayer 
        url={videoUrl}
        className="react-player"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        width="100%"
        height="100%"
        controls={true}
        playing={true}
        onReady={handleReady}
        onError={handleError}
        config={{
          youtube: {
            playerVars: { 
              showinfo: 1,
              modestbranding: 1,
              iv_load_policy: 3, // Hide annotations
              fs: 1 // Show fullscreen button
            }
          }
        }}
      />
    </div>
  );
};

export default VideoPlayer;