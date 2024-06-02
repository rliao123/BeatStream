import express from "express";
const router = express.Router();

import { getAllAlbums } from "../controllers/album.js";

router.get("/get/:email", getAllAlbums);

export default router;
