import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./PlaylistComponent.css";

const PlaylistComponent = () => {
  const [playlists, setPlaylists] = useState([]);
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        // Fetch playlists associated with the user's email
        const response = await axios.get(
          `http://localhost:8080/playlist/get/${userEmail}`
        );
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    // Fetch playlists when component mounts
    fetchPlaylists();
  }, [userEmail]);

  const handlePlaylistClick = (playlistId) => {
    localStorage.setItem("playlistId", playlistId);
  };

  return (
    <div className="playlist-container">
      {playlists.map((playlist) => (
        <Link
          key={playlist._id}
          to={`/playlist-details/${playlist._id}`}
          className="playlist-link"
          onClick={() => handlePlaylistClick(playlist._id)}
        >
          <div className="playlist-item">
            <div className="playlist-item-icon">
              <div className="playlist-image">
                <img src={playlist.imageURL} alt={playlist.playlistName} />
              </div>
              <div className="playlist-name">{playlist.playlistName}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PlaylistComponent;
