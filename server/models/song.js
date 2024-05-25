const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  artistId: mongoose.Schema.Types.ObjectId,
  lengthInSec: Number,
  album: String,
});

const Song = mongoose.model("Song", songSchema);
export { Song };
