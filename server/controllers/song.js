import { Song } from "../models/song.js";
import { User } from "../models/user.js";
import { Artist } from "../models/artist.js";
import { Album } from "../models/album.js";
import { Playlist } from "../models/playlist.js";
import fs from "fs";

// Add song to library
const addSong = async (req, res) => {
  const { email } = req.params;

  const { title, artistName, album } = req.body;

  try {
    const file = req.file; // using multer middleware
    const filePath = `${file.filename}`;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const trimmedArtistName = artistName.trim();
    let artist = await Artist.findOne({
      artistName: trimmedArtistName,
      userId: user._id,
    });

    // If artist doesn't exist, create a new one
    if (!artist) {
      artist = new Artist({
        artistName: artistName,
        songIds: [],
        numOfSongs: 0,
        userId: user._id,
      });
    }

    let artistAlbum = await Album.findOne({
      artistId: artist._id,
      userId: user._id,
      albumName: album || "",
    });

    if (!artistAlbum) {
      // If album doesn't exist, create a new one
      artistAlbum = new Album({
        userId: user._id,
        albumName: album || "",
        artistId: artist._id,
        songs: [],
        numOfSongs: 0,
      });
    }

    const song = new Song({
      userId: user._id,
      title: title,
      artistId: artist._id,
      artistName: artistName,
      album: album || "",
      filePath: filePath,
    });
    const newSong = await song.save();

    artistAlbum.songs.push(newSong._id);
    artistAlbum.numOfSongs += 1;
    await artistAlbum.save();

    artist.songIds.push(newSong._id);
    artist.numOfSongs += 1;
    await artist.save();

    res.status(201).json({ message: "Song added successfully", newSong });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Find all songs matching user
const getSongs = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    const songs = await Song.find({ userId: user._id });

    res.status(200).send(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get song details
const getSongDetails = async (req, res) => {
  const { songId } = req.params;

  try {
    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete song, update artists songs array, update playlists with that song, remove song file
const deleteSong = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSong = await Song.findByIdAndDelete(id);

    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    const artist = await Artist.findById(deletedSong.artistId);

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    artist.songIds = artist.songIds.filter(
      (songId) => songId.toString() !== id
    );
    artist.numOfSongs -= 1;
    await artist.save();

    const albums = await Album.find({ songs: id });

    for (const album of albums) {
      album.songs = album.songs.filter((songId) => songId.toString() !== id);
      album.numOfSongs -= 1;
      await album.save();
    }

    await Playlist.updateMany({ songs: id }, { $pull: { songs: id } });

    const filePath = `uploads/${deletedSong.filePath}`;
    fs.unlinkSync(filePath);

    res.status(200).json({ message: "Song deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getSongs, addSong, deleteSong, getSongDetails };
