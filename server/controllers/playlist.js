import { Playlist } from "../models/playlist.js";
import { User } from "../models/user.js";
import { Song } from "../models/song.js";

// Create a new playlist for user with provided name and imageURL
const createPlaylist = async (req, res) => {
  const { email } = req.params;

  const { playlistName, imageURL } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const playlist = new Playlist({
      userId: user._id,
      playlistName: playlistName,
      numOfSongs: 0,
      songs: [],
      imageURL: imageURL,
    });

    const newPlaylist = await playlist.save();

    res
      .status(201)
      .json({ message: "Playlist created successfully", newPlaylist });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Find all playlists associated with the user
const getAllPlaylists = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const playlists = await Playlist.find({ userId: user._id });

    res.status(200).json(playlists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get playlist details (playlist name, image, songs, number of songs)
const getPlaylistDetails = async (req, res) => {
  const { playlistId } = req.params;

  try {
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a song to playlist's songs array and update num of songs
const addToPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { songId } = req.body;

  try {
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    playlist.songs.push(song);
    playlist.numOfSongs = playlist.songs.length;

    await playlist.save();

    res
      .status(200)
      .json({ message: "Song added to playlist successfully", playlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove the song from the playlist's songs array and update num of songs in playlist
const deleteFromPlaylist = async (req, res) => {
  const { playlistId, songId } = req.params;

  try {
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    const songIndex = playlist.songs.indexOf(songId);

    if (songIndex === -1) {
      return res.status(404).json({ message: "Song not found in playlist" });
    }

    playlist.songs.splice(songIndex, 1);
    playlist.numOfSongs = playlist.songs.length;

    await playlist.save();

    res
      .status(200)
      .json({ message: "Song deleted from playlist successfully", playlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update playlist details
const updatePlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { playlistName, playlistImage } = req.body;

  try {
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    playlist.playlistName = playlistName;
    playlist.imageURL = playlistImage;

    await playlist.save();

    res
      .status(200)
      .json({ message: "Playlist updated successfully", playlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete playlist via playlist id
const deletePlaylist = async (req, res) => {
  const { playlistId } = req.params;

  try {
    const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);

    if (!deletedPlaylist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.status(200).json({ message: "Playlist deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createPlaylist,
  getAllPlaylists,
  getPlaylistDetails,
  addToPlaylist,
  deleteFromPlaylist,
  updatePlaylist,
  deletePlaylist,
};
