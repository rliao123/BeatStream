import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  artistName: String,
  artistId: mongoose.Schema.Types.ObjectId,
  lengthInSec: Number,
  album: { type: String, default: "" },
});

const Song = mongoose.model("Song", songSchema);
export { Song };
