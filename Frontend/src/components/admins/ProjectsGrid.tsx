import React from "react";
import { MapPin, Edit3, Trash2 } from "lucide-react";
import { Project } from "../../types";

interface ProjectsGridProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string, title: string) => void;
}

export default function ProjectsGrid({
  projects,
  onEdit,
  onDelete,
}: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <div
          key={project.id || project.slug}
          className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl"
        >
          <div>
            <div className="relative h-40 rounded-2xl overflow-hidden mb-3 bg-slate-950">
              <img
                src={
                  project.image ||
                  "/images/project_melbourne_png_1780484693295.png"
                }
                alt={project.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-slate-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                {project.type}
              </span>
            </div>
            <h3 className="text-base font-bold text-white">{project.name}</h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{project.location}</span>
            </div>
            <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300">
              {project.priceRange}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onEdit(project)}
                className="p-2 rounded-xl bg-blue-950/60 hover:bg-blue-900 text-blue-300 transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() =>
                  onDelete(project.slug || project.id, project.name)
                }
                className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900 text-rose-300 transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
