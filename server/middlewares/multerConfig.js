import multer from "multer";
import { Song } from "../models/song.js";

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory where uploaded files should be stored
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Use the original file name for storing the uploaded file
    const encodedFilename = encodeURIComponent(file.originalname);
    cb(null, encodedFilename);
  },
});

const upload = multer({ storage });
const multerMiddleware = upload.single("songFile");

export default multerMiddleware;
