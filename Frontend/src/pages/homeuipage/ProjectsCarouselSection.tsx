import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Loader2 } from "lucide-react";
import { Project } from "../../types";

interface ProjectsCarouselSectionProps {
  onSelectProject: (slug: string) => void;
  textHeadingSize?: string;
}

interface ProjectsApiResponse {
  success: boolean;
  count: number;
  data: Project[];
}

// ---- Reusable Project Card ----
function ProjectCard({
  proj,
  idx,
  isUpcoming,
  onSelectProject,
}: {
  proj: Project;
  idx: number;
  isUpcoming: boolean;
  onSelectProject: (slug: string) => void;
}) {
  const typeSpec = proj.specs?.find((s) =>
    /bhk|type|unit|configuration/i.test(s.label),
  );

  const areaSpec = proj.specs?.find((s) =>
    /area|sq\.?\s?ft|size/i.test(s.label),
  );

  return (
    <motion.div
      key={proj.slug}
      className="group relative h-96 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-200/80"
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-80px",
      }}
      transition={{
        duration: 0.7,
        delay: 0.1 + idx * 0.15,
      }}
      whileHover={{
        y: -8,
      }}
    >
      {/* Base Color Block */}
      <div
        className={`absolute inset-0 z-10 opacity-0 md:opacity-100 ${
          idx % 2 === 0
            ? "bg-gradient-to-br from-[#003a78] via-[#002b5c] to-[#2b86c5]"
            : "bg-white"
        } transition-opacity duration-500 md:group-hover:opacity-0 md:group-hover:pointer-events-none pointer-events-none md:pointer-events-auto`}
      >
        {/* Status */}
        <div className="absolute top-4 left-4">
          <span
            className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full shadow-sm ${
              idx % 2 === 0
                ? "bg-white/20 text-white border border-white/20"
                : "bg-[#003a78] text-white"
            }`}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-emerald-400"
              animate={{
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />

            {isUpcoming ? "Coming Soon" : "Available Now"}
          </span>
        </div>

        {/* Project Name */}
        <div className="h-full flex flex-col items-center justify-center text-center px-6">
          <span
            className={`text-3xl md:text-4xl font-bold tracking-tight ${
              idx % 2 === 0 ? "text-white" : "text-[#003a78]"
            }`}
          >
            {proj.name}
          </span>

          <span
            className={`mt-4 text-xs uppercase tracking-widest font-bold ${
              idx % 2 === 0 ? "text-blue-100" : "text-[#2b86c5]"
            }`}
          >
            {typeSpec?.value ||
              (proj.type === "plot"
                ? "Premium Plots"
                : proj.type === "apartment"
                  ? "Premium Apartments"
                  : "Premium Development")}
          </span>

          <span
            className={`mt-2 text-[11px] uppercase tracking-wider font-bold ${
              idx % 2 === 0 ? "text-blue-200" : "text-slate-500"
            }`}
          >
            {isUpcoming
              ? "Upcoming Development"
              : "NMRDA Approved • Ready Possession"}
          </span>
        </div>
      </div>

      {/* Project Image */}
      <motion.div
        className="absolute inset-0 z-20 bg-cover bg-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"
        style={{
          backgroundImage: `url(${proj.image})`,
        }}
      >
        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#001f42]/95 via-[#003a78]/50 to-black/20" />

        <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
          {/* Location */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-[#2b86c5] shrink-0" />

            <span className="line-clamp-1">{proj.location}</span>
          </div>

          {/* Bottom Content */}
          <div className="space-y-4">
            {/* Name */}
            <h3 className="font-bold text-2xl tracking-tight">{proj.name}</h3>

            {/* Area */}
            <div className="text-center border-t border-white/20 pt-3">
              <p className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">
                Area
              </p>

              <p className="text-xs sm:text-sm font-bold mt-0.5">
                {areaSpec?.value || (proj.acres ? `${proj.acres} Acres` : "—")}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-1">
              {/* View Project */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectProject(proj.slug);
                }}
                className="flex-1 bg-white text-[#003a78] font-bold py-3 px-4 rounded-xl text-xs sm:text-sm hover:bg-slate-100 transition-all shadow-xl"
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                View Project
              </motion.button>

              {/* Call */}
              <motion.a
                href={`tel:${proj.phone || "+919373233777"}`}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#2b86c5] hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center shadow-xl"
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                aria-label={`Call ${proj.name}`}
              >
                <Phone className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ---- Reusable Section Header (Ongoing / Upcoming) ----
function SubSectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="text-center mb-16 relative z-10"
    >
      <motion.h2
        className={`font-black tracking-tight text-[#003a78] text-2xl sm:text-3xl mb-4`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: 0.1,
        }}
      >
        {title}
      </motion.h2>

      <p className="text-slate-600 max-w-xl mx-auto text-2xl sm:text-base">
        {subtitle}
      </p>
    </motion.div>
  );
}

export default function ProjectsCarouselSection({
  onSelectProject,
  textHeadingSize = "text-2xl sm:text-3xl",
}: ProjectsCarouselSectionProps) {
  const [activeProjects, setActiveProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://fourpillarswebsite.onrender.com/api/projects",
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const result: ProjectsApiResponse = await response.json();

        if (!result.success) {
          throw new Error("Failed to fetch projects");
        }

        setActiveProjects(result.data);
      } catch (error) {
        console.error("Projects API Error:", error);
        setError("Unable to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const ongoingProjects = activeProjects.filter(
    (p) => p.type?.toLowerCase() !== "upcoming",
  );

  const upcomingProjects = activeProjects.filter(
    (p) => p.type?.toLowerCase() === "upcoming",
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="py-20 md:py-32 border-b bg-gradient-to-br from-white via-slate-50/50 to-blue-50/40 border-slate-200/80 relative overflow-hidden"
      id="projects-carousel"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 right-10 w-80 h-80 bg-gradient-to-r from-blue-600/10 to-sky-500/10 rounded-full blur-3xl" />

        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-800/8 to-indigo-500/8 rounded-full blur-2xl" />
      </div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16 relative z-10"
      >
        <motion.h2
          className={`font-black tracking-tight text-[#003a78] ${textHeadingSize} mb-4`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
        >
          Our Signature Projects
        </motion.h2>

        <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
          Explore premier residential developments in Nagpur with full legal
          clearance and ready infrastructure
        </p>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#003a78] animate-spin mb-4" />

            <p className="text-slate-500 text-sm">Loading projects...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-red-500 font-medium mb-4">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-xl bg-[#003a78] text-white text-sm font-semibold hover:bg-[#002b5c] transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Projects: Ongoing + Upcoming as separate sections */}
        {!loading && !error && activeProjects.length > 0 && (
          <div className="space-y-20">
            {/* Ongoing Projects */}
            {ongoingProjects.length > 0 && (
              <div>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                  }}
                >
                  {ongoingProjects.map((proj, idx) => (
                    <ProjectCard
                      key={proj.slug}
                      proj={proj}
                      idx={idx}
                      isUpcoming={false}
                      onSelectProject={onSelectProject}
                    />
                  ))}
                </motion.div>
              </div>
            )}

            {/* Upcoming Projects */}
            {upcomingProjects.length > 0 && (
              <div>
                <SubSectionHeader
                  title="Upcoming Projects"
                  subtitle="Future launches & pre-launch opportunities"
                />

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                  }}
                >
                  {upcomingProjects.map((proj, idx) => (
                    <ProjectCard
                      key={proj.slug}
                      proj={proj}
                      idx={idx}
                      isUpcoming={true}
                      onSelectProject={onSelectProject}
                    />
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        )}

        {/* No Projects */}
        {!loading && !error && activeProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500">
              No projects available at the moment.
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
}
