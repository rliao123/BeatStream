import { Playlist } from "../models/playlist.js";
import { User } from "../models/user.js";
import { Song } from "../models/song.js";

const createPlaylist = async (req, res) => {
  const { email } = req.params;

  const { playlistName, imageURL } = req.body;

  try {
    const user = await User.findOne({ email });

    // If user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new playlist
    const playlist = new Playlist({
      userId: user._id,
      playlistName: playlistName,
      numOfSongs: 0, // Initially, the playlist will have no songs
      songs: [], // Initially, the playlist will have no songs
      imageURL: imageURL,
    });

    // Save the playlist to the database
    const newPlaylist = await playlist.save();

    res
      .status(201)
      .json({ message: "Playlist created successfully", newPlaylist });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllPlaylists = async (req, res) => {
  const { email } = req.params;

  try {
    // Find the user based on the email
    const user = await User.findOne({ email });

    // If user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all playlists associated with the user
    const playlists = await Playlist.find({ userId: user._id });

    res.status(200).json(playlists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPlaylistDetails = async (req, res) => {
  const { playlistId } = req.params;

  try {
    // Find playlist details by ID
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { songId } = req.body;

  console.log(playlistId);
  console.log(songId);

  try {
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    // Add the song to the playlist's songs array
    playlist.songs.push(song);

    // Update the number of songs in the playlist
    playlist.numOfSongs = playlist.songs.length;

    // Save the updated playlist
    await playlist.save();

    res
      .status(200)
      .json({ message: "Song added to playlist successfully", playlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFromPlaylist = async (req, res) => {
  const { playlistId, songId } = req.params;

  try {
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Remove the song from the playlist's songs array
    const songIndex = playlist.songs.indexOf(songId);

    // If the song is not found, return an error
    if (songIndex === -1) {
      return res.status(404).json({ message: "Song not found in playlist" });
    }

    playlist.songs.splice(songIndex, 1);

    // Update the number of songs in the playlist
    playlist.numOfSongs = playlist.songs.length;

    // Save the updated playlist
    await playlist.save();

    res
      .status(200)
      .json({ message: "Song deleted from playlist successfully", playlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

const deletePlaylist = async (req, res) => {
  const { playlistId } = req.params;

  try {
    // Find playlist by ID and delete it
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
