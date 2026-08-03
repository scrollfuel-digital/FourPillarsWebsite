import { useState } from "react";
import api from "../utils/api";
import { useToast } from "../context/ToastContext";

interface InquiryPayload {
    name?: string;
    fullName?: string;
    email: string;
    phone: string;
    projectSlug?: string;
    project?: string;
    subject?: string;
    message: string;
}

interface UseInquiryReturn {
    submit: (payload: InquiryPayload, endpoint?: string) => Promise<boolean>;
    loading: boolean;
    error: string | null;
    success: boolean;
    reset: () => void;
}

export function useInquiry(): UseInquiryReturn {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();

    const submit = async (payload: InquiryPayload, endpoint = "/inquiries"): Promise<boolean> => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.post(endpoint, payload);
            setSuccess(true);
            return true;
        } catch (err: any) {
            const errorMsg = err.response?.data?.error || err.message || "Failed to process form submission.";
            setError(errorMsg);
            toast.error(errorMsg, "Submission Error");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setLoading(false);
        setError(null);
        setSuccess(false);
    };

    return { submit, loading, error, success, reset };
}
