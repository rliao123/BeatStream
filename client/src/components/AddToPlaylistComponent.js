import React, { useState, useEffect } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import "../pages/Song.css";

/**
 * Displays all songs from user's collection and allows user to add songs to the playlist they selected.
 */
const AddToPlaylistComponent = () => {
  const [songs, setSongs] = useState([]);
  const userEmail = localStorage.getItem("email");
  const playlistId = localStorage.getItem("playlistId");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/song/get/${userEmail}`
        );
        setSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, [userEmail]);

  const handleAddToPlaylist = async (playlistId, songId) => {
    try {
      await axios.post(`http://localhost:8080/playlist/add/${playlistId}`, {
        songId: songId,
      });

      console.log("Song added to playlist successfully.");
      handleOpenSnackbar();
    } catch (error) {
      console.error("Error adding song to playlist:", error);
    }
  };

  return (
    <div className="songs-list">
      <table>
        <thead>
          <tr>
            <th className="title-col">Title</th>
            <th className="artist-col">Artist</th>
            <th className="album-col">Album</th>
            <th className="delete-col"></th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td className="title-col">{song.title}</td>
              <td className="artist-col">{song.artistName}</td>
              <td className="album-col">{song.album}</td>
              <td className="delete-col">
                <button
                  className="add-to-playlist-button"
                  onClick={() => handleAddToPlaylist(playlistId, song._id)}
                >
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={"Added to playlist"}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            X
          </IconButton>
        }
      />
    </div>
  );
};

export default AddToPlaylistComponent;
