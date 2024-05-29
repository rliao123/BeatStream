import express from "express";

const router = express.Router();

// import controller
import {
  addSong,
  getSongs,
  deleteSong,
  getSongDetails,
} from "../controllers/song.js";

router.post("/add-song/:email", addSong); // add song for user's song collection
router.get("/get/:email/", getSongs); // get all of user's songs
router.get("/get-song-details/:songId/", getSongDetails); // get song details (filepath, artist name, title, etc)
router.delete("/delete/:id/", deleteSong); // delete song from user's song collection

export default router;
