import React, { useState, useRef } from 'react';
import VideoPlayer from "../components2/VideoPlayer"; // Adjust the path if necessary

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

export default function AnimeSite() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeEpisode, setActiveEpisode] = useState(1);
  const [activeTab, setActiveTab] = useState('SUB');
  const [currentServer, setCurrentServer] = useState('HD-1');
  const videoRef = useRef(null);
  
  const episodes = [
    { num: 1, title: "You aren't e-rank, are you?" },
    { num: 2, title: "I suppose you aren't aware" },
    { num: 3, title: "Still a long way to go" },
    { num: 4, title: "I need to stop faking" },
    { num: 5, title: "This is what we're trained to..." },
    { num: 6, title: "Don't look down on my guys" },
    { num: 7, title: "The 10th s-rank hunter" },
    { num: 8, title: "Looking up was tiring me out" },
    { num: 9, title: "It was all worth it" },
    { num: 10, title: "We need a hero" },
    { num: 11, title: "It's going to get even more..." },
    { num: 12, title: "Are you the king of humans?" },
    { num: 13, title: "Go to the next target" }
  ];
  
  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  // CSS styles as object for inline styling
  const styles = {
    mainContainer: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#000000',
      color: '#e0e0e0',
      fontFamily: 'Arial, sans-serif',
      overflow: 'hidden'
    },
    sidebar: {
      width: '300px',
      backgroundColor: '#121212',
      borderRight: '1px solid #3a0000',
      overflowY: 'auto'
    },
    sidebarHeader: {
      padding: '16px',
      borderBottom: '1px solid #3a0000',
      backgroundColor: '#000000'
    },
    sidebarTitle: {
      color: '#ff3333',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    searchContainer: {
      position: 'relative',
      marginTop: '8px'
    },
    searchInput: {
      width: '100%',
      backgroundColor: '#1e1e1e',
      border: '1px solid #3a0000',
      color: '#e0e0e0',
      padding: '4px 12px',
      borderRadius: '4px'
    },
    searchIcon: {
      position: 'absolute',
      right: '8px',
      top: '4px',
      width: '16px',
      height: '16px'
    },
    episodeItem: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      borderBottom: '1px solid #222',
      cursor: 'pointer',
      backgroundColor: isActive ? 'rgba(150, 0, 0, 0.2)' : 'transparent',
      borderLeft: isActive ? '4px solid #cc0000' : 'none',
      transition: 'background-color 0.2s'
    }),
    episodeNumber: {
      marginRight: '12px',
      fontWeight: 'bold',
      fontSize: '18px'
    },
    episodeTitle: {
      flex: 1,
      fontSize: '14px'
    },
    playIcon: {
      marginLeft: '8px',
      color: '#ff3333',
      width: '18px',
      height: '18px'
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto'
    },
    videoContainer: {
      position: 'relative',
      width: '100%',
      height: 'calc(100vh - 300px)', // Set explicit height
      minHeight: '400px', // Set minimum height
      backgroundColor: '#000',
      overflow: 'hidden',
      zIndex: 1 // Ensure video is above other elements
    },
    videoPlayer: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    videoControls: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
      padding: '16px'
    },
    progressBar: {
      width: '100%',
      height: '4px',
      backgroundColor: '#333',
      borderRadius: '2px',
      marginBottom: '16px',
      cursor: 'pointer',
      position: 'relative'
    },
    progressFill: {
      height: '100%',
      width: '30%',
      backgroundColor: '#cc0000',
      borderRadius: '2px',
      position: 'relative'
    },
    progressKnob: {
      width: '12px',
      height: '12px',
      backgroundColor: '#ff3333',
      borderRadius: '50%',
      position: 'absolute',
      right: '0',
      top: '-4px'
    },
    controlsRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    controlGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    controlButton: {
      color: 'white',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      padding: '0',
      transition: 'color 0.2s'
    },
    timeDisplay: {
      fontSize: '14px'
    },
    playerOptions: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px',
      marginBottom: '64px'
    },
    optionButton: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      color: 'white',
      padding: '4px 8px',
      fontSize: '12px',
      borderRadius: '4px',
      margin: '0 4px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center'
    },
    optionIcon: {
      marginRight: '4px',
      width: '14px',
      height: '14px'
    },
    episodeInfoBanner: {
      backgroundColor: 'rgba(255, 105, 180, 0.2)',
      padding: '12px',
      textAlign: 'center',
      borderTop: '1px solid #ff69b4',
      borderBottom: '1px solid #ff69b4'
    },
    episodeInfoText: {
      color: '#ffc0cb'
    },
    episodeInfoSubtext: {
      color: '#ffc0cb',
      fontSize: '12px',
      marginTop: '4px'
    },
    serverOptionsContainer: {
      padding: '16px',
      backgroundColor: '#121212',
      borderBottom: '1px solid #3a0000'
    },
    tabsContainer: {
      display: 'flex',
      marginBottom: '16px'
    },
    tab: (isActive) => ({
      padding: '8px 16px',
      cursor: 'pointer',
      backgroundColor: isActive ? '#222' : '#121212',
      color: isActive ? '#ff3333' : '#e0e0e0'
    }),
    serverButtons: {
      display: 'flex',
      gap: '8px'
    },
    serverButton: (isActive) => ({
      padding: '8px 16px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: isActive ? '#cc0000' : '#222',
      color: isActive ? 'white' : '#e0e0e0',
      transition: 'background-color 0.2s'
    }),
    animeInfoContainer: {
      padding: '16px',
      backgroundColor: '#121212'
    },
    animeInfoContent: {
      display: 'flex'
    },
    animeImage: {
      marginRight: '16px',
      height: '240px',
      width: '180px',
      objectFit: 'cover',
      borderRadius: '4px',
      border: '2px solid #3a0000'
    },
    animeDetails: {
      flex: 1
    },
    animeTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#ff3333',
      marginBottom: '8px'
    },
    metadataTags: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '12px'
    },
    metadataTag: {
      padding: '4px 8px',
      fontSize: '12px',
      borderRadius: '4px'
    },
    rTag: {
      backgroundColor: '#222'
    },
    hdTag: {
      backgroundColor: '#cc0000'
    },
    langTag: {
      backgroundColor: '#005a00',
      display: 'flex',
      alignItems: 'center'
    },
    langCounter: {
      marginRight: '4px'
    },
    epTag: {
      backgroundColor: '#00008b'
    },
    tvTag: {
      backgroundColor: '#222'
    },
    durationTag: {
      fontSize: '12px'
    },
    animeDescription: {
      fontSize: '14px',
      marginBottom: '16px',
      lineHeight: '1.5'
    },
    animeInfo: {
      fontSize: '14px',
      marginBottom: '8px',
      lineHeight: '1.5'
    },
    highlightedText: {
      color: '#ff3333'
    },
    viewDetailButton: {
      backgroundColor: '#cc0000',
      color: 'white',
      padding: '4px 12px',
      borderRadius: '4px',
      border: 'none',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    ratingContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '16px'
    },
    ratingStarContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    ratingNumber: {
      marginLeft: '4px',
      fontSize: '18px',
      fontWeight: 'bold'
    },
    voteButton: {
      backgroundColor: '#cc0000',
      color: 'white',
      padding: '4px 12px',
      borderRadius: '4px',
      border: 'none',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    }
  };
  
  return (
    <div style={styles.mainContainer}>
      {/* Episode Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h3 style={styles.sidebarTitle}>List of episodes:</h3>
          <div style={styles.searchContainer}>
            <input 
              type="text" 
              placeholder="Number of ep"
              style={styles.searchInput}
            />
            <div style={styles.searchIcon}>
              <icons.Search />
            </div>
          </div>
        </div>
        
        <div>
          {episodes.map((episode) => (
            <div 
              key={episode.num}
              onClick={() => setActiveEpisode(episode.num)}
              style={styles.episodeItem(activeEpisode === episode.num)}
            >
              <div style={styles.episodeNumber}>{episode.num}</div>
              <div style={styles.episodeTitle}>{episode.title}</div>
              {activeEpisode === episode.num && (
                <div style={styles.playIcon}>
                  <icons.Play />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div style={styles.mainContent}>
       {/* Video Player */}
<div style={styles.videoContainer}>
  <VideoPlayer videoUrl="https://www.youtube.com/watch?v=XLFA7MWzYac&list=PLRe9ARNnYSY7k91_kB0mgGpMO6eVQqifN&index=1" />
  
  {/* Video Controls - Make these have a higher z-index
  <div style={{...styles.videoControls, zIndex: 2}}>
    {/* Progress Bar 
    <div style={styles.progressBar}>
      <div style={styles.progressFill}>
        <div style={styles.progressKnob}></div>
      </div>
    </div>
    
    {/* Control Buttons
    <div style={styles.controlsRow}>
      <div style={styles.controlGroup}>
        <button onClick={togglePlay} style={styles.controlButton}>
          {isPlaying ? <icons.Pause /> : <icons.Play />}
        </button>
        <button onClick={toggleMute} style={styles.controlButton}>
          {isMuted ? <icons.Mute /> : <icons.Volume />}
        </button>
        <span style={styles.timeDisplay}>00:02 / 23:40</span>
      </div>
      
      <div style={styles.controlGroup}>
        <button style={styles.controlButton}>
          <icons.Settings />
        </button>
        <button style={styles.controlButton}>
          <icons.Fullscreen />
        </button>
      </div>
    </div>
  </div>
</div> */}
          
          {/* Player Options */}
          <div style={styles.playerOptions}>
            <div style={styles.controlGroup}>
              <button style={styles.optionButton}>
                <span style={styles.optionIcon}><icons.List /></span>
                Expand
              </button>
              <button style={styles.optionButton}>
                Light: On
              </button>
              <button style={styles.optionButton}>
                Auto Play: On
              </button>
              <button style={styles.optionButton}>
                Auto Next: On
              </button>
              <button style={styles.optionButton}>
                Auto Skip Intro: On
              </button>
            </div>
            
            <div style={styles.controlGroup}>
              <button style={styles.optionButton}>
                <icons.SkipBack />
              </button>
              <button style={styles.optionButton}>
                <icons.SkipForward />
              </button>
            </div>
          </div>
        </div>
        
        {/* Episode Info Banner */}
        <div style={styles.episodeInfoBanner}>
          <p style={styles.episodeInfoText}>You are watching Episode {activeEpisode}</p>
          <p style={styles.episodeInfoSubtext}>If current server doesn't work please try other servers</p>
        </div>
        
        {/* Server Options */}
        <div style={styles.serverOptionsContainer}>
          <div style={styles.tabsContainer}>
            <div 
              style={styles.tab(activeTab === 'SUB')}
              onClick={() => setActiveTab('SUB')}
            >
              SUB:
            </div>
            <div
              style={styles.tab(activeTab === 'DUB')}
              onClick={() => setActiveTab('DUB')}
            >
              DUB:
            </div>
          </div>
          
          <div style={styles.serverButtons}>
            <button 
              style={styles.serverButton(currentServer === 'HD-1')}
              onClick={() => setCurrentServer('HD-1')}
            >
              HD-1
            </button>
            <button 
              style={styles.serverButton(currentServer === 'HD-2')}
              onClick={() => setCurrentServer('HD-2')}
            >
              HD-2
            </button>
          </div>
        </div>
        
        {/* Anime Info */}
        <div style={styles.animeInfoContainer}>
          <div style={styles.animeInfoContent}>
            <img 
              src="/api/placeholder/180/240" 
              alt="Solo Leveling" 
              style={styles.animeImage} 
            />
            
            <div style={styles.animeDetails}>
              <h1 style={styles.animeTitle}>Solo Leveling Season 2: Arise from the Shadow</h1>
              
              <div style={styles.metadataTags}>
                <span style={{...styles.metadataTag, ...styles.rTag}}>R</span>
                <span style={{...styles.metadataTag, ...styles.hdTag}}>HD</span>
                <span style={{...styles.metadataTag, ...styles.langTag}}>
                  <span style={styles.langCounter}>13</span> 🗣️
                </span>
                <span style={{...styles.metadataTag, ...styles.epTag}}>13</span>
                <span style={{...styles.metadataTag, ...styles.tvTag}}>TV</span>
                <span style={styles.durationTag}>• 24m</span>
              </div>
              
              <p style={styles.animeDescription}>
                Sung Jin-Woo, dubbed the weakest hunter of all mankind, grows stronger by the day with the 
                supernatural powers he has gained. However, keeping his skills hidden becomes more difficult as 
                dungeon-related incidents pile up around him.
              </p>
              
              <div style={styles.animeInfo}>
                Aniverse is the best site to watch <span style={styles.highlightedText}>Solo Leveling Season 2: Arise from the Shadow</span> SUB 
                online, or you can even watch <span style={styles.highlightedText}>Solo Leveling Season 2: Arise from the Shadow</span> DUB in HD quality. 
                You can also find <span style={styles.highlightedText}>A-1 Pictures</span> anime on HiAnime website.
              </div>
              
              <button style={styles.viewDetailButton}>View detail</button>
              
              <div style={styles.ratingContainer}>
                <div style={styles.ratingStarContainer}>
                  <icons.Star />
                  <span style={styles.ratingNumber}>9.7</span>
                </div>
                <button style={styles.voteButton}>Vote now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}