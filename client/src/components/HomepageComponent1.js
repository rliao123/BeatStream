import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./HomepageComponent.css";

const HomepageComponent1 = () => {
  return (
    <div className="homepage-container">
      <div className="wave-wrapper">
        <img src="/wave1.png" alt="wave1" className="wave wave1" />
        <img src="/wave2.png" alt="wave2" className="wave wave2" />
        <img src="/cloud.png" alt="cloud" className="cloud" />
        <div className="text-container">
          <h1>Upload. Stream. Enjoy.</h1>
          <p>
            Experience music your way with BeatStream. Easily upload your
            favorite tunes, create playlists, and stream your tracks anytime,
            anywhere.{" "}
          </p>
          <Link to="/sign-up" className="signup-link">
            <Button variant="contained" className="get-started">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomepageComponent1;
