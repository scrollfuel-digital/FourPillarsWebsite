import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";

import HomeView from "./pages/HomeView";

// Lazy-loaded secondary pages & components for code splitting
const AboutView = lazy(() => import("./pages/AboutView"));
const ProjectsView = lazy(() => import("./pages/ProjectsView"));
const InteractiveMap = lazy(() => import("./components/InteractiveMap"));
const BlogsView = lazy(() => import("./pages/BlogsView"));
const FaqView = lazy(() => import("./pages/FaqView"));
const ContactView = lazy(() => import("./pages/ContactView"));
const ProjectDetailView = lazy(() => import("./pages/ProjectDetailView"));
const SignupView = lazy(() => import("./pages/SignupView"));
const LoginView = lazy(() => import("./pages/LoginView"));
const AdminView = lazy(() => import("./pages/admin/AdminView"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Visual Loading Spinner for Chunk Suspense transitions
function LoadingScreen() {
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center bg-white space-y-4">
      <div className="relative flex items-center justify-center">
        {/* Modern double spin tracker */}
        <div className="w-12 h-12 rounded-full border-4 border-slate-100 animate-pulse" />
        <div className="absolute w-12 h-12 rounded-full border-4 border-t-blue-600 border-r-blue-400 border-b-transparent border-l-transparent animate-spin" />
      </div>
      <p className="text-xs font-mono tracking-widest text-slate-400 uppercase animate-pulse">
        Loading Gated Township Portfolios...
      </p>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrl = e.ctrlKey || e.metaKey;
      const isU =
        (e.key && e.key.toLowerCase() === "u") ||
        e.code === "KeyU" ||
        e.keyCode === 85 ||
        e.which === 85;
      const isMacViewSource = e.metaKey && e.altKey && isU;

      if ((isCtrl && isU) || isMacViewSource) {
        window.location.reload();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  return (
    <AuthProvider>
      <ToastProvider>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/signup" element={<SignupView />} />
            <Route path="/login" element={<LoginView />} />
            {/* Main layout routing shell rendering Navbar, Footer and active route viewports */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomeView />} />
              <Route path="/about" element={<AboutView />} />
              <Route path="/projects" element={<ProjectsView />} />
              <Route path="/project" element={<Navigate to="/projects" replace />} />
              <Route path="/projects/:slug" element={<ProjectDetailView />} />
              <Route path="/map" element={<InteractiveMap />} />
              <Route path="/blogs" element={<BlogsView />} />
              <Route path="/faqs" element={<FaqView />} />
              <Route path="/contact" element={<ContactView />} />

              <Route path="/:slug" element={<ProjectDetailView />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminView />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </ToastProvider>
    </AuthProvider>
  );
}
