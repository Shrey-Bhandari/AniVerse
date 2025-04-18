import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div 
      className="video-player-wrapper" 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        overflow: 'hidden',
        zIndex: 1
      }}
    >
      <ReactPlayer 
        url={videoUrl || "https://www.youtube.com/watch?v=XLFA7MWzYac"}
        className="react-player"
        width="100%"
        height="100%"
        controls={true}
        playing={true}
        config={{
          youtube: {
            playerVars: { 
              showinfo: 1,
              modestbranding: 1,
              iv_load_policy: 3,
              fs: 1,
              rel: 0,
              playsinline: 1
            }
          }
        }}
      />
    </div>
  );
};

export default VideoPlayer;