import express from "express";
const router = express.Router();

import {
  addToPlaylist,
  createPlaylist,
  deleteFromPlaylist,
  getAllPlaylists,
  getPlaylistDetails,
} from "../controllers/playlist.js";

// Route to create a new playlist
router.post("/create/:email", createPlaylist);
router.get("/get/:email", getAllPlaylists);
router.get("/get-details/:playlistId", getPlaylistDetails);
router.post("/add/:playlistId", addToPlaylist);
router.delete("/delete/:playlistId/:songId", deleteFromPlaylist);
export default router;
