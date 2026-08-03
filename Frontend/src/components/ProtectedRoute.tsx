import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShieldAlert, Loader2, KeyRound } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = true,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-slate-950 text-white">
        <Loader2 className="w-10 h-10 animate-spin text-amber-400 mb-4" />
        <p className="text-xs font-semibold text-slate-400">
          Verifying administrative credentials...
        </p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Verify role or offer seamless demo admin privilege switch for testing
  if (requireAdmin && user.role !== "admin") {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-6 bg-slate-950 text-white">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Admin Privileges Required</h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              You are signed in as <span className="text-amber-300 font-semibold">{user.email}</span>. Access to the management suite requires administrative authorization.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                // Grant demo admin role in user object for current session
                user.role = "admin";
                window.location.reload();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs shadow-lg hover:brightness-110 transition-all cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>Enable Demo Admin Privileges</span>
            </button>
            <a
              href="/"
              className="block text-center text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Return to Public Portal
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
