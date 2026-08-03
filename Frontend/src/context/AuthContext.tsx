import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../utils/api";

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    authProvider?: string;
}

interface AuthContextType {
    user: UserProfile | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    loginWithGoogle: (payload: { googleId?: string; email: string; name: string; avatar?: string; credential?: string }) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("auth_token"));
    const [loading, setLoading] = useState<boolean>(true);

    const logout = useCallback(() => {
        localStorage.removeItem("auth_token");
        setToken(null);
        setUser(null);
    }, []);

    // Verify stored token on boot
    useEffect(() => {
        const verifyToken = async () => {
            const storedToken = localStorage.getItem("auth_token");
            if (!storedToken) {
                setLoading(false);
                return;
            }

            try {
                const res: any = await api.get("/auth/me");
                if (res.success && res.user) {
                    setUser(res.user);
                    setToken(storedToken);
                } else {
                    logout();
                }
            } catch (err) {
                logout();
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [logout]);

    const handleAuthSuccess = (newToken: string, newUser: UserProfile) => {
        localStorage.setItem("auth_token", newToken);
        setToken(newToken);
        setUser(newUser);
    };

    const login = async (email: string, password: string) => {
        try {
            const res: any = await api.post("/auth/login", { email, password });
            if (res.success && res.token && res.user) {
                handleAuthSuccess(res.token, res.user);
                return { success: true };
            }
            return { success: false, error: res.error || "Login failed" };
        } catch (err: any) {
            const errorMsg = err.response?.data?.error || err.message || "Login failed. Please check credentials.";
            return { success: false, error: errorMsg };
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const res: any = await api.post("/auth/register", { name, email, password });
            if (res.success && res.token && res.user) {
                handleAuthSuccess(res.token, res.user);
                return { success: true };
            }
            return { success: false, error: res.error || "Registration failed" };
        } catch (err: any) {
            const errorMsg = err.response?.data?.error || err.message || "Failed to create account.";
            return { success: false, error: errorMsg };
        }
    };

    const loginWithGoogle = async (payload: { googleId?: string; email: string; name: string; avatar?: string; credential?: string }) => {
        try {
            const res: any = await api.post("/auth/google", payload);
            if (res.success && res.token && res.user) {
                handleAuthSuccess(res.token, res.user);
                return { success: true };
            }
            return { success: false, error: res.error || "Google auth failed" };
        } catch (err: any) {
            const errorMsg = err.response?.data?.error || err.message || "Google sign in failed.";
            return { success: false, error: errorMsg };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!user,
                loading,
                login,
                register,
                loginWithGoogle,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
