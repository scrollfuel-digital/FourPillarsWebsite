import { useState } from 'react';
import { motion } from 'motion/react';
import { useCounter } from './homeUtils';
import {
  Building2,
  Award,
  KeyRound,
  Users,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

interface MetricItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: any;
  iconBg: string;
  iconColor: string;
  badge: string;
}

const HIGHLIGHT_METRICS: MetricItem[] = [
  {
    id: 'units-sold',
    value: 2000,
    suffix: '+',
    label: 'Units & Plots Sold',
    description: 'Successfully delivered residential & commercial plot layouts across Nagpur.',
    icon: KeyRound,
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-[#2b86c5]',
    badge: 'High Demand',
  },
  {
    id: 'years-exp',
    value: 15,
    suffix: '+',
    label: 'Years of Experience',
    description: 'A decade-plus legacy of trustworthy real estate development & legal clarity.',
    icon: Award,
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-600',
    badge: 'Industry Leader',
  },
  {
    id: 'total-projects',
    value: 18,
    suffix: '+',
    label: 'Total Projects',
    description: 'Signature townships and plotted developments in prime Nagpur growth corridors.',
    icon: Building2,
    iconBg: 'bg-indigo-500/15',
    iconColor: 'text-indigo-600',
    badge: 'NMRDA Sanctioned',
  },
  {
    id: 'happy-families',
    value: 1500,
    suffix: '+',
    label: 'Satisfied Families',
    description: 'Delighted homeowners and smart investors building secure futures.',
    icon: Users,
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-600',
    badge: '100% Trust',
  },
  {
    id: 'land-developed',
    value: 200,
    suffix: '+ ',
    label: 'Land Developed',
    description: 'Gated communities with wide asphalt roads, underground drainage & green parks.',
    icon: MapPin,
    iconBg: 'bg-sky-500/15',
    iconColor: 'text-sky-600',
    badge: 'Prime Corridors',
  },
  {
    id: 'clear-titles',
    value: 100,
    suffix: '%',
    label: 'RERA & Legal Clearance',
    description: 'Zero litigation risk with bank loan approvals from top financial institutions.',
    icon: ShieldCheck,
    iconBg: 'bg-teal-500/15',
    iconColor: 'text-teal-600',
    badge: 'Verified Legal',
  },
];

interface MetricCardProps {
  item: MetricItem;
  active: boolean;
  index: number;
}

function MetricCard({ item, active, index }: MetricCardProps) {
  const count = useCounter(item.value, active, index * 100);
  const IconComp = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#2b86c5]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle top border accent on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#003a78] to-[#2b86c5] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Top Header Row with Icon & Badge */}
        <div className="flex items-center justify-between gap-2 mb-5">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.iconBg} transition-transform duration-300 group-hover:scale-110`}
          >
            <IconComp className={`w-6 h-6 ${item.iconColor}`} />
          </div>

          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60 group-hover:bg-[#003a78] group-hover:text-white transition-colors duration-300">
            {item.badge}
          </span>
        </div>

        {/* Counter Metric Display */}
        <div className="flex items-baseline gap-1 mb-2">
          <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#003a78] tracking-tight">
            {count.toLocaleString()}
          </span>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-[#2b86c5]">
            {item.suffix}
          </span>
        </div>

        {/* Metric Label & Description */}
        <h3 className="font-bold text-base text-slate-800 mb-2">
          {item.label}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Bottom Indicator Bar */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-[#2b86c5] transition-colors">
        <span className="flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5 text-[#2b86c5]" />
          Verified Metric
        </span>
        
      </div>
    </motion.div>
  );
}

interface ProjectHighlightsSectionProps {
  textHeadingSize?: string;
}

export default function ProjectHighlightsSection({
  textHeadingSize = 'text-2xl sm:text-3xl',
}: ProjectHighlightsSectionProps) {
  const [active, setActive] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onViewportEnter={() => setActive(true)}
      className="py-16 md:py-24 bg-slate-50/80 border-b border-slate-200/80 relative overflow-hidden"
      id="project-highlights"
    >
      {/* Background Decorative Blob */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-100/40 via-sky-100/30 to-indigo-100/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#003a78] text-xs font-bold uppercase tracking-widest mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2b86c5]" />
            Track Record & Proven Impact
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`font-serif font-bold text-[#003a78] ${textHeadingSize} tracking-tight mb-3`}
          >
            Project Highlights & Key Metrics
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed"
          >
            Building trust through transparent delivery, legally verified land titles, and exceptional appreciation across Nagpur's premier residential corridors.
          </motion.p>
        </div>

        {/* Metrics Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {HIGHLIGHT_METRICS.map((metric, idx) => (
            <MetricCard
              key={metric.id}
              item={metric}
              active={active}
              index={idx}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
