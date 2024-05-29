import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import PlaylistComponent from "../components/PlaylistComponent";
import axios from "axios";
import "./Song.css";

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/playlist/get/${userEmail}`
        );
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, [userEmail]);

  return (
    <div className="user-profile">
      <Header />
      <div className="user-profile-parent">
        <header className="header-container2">
          <div className="title-with-icon">
            <h3 className="user-profile1">My Playlists</h3>
            <img alt="" src="/playlist-dash.png" className="icon-song" />
          </div>
          <div className="button-container">
            <Link to="/create-playlist" className="add-song-link">
              <button className="add-playlist-button">Create Playlist</button>
            </Link>
          </div>
        </header>
      </div>
      <div className="songs-frame">
        <div className="songs-list">
          <div className="section-header"></div>

          <PlaylistComponent playlists={playlists} />
        </div>
      </div>
    </div>
  );
};

export default Playlist;
