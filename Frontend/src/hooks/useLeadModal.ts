import { useState } from "react";

interface LeadModalState {
    isOpen: boolean;
    projectSlug: string;
    initialMessage: string;
}

interface UseLeadModalReturn extends LeadModalState {
    open: (projectSlug: string, message?: string) => void;
    close: () => void;
}

export function useLeadModal(): UseLeadModalReturn {
    const [state, setState] = useState<LeadModalState>({
        isOpen: false,
        projectSlug: "melbourne-city-sector-ii",
        initialMessage: "",
    });

    const open = (projectSlug: string, message = "") => {
        setState({ isOpen: true, projectSlug, initialMessage: message });
    };

    const close = () => {
        setState((prev) => ({ ...prev, isOpen: false }));
    };

    return { ...state, open, close };
}
