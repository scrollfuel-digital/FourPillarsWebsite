import React from "react";
import { Building2, Plus } from "lucide-react";
import { Project } from "../../types";
import ProjectsTable from "./ProjectsTable";
import ProjectsGrid from "./ProjectsGrid";

interface ProjectsSectionProps {
  projects: Project[];
  viewMode: "table" | "grid";
  onEdit: (project: Project) => void;
  onDelete: (id: string, title: string) => void;
  onCreateNew: () => void;
}

export default function ProjectsSection({
  projects,
  viewMode,
  onEdit,
  onDelete,
  onCreateNew,
}: ProjectsSectionProps) {
  if (projects.length === 0) {
    return (
      <div className="py-16 text-center bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8">
        <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h3 className="text-base font-bold text-white">No projects found</h3>
        <p className="text-xs text-slate-400 mt-1">
          No project listings match your search keywords.
        </p>
        <button
          onClick={onCreateNew}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>
    );
  }

  return viewMode === "table" ? (
    <ProjectsTable projects={projects} onEdit={onEdit} onDelete={onDelete} />
  ) : (
    <ProjectsGrid projects={projects} onEdit={onEdit} onDelete={onDelete} />
  );
}
