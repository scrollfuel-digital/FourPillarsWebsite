import Contact from "../Models/ContactSchema.js";
import { sendContactConfirmationEmail } from "../utils/emailService.js";

// In-memory cache for offline mode resilience
let inMemoryContacts = [];

// POST /api/contact — submit a contact us form
export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const senderName = (name || "").trim();
    const senderEmail = (email || "").trim();
    const senderPhone = (phone || "").trim();
    const msgSubject = (subject || "General Contact").trim();
    const msgText = (message || "").trim();

    if (!senderName || !senderEmail || !msgText) {
      return res.status(400).json({ error: "Name, email, and message are required fields." });
    }

    let contactData = {
      _id: "cnt_" + Date.now(),
      name: senderName,
      email: senderEmail,
      phone: senderPhone,
      subject: msgSubject,
      message: msgText,
      status: "New",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const createdDoc = await Contact.create({
        name: senderName,
        email: senderEmail,
        phone: senderPhone,
        subject: msgSubject,
        message: msgText,
        status: "New",
      });
      contactData = createdDoc.toObject();
    } catch (dbErr) {
      console.warn("submitContact DB notice (using in-memory fallback):", dbErr.message);
    }

    // Store in memory
    inMemoryContacts.unshift(contactData);

    // Trigger automated confirmation email in background
    sendContactConfirmationEmail({
      name: senderName,
      email: senderEmail,
      subject: msgSubject,
      message: msgText,
      phone: senderPhone,
    }).catch((emailErr) => {
      console.error("Background contact email trigger notice:", emailErr);
    });

    return res.status(201).json({
      success: true,
      message: "Contact message sent successfully.",
      data: contactData,
    });
  } catch (error) {
    console.error("submitContact error:", error);
    return res.status(500).json({ error: "Failed to submit contact request." });
  }
};

// GET /api/admin/contacts — fetch all contact messages
export const getAllContacts = async (req, res) => {
  try {
    let contacts = [];
    try {
      contacts = await Contact.find().sort({ createdAt: -1 });
    } catch (dbErr) {
      console.warn("getAllContacts DB query notice (fallback active):", dbErr.message);
      contacts = inMemoryContacts;
    }

    if (!contacts || contacts.length === 0) {
      contacts = inMemoryContacts;
    }

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error("getAllContacts error:", error);
    return res.status(500).json({ error: "Failed to retrieve contact messages." });
  }
};

// GET /api/admin/contacts/:id — fetch single contact message
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    let contact = null;

    try {
      contact = await Contact.findById(id);
    } catch (dbErr) {
      // Fallback
    }

    if (!contact) {
      contact = inMemoryContacts.find((c) => String(c._id) === id);
    }

    if (!contact) {
      return res.status(404).json({ error: "Contact message not found." });
    }

    return res.status(200).json({ success: true, data: contact });
  } catch (error) {
    console.error("getContactById error:", error);
    return res.status(500).json({ error: "Failed to retrieve contact message." });
  }
};

// PATCH /api/admin/contacts/:id — update contact message status
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status field is required." });
    }

    let updated = null;
    try {
      updated = await Contact.findByIdAndUpdate(
        id,
        { status, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
    } catch (dbErr) {
      // Offline fallback
    }

    const memIndex = inMemoryContacts.findIndex((c) => String(c._id) === id);
    if (memIndex !== -1) {
      inMemoryContacts[memIndex] = {
        ...inMemoryContacts[memIndex],
        status,
        updatedAt: new Date().toISOString(),
      };
      if (!updated) updated = inMemoryContacts[memIndex];
    }

    if (!updated) {
      return res.status(404).json({ error: "Contact message record not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Contact message status updated.",
      data: updated,
    });
  } catch (error) {
    console.error("updateContactStatus error:", error);
    return res.status(500).json({ error: "Failed to update contact status." });
  }
};

// DELETE /api/admin/contacts/:id — delete contact message
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = false;

    try {
      const resDoc = await Contact.findByIdAndDelete(id);
      if (resDoc) deleted = true;
    } catch (dbErr) {
      // Offline fallback
    }

    const memIndex = inMemoryContacts.findIndex((c) => String(c._id) === id);
    if (memIndex !== -1) {
      inMemoryContacts.splice(memIndex, 1);
      deleted = true;
    }

    if (!deleted) {
      return res.status(404).json({ error: "Contact message not found or already deleted." });
    }

    return res.status(200).json({
      success: true,
      message: "Contact message deleted successfully.",
    });
  } catch (error) {
    console.error("deleteContact error:", error);
    return res.status(500).json({ error: "Failed to delete contact message." });
  }
};
