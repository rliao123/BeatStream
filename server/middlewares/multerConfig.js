import multer from "multer";
import { Song } from "../models/song.js";

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory where uploaded files should be stored
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname.split(".")[0];
    // Replace invalid characters with underscores and truncate if necessary
    const sanitizedFilename = originalName
      .replace(/[^a-zA-Z0-9_.]/g, "_")
      .substring(0, 255);
    // Concatenate with the original extension
    const filenameWithExtension =
      sanitizedFilename + "." + file.originalname.split(".")[1];
    cb(null, filenameWithExtension);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "audio/mpeg") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only MP3 files are allowed."), false); // Reject the file
  }
};

// File size limitation (10MB)
const limits = {
  fileSize: 10 * 1024 * 1024,
};

const upload = multer({ storage, fileFilter, limits });
const multerMiddleware = upload.single("songFile");

export default multerMiddleware;
