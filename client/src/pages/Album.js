import Header from "../components/Header";
import AlbumComponent from "../components/AlbumComponent";
import "./Song.css";

const Album = () => {
  return (
    <div className="user-profile">
      <Header />
      <div className="user-profile-parent">
        <header className="header-container2">
          <div className="title-with-icon">
            <h3 className="user-profile1">Album</h3>
            <img alt="" src="/album-dash.png" className="icon-artist" />
          </div>
        </header>
      </div>
      <div className="songs-frame">
        <div className="songs-list">
          <div className="section-header"></div>
          <AlbumComponent />
        </div>
      </div>
    </div>
  );
};

export default Album;
