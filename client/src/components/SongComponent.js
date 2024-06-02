import React, { useState, useEffect } from "react";
import axios from "axios";
import "../pages/Song.css";

/**
 * Fetch and display all songs from user's library
 */
const SongComponent = () => {
  const [songs, setSongs] = useState([]);
  const userEmail = localStorage.getItem("email");

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
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/song/delete/${id}`);
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
          {songs.map((song) => (
            <tr key={song.id}>
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongComponent;
