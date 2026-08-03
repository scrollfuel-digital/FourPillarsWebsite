import React, { useState, useRef, useEffect } from "react";
import {
  ShieldCheck,
  RefreshCw,
  Download,
  Plus,
  ChevronDown,
  UserCog,
  LogOut,
} from "lucide-react";
import { BrandConfig ,AdminProfile} from "../../types";
interface AdminHeaderProps {
  brand: BrandConfig;
  profile: AdminProfile;
  refreshing: boolean;
  onRefresh: () => void;
  onExportCSV: () => void;
  onNewProject: () => void;
  onEditProfile: () => void;
  onLogout?: () => void;
}

export default function AdminHeader({
  brand,
  profile,
  refreshing,
  onRefresh,
  onExportCSV,
  onNewProject,
  onEditProfile,
  onLogout,
}: AdminHeaderProps) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials =
    profile.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "A";

  return (
    <div className="bg-gradient-to-r from-slate-900 via-[#002B5B] to-slate-900 border-b border-slate-800 pt-8 pb-6 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              {brand.companyShort}
            </span>
            <span className="text-xs text-slate-400">{brand.tagline}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
            {brand.pageTitle}
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            {brand.pageSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-amber-400" : ""}`}
            />
            <span>Refresh</span>
          </button>

          <button
            onClick={onExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onNewProject}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-bold shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>

          {/* Admin profile pill */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setProfileMenuOpen((open) => !open)}
              className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-extrabold text-[11px] shrink-0"
                style={{ backgroundColor: profile.avatarColor }}
              >
                {initials}
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <p className="text-xs font-bold text-white">{profile.name}</p>
                <p className="text-[10px] text-slate-400">{profile.role}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-20">
                <div className="px-3.5 py-3 border-b border-slate-800">
                  <p className="text-xs font-bold text-white truncate">
                    {profile.name}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {profile.email}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    onEditProfile();
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <UserCog className="w-3.5 h-3.5 text-amber-400" />
                  Edit Profile
                </button>
                {onLogout && (
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-rose-300 hover:bg-rose-950/40 transition-all cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Log Out
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
