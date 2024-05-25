const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  playlistName: String,
  numOfSongs: Number,
  songs: [mongoose.Schema.Types.ObjectId],
  imageURL: String,
});

const Playlist = mongoose.model("Playlist", playlistSchema);
export { Playlist };
