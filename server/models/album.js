import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  albumName: { type: String, required: true },
  artistId: mongoose.Schema.Types.ObjectId,
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  numOfSongs: { type: Number, default: 0 },
});

const Album = mongoose.model("Album", albumSchema);
export { Album };
