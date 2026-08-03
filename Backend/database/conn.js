import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });


const connectDB = async () => {
    try {

        const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;


        if (!mongoURI) {
            throw new Error("MongoDB URI is missing in config.env");
        }


        const conn = await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 10000,
        });


        console.log(
            `MongoDB Connected: ${conn.connection.host}`
        );


    } catch (error) {

        console.error(
            "MongoDB Connection Failed:",
            error.message
        );

        process.exit(1);

    }
};


export default connectDB;