import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import "./AddSong.css";
import axios from "axios";

/**
 * Edit playlist details and save the changes
 */
const EditPlaylist = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistImage, setPlaylistImage] = useState("");
  const playlistId = localStorage.getItem("playlistId");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/playlist/get-details/${playlistId}`
        );
        const { playlistName, imageURL } = response.data;
        setPlaylistName(playlistName);
        setPlaylistImage(imageURL);
      } catch (error) {
        console.error("Error fetching playlist details:", error);
      }
    };

    fetchPlaylistDetails();
  }, [playlistId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8080/playlist/update/${playlistId}`, {
        playlistName,
        playlistImage,
      });

      navigate(`/playlist-details/${playlistId}`);
    } catch (error) {
      console.error("Error updating playlist:", error);
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/playlist/deleteAll/${playlistId}`
      );
      navigate("/playlists");
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  return (
    <div className="user-profile">
      <Header />
      <div className="user-profile-parent">
        <header className="user-profile-wrapper">
          <h3 className="user-profile1">Edit Playlist</h3>
        </header>
      </div>
      <div className="edit-playlist-input-outer">
        <form className="add-song-fields" onSubmit={handleSubmit}>
          <div className="delete-button-container">
            <Button
              className="delete-button-playlist"
              variant="contained"
              sx={{
                textTransform: "none",
                color: "#fff",
                fontSize: "14",
                background: "#FF0000",
                borderRadius: "10px",
                "&:hover": { background: "#DD0000" },
                width: "103px",
                height: "33px",
              }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>

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
                  height: 45,
                }}
                type="submit"
              >
                Update Playlist
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlaylist;
