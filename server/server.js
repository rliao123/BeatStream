import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { body, validationResult } from "express-validator";
import { json, urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import cors from "cors";
import multer from "multer";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const upload = multer();
app.use(upload.any());

app.use(express.json());
//--------------------DB----------------------//
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

app.listen(process.env.PORT || 8080, function () {
  console.log("Server is running on port 8080");
});

export default app;
