import express from "express";
import bodyParser from "body-parser";
import multerMiddleware from "./middlewares/multerConfig.js";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'uploads' directory
app.use("/uploads/", express.static(path.join(__dirname, "uploads")));
app.use(multerMiddleware);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

import userRoutes from "./routes/user.js";
app.use("/", userRoutes);

import songRoutes from "./routes/song.js";
app.use("/song", songRoutes);

import playlistRoutes from "./routes/playlist.js";
app.use("/playlist", playlistRoutes);

import artistRoutes from "./routes/artist.js";
app.use("/artist", artistRoutes);

import albumRoutes from "./routes/album.js";
app.use("/album", albumRoutes);

app.listen(process.env.PORT || 8080, function () {
  console.log("Server is running on port 8080");
});

export default app;
