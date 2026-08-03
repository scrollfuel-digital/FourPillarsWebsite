import React, { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Building2, X, Upload, Plus, Trash2, ImageIcon } from "lucide-react";
import { Project } from "../../types";

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface ProjectFormState {
  name: string;
  slug: string;
  type: "plot" | "apartment" | "township" | "upcoming";
  status: "ongoing" | "completed" | "upcoming";
  location: string;
  description: string;
  details: string; // newline separated — split into array on submit
  specs: ProjectSpec[];
  highlights: string; // comma separated — split into array on submit
  amenities: string; // comma separated — split into array on submit
  acres: string;
  totalUnits: string;
  priceRange: string;
  image: string; // cover image — data URL or hosted URL
  gallery: string[]; // gallery images — data URLs or hosted URLs
  coordinate: { x: number; y: number };
  mapHotspot: string;
  phone: string;
}

interface ProjectFormModalProps {
  isOpen: boolean;
  editingProject: Project | null;
  form: ProjectFormState;
  onFormChange: (form: ProjectFormState) => void;
  onClose: () => void;
  onSubmit: (event: React.FormEvent) => void;
}

const API_BASE = import.meta.env.VITE_API_URL || "/api";

async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${API_BASE}/admin/upload/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth_token") ?? ""}`,
    },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok || !data.url) throw new Error(data.error || "Upload failed");
  return data.url;
}

async function uploadGallery(files: File[]): Promise<string[]> {
  const formData = new FormData();
  files.forEach((f) => formData.append("images", f));
  const res = await fetch(`${API_BASE}/admin/upload/gallery`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth_token") ?? ""}`,
    },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok || !data.urls) throw new Error(data.error || "Upload failed");
  return data.urls;
}

export default function ProjectFormModal({
  isOpen,
  editingProject,
  form,
  onFormChange,
  onClose,
  onSubmit,
}: ProjectFormModalProps) {
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onFormChange({ ...form, image: url });
    } catch (err) {
      alert("Cover image upload failed. Check Cloudinary credentials.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const urls = await uploadGallery(files);
      onFormChange({ ...form, gallery: [...form.gallery, ...urls] });
    } catch (err) {
      alert("Gallery upload failed. Check Cloudinary credentials.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeGalleryImage = (index: number) => {
    onFormChange({
      ...form,
      gallery: form.gallery.filter((_, i) => i !== index),
    });
  };

  const addSpec = () => {
    onFormChange({ ...form, specs: [...form.specs, { label: "", value: "" }] });
  };

  const updateSpec = (index: number, key: keyof ProjectSpec, value: string) => {
    const nextSpecs = form.specs.map((spec, i) =>
      i === index ? { ...spec, [key]: value } : spec,
    );
    onFormChange({ ...form, specs: nextSpecs });
  };

  const removeSpec = (index: number) => {
    onFormChange({ ...form, specs: form.specs.filter((_, i) => i !== index) });
  };

  const generateSlug = () => {
    const slug = form.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    onFormChange({ ...form, slug });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative text-slate-100 my-8"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {editingProject
                    ? "Edit Project Details"
                    : "Publish New Real Estate Project"}
                </h3>
                <p className="text-xs text-slate-400">
                  {editingProject
                    ? `Editing ${editingProject.slug}`
                    : "Fill out details to list a new property"}
                </p>
              </div>
            </div>

            <form
              onSubmit={onSubmit}
              className="mt-4 space-y-3.5 text-xs max-h-[70vh] overflow-y-auto pr-1"
            >
              {/* Title + Slug */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-300 uppercase mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    onFormChange({ ...form, name: e.target.value })
                  }
                  placeholder="e.g. Melbourne City Sector III"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-slate-300 uppercase mb-1">
                  Slug
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) =>
                      onFormChange({ ...form, slug: e.target.value })
                    }
                    placeholder="melbourne-city-sector-iii"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={generateSlug}
                    className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer"
                  >
                    Auto-generate
                  </button>
                </div>
              </div>

              {/* Category / Status / Price */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-300 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) =>
                      onFormChange({
                        ...form,
                        type: e.target.value as ProjectFormState["type"],
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="plot">Plot</option>
                    <option value="apartment">Apartment</option>
                    <option value="township">Township</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-300 uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      onFormChange({
                        ...form,
                        status: e.target.value as ProjectFormState["status"],
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-300 uppercase mb-1">
                    Price Range
                  </label>
                  <input
                    type="text"
                    value={form.priceRange}
                    onChange={(e) =>
                      onFormChange({ ...form, priceRange: e.target.value })
                    }
                    placeholder="₹25 Lakh onward"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-300 uppercase mb-1">
                  Location & Corridor *
                </label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) =>
                    onFormChange({ ...form, location: e.target.value })
                  }
                  placeholder="Wardha Road, Nagpur"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-300 uppercase mb-1">
                  Project Overview / Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    onFormChange({ ...form, description: e.target.value })
                  }
                  placeholder="A masterplanned gated layout with premium RL plots..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Details (bullet list) */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-300 uppercase mb-1">
                  Details (one bullet point per line)
                </label>
                <textarea
                  rows={4}
                  value={form.details}
                  onChange={(e) =>
                    onFormChange({ ...form, details: e.target.value })
                  }
                  placeholder={
                    "71 Residential Plots spread over 4 Acres in Kaldongri, Nagpur\nNMRDA Sanctioned RL Status\nWide paved asphalt roads with underground electrical & sewerage networks"
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Acres / Total Units */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-300 uppercase mb-1">
                    Acres
                  </label>
                  <input
                    type="text"
                    value={form.acres}
                    onChange={(e) =>
                      onFormChange({ ...form, acres: e.target.value })
                    }
                    placeholder="4"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-300 uppercase mb-1">
                    Total Units
                  </label>
                  <input
                    type="text"
                    value={form.totalUnits}
                    onChange={(e) =>
                      onFormChange({ ...form, totalUnits: e.target.value })
                    }
                    placeholder="71"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Specs table */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-extrabold text-slate-300 uppercase">
                    Specifications
                  </label>
                  <button
                    type="button"
                    onClick={addSpec}
                    className="flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add Spec
                  </button>
                </div>
                <div className="space-y-2">
                  {form.specs.map((spec, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={spec.label}
                        onChange={(e) =>
                          updateSpec(index, "label", e.target.value)
                        }
                        placeholder="Project Area"
                        className="w-1/2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) =>
                          updateSpec(index, "value", e.target.value)
                        }
                        placeholder="4 Acres"
                        className="w-1/2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeSpec(index)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {form.specs.length === 0 && (
                    <p className="text-slate-500 text-[11px] italic">
                      No specs added yet — click "Add Spec" to add label/value
                      pairs.
                    </p>
                  )}
                </div>
              </div>

              {/* Highlights / Amenities */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-300 uppercase mb-1">
                  Highlights (comma separated)
                </label>
                <input
                  type="text"
                  value={form.highlights}
                  onChange={(e) =>
                    onFormChange({ ...form, highlights: e.target.value })
                  }
                  placeholder="NMRDA Sanctioned RL, Gated Community, 80% Loan Approved"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-slate-300 uppercase mb-1">
                  Amenities (comma separated)
                </label>
                <input
                  type="text"
                  value={form.amenities}
                  onChange={(e) =>
                    onFormChange({ ...form, amenities: e.target.value })
                  }
                  placeholder="European Entrance Gate, Landscaped Garden, Wide Paved Roads"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Cover image upload */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-300 uppercase mb-1">
                  Cover Image
                </label>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="hidden"
                />
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                    {form.image ? (
                      <img
                        src={form.image}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-slate-600" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <button
                      type="button"
                      onClick={() => coverInputRef.current?.click()}
                      disabled={uploading}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      {uploading ? "Uploading..." : "Upload Cover Image"}
                    </button>
                    {form.image && (
                      <button
                        type="button"
                        onClick={() => onFormChange({ ...form, image: "" })}
                        className="text-[11px] text-red-400 hover:text-red-300 text-left cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Gallery upload */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-extrabold text-slate-300 uppercase">
                    Gallery Images
                  </label>
                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-3 h-3" />
                    {uploading ? "Uploading..." : "Add Images"}
                  </button>
                </div>
                {form.gallery.length > 0 ? (
                  <div className="grid grid-cols-4 gap-2">
                    {form.gallery.map((img, index) => (
                      <div
                        key={index}
                        className="relative w-full aspect-square rounded-xl overflow-hidden border border-slate-800 group"
                      >
                        <img
                          src={img}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-[11px] italic">
                    No gallery images added yet.
                  </p>
                )}
              </div>

              {/* Map coordinate + hotspot */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-300 uppercase mb-1">
                    Map X (%)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={form.coordinate.x}
                    onChange={(e) =>
                      onFormChange({
                        ...form,
                        coordinate: {
                          ...form.coordinate,
                          x: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-300 uppercase mb-1">
                    Map Y (%)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={form.coordinate.y}
                    onChange={(e) =>
                      onFormChange({
                        ...form,
                        coordinate: {
                          ...form.coordinate,
                          y: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-300 uppercase mb-1">
                    Map Hotspot Label
                  </label>
                  <input
                    type="text"
                    value={form.mapHotspot}
                    onChange={(e) =>
                      onFormChange({ ...form, mapHotspot: e.target.value })
                    }
                    placeholder="Kaldongri Highway Hub"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-300 uppercase mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) =>
                    onFormChange({ ...form, phone: e.target.value })
                  }
                  placeholder="+91 93732 33777"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2 sticky bottom-0 bg-slate-900 pb-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingProject ? "Save Changes" : "Publish Project"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
