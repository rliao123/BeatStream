import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  artistName: { type: String, required: true },
  songIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  numOfSongs: { type: Number, default: 0 },
});

const Artist = mongoose.model("Artist", artistSchema);
export { Artist };
