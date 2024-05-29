import { Artist } from "../models/artist.js";
import { User } from "../models/user.js";

const getAllArtists = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all artists associated with the user
    const artists = await Artist.find({ userId: user._id });

    res.status(200).json(artists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getAllArtists };
