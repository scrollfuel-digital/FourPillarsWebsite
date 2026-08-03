export interface Project {
  id: string;
  name: string;
  slug: string;
  type: "plot" | "apartment" | "township" | "upcoming";
  location: string;
  description: string;
  details: string[];
  specs: {
    label: string;
    value: string;
  }[];
  highlights: string[];
  amenities: string[];
  acres?: string;
  totalUnits?: string;
  status?: "ongoing" | "upcoming" | "completed";
  priceRange: string;
  image: string;
  gallery: string[];
  coordinate: { x: number; y: number };
  mapHotspot: string;
  phone?: string; // ← added: optional contact number for "Call" CTA
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  isLoggedIn: boolean;
  savedProjects: string[]; // Slugs of saved projects
}

export interface SearchHistoryItem {
  id: string;
  term: string;
  timestamp: string;
  category?: string;
}

export interface Inquiry {
  _id?: string;
  id?: string;
  fullName?: string;
  name?: string;
  email: string;
  phone: string;
  project?: string;
  projectSlug?: string;
  message: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  dateCreated?: string;
}

export interface ContactSubmission {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
}

export interface Notification {
  id: string;
  type: "info" | "success" | "alert";
  message: string;
  timestamp: string;
  projectSlug?: string;
}

export interface AppAccessibility {
  textSize: "sm" | "md" | "lg" | "xl";
  highContrast: boolean;
}

export interface AdminProfile {
  name: string;
  email: string;
  role: string;
  /** Hex color used for the initials avatar background (e.g. "#D97706") */
  avatarColor: string;
  avatarUrl?: string; // optional real photo, falls back to initials
}

export interface BrandConfig {
  companyName: string;
  companyShort: string; // shown in the badge pill, e.g. "4PILLARS REALTY ADMIN"
  tagline: string; // e.g. "Control Panel"
  pageTitle: string; // e.g. "Management Suite"
  pageSubtitle: string;
}
