import express from "express";
import upload from "../middlewares/multerConfig.js";

const router = express.Router();

// import controller
import { addSong, getSongs, deleteSong } from "../controllers/song.js";

router.post("/add-song/:email", upload, addSong);
router.get("/get/:email/", getSongs);
router.delete("/delete/:id/", deleteSong);

export default router;
