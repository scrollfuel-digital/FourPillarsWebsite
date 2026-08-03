import Inquiry from "../Models/FormSchema.js";
import { sendInquiryConfirmationEmail } from "../utils/emailService.js";

// In-memory cache for offline mode resilience
let inMemoryInquiries = [];

// POST /api/inquiries — submit a new inquiry
export const submitInquiry = async (req, res) => {
  try {
    const { name, fullName, email, phone, projectSlug, project, message } = req.body;

    const applicantName = (fullName || name || "").trim();
    const targetProject = (project || projectSlug || "General").trim();
    const userEmail = (email || "").trim();
    const userPhone = (phone || "").trim();
    const userMsg = (message || "").trim();

    if (!applicantName || !userEmail || !userPhone || !userMsg) {
      return res.status(400).json({ error: "Name, email, phone, and message are required." });
    }

    let inquiryData = {
      _id: "inq_" + Date.now(),
      fullName: applicantName,
      email: userEmail,
      phone: userPhone,
      project: targetProject,
      message: userMsg,
      status: "New",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const createdDoc = await Inquiry.create({
        fullName: applicantName,
        email: userEmail,
        phone: userPhone,
        project: targetProject,
        message: userMsg,
        status: "New",
      });
      inquiryData = createdDoc.toObject();
    } catch (dbErr) {
      console.warn("submitInquiry DB notice (using in-memory fallback):", dbErr.message);
    }

    // Keep in-memory store updated
    inMemoryInquiries.unshift(inquiryData);

    // Trigger automated email confirmation in background
    sendInquiryConfirmationEmail({
      name: applicantName,
      email: userEmail,
      project: targetProject,
      phone: userPhone,
      message: userMsg,
    }).catch((emailErr) => {
      console.error("Background inquiry email trigger notice:", emailErr);
    });

    return res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully.",
      data: inquiryData,
    });
  } catch (error) {
    console.error("submitInquiry error:", error);
    return res.status(500).json({ error: "Server error submitting inquiry. Please try again." });
  }
};

// GET /api/admin/inquiries — fetch all inquiries
export const getAllInquiries = async (req, res) => {
  try {
    let inquiries = [];
    try {
      inquiries = await Inquiry.find().sort({ createdAt: -1 });
    } catch (dbErr) {
      console.warn("getAllInquiries DB query notice (fallback active):", dbErr.message);
      inquiries = inMemoryInquiries;
    }

    if (!inquiries || inquiries.length === 0) {
      inquiries = inMemoryInquiries;
    }

    return res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    console.error("getAllInquiries error:", error);
    return res.status(500).json({ error: "Failed to retrieve inquiries." });
  }
};

// GET /api/admin/inquiries/:id — fetch single inquiry by ID
export const getInquiryById = async (req, res) => {
  try {
    const { id } = req.params;
    let inquiry = null;

    try {
      inquiry = await Inquiry.findById(id);
    } catch (dbErr) {
      // Fallback search in memory
    }

    if (!inquiry) {
      inquiry = inMemoryInquiries.find((i) => String(i._id) === id);
    }

    if (!inquiry) {
      return res.status(404).json({ error: "Inquiry not found." });
    }

    return res.status(200).json({ success: true, data: inquiry });
  } catch (error) {
    console.error("getInquiryById error:", error);
    return res.status(500).json({ error: "Failed to retrieve inquiry." });
  }
};

// PATCH /api/admin/inquiries/:id — update inquiry status
export const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status field is required." });
    }

    let updated = null;
    try {
      updated = await Inquiry.findByIdAndUpdate(
        id,
        { status, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
    } catch (dbErr) {
      // Offline fallback
    }

    // Always sync in-memory store
    const memIndex = inMemoryInquiries.findIndex((i) => String(i._id) === id);
    if (memIndex !== -1) {
      inMemoryInquiries[memIndex] = {
        ...inMemoryInquiries[memIndex],
        status,
        updatedAt: new Date().toISOString(),
      };
      if (!updated) updated = inMemoryInquiries[memIndex];
    }

    if (!updated) {
      return res.status(404).json({ error: "Inquiry record not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Inquiry status updated successfully.",
      data: updated,
    });
  } catch (error) {
    console.error("updateInquiryStatus error:", error);
    return res.status(500).json({ error: "Failed to update inquiry." });
  }
};

// DELETE /api/admin/inquiries/:id — delete an inquiry
export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = false;

    try {
      const resDoc = await Inquiry.findByIdAndDelete(id);
      if (resDoc) deleted = true;
    } catch (dbErr) {
      // Offline fallback
    }

    const memIndex = inMemoryInquiries.findIndex((i) => String(i._id) === id);
    if (memIndex !== -1) {
      inMemoryInquiries.splice(memIndex, 1);
      deleted = true;
    }

    if (!deleted) {
      return res.status(404).json({ error: "Inquiry not found or already deleted." });
    }

    return res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully.",
    });
  } catch (error) {
    console.error("deleteInquiry error:", error);
    return res.status(500).json({ error: "Failed to delete inquiry." });
  }
};
