import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ArtistComponent.css";

/**
 * Fetches all artists in user's library and allows user to play a specific artist
 */
const ArtistComponent = () => {
  const [artists, setArtists] = useState([]);
  const userEmail = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/artist/get/${userEmail}`
        );
        setArtists(response.data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, [userEmail]);

  const handlePlayArtist = (artistId, songIds) => {
    if (songIds && songIds.length > 0) {
      navigate(`/play-artist/${artistId}`, {
        state: { songIds },
      });
    } else {
      console.error("Artist songs are undefined.");
    }
  };

  return (
    <div className="artists-list">
      <table>
        <thead>
          <tr>
            <th className="artist-name-col">Artist Name</th>
            <th className="artist-num-col">Number of Songs</th>
            <th className="delete-col"></th>
          </tr>
        </thead>
        <tbody>
          {artists
            .filter((artist) => artist.numOfSongs > 0)
            .map((artist) => (
              <tr key={artist.id}>
                <td className="artist-name-col">{artist.artistName}</td>
                <td className="artist-num-col">{artist.numOfSongs}</td>

                <td className="artist-play-col">
                  {artist.songIds.length > 0 && (
                    <button
                      className="artist-play-button"
                      onClick={() =>
                        handlePlayArtist(artist.id, artist.songIds)
                      }
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

export default ArtistComponent;
