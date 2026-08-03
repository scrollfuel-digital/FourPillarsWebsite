import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "./Models/PostSchema.js";
import PROJECTS from "./projectsData.js";

dotenv.config({ path: "./config.env" });

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected.");

        await Post.deleteMany({});
        await Post.insertMany(PROJECTS);
        console.log(`Seeded ${PROJECTS.length} projects successfully.`);
    } catch (error) {
        console.error("Seed error:", error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

seed();
