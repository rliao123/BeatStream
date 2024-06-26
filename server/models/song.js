import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  artistName: String,
  artistId: mongoose.Schema.Types.ObjectId,
  album: { type: String, default: "" },
  filePath: String,
});

const Song = mongoose.model("Song", songSchema);
export { Song };
