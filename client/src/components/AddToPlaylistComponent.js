import React, { useState, useEffect } from "react";
import axios from "axios";
import "../pages/Song.css";

const AddToPlaylistComponent = () => {
  const [songs, setSongs] = useState([]);
  const userEmail = localStorage.getItem("email");
  const [selectedSongId, setSelectedSongId] = useState(null);
  const playlistId = localStorage.getItem("playlistId");

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
      // // Make sure a song is selected
      // if (!selectedSongId) {
      //   console.error("Please select a song.");
      //   return;
      // }

      console.log("playlist: ", playlistId);
      console.log("song: ", songId);

      // Send a request to add the song to the playlist
      await axios.post(`http://localhost:8080/playlist/add/${playlistId}`, {
        songId: songId,
      });

      console.log("Song added to playlist successfully.");
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
            <th className="length-col">Length</th>
            <th className="artist-col">Artist</th>
            <th className="album-col">Album</th>
            <th className="delete-col"></th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td className="title-col">{song.title}</td>
              <td className="length-col">{song.lengthInSec}</td>
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
    </div>
  );
};

export default AddToPlaylistComponent;
