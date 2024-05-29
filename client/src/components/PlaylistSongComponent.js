import React, { useState, useEffect } from "react";
import axios from "axios";
import "../pages/Song.css";

const PlaylistSongComponent = () => {
  const [songs, setSongs] = useState([]);
  const playlistId = localStorage.getItem("playlistId");

  console.log("id: ", playlistId);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/playlist/get-details/${playlistId}`
        );
        console.log("data: ", response.data);

        const songDetailsPromises = response.data.songs.map((songId) =>
          axios.get(`http://localhost:8080/song/get-song-details/${songId}`)
        );

        const songsDetailsResponses = await Promise.all(songDetailsPromises);

        const songsDetails = songsDetailsResponses.map((res) => res.data);
        setSongs(songsDetails);
      } catch (error) {
        console.error("Error fetching playlist details:", error);
      }
    };

    fetchPlaylistDetails();
  }, [playlistId]);

  const handleDelete = async (songId) => {
    try {
      await axios.delete(
        `http://localhost:8080/playlist/delete/${playlistId}/${songId}`
      );

      // Re-fetch the playlist details after deleting a song
      const response = await axios.get(
        `http://localhost:8080/playlist/get-details/${playlistId}`
      );

      // Fetch details for each song ID in the playlist
      const songDetailsPromises = response.data.songs.map((songId) =>
        axios.get(`http://localhost:8080/song/get-song-details/${songId}`)
      );

      const songsDetailsResponses = await Promise.all(songDetailsPromises);

      // Extract data from each response
      const songsDetails = songsDetailsResponses.map((res) => res.data);
      setSongs(songsDetails);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting song:", error);
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
          {console.log("songs:", songs)}
          {songs &&
            songs.map(
              (song) =>
                song && (
                  <tr key={song._id}>
                    <td className="title-col">{song.title}</td>
                    <td className="artist-col">{song.artistName}</td>
                    <td className="album-col">{song.album}</td>
                    <td className="delete-col">
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(song._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
            )}
        </tbody>
      </table>
    </div>
  );
};

export default PlaylistSongComponent;
