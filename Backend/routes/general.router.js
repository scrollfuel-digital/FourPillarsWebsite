import express from "express";
import { submitInquiry } from "../controllers/inquiryController.js";
import { submitContact } from "../controllers/contactController.js";
import { getAllProjects, getProjectBySlug } from "../controllers/postControllers.js";

const router = express.Router();

// POST /api/inquiries — Public inquiry form submission
router.post("/inquiries", submitInquiry);

// POST /api/contact — Public contact us form submission
router.post("/contact", submitContact);

// GET /api/projects — Public read all projects
router.get("/projects", getAllProjects);

// GET /api/projects/:slug — Public read project by slug/id
router.get("/projects/:slug", getProjectBySlug);

export default router;
