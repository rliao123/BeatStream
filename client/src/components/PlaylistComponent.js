import React from "react";
import "./PlaylistComponent.css";

const PlaylistComponent = ({ playlists }) => {
  return (
    <div className="playlist-container">
      {playlists.map((playlist) => (
        <div key={playlist.id} className="playlist-item">
          <div className="playlist-item-icon">
            <div className="playlist-image">
              <img src={playlist.image} alt={playlist.name} />
            </div>
            <div className="playlist-name">{playlist.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistComponent;
