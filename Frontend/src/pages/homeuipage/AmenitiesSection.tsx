import { motion } from 'motion/react';
import {
  DoorOpen,
  Leaf,
  Smile,
  Footprints,
  Flower2,
  Users,
  Route,
  Lightbulb,
  Waves,
  Zap,
  Trees,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const COMMUNITY_AMENITIES = [
  { name: 'European Style Entrance Gate', icon: DoorOpen, desc: 'Grand entry arch with security booth' },
  { name: 'Landscaped Gardens', icon: Leaf, desc: 'Manicured green spaces & lawns' },
  { name: 'Children\'s Play Area', icon: Smile, desc: 'Safe playground zone for kids' },
  { name: 'Jogging Track', icon: Footprints, desc: 'Paved walkways for health & fitness' },
  { name: 'Gazebos', icon: Flower2, desc: 'Relaxing shaded outdoor seating' },
  { name: 'Outdoor Seating Areas', icon: Users, desc: 'Community sit-outs & gathering spots' },
];

const INFRASTRUCTURE_AMENITIES = [
  { name: 'Wide Tar & Cement Roads', icon: Route, desc: '30ft to 40ft wide paved asphalt avenues' },
  { name: 'Street Lighting', icon: Lightbulb, desc: 'Energy efficient LED solar lighting' },
  { name: 'Sewerage Network', icon: Waves, desc: 'Underground sanitary drainage pipeline' },
  { name: 'Electrical Infrastructure', icon: Zap, desc: 'Underground cabling & transformer points' },
  { name: 'Open Green Spaces', icon: Trees, desc: 'Dedicated tree-lined open zones' },
];

export default function AmenitiesSection() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80 relative overflow-hidden" id="lifestyle-amenities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-[#003a78] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Modern Living Infrastructure</span>
          </div>
          <h2 className="font-serif font-bold text-[#003a78] text-2xl sm:text-4xl tracking-tight mb-3">
            Premium Lifestyle Amenities
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Designed to enhance everyday living with thoughtfully planned facilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Community Amenities Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003a78] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-serif font-bold text-xl text-[#003a78]">
                Community Amenities
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COMMUNITY_AMENITIES.map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.name}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors"
                  >
                    <div className="w-9 h-9 shrink-0 rounded-lg bg-blue-100/60 text-[#003a78] flex items-center justify-center">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 leading-snug">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Infrastructure Amenities Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-serif font-bold text-xl text-[#003a78]">
                Infrastructure Amenities
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INFRASTRUCTURE_AMENITIES.map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.name}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors"
                  >
                    <div className="w-9 h-9 shrink-0 rounded-lg bg-emerald-100/60 text-emerald-700 flex items-center justify-center">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 leading-snug">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
