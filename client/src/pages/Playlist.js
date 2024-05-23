import Header from "../components/Header";
import { Link } from "react-router-dom";
import PlaylistComponent from "../components/PlaylistComponent";
import "./Song.css";

const Playlist = () => {
  const playlists = [
    {
      id: 1,
      name: "Playlist #1",
      image:
        "https://i.pinimg.com/564x/37/4d/5a/374d5a460d915afa74dc826f1f2c7f26.jpg",
    },
    {
      id: 2,
      name: "Playlist #2",
      image:
        "https://i.pinimg.com/736x/27/68/13/2768139f911ffdf6c855cc69aaa00996.jpg",
    },
    {
      id: 3,
      name: "Playlist #3",
      image:
        "https://i.pinimg.com/736x/86/97/ae/8697ae2e6b92042b8087742574ad4e6f.jpg",
    },
    {
      id: 4,
      name: "Playlist #4",
      image:
        "https://i.pinimg.com/originals/a3/82/aa/a382aa4062a97b581a8276fff3748529.jpg",
    },
    {
      id: 5,
      name: "Playlist #5",
      image:
        "https://i.pinimg.com/564x/b4/90/75/b49075580c1b21b30376ab6eac1b8db7.jpg",
    },
  ];
  return (
    <div className="user-profile">
      <Header />
      <div className="user-profile-parent">
        <header className="header-container2">
          <div className="title-with-icon">
            <h3 className="user-profile1">My Playlists</h3>
            <img alt="" src="/playlist-dash.png" className="icon-song" />
          </div>
          <div className="button-container">
            <Link to="/create-playlist" className="add-song-link">
              <button className="add-playlist-button">Create Playlist</button>
            </Link>
          </div>
        </header>
      </div>
      <div className="songs-frame">
        <div className="songs-list">
          <div className="section-header"></div>
          <Link to="/playlist-details" className="playlist-details-link">
            <PlaylistComponent playlists={playlists} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
