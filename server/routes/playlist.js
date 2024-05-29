import express from "express";
const router = express.Router();

// import controller
import {
  addToPlaylist,
  createPlaylist,
  deleteFromPlaylist,
  deletePlaylist,
  getAllPlaylists,
  getPlaylistDetails,
  updatePlaylist,
} from "../controllers/playlist.js";

router.post("/create/:email", createPlaylist); // create new playlist for specified user
router.get("/get/:email", getAllPlaylists); // get all of user's playlist
router.get("/get-details/:playlistId", getPlaylistDetails); // get playlist details of specified playlist
router.post("/add/:playlistId", addToPlaylist); // add a song to specified playlist
router.delete("/delete/:playlistId/:songId", deleteFromPlaylist); // delete a song in specified playlist
router.put("/update/:playlistId", updatePlaylist); // update playlist details
router.delete("/deleteAll/:playlistId", deletePlaylist); // delete entire playlist
export default router;
