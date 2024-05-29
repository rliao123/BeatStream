import React from "react";
import "./HomepageComponent2.css";

const HomepageComponent2 = () => {
  return (
    <div className="homepage-container-2">
      <div className="homepage-component-2">
        <div className="image-container">
          <img src="/upload.png" alt="Music" className="image" />
        </div>
        <div className="content-container">
          <img src="/upload-circle.png" alt="Upload Icon" className="iconic" />
          <h2>Upload Songs</h2>
          <p>
            Easily upload your favorite tracks to BeatStream with just a few
            clicks. Whether it's the latest hits or timeless classics, you can
            have all your music in one place, ready to stream anytime, anywhere.
          </p>
        </div>
      </div>
      <div className="homepage-component-2">
        <div className="content-container">
          <img
            src="/create-playlist-circle.png"
            alt="Upload Icon"
            className="iconic"
          />
          <h2>Create Playlists</h2>
          <p>
            Organize your music by creating custom playlists that match your
            every mood and occasion. From workout jams to chill vibes, you can
            curate the perfect soundtrack for every moment. With BeatStream,
            making playlists is simple and intuitive, allowing you to enjoy your
            music your way.
          </p>
        </div>
        <div className="image-container">
          <img src="/create-playlist.png" alt="Music" className="image" />
        </div>
      </div>
      <div className="homepage-component-2">
        <div className="image-container">
          <img src="/browse.png" alt="Music" className="image" />
        </div>
        <div className="content-container">
          <img src="/browse-circle.png" alt="Upload Icon" className="iconic" />
          <h2>Browse your library</h2>
          <p>
            Explore and manage your personal music collection effortlessly
            within your BeatStream library. Our user- friendly interface lets
            you quickly find and play your favorite songs, albums, and artists.
            Stay in control of your music with convenient access to all your
            uploaded tracks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomepageComponent2;
