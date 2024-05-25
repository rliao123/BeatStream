import React from "react";
import "./ArtistComponent.css";

const ArtistComponent = ({ artists }) => {
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
              <td className="artist-name-col">{artist.name}</td>
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
