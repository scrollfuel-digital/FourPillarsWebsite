import mongoose from "mongoose";

const specSchema = new mongoose.Schema(
  { label: String, value: String },
  { _id: false }
);

const postSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    type: {
      type: String,
      enum: ["plot", "apartment", "township", "upcoming"],
      required: true,
      default: "plot",
    },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    details: [String],
    specs: [specSchema],
    highlights: [String],
    amenities: [String],
    acres: { type: String, default: "" },
    totalUnits: { type: String, default: "" },
    priceRange: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    gallery: [String],
    coordinate: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
    },
    mapHotspot: { type: String, default: "" },
    phone: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
