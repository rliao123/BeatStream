import Header from "../components/Header";
import { Link } from "react-router-dom";
import "./UserDashboard.css";

const UserDashboard = ({ userDetails }) => {
  return (
    <div className="user-profile">
      <Header />
      <div className="user-profile-parent">
        <header className="user-profile-wrapper">
          <h3 className="user-profile1">User Dashboard</h3>
        </header>
        <section className="dashboard-inner">
          <div className="owner-dashboard">
            <div className="dashboard-options">
              <Link to="/songs" className="dashboard-option">
                <div className="option-content">
                  <img alt="" src="/song-dash.png" className="icon" />
                  <h3>Songs</h3>
                </div>
              </Link>
              <Link
                to={{
                  pathname: "/playlists",
                  state: { ownerDetails: userDetails },
                }}
                className="dashboard-option"
              >
                <div className="option-content">
                  <img alt="" src="/playlist-dash.png" className="icon" />
                  <h3>Playlists</h3>
                </div>
              </Link>
              <Link to="/artists" className="dashboard-option">
                <div className="option-content">
                  <img alt="" src="/artist-dash.png" className="icon" />
                  <h3>Artists</h3>
                </div>
              </Link>
              <Link to="/albums" className="dashboard-option">
                <div className="option-content">
                  <img alt="" src="/album-dash.png" className="icon" />
                  <h3>Albums</h3>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
