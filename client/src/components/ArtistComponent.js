import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ArtistComponent.css";

const ArtistComponent = () => {
  const [artists, setArtists] = useState([]);
  const userEmail = localStorage.getItem("email");

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
          {artists.map((artist) => (
            <tr key={artist.id}>
              <td className="artist-name-col">{artist.artistName}</td>
              <td className="artist-num-col">{artist.numOfSongs}</td>

              <td className="artist-play-col">
                <button className="artist-play-button">
                  Play{" "}
                  <img alt="" src="/play.png" className="icon-play-artists" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArtistComponent;
