import React from "react";
import { MapPin, ExternalLink, Edit3, Trash2 } from "lucide-react";
import { Project } from "../../types";

interface ProjectsTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string, title: string) => void;
}

export default function ProjectsTable({
  projects,
  onEdit,
  onDelete,
}: ProjectsTableProps) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-4">Project</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Location</th>
              <th className="py-3.5 px-4">Price Range</th>
              <th className="py-3.5 px-4">Scale</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs">
            {projects.map((project) => (
              <tr
                key={project.id || project.slug}
                className="hover:bg-slate-800/40 transition-colors group"
              >
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        project.image ||
                        "/images/project_melbourne_png_1780484693295.png"
                      }
                      alt={project.name}
                      className="w-11 h-11 rounded-xl object-cover border border-slate-700 bg-slate-950"
                    />
                    <div>
                      <p className="font-bold text-white">{project.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        /{project.slug}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {project.type}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{project.location}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-bold text-amber-300">
                  {project.priceRange}
                </td>
                <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                  {project.acres ? `${project.acres} Acres` : ""}{" "}
                  {project.totalUnits ? `• ${project.totalUnits} Units` : ""}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <a
                      href={`/${project.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                      title="View Public Page"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => onEdit(project)}
                      className="p-1.5 rounded-lg bg-blue-950/60 hover:bg-blue-900/80 text-blue-300 hover:text-white transition-all cursor-pointer"
                      title="Edit Project"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() =>
                        onDelete(project.slug || project.id, project.name)
                      }
                      className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-300 transition-all cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
