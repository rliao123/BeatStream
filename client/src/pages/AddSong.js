import React, { useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import "./AddSong.css";

const AddSong = () => {
  //   const user = localStorage.getItem("username");
  //   const restaurantId = localStorage.getItem("restaurant_id");

  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [fileError, setFileError] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) {
      setFileError("Please upload an MP3 file.");
      return;
    }
    // handle form submission logic here
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== "audio/mp3") {
      setFileError("Only MP3 files are accepted.");
    } else {
      setFileError("");
      setFile(selectedFile);
    }
  };

  return (
    <div className="user-profile">
      <Header />
      <div className="user-profile-parent">
        <header className="user-profile-wrapper">
          <h3 className="user-profile1">Add Song</h3>
        </header>
      </div>
      <div className="add-song-input-outer">
        <form className="add-song-fields">
          <div className="add-song-input">
            <div className="add-song-frame-container">
              <TextField
                className="song-frame-item"
                placeholder="Song Name"
                value={songName}
                required
                onChange={(e) => setSongName(e.target.value)}
                variant="outlined"
                sx={{
                  "& fieldset": { borderColor: "#3BA1B5", borderWidth: "2px" },
                  "& .MuiInputBase-root": {
                    height: "47px",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    fontSize: "14px",
                  },
                  "& .MuiInputBase-input": { color: "#808080" },
                }}
              />
            </div>
            <TextField
              className="song-frame-item"
              placeholder="Artist Name"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              required
              variant="outlined"
              sx={{
                "& fieldset": { borderColor: "#3BA1B5", borderWidth: "2px" },
                "& .MuiInputBase-root": {
                  height: "47px",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  fontSize: "14px",
                },
                "& .MuiInputBase-input": { color: "#808080" },
              }}
            />
          </div>
          <div className="upload-button-wrapper">
            <Button
              className="upload-button"
              disableElevation={true}
              variant="contained"
              sx={{
                textTransform: "none",
                color: "#fff",
                fontSize: "14px",
                background: "#3BA1B5",
                borderRadius: "10px",
                "&:hover": { background: "#338D9E" },
                width: "99px",
                height: "33px",
              }}
              type="button"
            >
              Upload
            </Button>
            <p>only mp3 files accepted</p>
            {fileError && <p className="file-error">{fileError}</p>}
          </div>
          <div className="add-song-frame">
            <div className="add-song-wrapper">
              <Button
                className="add-song-button"
                disableElevation={true}
                variant="contained"
                sx={{
                  textTransform: "none",
                  color: "#fff",
                  fontSize: "14",
                  background: "#3BA1B5",
                  borderRadius: "10px",
                  "&:hover": { background: "#338D9E" },
                  width: 66,
                  height: 49,
                }}
                type="submit"
              >
                Add Song
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSong;
