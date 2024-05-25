const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  artistName: String,
  numOfSongs: Number,
});

const Artist = mongoose.model("Artist", artistSchema);
export { Artist };
