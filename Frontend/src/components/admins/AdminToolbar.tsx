import React from "react";
import {
  Inbox,
  MessageSquare,
  Building2,
  Search,
  X,
  Filter,
  Table as TableIcon,
  Grid as GridIcon,
} from "lucide-react";

type TabType = "inquiries" | "contacts" | "projects";
type SearchField = "all" | "name" | "email";
type ViewMode = "table" | "grid";

interface AdminToolbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  inquiriesCount: number;
  contactsCount: number;
  projectsCount: number;

  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  searchField: SearchField;
  onSearchFieldChange: (value: SearchField) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (value: ViewMode) => void;

  filteredCount: number;
  totalCount: number;
}

export default function AdminToolbar({
  activeTab,
  onTabChange,
  inquiriesCount,
  contactsCount,
  projectsCount,
  searchTerm,
  onSearchTermChange,
  searchField,
  onSearchFieldChange,
  statusFilter,
  onStatusFilterChange,
  viewMode,
  onViewModeChange,
  filteredCount,
  totalCount,
}: AdminToolbarProps) {
  const filtersActive =
    Boolean(searchTerm) || statusFilter !== "all" || searchField !== "all";

  const resetFilters = () => {
    onSearchTermChange("");
    onStatusFilterChange("all");
    onSearchFieldChange("all");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        {/* Collection Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
          <button
            onClick={() => onTabChange("inquiries")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "inquiries"
                ? "bg-[#003A78] text-white shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <Inbox className="w-4 h-4 text-blue-400" />
            <span>Inquiries</span>
            <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-slate-950/60 font-semibold text-blue-200">
              {inquiriesCount}
            </span>
          </button>

          <button
            onClick={() => onTabChange("contacts")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "contacts"
                ? "bg-[#003A78] text-white shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-purple-400" />
            <span>Contacts</span>
            <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-slate-950/60 font-semibold text-purple-200">
              {contactsCount}
            </span>
          </button>

          <button
            onClick={() => onTabChange("projects")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "projects"
                ? "bg-[#003A78] text-white shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Projects</span>
            <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-slate-950/60 font-semibold text-emerald-200">
              {projectsCount}
            </span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl overflow-hidden focus-within:border-blue-500 transition-all">
            <div className="relative flex-1 min-w-[180px] sm:min-w-[220px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder={
                  searchField === "name"
                    ? "Search by name..."
                    : searchField === "email"
                      ? "Search by email address..."
                      : `Search ${activeTab} by name, email, etc...`
                }
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-100 pl-9 pr-7 py-2 focus:outline-none placeholder:text-slate-500"
              />
              {searchTerm && (
                <button
                  onClick={() => onSearchTermChange("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {activeTab !== "projects" && (
              <div className="border-l border-slate-800 bg-slate-950/40 px-2 py-1.5">
                <select
                  value={searchField}
                  onChange={(e: any) => onSearchFieldChange(e.target.value)}
                  className="bg-transparent text-[11px] font-semibold text-slate-300 focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-slate-900">
                    All Fields
                  </option>
                  <option value="name" className="bg-slate-900">
                    Name Only
                  </option>
                  <option value="email" className="bg-slate-900">
                    Email Only
                  </option>
                </select>
              </div>
            )}
          </div>

          {activeTab !== "projects" && (
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value)}
                className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-slate-900">
                  All Statuses
                </option>
                <option value="new" className="bg-slate-900">
                  New
                </option>
                <option value="in progress" className="bg-slate-900">
                  In Progress
                </option>
                <option value="contacted" className="bg-slate-900">
                  Contacted
                </option>
                <option value="closed" className="bg-slate-900">
                  Closed
                </option>
              </select>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5">
              <button
                onClick={() => onViewModeChange("table")}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === "table"
                    ? "bg-slate-800 text-amber-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                title="Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange("grid")}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-slate-800 text-amber-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                title="Grid View"
              >
                <GridIcon className="w-4 h-4" />
              </button>
            </div>
          )}

          {filtersActive && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-[11px] font-semibold text-amber-400 transition-all cursor-pointer"
            >
              <X className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {filtersActive && (
        <div className="flex items-center justify-between gap-2 py-2 px-3 mt-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 text-[11px]">Active Filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px]">
                Keyword: "{searchTerm}"
                {searchField !== "all" && ` (${searchField})`}
              </span>
            )}
            {statusFilter !== "all" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] capitalize">
                Status: {statusFilter}
              </span>
            )}
          </div>
          <span className="text-slate-400 font-medium text-[11px]">
            Showing <strong className="text-white">{filteredCount}</strong> of{" "}
            <span className="text-slate-300">{totalCount}</span> records
          </span>
        </div>
      )}
    </>
  );
}
