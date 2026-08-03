import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Building2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

// Yup Validation Schema for Registration
const signupSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Full Name is required"),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email address is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
  terms: Yup.boolean().oneOf([true], "You must accept the terms of service"),
});

export default function SignupView() {
  const { register, loginWithGoogle } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema: signupSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setApiError(null);
      const res = await register(values.name, values.email, values.password);
      setSubmitting(false);

      if (res.success) {
        toast.success(
          `Welcome to 4 Pillars Realty, ${values.name}! Your account has been registered.`,
          "Registration Successful"
        );
        navigate(from, { replace: true });
      } else {
        setApiError(res.error || "Failed to create account. Please try again.");
      }
    },
  });

  // Calculate password strength score (0 to 4)
  const getPasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const passStrength = getPasswordStrength(formik.values.password);

  const handleAutoFillTest = () => {
    const randomId = Math.floor(Math.random() * 1000);
    formik.setValues({
      name: `Test Investor ${randomId}`,
      email: `investor${randomId}@4pillars.com`,
      password: "Pillars@2026Pass",
      confirmPassword: "Pillars@2026Pass",
      terms: true,
    });
    toast.info("Auto-filled demo signup credentials!", "Quick Test Helper");
  };

  const handleSimulatedGoogleAuth = async (emailOverride?: string, nameOverride?: string) => {
    setGoogleModalOpen(false);
    setApiError(null);

    const email = emailOverride || "divyanibhusari79@gmail.com";
    const name = nameOverride || "Divyani Bhusari";
    const googleId = "google_sub_1084892918231";
    const avatar = "https://ui-avatars.com/api/?name=Divyani+Bhusari&background=4285F4&color=fff";

    const res = await loginWithGoogle({
      googleId,
      email,
      name,
      avatar,
    });

    if (res.success) {
      toast.success(`Signed up with Google as ${name}!`, "Google OAuth Successful");
      navigate(from, { replace: true });
    } else {
      setApiError(res.error || "Google authentication failed.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <Helmet>
        <title>Create Investor Account | 4 Pillars Realty</title>
        <meta
          name="description"
          content="Register an investor account with 4 Pillars Realty to access exclusive plot layouts, site tour bookings, and document brochures."
        />
        <meta property="og:title" content="Create Investor Account | 4 Pillars Realty" />
        <meta
          property="og:description"
          content="Register an investor account with 4 Pillars Realty to access exclusive plot layouts, site tour bookings, and document brochures."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* Ambient background glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

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
          Create Investor Account
        </h2>
        <p className="mt-1.5 text-center text-xs text-slate-400">
          Register to view exclusive plot layouts, site tour bookings & brochures
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-slate-900/80 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-3xl border border-slate-800/80 sm:px-10">
          
          {/* Quick Demo Autofill Button */}
          <div className="mb-6 pb-5 border-b border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Need a fast test?
            </span>
            <button
              type="button"
              onClick={handleAutoFillTest}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/30 transition-all cursor-pointer"
            >
              ⚡ Auto-fill Test Data
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
              Continue with Google
            </span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-3 text-slate-500 font-sans tracking-widest text-[10px]">
                Or Register with Email
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
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Rahul Sharma"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full bg-slate-950/90 border ${
                    formik.touched.name && formik.errors.name
                      ? "border-rose-500/80 focus:ring-rose-500/20"
                      : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/20"
                  } rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all`}
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-3 h-3" /> {formik.errors.name}
                </p>
              )}
            </div>

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
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min 6 characters"
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

              {/* Password strength meter */}
              {formik.values.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        passStrength >= 1
                          ? passStrength <= 2
                            ? "bg-amber-500 w-1/3"
                            : passStrength === 3
                            ? "bg-blue-500 w-2/3"
                            : "bg-emerald-500 w-full"
                          : "bg-slate-700 w-0"
                      }`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    Strength:{" "}
                    {passStrength <= 1
                      ? "Weak"
                      : passStrength === 2
                      ? "Fair"
                      : passStrength === 3
                      ? "Good"
                      : "Strong"}
                  </span>
                </div>
              )}

              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-3 h-3" /> {formik.errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Confirm Password <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full bg-slate-950/90 border ${
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                      ? "border-rose-500/80 focus:ring-rose-500/20"
                      : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/20"
                  } rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-3 h-3" /> {formik.errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formik.values.terms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-0.5 w-4 h-4 rounded border-slate-800 bg-slate-950 text-blue-600 focus:ring-blue-500/30"
                />
                <span className="text-[11px] text-slate-400 leading-normal">
                  I agree to 4 Pillars Realty's{" "}
                  <span className="text-slate-200 underline">Terms of Service</span> &{" "}
                  <span className="text-slate-200 underline">Privacy Policy</span>.
                </span>
              </label>
              {formik.touched.terms && formik.errors.terms && (
                <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-3 h-3" /> {formik.errors.terms}
                </p>
              )}
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
                  Creating Account...
                </span>
              ) : (
                <>
                  Register Account <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Toggle Link */}
          <div className="mt-6 text-center pt-5 border-t border-slate-800/80">
            <p className="text-xs text-slate-400">
              Already have an investor account?{" "}
              <Link
                to="/login"
                state={{ from }}
                className="font-semibold text-blue-400 hover:text-blue-300 hover:underline"
              >
                Sign In
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
                  <p className="text-[11px] text-slate-400">Choose Google account to authorize</p>
                </div>
              </div>

              <div className="space-y-2.5 my-4">
                {/* Active user option */}
                <button
                  type="button"
                  onClick={() => handleSimulatedGoogleAuth("divyanibhusari79@gmail.com", "Divyani Bhusari")}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 transition-all text-left group cursor-pointer"
                >
                  <img
                    src="https://ui-avatars.com/api/?name=Divyani+Bhusari&background=4285F4&color=fff"
                    alt="Divyani"
                    className="w-9 h-9 rounded-full shrink-0 border border-blue-400/30"
                  />
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                      Divyani Bhusari
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">divyanibhusari79@gmail.com</p>
                  </div>
                </button>

                {/* Secondary test user option */}
                <button
                  type="button"
                  onClick={() => handleSimulatedGoogleAuth("investor.test@gmail.com", "Anil K. Verma")}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 transition-all text-left group cursor-pointer"
                >
                  <img
                    src="https://ui-avatars.com/api/?name=Anil+Verma&background=34A853&color=fff"
                    alt="Anil"
                    className="w-9 h-9 rounded-full shrink-0 border border-emerald-400/30"
                  />
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                      Anil K. Verma
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">investor.test@gmail.com</p>
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
    </div>
  );
}
