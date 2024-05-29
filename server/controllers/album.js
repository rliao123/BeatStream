import { Album } from "../models/album.js";
import { User } from "../models/user.js";

const getAllAlbums = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all albums associated with the user
    const albums = await Album.find({ userId: user._id });

    res.status(200).json(albums);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getAllAlbums };
