import Header from "../components/Header";
import "./UserProfile.css";

const UserProfile = () => {
  return (
    <div className="user-profile">
      <Header />
      <div className="user-profile-parent">
        <header className="user-profile-wrapper">
          <h3 className="user-profile1">User Profile</h3>
        </header>
        <div className="user-profile-container">
          <h2>Name: Leo Leo</h2>
          <h2>Email: leo@gmail.com</h2>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
