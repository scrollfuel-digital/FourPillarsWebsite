import { useNavigate, useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useProjects } from "../hooks/useProjects";
import shradhabhaktis from "../assests/images/images/shradhabhaktis.png";
export default function ProjectsView() {
  const navigate = useNavigate();
  const { openLeadModal, accessibilityTextSize, lightMode } = useOutletContext<{
    openLeadModal: (projectSlug: string, initialMessage?: string) => void;
    accessibilityTextSize: "sm" | "md" | "lg" | "xl";
    lightMode: boolean;
  }>();

  const { projects, loading } = useProjects();

  if (loading) {  
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-t-blue-600 border-slate-200 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-35 pb-20">
      <Helmet>
        <title>
          NMRDA Approved Projects & Plot Layouts in Nagpur | 4 Pillars Realty
        </title>
        <meta
          name="description"
          content="Browse premier NMRDA approved plots, residential townships, and gated layouts across Besa, Shankarpur, Wardha Road, and South Nagpur."
        />
        <meta
          property="og:title"
          content="NMRDA Approved Projects & Plot Layouts in Nagpur | 4 Pillars Realty"
        />
        <meta
          property="og:description"
          content="Browse premier NMRDA approved plots, residential townships, and gated layouts across Besa, Shankarpur, Wardha Road, and South Nagpur."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`font-serif font-black tracking-tight mb-2 ${
          lightMode ? "text-slate-900" : "text-slate-100"
        } ${
          accessibilityTextSize === "sm"
            ? "text-2xl"
            : accessibilityTextSize === "lg"
              ? "text-5xl"
              : accessibilityTextSize === "xl"
                ? "text-6xl"
                : "text-4xl"
        }`}
      >
        Our Projects
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-slate-500 text-sm mb-12"
      >
        Explore our premium residential developments across Nagpur.
      </motion.p>

      <div className="flex flex-col gap-10">
        {projects.map((proj, idx) => (
          <motion.div
            key={proj.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.05, ease: "easeOut" }}
            className={`flex flex-col lg:flex-row rounded-3xl overflow-hidden border transition-all shadow-md hover:shadow-xl ${
              lightMode
                ? "bg-white border-slate-200"
                : "bg-slate-900 border-slate-800"
            }`}
          >
            <div className="lg:w-1/2 aspect-video lg:aspect-auto h-72 lg:h-auto overflow-hidden relative">
              <img
                src={shradhabhaktis}
                alt={proj.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent pointer-events-none" />
              <span className="absolute top-4 left-4 text-[9px] font-mono tracking-widest uppercase bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-blue-400 font-bold">
                {proj.type.toUpperCase()}
              </span>
            </div>

            <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block font-mono flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-500 inline" />
                  {proj.location}
                </span>
                <h3
                  className={`text-xl font-serif font-bold tracking-tight mt-1.5 ${
                    lightMode ? "text-slate-900" : "text-slate-100"
                  }`}
                >
                  {proj.name}
                </h3>
                <p
                  className={`text-xs mt-3 leading-relaxed ${
                    lightMode ? "text-slate-600" : "text-slate-400"
                  }`}
                >
                  {proj.description}
                </p>

                <div
                  className={`mt-4 grid grid-cols-2 gap-4 text-xs font-mono border-t pt-4 ${
                    lightMode ? "border-slate-100" : "border-slate-800"
                  }`}
                >
                  {proj.specs.slice(0, 2).map((spec, sIdx) => (
                    <div key={sIdx}>
                      <span className="text-[10px] text-slate-500 uppercase block font-normal">
                        {spec.label}
                      </span>
                      <span
                        className={`font-extrabold mt-0.5 inline-block text-xs ${
                          lightMode ? "text-slate-900" : "text-slate-100"
                        }`}
                      >
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`mt-8 pt-4 border-t flex justify-between items-center shrink-0 ${
                  lightMode ? "border-slate-100" : "border-slate-800"
                }`}
              >
                <button
                  onClick={() => navigate(`/${proj.slug}`)}
                  className="text-xs text-blue-500 font-bold hover:text-blue-400 uppercase tracking-wider font-mono cursor-pointer"
                >
                  Explore Details →
                </button>
                <button
                  onClick={() =>
                    openLeadModal(
                      proj.slug,
                      `Interested in schedules for ${proj.name}.`,
                    )
                  }
                  className="bg-[#003B72] hover:bg-[#1A67A4] text-white text-xs font-bold py-1.5 px-4 rounded-xl cursor-pointer"
                >
                  Book Land Slot
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
