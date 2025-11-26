import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allowed file types
// const fileTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
const fileTypes =
  /jpeg|jpg|png|gif|bmp|svg|webp|tiff|pdf|doc|docx|txt|rtf|odt|xls|xlsx|csv|ods|ppt|pptx|odp/;

// Storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads")); // ✅ Now correct relative path
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Unsupported file type"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max 10MB
});

export default upload;
