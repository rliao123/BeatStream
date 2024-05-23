import React from "react";
import "../pages/Song.css";

const SongComponent = ({ songs }) => {
  const handleDelete = (id) => {
    // Add logic to handle the delete action
    console.log(`Delete song with id: ${id}`);
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
              <td className="length-col">{song.length}</td>
              <td className="artist-col">{song.artist}</td>
              <td className="album-col">{song.album}</td>
              <td className="delete-col">
                <button
                  className="delete-button"
                  onClick={() => handleDelete(song.id)}
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
