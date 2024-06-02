import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import PlaylistSongComponent from "../components/PlaylistSongComponent";
import axios from "axios";
import "./Song.css";

const ViewPlaylistDetails = () => {
  const [playlist, setPlaylist] = useState(null);
  const { playlistId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/playlist/get-details/${playlistId}`
        );
        setPlaylist(response.data);
      } catch (error) {
        console.error("Error fetching playlist details:", error);
      }
    };

    fetchPlaylistDetails();
  }, [playlistId]);

  const handlePlayPlaylist = () => {
    if (playlist && playlist.songs && playlist.songs.length > 0) {
      navigate(`/play-playlist/${playlistId}`, {
        state: { songIds: playlist.songs },
      });
    } else {
      console.error("Playlist or playlist songs are undefined.");
    }
  };

  return (
    <div className="user-profile">
      <Header />
      <div className="user-profile-parent">
        <header className="header-container2">
          <div className="title-with-icon">
            <h3 className="user-profile1">
              {playlist ? playlist.playlistName : "Loading..."}
            </h3>
          </div>
          <div className="button-container">
            <Link to="/add-to-playlist" className="add-song-link">
              <button className="add-song-button">Add Song</button>
            </Link>
            <Link to="/edit-playlist" className="add-song-link">
              <button className="add-song-button">Edit Playlist</button>
            </Link>
            {playlist && playlist.songs.length > 0 && (
              <button className="play-button" onClick={handlePlayPlaylist}>
                Play <img alt="" src="/play.png" className="icon-play" />
              </button>
            )}
          </div>
        </header>
      </div>
      <div className="songs-frame">
        <div className="songs-list">
          <div className="section-header"></div>
          {playlist && playlist.songs.length > 0 && <PlaylistSongComponent />}
        </div>
      </div>
    </div>
  );
};

export default ViewPlaylistDetails;
