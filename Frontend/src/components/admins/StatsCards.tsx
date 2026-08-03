import React from "react";
import { Inbox, MessageSquare, Building2 } from "lucide-react";

type TabType = "inquiries" | "contacts" | "projects";

interface StatsCardsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  inquiriesCount: number;
  contactsCount: number;
  projectsCount: number;
  newInquiriesCount: number;
  newContactsCount: number;
}

export default function StatsCards({
  activeTab,
  setActiveTab,
  inquiriesCount,
  contactsCount,
  projectsCount,
  newInquiriesCount,
  newContactsCount,
}: StatsCardsProps) {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
      <div
        onClick={() => setActiveTab("inquiries")}
        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
          activeTab === "inquiries"
            ? "bg-blue-950/60 border-blue-500/50 shadow-lg shadow-blue-950/50"
            : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-300">Lead Inquiries</p>
              <p className="text-xl font-extrabold text-white">
                {inquiriesCount}
              </p>
            </div>
          </div>
          {newInquiriesCount > 0 && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500 text-slate-950">
              {newInquiriesCount} New
            </span>
          )}
        </div>
      </div>

      <div
        onClick={() => setActiveTab("contacts")}
        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
          activeTab === "contacts"
            ? "bg-purple-950/60 border-purple-500/50 shadow-lg shadow-purple-950/50"
            : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-300">
                Contact Messages
              </p>
              <p className="text-xl font-extrabold text-white">
                {contactsCount}
              </p>
            </div>
          </div>
          {newContactsCount > 0 && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500 text-slate-950">
              {newContactsCount} New
            </span>
          )}
        </div>
      </div>

      <div
        onClick={() => setActiveTab("projects")}
        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
          activeTab === "projects"
            ? "bg-emerald-950/60 border-emerald-500/50 shadow-lg shadow-emerald-950/50"
            : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-300">
                Listed Projects
              </p>
              <p className="text-xl font-extrabold text-white">
                {projectsCount}
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Active Catalog
          </span>
        </div>
      </div>
    </div>
  );
}
