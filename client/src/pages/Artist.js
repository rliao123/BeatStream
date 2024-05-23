import Header from "../components/Header";
import { Link } from "react-router-dom";
import ArtistComponent from "../components/ArtistComponent";
import "./Song.css";

const Artist = () => {
  const artists = [
    {
      id: 1,
      name: "Artist 1",
      numOfSongs: "3",
    },
    {
      id: 2,
      name: "Artist 2",
      numOfSongs: "2",
    },
    {
      id: 3,
      name: "Artist 3",
      numOfSongs: "10",
    },
    {
      id: 4,
      name: "Artist 4",
      numOfSongs: "8",
    },
  ];
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
          <ArtistComponent artists={artists} />
        </div>
      </div>
    </div>
  );
};

export default Artist;
