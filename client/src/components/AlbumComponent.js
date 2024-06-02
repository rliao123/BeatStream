import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ArtistComponent.css";

/**
 * Fetches all albums in user's library and allows user to play a specific album
 */
const AlbumComponent = () => {
  const [albums, setAlbums] = useState([]);
  const userEmail = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/album/get/${userEmail}`
        );
        setAlbums(response.data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchAlbums();
  }, [userEmail]);

  const handlePlayAlbum = (albumId, songIds) => {
    if (songIds && songIds.length > 0) {
      navigate(`/play-album/${albumId}`, {
        state: { songIds },
      });
    } else {
      console.error("Album songs are undefined.");
    }
  };

  return (
    <div className="artists-list">
      <table>
        <thead>
          <tr>
            <th className="artist-name-col">Album Name</th>
            <th className="artist-num-col">Number of Songs</th>
            <th className="delete-col"></th>
          </tr>
        </thead>
        <tbody>
          {albums
            .filter((album) => album.numOfSongs > 0)
            .map((album) => (
              <tr key={album.id}>
                <td className="artist-name-col">{album.albumName}</td>
                <td className="artist-num-col">{album.numOfSongs}</td>

                <td className="artist-play-col">
                  {album.songs.length > 0 && (
                    <button
                      className="artist-play-button"
                      onClick={() => handlePlayAlbum(album._id, album.songs)}
                    >
                      Play{" "}
                      <img
                        alt=""
                        src="/play.png"
                        className="icon-play-artists"
                      />
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlbumComponent;
