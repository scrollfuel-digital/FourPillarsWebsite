import Post from "../Models/PostSchema.js";
import PROJECTS from "../projectsData.js";
let inMemoryProjects = [...PROJECTS];

// GET /api/projects & GET /api/admin/projects — READ ALL PROJECTS
export const getAllProjects = async (req, res) => {
  try {
    let projects = [];
    try {
      projects = await Post.find().sort({ createdAt: -1 });
    } catch (dbErr) {
      console.warn("getAllProjects DB query notice (fallback active):", dbErr.message);
      projects = inMemoryProjects;
    }

    if (!projects || projects.length === 0) {
      projects = inMemoryProjects;
    }

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("getAllProjects error:", error);
    return res.status(500).json({ error: "Failed to retrieve projects." });
  }
};

// GET /api/projects/:slug & GET /api/admin/projects/:slug — READ SINGLE PROJECT
export const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let project = null;

    try {
      project = await Post.findOne({
        $or: [{ slug }, { id: slug }],
      });
    } catch (dbErr) {
      // Offline fallback
    }

    if (!project) {
      project = inMemoryProjects.find(
        (p) => p.slug === slug || p.id === slug
      );
    }

    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error("getProjectBySlug error:", error);
    return res.status(500).json({ error: "Failed to retrieve project details." });
  }
};

// POST /api/admin/projects — CREATE A NEW PROJECT
export const createProject = async (req, res) => {
  try {
    const {
      name,
      slug,
      type,
      location,
      description,
      details,
      specs,
      highlights,
      amenities,
      acres,
      totalUnits,
      priceRange,
      image,
      gallery,
      coordinate,
      mapHotspot,
      phone,
    } = req.body;

    if (!name || !location || !description || !priceRange) {
      return res
        .status(400)
        .json({ error: "Name, location, description, and price range are required." });
    }

    const generatedSlug = (
      slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
    ).trim();
    const generatedId = generatedSlug;

    const newProjectData = {
      id: generatedId,
      name: name.trim(),
      slug: generatedSlug,
      type: type || "plot",
      location: location.trim(),
      description: description.trim(),
      details: Array.isArray(details) ? details : [],
      specs: Array.isArray(specs) ? specs : [],
      highlights: Array.isArray(highlights) ? highlights : [],
      amenities: Array.isArray(amenities) ? amenities : [],
      acres: acres || "",
      totalUnits: totalUnits || "",
      priceRange: priceRange.trim(),
      image: image || "/images/project_melbourne_png_1780484693295.png",
      gallery: Array.isArray(gallery) ? gallery : [],
      coordinate: coordinate || { x: 50, y: 50 },
      mapHotspot: mapHotspot || "",
      phone: phone || "+91 93732 33777",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    let createdDoc = null;
    try {
      createdDoc = await Post.create(newProjectData);
    } catch (dbErr) {
      console.warn("createProject DB notice (using in-memory store):", dbErr.message);
    }

    const finalProject = createdDoc ? createdDoc.toObject() : newProjectData;

    // Check duplicate in memory
    const existingIdx = inMemoryProjects.findIndex((p) => p.slug === generatedSlug);
    if (existingIdx !== -1) {
      inMemoryProjects[existingIdx] = finalProject;
    } else {
      inMemoryProjects.unshift(finalProject);
    }

    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      data: finalProject,
    });
  } catch (error) {
    console.error("createProject error:", error);
    return res.status(500).json({ error: "Server error creating project." });
  }
};

// PUT /api/admin/projects/:slug — UPDATE EXISTING PROJECT
export const updateProject = async (req, res) => {
  try {
    const { slug } = req.params;
    let updatedDoc = null;

    try {
      updatedDoc = await Post.findOneAndUpdate(
        { $or: [{ slug }, { id: slug }] },
        { ...req.body, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
    } catch (dbErr) {
      // Offline fallback
    }

    const memIndex = inMemoryProjects.findIndex(
      (p) => p.slug === slug || p.id === slug
    );

    if (memIndex !== -1) {
      inMemoryProjects[memIndex] = {
        ...inMemoryProjects[memIndex],
        ...req.body,
        updatedAt: new Date().toISOString(),
      };
      if (!updatedDoc) updatedDoc = inMemoryProjects[memIndex];
    }

    if (!updatedDoc) {
      return res.status(404).json({ error: "Project not found to update." });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      data: updatedDoc,
    });
  } catch (error) {
    console.error("updateProject error:", error);
    return res.status(500).json({ error: "Failed to update project." });
  }
};

// DELETE /api/admin/projects/:slug — DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {
    const { slug } = req.params;
    let deleted = false;

    try {
      const resDoc = await Post.findOneAndDelete({
        $or: [{ slug }, { id: slug }],
      });
      if (resDoc) deleted = true;
    } catch (dbErr) {
      // Offline fallback
    }

    const memIndex = inMemoryProjects.findIndex(
      (p) => p.slug === slug || p.id === slug
    );
    if (memIndex !== -1) {
      inMemoryProjects.splice(memIndex, 1);
      deleted = true;
    }

    if (!deleted) {
      return res.status(404).json({ error: "Project not found or already deleted." });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error("deleteProject error:", error);
    return res.status(500).json({ error: "Failed to delete project." });
  }
};
