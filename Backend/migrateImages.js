import mongoose from "mongoose";
import dotenv from "dotenv";
import { readFile } from "fs/promises";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
import Post from "./Models/PostSchema.js";

dotenv.config({ path: "./config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

// Map local /images/xxx paths to actual file paths in the frontend assets
const IMAGE_DIR = resolve(
  __dirname,
  "../Frontend/src/assests/images/images"
);

function uploadBuffer(buffer, publicId, folder) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder, public_id: publicId, resource_type: "image", overwrite: true },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }
    ).end(buffer);
  });
}

async function uploadLocalImage(imagePath) {
  // imagePath is like "/images/project_canberra_png_1780484709897.png"
  const filename = imagePath.split("/").pop();
  const filePath = resolve(IMAGE_DIR, filename);

  try {
    const buffer = await readFile(filePath);
    const publicId = filename.replace(/\.[^.]+$/, ""); // strip extension
    const url = await uploadBuffer(buffer, publicId, "fourpillars/projects");
    console.log(`  ✓ Uploaded ${filename} → ${url}`);
    return url;
  } catch (err) {
    console.warn(`  ✗ Could not upload ${filename}: ${err.message}`);
    return null; // keep original if file not found
  }
}

const migrate = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected.\n");

  const projects = await Post.find({});
  console.log(`Found ${projects.length} projects to migrate.\n`);

  for (const project of projects) {
    console.log(`Processing: ${project.name}`);

    // Upload cover image
    let newImage = project.image;
    if (project.image && project.image.startsWith("/images/")) {
      newImage = (await uploadLocalImage(project.image)) || project.image;
    }

    // Upload gallery images
    const newGallery = [];
    for (const img of project.gallery || []) {
      if (img.startsWith("/images/")) {
        const uploaded = await uploadLocalImage(img);
        newGallery.push(uploaded || img);
      } else {
        newGallery.push(img); // already a URL, keep it
      }
    }

    await Post.findByIdAndUpdate(project._id, {
      image: newImage,
      gallery: newGallery,
    });

    console.log(`  → Saved updated URLs for ${project.name}\n`);
  }

  console.log("Migration complete.");
  await mongoose.disconnect();
  process.exit(0);
};

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
