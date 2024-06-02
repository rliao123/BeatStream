import express from "express";
const router = express.Router();

import { getAllArtists } from "../controllers/artist.js";

router.get("/get/:email", getAllArtists); // get all artists for specified user

export default router;
