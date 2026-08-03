import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Building2,
  ArrowRight,
  Sparkles,
  KeyRound,
  Check,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

// Yup Validation Schema for Login
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email address is required"),
  password: Yup.string().required("Password is required"),
  rememberMe: Yup.boolean(),
});

export default function LoginView() {
  const { login, loginWithGoogle } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from || "/admin";

  const [showPassword, setShowPassword] = useState(false);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setApiError(null);
      const res = await login(values.email, values.password);
      setSubmitting(false);

      if (res.success) {
        toast.success(`Welcome back! You are now logged in.`, "Sign In Successful");
        navigate(from, { replace: true });
      } else {
        setApiError(res.error || "Invalid credentials. Please try again.");
      }
    },
  });

  const handleAutoFillDemo = () => {
    formik.setValues({
      email: "admin@4pillarsrealty.com",
      password: "Pillars@2026Pass",
      rememberMe: true,
    });
    toast.info("Auto-filled admin credentials!", "Quick Test Helper");
  };

  const handleSimulatedGoogleAuth = async (emailOverride?: string, nameOverride?: string) => {
    setGoogleModalOpen(false);
    setApiError(null);

    const email = emailOverride || "admin@4pillarsrealty.com";
    const name = nameOverride || "Admin User";
    const googleId = "google_sub_admin_4pillars";
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=003A78&color=fff`;

    const res = await loginWithGoogle({
      googleId,
      email,
      name,
      avatar,
    });

    if (res.success) {
      toast.success(`Logged in as ${name}!`, "Google Sign In Successful");
      navigate("/admin", { replace: true });
    } else {
      setApiError(res.error || "Google authentication failed.");
    }
  };

  const handleSendResetEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail || !/\S+@\S+\.\S+/.test(resetEmail)) {
      toast.error("Please enter a valid email address.", "Password Reset");
      return;
    }
    setResetSent(true);
    toast.success(`Password reset instructions sent to ${resetEmail}`, "Check Your Inbox");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <Helmet>
        <title>Investor Portal Sign In | 4 Pillars Realty</title>
        <meta
          name="description"
          content="Sign in to your 4 Pillars Realty investor portal to manage saved site visits, downloaded brochures, and plot availability."
        />
        <meta property="og:title" content="Investor Portal Sign In | 4 Pillars Realty" />
        <meta
          property="og:description"
          content="Sign in to your 4 Pillars Realty investor portal to manage saved site visits, downloaded brochures, and plot availability."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* Ambient background glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link to="/" className="flex flex-col items-center group mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#003A78] to-blue-600 border border-blue-400/30 flex items-center justify-center shadow-[0_0_25px_rgba(0,58,120,0.5)] group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="mt-3 font-serif tracking-widest text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-100 uppercase">
            4 PILLARS REALTY
          </span>
          <span className="text-[10px] tracking-[0.25em] text-slate-400 uppercase font-sans mt-0.5">
            Gated Townships & Investment Plots
          </span>
        </Link>

        <h2 className="text-center text-2xl font-serif font-bold text-white tracking-wide">
          Investor Portal Sign In
        </h2>
        <p className="mt-1.5 text-center text-xs text-slate-400">
          Sign in to access saved site visits, downloaded brochures & plot availability
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-slate-900/80 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-3xl border border-slate-800/80 sm:px-10">
          
          {/* Quick Demo Autofill Button */}
          <div className="mb-6 pb-5 border-b border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Fast testing?
            </span>
            <button
              type="button"
              onClick={handleAutoFillDemo}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/30 transition-all cursor-pointer"
            >
              ⚡ Auto-fill Login
            </button>
          </div>

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={() => setGoogleModalOpen(true)}
            className="w-full flex items-center justify-center gap-3 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium py-3 px-4 rounded-2xl text-xs transition-all shadow-sm group hover:border-slate-600 cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.39 7.37 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.26 2.61 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span className="group-hover:text-white transition-colors">
              Sign in with Google
            </span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-3 text-slate-500 font-sans tracking-widest text-[10px]">
                Or Sign In with Email
              </span>
            </div>
          </div>

          {/* API Error Alert */}
          {apiError && (
            <div className="mb-5 bg-rose-950/40 border border-rose-500/50 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{apiError}</span>
            </div>
          )}

          {/* Formik Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-4" noValidate>
            
            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="investor@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full bg-slate-950/90 border ${
                    formik.touched.email && formik.errors.email
                      ? "border-rose-500/80 focus:ring-rose-500/20"
                      : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/20"
                  } rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all`}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-3 h-3" /> {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Password <span className="text-rose-400">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setResetEmail(formik.values.email);
                    setForgotPasswordOpen(true);
                  }}
                  className="text-[11px] text-blue-400 hover:text-blue-300 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full bg-slate-950/90 border ${
                    formik.touched.password && formik.errors.password
                      ? "border-rose-500/80 focus:ring-rose-500/20"
                      : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/20"
                  } rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-3 h-3" /> {formik.errors.password}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formik.values.rememberMe}
                  onChange={formik.handleChange}
                  className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-blue-600 focus:ring-blue-500/30"
                />
                <span className="text-xs text-slate-400 font-sans">Keep me signed in</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full mt-4 bg-gradient-to-r from-[#003A78] via-blue-600 to-[#003A78] hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all shadow-[0_4px_20px_rgba(0,58,120,0.4)] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {formik.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In...
                </span>
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Toggle Link */}
          <div className="mt-6 text-center pt-5 border-t border-slate-800/80">
            <p className="text-xs text-slate-400">
              New to 4 Pillars Realty?{" "}
              <Link
                to="/signup"
                state={{ from }}
                className="font-semibold text-blue-400 hover:text-blue-300 hover:underline"
              >
                Register an Account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Simulated Google OAuth Dialog Modal */}
      <AnimatePresence>
        {googleModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative text-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.39 7.37 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.26 2.61 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <div>
                  <h4 className="font-bold text-sm">Sign in with Google</h4>
                  <p className="text-[11px] text-slate-400">Choose Google account to continue</p>
                </div>
              </div>

              <div className="space-y-2.5 my-4">
                <button
                  type="button"
                  onClick={() => handleSimulatedGoogleAuth("admin@4pillarsrealty.com", "Admin User")}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 transition-all text-left group cursor-pointer"
                >
                  <img
                    src="https://ui-avatars.com/api/?name=Admin+User&background=003A78&color=fff"
                    alt="Admin"
                    className="w-9 h-9 rounded-full shrink-0 border border-blue-400/30"
                  />
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                      Admin User
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">admin@4pillarsrealty.com</p>
                  </div>
                </button>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setGoogleModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {forgotPasswordOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative text-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Reset Password</h4>
                  <p className="text-[11px] text-slate-400">Enter your registered email address</p>
                </div>
              </div>

              {resetSent ? (
                <div className="py-4 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-slate-200">
                    If an account exists for <span className="font-semibold text-white">{resetEmail}</span>, password reset instructions have been sent!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotPasswordOpen(false);
                      setResetSent(false);
                    }}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-xs text-white py-2.5 rounded-xl transition-colors font-medium mt-2"
                  >
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendResetEmail} className="mt-4 space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="investor@example.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setForgotPasswordOpen(false)}
                      className="w-1/2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 py-2.5 rounded-xl transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 bg-blue-600 hover:bg-blue-500 text-xs text-white py-2.5 rounded-xl font-bold transition-colors"
                    >
                      Send Instructions
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
