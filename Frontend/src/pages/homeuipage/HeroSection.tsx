
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ROTATING_PHRASES, HERO_TRUST_BADGES } from "./homeData";
import OfficeAddressModal from "../../components/ui/OfficeAddressModal";
import BackgroundVideo from "../../assests/videos/PillarWebsiteVideo.mp4";
interface HeroSectionProps {
  openLeadModal: (projectSlug: string, initialMessage?: string) => void;
  onChangeRoute: (route: string) => void;
}

export default function HeroSection({
  openLeadModal,
  onChangeRoute,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [rotatingIndex, setRotatingIndex] = useState(0);
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[100svh] flex items-center justify-center overflow-hidden"
      aria-label="Welcome Introduction Banner"
    >
      <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
        <video
          src={BackgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55 z-10" />
      </motion.div>

      {/* Hero blueprint grid overlay */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(43,134,197,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(43,134,197,0.06)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto px-4 pt-32 sm:px-6 lg:px-8 relative z-20 w-full"
        style={{ opacity: heroOpacity }}
      >
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-8 max-w-4xl"
          >
            {/* Rotating Text */}
            <motion.div
              className="text-3xl sm:text-xl md:text-6xl font-extrabold text-white/95 h-12 flex items-center justify-center tracking-tight"
              key={rotatingIndex}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>{ROTATING_PHRASES[rotatingIndex]}</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className=" sm:text-lg text-slate-200 leading-relaxed mx-auto px-2 max-w-3xl font-normal"
            >
              Experience premium gated living with world-class amenities and
              strong appreciation potential in Nagpur's prime locations.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  openLeadModal(
                    "melbourne-city-sector-ii",
                    "Interested in scheduling a physical site visit.",
                  )
                }
                className="group relative bg-[#2b86c5] hover:bg-[#1f72ac] text-white font-bold px-8 py-4 rounded-2xl text-xs sm:text-sm uppercase tracking-widest shadow-2xl shadow-blue-900/50 overflow-hidden border border-white/20"
              >
                <span className="relative z-10">Explore Projects</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#003a78] to-[#2b86c5]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAddressModalOpen(true)}
                className="border-2 font-bold px-8 py-4 rounded-2xl text-xs sm:text-sm uppercase tracking-widest border-white/40 text-white hover:bg-white/10 hover:border-white backdrop-blur-md transition-all shadow-2xl cursor-pointer"
              >
                Schedule Site Visit
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-8 border-t border-white/15"
            >
              {HERO_TRUST_BADGES.map((badge, idx) => {
                const IconComponent = badge.icon;
                return (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#2b86c5]/20 border border-[#2b86c5]/40 flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-[#7bbfff]" />
                    </div>
                    <div className="text-left">
                      <div className="text-white font-bold text-xs sm:text-sm">
                        {badge.label}
                      </div>
                      <div className="text-slate-300 text-[11px] font-medium">
                        {badge.sub}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Office Address & VIP Visit Modal */}
      <OfficeAddressModal
        isOpen={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        onBookTour={() =>
          openLeadModal(
            "melbourne-city-sector-ii",
            "I would like to schedule a VIP physical site visit to your Nagpur Experience Centre with complimentary transport.",
          )
        }
      />
    </section>
  );
}
