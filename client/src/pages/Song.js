import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SongComponent from "../components/SongComponent";
import "./Song.css";

const Song = () => {
  const [hasSongs, setHasSongs] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const userEmail = localStorage.getItem("email");
        if (userEmail) {
          const response = await axios.get(
            `http://localhost:8080/song/get/${userEmail}`
          );

          setHasSongs(response.data !== null && response.data.length > 0);
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchSongs();
  }, []);

  const handlePlaySongs = () => {
    if (hasSongs) {
      navigate("/play-songs");
    } else {
      console.log("No songs available to play");
    }
  };

  return (
    <div className="user-profile">
      <Header />
      <div className="user-profile-parent">
        <header className="header-container2">
          <div className="title-with-icon">
            <h3 className="user-profile1">My Songs</h3>
            <img alt="" src="/song-dash.png" className="icon-song" />
          </div>
          <div className="button-container">
            <Link to="/add-song" className="add-song-link">
              <button className="add-song-button">Add Song</button>
            </Link>
            {hasSongs && (
              <button className="play-button" onClick={handlePlaySongs}>
                Play <img alt="" src="/play.png" className="icon-play" />
              </button>
            )}
          </div>
        </header>
      </div>
      <div className="songs-frame">
        <div className="songs-list">
          <div className="section-header"></div>
          <SongComponent />
        </div>
      </div>
    </div>
  );
};

export default Song;
