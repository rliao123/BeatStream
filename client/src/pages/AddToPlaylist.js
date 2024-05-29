import Header from "../components/Header";
import { Link } from "react-router-dom";
import AddToPlaylistComponent from "../components/AddToPlaylistComponent";
import "./Song.css";

const AddToPlaylist = () => {
  const playlistId = localStorage.getItem("playlistId");

  return (
    <div className="user-profile">
      <Header />
      <div className="user-profile-parent">
        <header className="header-container2">
          <div className="title-with-icon">
            <h3 className="user-profile1">All Songs</h3>
            <img alt="" src="/song-dash.png" className="icon-song" />
          </div>
          <div className="button-container">
            <Link
              to={`/playlist-details/${playlistId}`}
              className="add-song-link"
            >
              <button className="add-song-button">View Playlist</button>
            </Link>
          </div>
        </header>
      </div>
      <div className="songs-frame">
        <div className="songs-list">
          <div className="section-header"></div>
          <AddToPlaylistComponent />
        </div>
      </div>
    </div>
  );
};

export default AddToPlaylist;
