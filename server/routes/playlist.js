import express from "express";
const router = express.Router();

import {
  addToPlaylist,
  createPlaylist,
  deleteFromPlaylist,
  deletePlaylist,
  getAllPlaylists,
  getPlaylistDetails,
  updatePlaylist,
} from "../controllers/playlist.js";

// Route to create a new playlist
router.post("/create/:email", createPlaylist);
router.get("/get/:email", getAllPlaylists);
router.get("/get-details/:playlistId", getPlaylistDetails);
router.post("/add/:playlistId", addToPlaylist);
router.delete("/delete/:playlistId/:songId", deleteFromPlaylist);
router.put("/update/:playlistId", updatePlaylist);
router.delete("/deleteAll/:playlistId", deletePlaylist);
export default router;
