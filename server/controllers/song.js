import { Song } from "../models/song.js";
import { User } from "../models/user.js";
import { Artist } from "../models/artist.js";
import fs from "fs";

const addSong = async (req, res) => {
  const { email } = req.params;

  const { title, artistName, album } = req.body;

  try {
    const file = req.file; // Assuming you are using multer middleware
    const filePath = `${file.filename}`;

    console.log(filePath);

    const user = await User.findOne({ email });

    console.log("user: ", user);

    // If user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(artistName);

    const trimmedArtistName = artistName.trim();
    let artist = await Artist.findOne({
      artistName: trimmedArtistName,
      userId: user._id,
    });

    console.log(artist);

    // If artist doesn't exist, create a new one
    if (!artist) {
      artist = new Artist({
        artistName: artistName,
        songIds: [],
        numOfSongs: 0,
        userId: user._id,
      });
    }

    // Create a new song entry with the artist ID
    const song = new Song({
      userId: user._id, // Assuming user_id is the authenticated user's ID
      title: title,
      artistId: artist._id,
      artistName: artistName,
      album: album || "",
      filePath: filePath,
    });
    const newSong = await song.save();
    console.log(newSong);

    artist.songIds.push(newSong._id);
    artist.numOfSongs += 1;
    await artist.save();

    res.status(201).json({ message: "Song added successfully", newSong });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSongs = async (req, res) => {
  const { email } = req.params;

  try {
    // Find all songs matching user
    const user = await User.findOne({ email });
    const songs = await Song.find({ userId: user._id });

    res.status(200).send(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

    // Save the updated artist to the database
    await artist.save();

    const filePath = `uploads/${deletedSong.filePath}`;
    fs.unlinkSync(filePath);

    res.status(200).json({ message: "Song deleted successfully" });
  } catch (err) {
    // Handle any errors
    res.status(500).json({ message: err.message });
  }
};

export { getSongs, addSong, deleteSong, getSongDetails };
