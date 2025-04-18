const AnimeDetailsSection = ({ anime }) => (
    <div className="anime-details">
      <h2>{anime.title}</h2>
      <p>{anime.description}</p>
      <div className="meta">
        <span>{anime.type}</span>
        <span>{anime.duration}</span>
      </div>
    </div>
  );
  export default AnimeDetailsSection;