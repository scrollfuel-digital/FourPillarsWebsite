
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync } from "fs";

import connectDB from "./database/conn.js";
import generalRouter from "./routes/general.router.js";
import adminRouter from "./routes/admin.router.js";
import authRouter from "./routes/auth.router.js";

// Load environment variables
dotenv.config({
    path: "./config.env",
});

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const PORT = process.env.PORT || 8080;

// ==========================================
// 1. DATABASE CONNECTION
// ==========================================

await connectDB();

// ==========================================
// 2. CORS CONFIGURATION
// ==========================================

const allowedOrigins = [
    // Local development
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:4173",

    // Vercel frontend
    "https://4-pillars-realty.vercel.app",
    "https://4-pillars-realty-r7dc.vercel.app",

    // Render frontend
    "https://fourpillars-t1er.onrender.com",
    "https://fourpillarswebsite.onrender.com",

    // Production domain
    "https://4pillarsrealty.com",
    "https://www.4pillarsrealty.com",
];

const corsOptions = {
    origin: (origin, callback) => {
     
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        console.error("Blocked CORS origin:", origin);

        return callback(
            new Error(`CORS blocked origin: ${origin}`)
        );
    },

    credentials: true,

    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS",
    ],

    allowedHeaders: [
        "Content-Type",
        "Authorization",
    ],

    optionsSuccessStatus: 204,
};

// Apply CORS before all API routes.
app.use(cors(corsOptions));

// Handle browser preflight requests.
app.options(/.*/, cors(corsOptions));

// ==========================================
// 3. BODY PARSING MIDDLEWARE
// ==========================================

app.use(express.json({ limit: "10mb" }));

app.use(
    express.urlencoded({
        extended: true,
        limit: "10mb",
    })
);

// ==========================================
// 4. API ROUTES
// ==========================================

app.use("/api", generalRouter);

app.use("/api/admin", adminRouter);

app.use("/api/auth", authRouter);

// ==========================================
// 5. HEALTH CHECK
// ==========================================

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "4 Pillars Realty API is running",
        timestamp: new Date().toISOString(),
    });
});

// ==========================================
// 6. SERVE FRONTEND STATIC FILES
// ==========================================

const clientPath = join(__dirname, "../dist/client");

if (existsSync(clientPath)) {
    app.use(express.static(clientPath));

    app.get("*", (req, res) => {
        res.sendFile(join(clientPath, "index.html"));
    });
}

// ==========================================
// 7. ERROR HANDLING
// ==========================================

app.use((err, req, res, next) => {
    console.error("Server Error:", err.message);

    if (err.message.startsWith("CORS blocked origin:")) {
        return res.status(403).json({
            success: false,
            message: "Origin not allowed by CORS",
        });
    }

    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
});

// ==========================================
// 8. START SERVER
// ==========================================

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT} || http://127.0.0.1:${PORT}`
    );
});
