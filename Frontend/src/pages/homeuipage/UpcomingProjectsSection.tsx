import { motion, AnimatePresence } from "motion/react";
import { Project } from "../../types";
import {
  MapPin,
  Sparkles,
  Phone,
  MessageCircle,
  Building2,
  CheckCircle2,
  Compass,
  ChevronRight,
  Calendar,
} from "lucide-react";

interface UpcomingProjectsSectionProps {
  projects: Project[];
  onSelectProject: (slug: string) => void;
  openLeadModal: (projectSlug: string, initialMessage?: string) => void;
  textHeadingSize?: string;
}

export default function UpcomingProjectsSection({
  projects,
  onSelectProject,
  openLeadModal,
  textHeadingSize = "text-2xl sm:text-3xl",
}: UpcomingProjectsSectionProps) {
  // Only show projects with status 'upcoming'
  const filteredProjects = projects.filter((p) => p.status === "upcoming");

  const getStatusBadge = () => {
    return {
      label: "Upcoming Pre-Launch",
      bg: "bg-amber-500/15 border-amber-500/30 text-amber-800",
      dot: "bg-amber-500",
    };
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="py-16 md:py-24 bg-slate-50/70 border-b border-slate-200/80 relative overflow-hidden"
      id="flagship-developments"
    >
      {/* Subtle Light Decorative Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-blue-100/30 via-sky-100/40 to-indigo-100/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#003a78] text-xs font-bold uppercase tracking-widest mb-3 shadow-xs"
          >
            <Compass className="w-3.5 h-3.5 text-[#2b86c5]" />
            Upcoming Pre-Launch Portfolio
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`font-serif font-bold text-[#003a78] ${textHeadingSize} tracking-tight mb-2`}
          >
            Our Upcoming Developments
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-600 text-sm sm:text-base"
          >
            Be the first to explore our upcoming residential plot layouts,
            luxury boutique apartments, and mega townships across Nagpur.
          </motion.p>
        </div>

        {/* Minimalist Visual Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key="upcoming"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredProjects.length === 0 && (
              <div className="col-span-full text-center py-16">
                <CheckCircle2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 text-sm font-medium">
                  No upcoming projects at the moment. Please check back soon.
                </p>
              </div>
            )}

            {filteredProjects.map((proj, idx) => {
              const badge = getStatusBadge();

              return (
                <motion.div
                  key={proj.slug}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#2b86c5]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Image Header */}
                    <div
                      className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-100 cursor-pointer"
                      onClick={() => onSelectProject(proj.slug)}
                    >
                      <img
                        src={proj.image}
                        alt={proj.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      {/* Subtle Vignette Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-black/20" />

                      {/* Top Badges Overlay */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-xs ${badge.bg}`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${badge.dot}`}
                          />
                          {badge.label}
                        </span>

                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                          <Building2 className="w-3 h-3 text-[#2b86c5]" />
                          {proj.type === "plot"
                            ? "Plots"
                            : proj.type === "apartment"
                              ? "Apartments"
                              : "Township"}
                        </span>
                      </div>

                      {/* Bottom Title Overlay on Image */}
                      <div className="absolute bottom-3.5 left-4 right-4 z-10">
                        <div className="flex items-center gap-1 text-xs text-amber-300 font-semibold mb-0.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                          <span className="truncate">{proj.location}</span>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-white tracking-tight drop-shadow-md truncate">
                          {proj.name}
                        </h3>
                      </div>
                    </div>

                    {/* Concise Card Content */}
                    <div className="p-5">
                      {/* 3 Key Specs Pills */}
                      <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                        <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2.5 text-center flex flex-col justify-center">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">
                            TYPE
                          </span>
                          <span className="font-bold text-slate-800 text-[11px] leading-tight truncate">
                            {proj.type === "plot"
                              ? "Plotted"
                              : proj.type === "apartment"
                                ? "Apartments"
                                : "Township"}
                          </span>
                        </div>

                        <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2.5 text-center flex flex-col justify-center">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">
                            AREA
                          </span>
                          <span className="font-bold text-slate-800 text-xs sm:text-sm truncate">
                            {proj.acres ? `${proj.acres} Acres` : "Boutique"}
                          </span>
                        </div>

                        <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2.5 text-center flex flex-col justify-center">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">
                            PRICE
                          </span>
                          <span className="font-bold text-[#003a78] text-[11px] truncate">
                            {proj.priceRange || "On Request"}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-1">
                        {proj.description}
                      </p>
                    </div>
                  </div>

                  {/* Clean Action Footer */}
                  <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 mt-2 pt-3">
                    <button
                      onClick={() => onSelectProject(proj.slug)}
                      className="flex-1 bg-[#003a78] hover:bg-[#2b86c5] text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <button
                      onClick={() =>
                        openLeadModal(
                          proj.slug,
                          `I am interested in ${proj.name}. Please send pricing, brochure, and available layout plans.`,
                        )
                      }
                      className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 border border-amber-300/50 p-2.5 rounded-xl transition-all cursor-pointer"
                      title="Schedule Visit"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>

                    <a
                      href={`https://wa.me/919373233777?text=Hi%204%20Pillars%20Realty,%20I%20want%20details%20for%20${encodeURIComponent(
                        proj.name,
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 p-2.5 rounded-xl transition-all"
                      title="WhatsApp Inquiry"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>

                    <a
                      href="tel:+919373233777"
                      className="bg-blue-50 hover:bg-blue-100 text-[#003a78] border border-blue-200 p-2.5 rounded-xl transition-all"
                      title="Call Office"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
