import { useState, useEffect } from "react";
import api from "../utils/api";
import { PROJECTS as STATIC_PROJECTS } from "../data";
import { Project } from "../types";

interface UseProjectsReturn {
    projects: Project[];
    loading: boolean;
    error: string | null;
}

export function useProjects(): UseProjectsReturn {
    const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS);
    const [loading, setLoading] = useState(false); // static data already available instantly
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const fetchProjects = async () => {
            try {
                const res = await api.get("/projects") as { success: boolean; data: Project[] };
                if (!cancelled) {
                    setProjects(res.data?.length ? res.data : STATIC_PROJECTS);
                }
            } catch {
                if (!cancelled) {
                    // Fallback to static data when API is unavailable
                    setProjects(STATIC_PROJECTS);
                    setError(null); // silent fallback — no error shown to user
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchProjects();
        return () => { cancelled = true; };
    }, []);

    return { projects, loading, error };
}
