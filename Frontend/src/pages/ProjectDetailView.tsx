import { useState, useMemo } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useProject } from "../hooks/useProject";
import {
  CheckCircle,
  Calculator,
  MapPin,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

export default function ProjectDetailView() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { openLeadModal, accessibilityTextSize, lightMode } = useOutletContext<{
    openLeadModal: (projectSlug: string, initialMessage?: string) => void;
    accessibilityTextSize: "sm" | "md" | "lg" | "xl";
    lightMode: boolean;
  }>();

  const { project, loading } = useProject(slug);

  const defaultPrice = useMemo(() => {
    if (!project) return 3000000;
    return project.priceRange.includes("Lakh")
      ? Math.floor(parseFloat(project.priceRange.replace(/[^0-9.]/g, "")) * 100000)
      : 3000000;
  }, [project]);

  // All hooks must be declared before any early returns
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(8.15);
  const [tenureYears, setTenureYears] = useState<number>(15);
  const [current, setCurrent] = useState(0);

  // Sync loanAmount when defaultPrice resolves
  useMemo(() => {
    setLoanAmount(Math.floor(defaultPrice * 0.8));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultPrice]);

  if (loading || !project) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-t-blue-600 border-slate-200 animate-spin" />
      </div>
    );
  }

  const images = [
    project.image,
    ...(project.gallery || []).filter((g) => g !== project.image),
  ].filter(Boolean);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const calculateEMI = () => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;

    if (P === 0 || r === 0) return 0;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.floor(emi);
  };

  const getHeadingClass = () => {
    if (accessibilityTextSize === "sm") return "text-xl";
    if (accessibilityTextSize === "lg") return "text-4xl";
    if (accessibilityTextSize === "xl") return "text-5xl";
    return "text-3xl sm:text-4xl";
  };

  const getTextClass = () => {
    if (accessibilityTextSize === "sm") return "text-xs";
    if (accessibilityTextSize === "lg") return "text-base";
    if (accessibilityTextSize === "xl") return "text-lg";
    return "text-sm";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 select-none">
      <Helmet>
        <title>{project ? `${project.name} | NMRDA Approved Layout in Nagpur - 4 Pillars Realty` : "Project Details | 4 Pillars Realty"}</title>
        <meta
          name="description"
          content={
            project
              ? `Explore ${project.name} located in ${project.location}. ${project.description.slice(0, 150)}... Sizing: ${project.acres !== "Boutique Project" ? `${project.acres} Acres` : "Boutique layout"}. Book a private site visit today.`
              : "View premier NMRDA approved plot layouts and residential townships in Nagpur with 4 Pillars Realty."
          }
        />
        <meta
          property="og:title"
          content={project ? `${project.name} | NMRDA Approved Layout in Nagpur - 4 Pillars Realty` : "Project Details | 4 Pillars Realty"}
        />
        <meta
          property="og:description"
          content={
            project
              ? `Explore ${project.name} located in ${project.location}. ${project.description.slice(0, 150)}...`
              : "View premier NMRDA approved plot layouts and residential townships in Nagpur with 4 Pillars Realty."
          }
        />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* Back button Row */}
      <button
        onClick={() => navigate("/projects")}
        className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-blue-500 transition-all mt-9 uppercase tracking-widest bg-slate-900/10 border border-slate-800/10 hover:border-blue-500/30 px-3.5 py-2 rounded-xl cursor-pointer"
        aria-label="Return to preceding gallery view"
      >
        <ArrowLeft className="w-4 h-4" /> Go Back to Listings
      </button>

      {/* Main Grid: Info Pack on Left, Visuals and Loan Estimator on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6">
        {/* Left Side: Dynamic Specs and Brochure Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <div>
            <h1
              className={`font-serif tracking-tight font-black mt-3 ${
                lightMode ? "text-slate-900" : "text-slate-100"
              } ${getHeadingClass()}`}
            >
              {project.name}
            </h1>
            <p className="text-slate-500 text-xs flex items-center gap-1.5 mt-1">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />{" "}
              {project.location} | Development Zone: {project.mapHotspot}
            </p>
          </div>

          <div className="h-0.5 w-full bg-slate-900/10 rounded" />

          {/* Slogans description */}
          <div>
            <h3
              className={`font-serif font-bold text-lg mb-3 ${lightMode ? "text-slate-900" : "text-slate-100"}`}
            >
              Overview & Structural Masterplan
            </h3>
            <p
              className={`leading-relaxed ${lightMode ? "text-slate-650" : "text-slate-350"} ${getTextClass()}`}
            >
              {project.description}
            </p>
          </div>

          {/* Deep Details list */}
          <div
            className={`p-5 rounded-2xl border ${
              lightMode
                ? "bg-slate-50 border-slate-200 shadow-sm"
                : "bg-slate-950/40 border-slate-850"
            }`}
          >
            <h4 className="font-serif font-semibold text-xs tracking-wider uppercase text-slate-400 mb-3 block">
              Core Sizing Blueprints
            </h4>
            <ul className="space-y-2 text-xs">
              {project.details.map((det, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span
                    className={`${lightMode ? "text-slate-700" : "text-slate-300"}`}
                  >
                    {det}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Full Specifications table */}
          <div>
            <h3
              className={`font-serif font-bold text-lg mb-3 ${lightMode ? "text-slate-900" : "text-slate-100"}`}
            >
              Technical Metadata
            </h3>
            <div
              className={`border rounded-2xl overflow-hidden ${
                lightMode ? "border-slate-200" : "border-slate-850"
              }`}
            >
              <table className="w-full text-xs text-left">
                <tbody>
                  {project.specs.map((spec, i) => (
                    <tr
                      key={i}
                      className={`border-b ${
                        lightMode
                          ? "border-slate-100 odd:bg-slate-50"
                          : "border-slate-850 odd:bg-slate-900/30"
                      }`}
                    >
                      <td className="px-4 py-3 font-semibold text-slate-500 font-mono text-[10px] uppercase w-1/3">
                        {spec.label}
                      </td>
                      <td
                        className={`px-4 py-3 font-medium ${lightMode ? "text-slate-800" : "text-white"}`}
                      >
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Location Key Highlights */}
          <div>
            <h3
              className={`font-serif font-bold text-lg mb-3 ${lightMode ? "text-slate-900" : "text-slate-100"}`}
            >
              Project Key Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {project.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className={`shadow-lg rounded-xl p-3.5 flex items-center gap-3 ${
                    lightMode
                      ? "bg-[#f4f7fa] border-slate-250/50"
                      : "bg-[#091522] border-slate-900"
                  }`}
                >
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />
                  <span
                    className={`font-semibold ${lightMode ? "text-slate-850" : "text-slate-100"}`}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Gated Amenities Checklist */}
          <div>
            <h3
              className={`font-serif font-bold text-lg mb-3 ${lightMode ? "text-slate-900" : "text-slate-100"}`}
            >
              Available Layout Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              {project.amenities.map((am, idx) => (
                <div
                  key={idx}
                  className={`shadow-lg rounded-lg px-3 py-2.5 text-left flex items-center gap-2 ${
                    lightMode
                      ? "bg-white border-slate-205"
                      : "bg-slate-950 border-slate-850"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <span className="text-slate-400 font-medium truncate">
                    {am}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side: Image slider gallery & mortgage EMI calculator */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Main Visual Render display */}
          <div className="bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden p-3 shadow-lg">
            <div className="aspect-video w-full rounded-xl overflow-hidden relative group">
              {/* Image */}
              <img
                src={images[current]}
                alt={project.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain transition-all duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold">
                  ARCHITECTURALLY SANCTIONED LAYOUT RENDER
                </span>
              </div>

              {/* Previous Button */}
              {images.length > 1 && (
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>
              )}

              {/* Next Button */}
              {images.length > 1 && (
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>
              )}

              {/* Dots */}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`w-2 h-2 rounded-full transition cursor-pointer ${
                        current === index ? "bg-white" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Sizing indicators */}
            <div className="grid grid-cols-2 gap-2 mt-2 text-center text-xs font-mono font-bold text-slate-400">
              <div className="bg-slate-900 border border-slate-850 p-2.5 rounded-xl">
                <span className="text-[9px] uppercase tracking-wider text-slate-550 block">
                  Pricing Scale
                </span>
                <span className="text-red-400 text-sm">
                  {project.priceRange}
                </span>
              </div>
              <div className="bg-slate-900 border border-slate-850 p-2.5 rounded-xl">
                <span className="text-[9px] uppercase tracking-wider text-slate-550 block">
                  Sizing Range
                </span>
                <span className="text-white text-sm">
                  {project.acres !== "Boutique Project"
                    ? `${project.acres} Acres`
                    : "Boutique flat"}
                </span>
              </div>
            </div>
          </div>

          {/* Action trigger card */}
          <div className="bg-[#003B72] text-white p-6 rounded-2xl border border-blue-500/20 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-red-650 opacity-10 rounded-full blur-2xl pointer-events-none" />
            <span className="text-[10px] font-bold font-mono tracking-wider uppercase bg-blue-900/40 text-blue-300 px-2 py-0.5 rounded">
              Secure Site Placement
            </span>
            <h4 className="font-serif font-bold text-lg mt-2 tracking-tight">
              Request Complete Legal Folder
            </h4>
            <p className="text-xs text-blue-200 mt-1.5 leading-relaxed font-sans">
              Have our relationship executives dispatch the complete legal
              folder, release letters, layout map layouts, and tax indices
              directly to your email in under 30 minutes.
            </p>

            <button
              onClick={() =>
                openLeadModal(
                  project.slug,
                  `Please share the NMRDA sanctioned legal brochure and release letters regarding ${project.name}.`,
                )
              }
              className="mt-5 w-full text-center bg-white hover:bg-slate-100 text-[#003B72] font-extrabold font-mono text-xs py-3 rounded-xl transition-all uppercase tracking-wider shadow-lg cursor-pointer"
            >
              Request Document Folder (PDF)
            </button>
          </div>

          {/* DYNAMIC EMI HOUSING LOAN CALCULATOR */}
          <div
            className={`border rounded-2xl p-5 ${
              lightMode
                ? "bg-slate-50 border-slate-200"
                : "bg-slate-950 border-slate-850"
            }`}
          >
            <div
              className={`flex items-center gap-1.5 border-b pb-3 mb-4 ${
                lightMode ? "border-slate-200" : "border-slate-800"
              }`}
            >
              <Calculator className="w-5 h-5 text-blue-500 shrink-0" />
              <div>
                <h4
                  className={`text-sm font-serif font-bold ${lightMode ? "text-slate-900" : "text-slate-100"}`}
                >
                  EMI Mortgage Estimator
                </h4>
                <span
                  className={`text-[9px] font-mono uppercase tracking-wider ${lightMode ? "text-slate-500" : "text-slate-400"}`}
                >
                  Partner Banks: up to 80% Loan approvals
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-xs select-none">
              {/* Slit Amount */}
              <div>
                <div
                  className={`flex justify-between font-medium mb-1 font-mono text-[10px] uppercase ${
                    lightMode ? "text-slate-600" : "text-slate-400"
                  }`}
                >
                  <span>Financing Loan Volume</span>
                  <span
                    className={`font-bold px-1.5 py-0.2 rounded font-mono text-xs ${
                      lightMode
                        ? "text-slate-900 bg-slate-200/60"
                        : "text-white bg-slate-900"
                    }`}
                  >
                    ₹{(loanAmount / 100000).toFixed(2)} Lakh
                  </span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={Math.floor(defaultPrice * 0.9)}
                  step={50000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  aria-label="Loan Amount scale slider"
                />
              </div>

              {/* Slit Interest */}
              <div>
                <div
                  className={`flex justify-between font-medium mb-1 font-mono text-[10px] uppercase ${
                    lightMode ? "text-slate-600" : "text-slate-400"
                  }`}
                >
                  <span>Interest Rate (SBA)</span>
                  <span
                    className={`font-bold px-1.5 py-0.2 rounded font-mono text-xs ${
                      lightMode
                        ? "text-slate-900 bg-slate-200/60"
                        : "text-white bg-slate-900"
                    }`}
                  >
                    {interestRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min={6.5}
                  max={14.0}
                  step={0.05}
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  aria-label="Interest Rate slider"
                />
              </div>

              {/* Slit Duration */}
              <div>
                <div
                  className={`flex justify-between font-medium mb-1 font-mono text-[10px] uppercase ${
                    lightMode ? "text-slate-600" : "text-slate-400"
                  }`}
                >
                  <span>Tenure Duration</span>
                  <span
                    className={`font-bold px-1.5 py-0.2 rounded font-mono text-xs ${
                      lightMode
                        ? "text-slate-900 bg-slate-200/60"
                        : "text-white bg-slate-900"
                    }`}
                  >
                    {tenureYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(parseInt(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  aria-label="Loan Tenure duration slider"
                />
              </div>

              {/* EMI Calculation display panel */}
              <div
                className={`border rounded-xl p-4 text-center mt-2 relative overflow-hidden ${
                  lightMode
                    ? "bg-[#E2E8F0]/40 border-slate-200 shadow-sm"
                    : "bg-slate-900/90 border-slate-800"
                }`}
              >
                <span
                  className={`text-[9px] font-bold uppercase tracking-widest font-mono ${
                    lightMode ? "text-slate-550" : "text-slate-500"
                  }`}
                >
                  Estimated Monthly EMI Payment
                </span>
                <div className="text-2xl font-black font-mono text-red-500 mt-1">
                  ₹{calculateEMI().toLocaleString()}/mo
                </div>
                <p className="text-[9px] text-slate-500 mt-1 leading-normal font-sans">
                  Calculation represents monthly amortization schedules. Elite
                  private banks assist 80% financing on Melbourne, Canberra, and
                  Shraddha Avenue plots.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
