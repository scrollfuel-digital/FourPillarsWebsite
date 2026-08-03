import express from "express";
import {
  upload,
  uploadSingleImage,
  uploadGalleryImages,
} from "../controllers/uploadController.js";
import {
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
} from "../controllers/inquiryController.js";
import {
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from "../controllers/contactController.js";
import {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/postControllers.js";

const router = express.Router();

/* ==========================================================================
   IMAGE UPLOAD API (Cloudinary)
   ========================================================================== */
// POST /api/admin/upload/image — Upload single cover image
router.post("/upload/image", upload.single("image"), uploadSingleImage);

// POST /api/admin/upload/gallery — Upload multiple gallery images
router.post("/upload/gallery", upload.array("images", 10), uploadGalleryImages);

/* ==========================================================================
   INQUIRIES ADMIN API (Lead Modal / Form Inquiries)
   ========================================================================== */
// GET /api/admin/inquiries — Read all inquiries
router.get("/inquiries", getAllInquiries);
router.get("/form-submissions", getAllInquiries);

// GET /api/admin/inquiries/:id — Read single inquiry by ID
router.get("/inquiries/:id", getInquiryById);

// PATCH|PUT /api/admin/inquiries/:id — Update status of inquiry
router.patch("/inquiries/:id", updateInquiryStatus);
router.put("/inquiries/:id", updateInquiryStatus);

// DELETE /api/admin/inquiries/:id — Delete inquiry
router.delete("/inquiries/:id", deleteInquiry);


/* ==========================================================================
   CONTACT US FORM ADMIN API (Contact Us Submissions)
   ========================================================================== */
// GET /api/admin/contacts — Read all contact us form entries
router.get("/contacts", getAllContacts);

// GET /api/admin/contacts/:id — Read single contact entry
router.get("/contacts/:id", getContactById);

// PATCH|PUT /api/admin/contacts/:id — Update contact message status
router.patch("/contacts/:id", updateContactStatus);
router.put("/contacts/:id", updateContactStatus);

// DELETE /api/admin/contacts/:id — Delete contact entry
router.delete("/contacts/:id", deleteContact);


/* ==========================================================================
   PROJECTS ADMIN API (Full CRUD for Projects)
   ========================================================================== */
// GET /api/admin/projects — Read all projects
router.get("/projects", getAllProjects);

// GET /api/admin/projects/:slug — Read project by slug/id
router.get("/projects/:slug", getProjectBySlug);

// POST /api/admin/projects — Create a new project
router.post("/projects", createProject);

// PUT|PATCH /api/admin/projects/:slug — Update an existing project
router.put("/projects/:slug", updateProject);
router.patch("/projects/:slug", updateProject);

// DELETE /api/admin/projects/:slug — Delete a project
router.delete("/projects/:slug", deleteProject);

export default router;
