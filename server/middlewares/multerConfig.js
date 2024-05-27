// multerConfig.js
import multer from "multer";

const storage = multer.memoryStorage(); // You can also use diskStorage if you prefer
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 1MB for example
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("audio/")) {
      // Accept only audio files
      cb(null, true);
    } else {
      cb(new Error("Only audio files are allowed!"), false);
    }
  },
}).fields([
  { name: "songFile", maxCount: 1 },
  { name: "title", maxCount: 1 },
  { name: "artistName", maxCount: 1 },
  { name: "album", maxCount: 1 },
  { name: "lengthInSec", maxCount: 1 },
]);

export default upload;
