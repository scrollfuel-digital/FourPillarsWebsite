
import { useState, useEffect } from "react";
import api from "../utils/api";
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

export function useProject(
  slug: string | undefined
): UseProjectReturn {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
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

      setProject(null);
      setError(null);
      setLoading(true);

      try {
        const response = await api.get(
          `/projects/${encodeURIComponent(slug)}`
        ) as ProjectApiResponse;

        const projectData = response.data;

        if (!projectData) {
          throw new Error("Project not found");
        }

        if (projectData.slug !== slug) {
          throw new Error("Project slug mismatch");
        }

        if (!cancelled) {
          setProject(projectData);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setProject(null);

          setError(
            err instanceof Error
              ? err.message
              : "Unable to load project"
          );
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
