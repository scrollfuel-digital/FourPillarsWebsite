import { motion } from 'motion/react';
import { Project } from '../../types';
import { MapPin, Phone } from 'lucide-react';

interface ProjectsCarouselSectionProps {
  activeProjects: Project[];
  onSelectProject: (slug: string) => void;
  textHeadingSize?: string;
}

export default function ProjectsCarouselSection({
  activeProjects,
  onSelectProject,
  textHeadingSize = 'text-2xl sm:text-3xl',
}: ProjectsCarouselSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="py-20 md:py-32 border-b bg-gradient-to-br from-white via-slate-50/50 to-blue-50/40 border-slate-200/80 relative overflow-hidden"
      id="projects-carousel"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <motion.h2
          className={`font-black tracking-tight text-[#003a78] ${textHeadingSize} mb-4`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Our Signature Projects
        </motion.h2>
        <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
          Explore premier residential developments in Nagpur with full legal clearance and ready infrastructure
        </p>
      </motion.div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 right-10 w-80 h-80 bg-gradient-to-r from-blue-600/10 to-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-800/8 to-indigo-500/8 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {activeProjects.map((proj, idx) => {
            const typeSpec = proj.specs?.find((s) =>
              /bhk|type|unit/i.test(s.label)
            );
            const areaSpec = proj.specs?.find((s) =>
              /area|sq\.?\s?ft|size/i.test(s.label)
            );

            return (
              <motion.div
                key={proj.slug}
                className="group relative h-96 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-200/80"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.1 + idx * 0.15 }}
                whileHover={{ y: -8 }}
              >
                {/* Base color block */}
                <div
                  className={`absolute inset-0 z-10 opacity-0 md:opacity-100 ${
                    idx % 2 === 0
                      ? 'bg-gradient-to-br from-[#003a78] via-[#002b5c] to-[#2b86c5]'
                      : 'bg-white'
                  } transition-opacity duration-500 md:group-hover:opacity-0 md:group-hover:pointer-events-none pointer-events-none md:pointer-events-auto`}
                >
                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full shadow-sm ${
                        idx % 2 === 0
                          ? 'bg-white/20 text-white border border-white/20'
                          : 'bg-[#003a78] text-white'
                      }`}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full bg-emerald-400"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      Available Now
                    </span>
                  </div>

                  <div className="h-full flex flex-col items-center justify-center text-center px-6">
                    <span
                      className={`text-3xl md:text-4xl font-bold tracking-tight ${
                        idx % 2 === 0 ? 'text-white' : 'text-[#003a78]'
                      }`}
                    >
                      {proj.name}
                    </span>
                    <span
                      className={`mt-4 text-xs uppercase tracking-widest font-bold ${
                        idx % 2 === 0 ? 'text-blue-100' : 'text-[#2b86c5]'
                      }`}
                    >
                      {typeSpec?.value || 'Premium Residences'}
                    </span>
                    <span
                      className={`mt-2 text-[11px] uppercase tracking-wider font-semibold ${
                        idx % 2 === 0 ? 'text-blue-200' : 'text-slate-500'
                      }`}
                    >
                      NMRDA Approved • Ready Possession
                    </span>
                  </div>
                </div>

                {/* Hover photo layer */}
                <motion.div
                  className="absolute inset-0 z-20 bg-cover bg-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundImage: `url(${proj.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001f42]/95 via-[#003a78]/50 to-black/20" />

                  <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                      <MapPin className="w-4 h-4 text-[#2b86c5]" />
                      <span>{proj.location}</span>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold text-2xl tracking-tight">
                        {proj.name}
                      </h3>

                      <div className="text-center border-t border-white/20 pt-3">
                       
                        <div className="">
                          <p className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">
                            Area
                          </p>
                          <p className="text-xs sm:text-sm font-bold mt-0.5">
                            {areaSpec?.value || '—'}
                          </p>
                        </div>
                        
                      </div>

                      <div className="flex gap-3 pt-1">
                        <motion.button
                          onClick={() => onSelectProject(proj.slug)}
                          className="flex-1 bg-white text-[#003a78] font-bold py-3 px-4 rounded-xl text-xs sm:text-sm hover:bg-slate-100 transition-all shadow-xl"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          View Project
                        </motion.button>

                        <motion.a
                          href={`tel:${proj.phone || '+919373233777'}`}
                          onClick={(e) => e.stopPropagation()}
                          className="bg-[#2b86c5] hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center shadow-xl"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Phone className="w-4 h-4" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
