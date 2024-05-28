import express from "express";
//import upload from "../middlewares/multerConfig.js";

const router = express.Router();

// import controller
import {
  addSong,
  getSongs,
  deleteSong,
  getSongDetails,
} from "../controllers/song.js";

router.post("/add-song/:email", addSong);
router.get("/get/:email/", getSongs);
router.get("/get-song-details/:songId/", getSongDetails);
router.delete("/delete/:id/", deleteSong);

export default router;
