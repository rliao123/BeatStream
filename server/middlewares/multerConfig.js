// // multerConfig.js
// import multer from "multer";

// const storage = multer.memoryStorage(); // You can also use diskStorage if you prefer
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 1MB for example
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith("audio/")) {
//       // Accept only audio files
//       cb(null, true);
//     } else {
//       cb(new Error("Only audio files are allowed!"), false);
//     }
//   },
// }).fields([
//   { name: "songFile", maxCount: 1 },
//   { name: "title", maxCount: 1 },
//   { name: "artistName", maxCount: 1 },
//   { name: "album", maxCount: 1 },
//   { name: "lengthInSec", maxCount: 1 },
// ]);

// export default upload;
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Song } = require("./models"); // Import your Song model

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

// Route for uploading a song
app.post("/upload", upload.single("songFile"), async (req, res) => {
  try {
    // Get file information
    const { originalname, filename, path: filePath } = req.file;

    // Save file metadata to the database
    const song = new Song({
      filename: originalname,
      filePath,
      // Add other metadata as needed
    });
    await song.save();

    res.status(201).json({ message: "Song uploaded successfully" });
  } catch (error) {
    console.error("Error uploading song:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
