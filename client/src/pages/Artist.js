import Header from "../components/Header";
import { Link } from "react-router-dom";
import ArtistComponent from "../components/ArtistComponent";
import "./Song.css";

const Artist = () => {
  return (
    <div className="user-profile">
      <Header />
      <div className="user-profile-parent">
        <header className="header-container2">
          <div className="title-with-icon">
            <h3 className="user-profile1">Artists</h3>
            <img alt="" src="/artist-dash.png" className="icon-artist" />
          </div>
        </header>
      </div>
      <div className="songs-frame">
        <div className="songs-list">
          <div className="section-header"></div>
          <ArtistComponent />
        </div>
      </div>
    </div>
  );
};

export default Artist;
