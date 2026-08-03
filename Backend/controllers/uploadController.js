import multer from "multer";
import { uploadToCloudinary } from "../utils/cloudinary.js";

// Store files in memory so we can stream them to Cloudinary
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file
  fileFilter: (_, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed."));
  },
});

// POST /api/admin/upload/image  — single cover image
export const uploadSingleImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file provided." });
    const url = await uploadToCloudinary(req.file.buffer, "fourpillars/covers");
    return res.status(200).json({ success: true, url });
  } catch (error) {
    console.error("uploadSingleImage error:", error);
    return res.status(500).json({ error: "Image upload failed." });
  }
};

// POST /api/admin/upload/gallery  — multiple gallery images (max 10)
export const uploadGalleryImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ error: "No files provided." });

    const urls = await Promise.all(
      req.files.map((f) => uploadToCloudinary(f.buffer, "fourpillars/gallery"))
    );
    return res.status(200).json({ success: true, urls });
  } catch (error) {
    console.error("uploadGalleryImages error:", error);
    return res.status(500).json({ error: "Gallery upload failed." });
  }
};
