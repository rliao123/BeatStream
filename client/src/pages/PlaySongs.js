import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "../components/Header";
import "./Play.css";

/**
 * Play songs from all songs in user's library
 */
const PlaySongs = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState([]);
  const userEmail = localStorage.getItem("email");
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/song/get/${userEmail}`
        );
        setSongs(response.data);
        if (response.data.length > 0) {
          setCurrentSong(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchSongs();
  }, [userEmail]);

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = `http://localhost:8080/uploads/${encodeURIComponent(
        currentSong.filePath
      )}`;
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };
      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };
      audioRef.current.onended = () => {
        handleNextSong();
      };
    }
  }, [currentSong]);

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handlePreviousSong = () => {
    const newIndex =
      currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(newIndex);
    setCurrentSong(songs[newIndex]);
    setIsPlaying(true); // Automatically start playing the previous song
  };

  const handleNextSong = () => {
    const newIndex =
      currentSongIndex === songs.length - 1 ? 0 : currentSongIndex + 1;
    setCurrentSongIndex(newIndex);
    setCurrentSong(songs[newIndex]);
    setIsPlaying(true); // Automatically start playing the next song
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch((error) => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    return () => {
      // Clean up the audio when the component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="play">
      <Header className="header-home" />
      <div className="music-player">
        <div className="song-info">
          <h2>{currentSong?.title}</h2>
          <p>{currentSong?.artistName}</p>
        </div>

        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
          <div className="time">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
        <div className="controls">
          <button onClick={handlePreviousSong}>
            <img
              alt=""
              src="/prev.png"
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          </button>
          <button onClick={handlePlayPause}>
            {audioRef.current && !audioRef.current.paused ? (
              <img
                alt=""
                src="/music-pause.png"
                style={{
                  width: "70px",
                  height: "70px",
                }}
              />
            ) : (
              <img
                alt=""
                src="/music-play.png"
                style={{
                  width: "70px",
                  height: "70px",
                }}
              />
            )}
          </button>
          <button onClick={handleNextSong}>
            <img
              alt=""
              src="/next.png"
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaySongs;
