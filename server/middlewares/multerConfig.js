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
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
const multerMiddleware = upload.single("songFile");

export default multerMiddleware;

// Route for uploading a song
// app.post("/upload", upload.single("songFile"), async (req, res) => {
//   try {
//     // Get file information
//     const { originalname, filename, path: filePath } = req.file;

//     // Save file metadata to the database
//     const song = new Song({
//       filename: originalname,
//       filePath,
//       // Add other metadata as needed
//     });
//     await song.save();

//     res.status(201).json({ message: "Song uploaded successfully" });
//   } catch (error) {
//     console.error("Error uploading song:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
