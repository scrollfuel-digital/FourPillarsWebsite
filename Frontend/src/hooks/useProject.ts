import { useState, useEffect } from "react";
import api from "../utils/api";
import { PROJECTS as STATIC_PROJECTS } from "../data";
import type { Project } from "../types";

interface UseProjectReturn {
  project: Project | null;
  loading: boolean;
  error: string | null;
}

interface ProjectApiResponse {
  success?: boolean;
  data?: Project;
}

const projectCache = new Map<string, Project>();

function findStaticProject(slug: string | undefined): Project | null {
  if (!slug) return null;
  return STATIC_PROJECTS.find((p) => p.slug === slug || p.id === slug) ?? null;
}

function mergeWithStaticFallback(
  apiProject: Project,
  staticProject: Project | null,
): Project {
  if (!staticProject) return apiProject;

  const hasValidApiImage =
    Boolean(apiProject.image) && apiProject.image.startsWith("http");
  const hasValidApiGallery =
    Array.isArray(apiProject.gallery) &&
    apiProject.gallery.some((img) => img.startsWith("http"));

  return {
    ...staticProject,
    ...apiProject,
    image: hasValidApiImage ? apiProject.image : staticProject.image,
    gallery: hasValidApiGallery ? apiProject.gallery : staticProject.gallery,
  };
}

export function useProject(slug: string | undefined): UseProjectReturn {
  const initialProject = slug
    ? projectCache.get(slug) ?? findStaticProject(slug)
    : null;

  const [project, setProject] = useState<Project | null>(initialProject);
  const [loading, setLoading] = useState(!initialProject);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProject = async () => {
      if (!slug) {
        setProject(null);
        setError("Project slug is missing");
        setLoading(false);
        return;
      }

      const cachedProject = projectCache.get(slug) ?? null;
      const fallbackProject = cachedProject ?? findStaticProject(slug);

      setProject(fallbackProject);
      setError(null);
      setLoading(!fallbackProject);

      try {
        const response = (await api.get(
          `/projects/${encodeURIComponent(slug)}`,
          { timeout: 5000 },
        )) as ProjectApiResponse;

        const projectData = response.data;

        if (!projectData) {
          throw new Error("Project not found");
        }

        if (projectData.slug !== slug && projectData.id !== slug) {
          throw new Error("Project slug mismatch");
        }

        const resolvedProject = mergeWithStaticFallback(
          projectData,
          findStaticProject(slug),
        );
        projectCache.set(slug, resolvedProject);

        if (!cancelled) {
          setProject(resolvedProject);
          setError(null);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          if (fallbackProject) {
            setProject(fallbackProject);
            setError(null);
          } else {
            setProject(null);
            setError(
              err instanceof Error ? err.message : "Unable to load project",
            );
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProject();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return {
    project,
    loading,
    error,
  };
}
