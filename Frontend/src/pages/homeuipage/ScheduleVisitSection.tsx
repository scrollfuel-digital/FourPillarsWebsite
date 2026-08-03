import { motion } from 'motion/react';
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Building2,
  Clock,
  ShieldCheck,
  Calendar,
  MessageCircle,
} from 'lucide-react';

export default function ScheduleVisitSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Contact and site visit"
      className="relative min-h-[90vh] overflow-hidden flex items-center px-4 sm:px-8 py-20"
      style={{
        background:
          'linear-gradient(135deg, #001f42 0%, #003a78 45%, #0d2b54 75%, #001936 100%)',
      }}
    >
      {/* glow blobs */}
      <div
        className="absolute -top-[120px] -right-20 w-[480px] h-[480px] rounded-full pointer-events-none animate-[blobFloat_8s_ease-in-out_infinite]"
        style={{
          background:
            'radial-gradient(circle, rgba(43,134,197,0.2) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-[100px] -left-[60px] w-[360px] h-[360px] rounded-full pointer-events-none animate-[blobFloat_10s_ease-in-out_infinite_reverse]"
        style={{
          background:
            'radial-gradient(circle, rgba(194,58,74,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1120px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
        {/* LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#7bbfff] bg-[#2b86c5]/[0.18] border border-[#2b86c5]/[0.3]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7bbfff] animate-[pulseDot_2s_ease-in-out_infinite]" />
            Premium Developments &middot; Nagpur
          </div>

          <h2 className="font-bold text-[clamp(2.4rem,4vw,3.5rem)] leading-[1.1] tracking-tight text-[#f0f6ff] mb-6">
            Your Next
            <br />
            <em className="relative inline-block not-italic bg-gradient-to-r from-[#7bbfff] via-[#9cd0ff] to-[#a8d8ff] bg-clip-text text-transparent font-extrabold">
              Investment
              <span className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded bg-gradient-to-r from-[#7bbfff] to-[#a8d8ff] animate-[growLine_1.2s_0.6s_ease_forwards] scale-x-0" />
            </em>
            <br />
            Starts Here
          </h2>

          <p className="text-[#8ba0be] text-[1.05rem] leading-relaxed mb-10 max-w-[440px]">
            Visit our experience centre and tour premium plots firsthand. Our
            experts handle everything — including complimentary transport from
            Besa Square.
          </p>

          {/* CONTACT DETAILS */}
          <div className="flex flex-col gap-3.5 mb-9">
            <a
              href="tel:+919373233777"
              className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 transition-all duration-300 hover:bg-[#2b86c5]/[0.15] hover:border-[#2b86c5]/40 hover:translate-x-1.5 shadow-lg"
            >
              <div className="relative w-12 h-12 shrink-0">
                <span className="absolute -inset-1.5 rounded-full border-2 border-[#2b86c5]/35 animate-[ringPulse_2.5s_ease-in-out_infinite]" />
                <div className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#2b86c5]/30 to-[#2b86c5]/[0.1] text-[#7bbfff] border border-[#2b86c5]/25">
                  <Phone className="w-5 h-5" strokeWidth={2} />
                </div>
              </div>
              <div>
                <div className="text-[11px] tracking-wide text-[#7ba0c8] mb-0.5 font-medium">
                  Call direct
                </div>
                <div className="text-[0.95rem] font-bold text-[#f0f6ff]">
                  +91 9373233777 / +91 9371612666
                </div>
              </div>
              <ArrowRight
                className="w-4 h-4 ml-auto text-[#4a6890] opacity-0 group-hover:opacity-100 group-hover:text-[#7bbfff] transition-all duration-300"
                strokeWidth={2.5}
              />
            </a>

            <a
              href="mailto:info@4pillarsrealty.com"
              className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 transition-all duration-300 hover:bg-[#2b86c5]/[0.15] hover:border-[#2b86c5]/40 hover:translate-x-1.5 shadow-lg"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#2b86c5]/30 to-[#2b86c5]/[0.1] text-[#7bbfff] border border-[#2b86c5]/25">
                <Mail className="w-5 h-5" strokeWidth={2} />
              </div>
              <div>
                <div className="text-[11px] tracking-wide text-[#7ba0c8] mb-0.5 font-medium">
                  Email us
                </div>
                <div className="text-[0.95rem] font-bold text-[#f0f6ff]">
                  info@4pillarsrealty.com
                </div>
              </div>
              <ArrowRight
                className="w-4 h-4 ml-auto text-[#4a6890] opacity-0 group-hover:opacity-100 group-hover:text-[#7bbfff] transition-all duration-300"
                strokeWidth={2.5}
              />
            </a>

            <div className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-4">
              <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#2b86c5]/30 to-[#2b86c5]/[0.1] text-[#7bbfff] border border-[#2b86c5]/25">
                <MapPin className="w-5 h-5" strokeWidth={2} />
              </div>
              <div>
                <div className="text-[11px] tracking-wide text-[#7ba0c8] mb-0.5 font-medium">
                  Experience Centre / Office
                </div>
                <div className="text-[0.85rem] font-bold text-[#f0f6ff] leading-snug">
                  Plot No. 52-71, Gouri Meadows II, Wing-B, Behind Indian Oil Petrol Pump, Besa Square, New Nagpur, Maharashtra
                </div>
              </div>
            </div>
          </div>

          <motion.a
            href="/contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2.5 rounded-xl px-8 py-3.5 text-[0.95rem] font-bold text-white tracking-[0.01em] transition-all duration-300 bg-gradient-to-r from-[#003a78] to-[#2b86c5] hover:from-[#002b5c] hover:to-[#2274ad] shadow-xl"
          >
            Book a site visit
            <ArrowRight
              className="w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </motion.a>
        </motion.div>

        {/* RIGHT COLUMN — Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-8 sm:p-10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-[#2b86c5] before:to-transparent">
            <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#2b86c5]/[0.2] blur-3xl pointer-events-none" />

            <div className="relative inline-flex items-center gap-1.5 rounded-lg border border-[#2b86c5]/30 bg-[#2b86c5]/[0.2] px-3 py-1 text-xs font-bold tracking-wide text-[#7bbfff] mb-6">
              <Building2 className="w-3.5 h-3.5" strokeWidth={2} />4 Pillars Realty
            </div>

            <div className="relative font-extrabold text-[1.7rem] text-[#eef4ff] mb-2 tracking-tight">
              Schedule Your Visit
            </div>
            <div className="relative text-[0.9rem] leading-relaxed text-[#8ba0be] mb-8">
              Walk the land, see the neighbourhood, and make a confident
              decision with our expert team by your side.
            </div>

            <div className="relative flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] p-4 mb-3.5 text-[0.875rem] leading-relaxed text-[#a0b8d8] transition-colors duration-300">
              <div className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center bg-[#2b86c5]/[0.2]">
                <Clock
                  className="w-[18px] h-[18px] text-[#7bbfff]"
                  strokeWidth={2}
                />
              </div>
              <span className="pt-1">
                Visits available Monday to Saturday, 9 AM – 7 PM. A dedicated
                consultant is assigned for your tour.
              </span>
            </div>

            <div className="relative flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] p-4 mb-6 text-[0.875rem] leading-relaxed text-[#a0b8d8] transition-colors duration-300">
              <div className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center bg-[#2b86c5]/[0.2]">
                <ShieldCheck
                  className="w-[18px] h-[18px] text-[#7bbfff]"
                  strokeWidth={2}
                />
              </div>
              <span className="pt-1">
                All projects are NMRDA/RERA approved. No hidden charges, no
                obligation — just an honest conversation.
              </span>
            </div>

            <div className="relative flex flex-col sm:flex-row gap-2.5">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-[0.9rem] font-bold text-white transition-all duration-300 bg-gradient-to-r from-[#003a78] to-[#2b86c5] shadow-lg"
              >
                <Calendar className="w-4 h-4" strokeWidth={2} />
                Schedule visit
              </motion.a>
              <motion.a
                href="https://wa.me/919373233777"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-[#25d366]/40 bg-[#25d366]/[0.18] px-5 py-3.5 text-[0.9rem] font-bold text-[#4fcf7a] transition-all duration-300 hover:bg-[#25d366]/[0.28] shadow-lg"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={2} />
                WhatsApp
              </motion.a>
            </div>

            <div className="relative mt-6 pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold text-[#6a8ea8]">
              <Clock className="w-3.5 h-3.5" strokeWidth={2} />
              Mon–Sat &middot; 9 AM – 7 PM
              <span className="w-1 h-1 rounded-full bg-[#3a5d80]" />
              Free transport included
              <span className="w-1 h-1 rounded-full bg-[#3a5d80]" />
              No obligation
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
