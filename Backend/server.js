import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync } from "fs";
import connectDB from "./database/conn.js"
import generalRouter from "./routes/general.router.js";
import adminRouter from "./routes/admin.router.js";
import authRouter from "./routes/auth.router.js";
dotenv.config({
    path: "./config.env"
});

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 8080;
// Database Connection
await connectDB();

app.use(
    cors({

        origin: [
            "http://localhost:5173",
            "http://localhost:5174",

            "https://4-pillars-realty.vercel.app",
            "https://4-pillars-realty-r7dc.vercel.app",

            "https://fourpillars-t1er.onrender.com",
            "https://fourpillarswebsite.onrender.com",
            
            "https://4pillarsrealty.com",
            "https://www.4pillarsrealty.com"
            
        ],

        credentials: true

    })
);

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

// Routes
app.use("/api", generalRouter);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);

// Serve frontend static files in production
const clientPath = join(__dirname, "../dist/client");
if (existsSync(clientPath)) {
    app.use(express.static(clientPath));
    app.get("*", (req, res) => {
        res.sendFile(join(clientPath, "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} || http://127.0.0.1:${PORT}`);
});