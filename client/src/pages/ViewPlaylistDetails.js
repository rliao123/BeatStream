import Header from "../components/Header";
import { Link } from "react-router-dom";
import SongComponent from "../components/SongComponent";
import "./Song.css";

const ViewPlaylistDetails = () => {
  const songs = [
    {
      id: 1,
      title: "Song OneSong",
      length: "3:45",
      artist: "Artist A",
      album: "Album X",
    },
    {
      id: 2,
      title: "Song Two",
      length: "4:05",
      artist: "Artist B",
      album: "Album Y",
    },
    {
      id: 3,
      title: "Song Three",
      length: "2:50",
      artist: "Artist C",
      album: "Album Z",
    },
    {
      id: 4,
      title: "Song Four",
      length: "5:15",
      artist: "Artist D",
      album: "Album W",
    },
  ];
  return (
    <div className="user-profile">
      <Header />
      <div className="user-profile-parent">
        <header className="header-container2">
          <div className="title-with-icon">
            <h3 className="user-profile1">Playlist #1</h3>
          </div>
          <div className="button-container">
            <Link to="/add-to-playlist" className="add-song-link">
              <button className="add-song-button">Add Song</button>
            </Link>
            <Link to="/edit-playlist" className="add-song-link">
              <button className="add-song-button">Edit Playlist</button>
            </Link>
            <button className="play-button">
              Play <img alt="" src="/play.png" className="icon-play" />
            </button>
          </div>
        </header>
      </div>
      <div className="songs-frame">
        <div className="songs-list">
          <div className="section-header"></div>
          <SongComponent songs={songs} />
        </div>
      </div>
    </div>
  );
};

export default ViewPlaylistDetails;
