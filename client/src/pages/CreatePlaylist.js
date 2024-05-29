import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import "./AddSong.css";
import axios from "axios";
// import "./CreatePlaylist.css";

const CreatePlaylist = () => {
  //   const user = localStorage.getItem("username");
  //   const restaurantId = localStorage.getItem("restaurant_id");

  const [playlistName, setPlaylistName] = useState("");
  const [playlistImage, setPlaylistImage] = useState("");
  const userEmail = localStorage.getItem("email");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();

      formData.append("playlistName", playlistName);
      formData.append("imageURL", playlistImage);

      // Send a POST request to create a new playlist
      const response = await axios.post(
        `http://localhost:8080/playlist/create/${userEmail}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Redirect to the playlist page after successfully creating the playlist
      navigate("/playlists");
    } catch (error) {
      console.error("Error creating playlist:", error);
      // Handle error if playlist creation fails
    }
  };

  return (
    <div className="user-profile">
      <Header />
      <div className="user-profile-parent">
        <header className="user-profile-wrapper">
          <h3 className="user-profile1">Create Playlist</h3>
        </header>
      </div>
      <div className="add-song-input-outer">
        <form className="add-song-fields" onSubmit={handleSubmit}>
          <div className="add-song-input">
            <div className="add-song-frame-container">
              <TextField
                className="song-frame-item"
                placeholder="Playlist Name"
                value={playlistName}
                required
                onChange={(e) => setPlaylistName(e.target.value)}
                variant="outlined"
                sx={{
                  "& fieldset": { borderColor: "#3BA1B5", borderWidth: "2px" },
                  "& .MuiInputBase-root": {
                    height: "47px",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    fontSize: "14px",
                  },
                  "& .MuiInputBase-input": { color: "#808080" },
                }}
              />
            </div>
            <TextField
              className="song-frame-item"
              placeholder="Playlist Image URL"
              value={playlistImage}
              onChange={(e) => setPlaylistImage(e.target.value)}
              required
              variant="outlined"
              sx={{
                "& fieldset": { borderColor: "#3BA1B5", borderWidth: "2px" },
                "& .MuiInputBase-root": {
                  height: "47px",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  fontSize: "14px",
                },
                "& .MuiInputBase-input": { color: "#808080" },
              }}
            />
          </div>

          <div className="add-playlist-frame">
            <div className="add-playlist-wrapper">
              <Button
                className="add-playlist-button"
                disableElevation={true}
                variant="contained"
                sx={{
                  textTransform: "none",
                  color: "#fff",
                  fontSize: "14",
                  background: "#3BA1B5",
                  borderRadius: "10px",
                  "&:hover": { background: "#338D9E" },
                  width: 148,
                  height: 49,
                }}
                type="submit"
              >
                Create Playlist
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylist;
