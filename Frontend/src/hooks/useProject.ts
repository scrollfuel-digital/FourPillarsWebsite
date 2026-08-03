import { useState, useEffect } from "react";
import api from "../utils/api";
import { PROJECTS as STATIC_PROJECTS } from "../data";
import { Project } from "../types";

interface UseProjectReturn {
    project: Project | null;
    loading: boolean;
    error: string | null;
}

const getStaticFallback = (slug: string): Project =>
    STATIC_PROJECTS.find((p) => p.slug === slug) ?? STATIC_PROJECTS[0];

export function useProject(slug: string | undefined): UseProjectReturn {
    const [project, setProject] = useState<Project | null>(
        slug ? getStaticFallback(slug) : null
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) {
            setLoading(false);
            return;
        }

        // Immediately show static data while API loads
        setProject(getStaticFallback(slug));
        setLoading(true);

        let cancelled = false;

        const fetchProject = async () => {
            try {
                const res = await api.get(`/projects/${slug}`) as { success: boolean; data: Project };
                if (!cancelled && res.data) setProject(res.data);
            } catch {
                // Keep the static fallback already set — no-op
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchProject();
        return () => { cancelled = true; };
    }, [slug]);

    return { project, loading, error };
}
