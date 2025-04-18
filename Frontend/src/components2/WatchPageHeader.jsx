const WatchPageHeader = ({ animeTitle, episodes }) => (
    <div className="watch-page-header">
      <h1>{animeTitle}</h1>
      <div className="episode-list">
        <h3>List of episodes</h3>
        <ul>
          {episodes.map((ep, index) => (
            <li key={index}>{ep}</li>
          ))}
        </ul>
      </div>
      <div className="server-options">
        <h4>If current server doesn’t work, try others:</h4>
        <div className="servers">
          <span>SURE: HD-1 | HD-2</span>
          <span>DUER: HD-1 | HD-2</span>
        </div>
      </div>
    </div>
  );

  // In WatchPageHeader.jsx
const ServerSelector = () => (
    <select className="server-selector">
      <option>SURE: HD-1</option>
      <option>SURE: HD-2</option>
      <option>DUER: HD-1</option>
      <option>DUER: HD-2</option>
    </select>
  );
  export default WatchPageHeader;