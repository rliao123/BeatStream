import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import "./AddSong.css";

const AddSong = () => {
  //   const user = localStorage.getItem("username");
  //   const restaurantId = localStorage.getItem("restaurant_id");

  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [length, setLength] = useState("");
  const [fileError, setFileError] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const userEmail = localStorage.getItem("email");

  const addSong = async (formData, userEmail) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/add-song/${userEmail}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("songFile", e.target.songFile.files[0]);
    formData.append("title", songName);
    formData.append("artistName", artistName);
    formData.append("album", albumName);
    formData.append("lengthInSec", length);

    await addSong(formData, userEmail);
    setSongName("");
    setArtistName("");
    setAlbumName("");
    setLength("");
    setFile("");
    setFileName("");
    navigate("/add-song");
  };

  const handleFileChange = (e) => {
    console.log("check: ", e.target.files);
    const selectedFile = e.target.files[0];
    console.log("selected file: ", selectedFile);
    if (selectedFile && selectedFile.type !== "audio/mpeg") {
      setFileError("Only MP3 files are accepted.");
    } else {
      setFileError("");
      setFile(selectedFile);
      setFileName(selectedFile.name);
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
        <form className="add-song-fields" onSubmit={handleSubmit}>
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
            <TextField
              className="song-frame-item"
              placeholder="Album Name"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
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
            <TextField
              className="song-frame-item"
              placeholder="Length In Seconds"
              value={length}
              onChange={(e) => setLength(e.target.value)}
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
            <label htmlFor="songFile">
              <Button
                className="upload-button"
                disableElevation={true}
                variant="contained"
                component="span" // This is important for file input
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
            </label>
            <input
              accept=".mp3"
              id="songFile"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {/* <p>only mp3 files accepted</p> */}
            {fileName && <p className="file-name">{fileName}</p>}
          </div>
          {fileError && <p className="file-error">{fileError}</p>}
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
