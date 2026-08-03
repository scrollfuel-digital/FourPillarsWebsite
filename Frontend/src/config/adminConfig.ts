import { AdminProfile, BrandConfig } from "../types";

export const DEFAULT_BRAND: BrandConfig = {
  companyName: "4 Pillars Realty",
  companyShort: "4Pillars Realty Admin",
  tagline: "Control Panel",
  pageTitle: "Management Suite",
  pageSubtitle:
    "Monitor customer inquiries, manage contact form submissions, and maintain project properties.",
};

export const DEFAULT_ADMIN_PROFILE: AdminProfile = {
  name: "Admin User",
  email: "admin@4pillarsrealty.com",
  role: "Super Admin",
  avatarColor: "#D97706", // amber-600, matches the existing accent
};

export const ADMIN_PROFILE_STORAGE_KEY = "4pillars_admin_profile";
