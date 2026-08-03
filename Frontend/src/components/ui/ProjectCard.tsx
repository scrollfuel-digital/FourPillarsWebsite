import { useState, useRef, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Project } from '../../types';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  key?: string;
  proj: Project;
  idx: number;
  lightMode: boolean;
  onSelectProject: (slug: string) => void;
  openLeadModal: (projectSlug: string, initialMessage?: string) => void;
}

export default function ProjectCard({
  proj,
  idx,
  lightMode,
  onSelectProject,
  openLeadModal,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Relative position normalized to be between -0.5 and 0.5
    const xPct = ((e.clientX - rect.left) / rect.width) - 0.5;
    const yPct = ((e.clientY - rect.top) / rect.height) - 0.5;
    
    setCoords({ x: xPct, y: yPct });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Rotation parameters for extreme polished subtle 3D card tilt
  const rotateX = isHovered ? coords.y * -8 : 0;
  const rotateY = isHovered ? coords.x * 8 : 0;
  
  // Background image coordinates shift (opposite direction for true depth parallax feedback)
  const imgShiftX = isHovered ? coords.x * -16 : 0;
  const imgShiftY = isHovered ? coords.y * -16 : 0;
  const imgScale = isHovered ? 1.08 : 1.0;

  // Highlights center location
  const glareX = (coords.x + 0.5) * 100;
  const glareY = (coords.y + 0.5) * 100;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: idx * 0.15 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className="flex flex-col rounded-2xl overflow-hidden group/card"
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 22, mass: 0.5 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className={`flex-1 flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-300 ${
          lightMode 
            ? 'bg-slate-55 border-slate-200 shadow-sm shadow-slate-100 hover:border-slate-350 hover:shadow-xl' 
            : 'bg-slate-950 border-slate-850 hover:border-slate-700 hover:shadow-2xl hover:shadow-blue-950/20'
        }`}
      >
        {/* Image Wrap */}
        <div className="relative aspect-video overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
          
          <div className="absolute inset-0 overflow-hidden">
            {/* Shifting dynamic background image with extra sizing bleed to prevent edge showing */}
            <motion.img
              src={proj.image}
              alt={proj.name}
              referrerPolicy="no-referrer"
              animate={{
                x: imgShiftX,
                y: imgShiftY,
                scale: imgScale,
              }}
              transition={{ type: 'spring', stiffness: 180, damping: 20 }}
              className="w-[108%] h-[108%] -left-[4%] -top-[4%] relative object-cover select-none pointer-events-none"
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent pointer-events-none" />
          
          {/* Interactive Light Highlight Overlay */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.12 : 0,
            }}
            transition={{ duration: 0.3 }}
            style={{
              background: `radial-gradient(circle 120px at ${glareX}% ${glareY}%, rgba(255,255,255,0.8), transparent)`,
            }}
            className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay"
          />

          {/* Status Badge */}
          <span className="absolute top-4 left-4 text-[9px] font-bold font-mono uppercase bg-slate-950/90 text-blue-400 border border-slate-800 px-2 py-0.5 rounded shadow z-10 select-none">
            {proj.type.toUpperCase()}
          </span>

          {/* Price overlay bottom right */}
          <div 
            style={{ transform: 'translateZ(20px)' }}
            className="absolute bottom-3 right-3 font-mono text-[11px] font-bold bg-[#003B72] text-white px-2.5 py-1 rounded-lg border border-blue-500/20 shadow-md z-10 select-none"
          >
            {proj.priceRange}
          </div>
        </div>

        {/* Info packet */}
        <div className="p-5 flex-1 flex flex-col justify-between" style={{ transformStyle: 'preserve-3d' }}>
          <div style={{ transform: 'translateZ(10px)' }}>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
              {proj.location}
            </span>
            <h3 className={`font-serif font-bold text-2xl tracking-tight mt-1 text-slate-900`}>
              {proj.name}
            </h3>
            <p className="text-slate-500 text-lg mt-2 line-clamp-3 leading-relaxed">
              {proj.description}
            </p>

            {/* Checkpoints */}
            <ul className="mt-4 space-y-1.5 text-sm">
              {proj.highlights.slice(0, 3).map((high, index) => (
                <li key={index} className="flex items-center gap-1.5 text-slate-550">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
                  <span>{high}</span>
                </li>
              ))}
            </ul>
          </div>

          <div 
            style={{ transform: 'translateZ(15px)' }}
            className="mt-6 pt-4 border-t border-slate-900/10 flex justify-between items-center shrink-0"
          >
            <button
              onClick={() => {
                onSelectProject(proj.slug);
                window.scrollTo({ top: 0 });
              }}
              className="text-xs text-blue-500 font-bold hover:text-blue-400 uppercase tracking-wider font-mono flex items-center gap-1 relative overflow-hidden group/btn"
            >
              Explore Project 
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
            <button
              onClick={() => openLeadModal(proj.slug, `Interested in pricing for ${proj.name}.`)}
              className="bg-slate-950 hover:bg-slate-900 border border-slate-800 text-white text-[10px] uppercase tracking-wider font-bold py-1.5 px-3 rounded-lg hover:border-slate-700 hover:scale-105 transition-all duration-300"
            >
              Book Tour
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
