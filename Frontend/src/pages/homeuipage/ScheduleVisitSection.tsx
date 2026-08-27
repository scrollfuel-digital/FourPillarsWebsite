import { motion } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Clock,
  MessageCircle,
} from "lucide-react";

export default function ScheduleVisitSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Contact and site visit"
      className="relative min-h-[70vh] overflow-hidden flex items-center px-4 sm:px-8 py-20"
      style={{
        background:
          "linear-gradient(135deg, #001f42 0%, #003a78 45%, #0d2b54 75%, #001936 100%)",
      }}
    >
      {/* glow blobs */}
      <div
        className="absolute -top-[120px] -right-20 w-[480px] h-[480px] rounded-full pointer-events-none animate-[blobFloat_8s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(circle, rgba(43,134,197,0.2) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-[100px] -left-[60px] w-[360px] h-[360px] rounded-full pointer-events-none animate-[blobFloat_10s_ease-in-out_infinite_reverse]"
        style={{
          background:
            "radial-gradient(circle, rgba(194,58,74,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1120px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
        {/* LEFT COLUMN — heading only */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h2 className="font-bold text-[clamp(2.4rem,4vw,3.5rem)] leading-[1.1] tracking-tight text-[#f0f6ff]">
            Your Next
            <br />
            <em className="relative inline-block not-italic bg-gradient-to-r from-[#7bbfff] via-[#9cd0ff] to-[#a8d8ff] bg-clip-text text-transparent font-extrabold">
              Investment
              <span className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded bg-gradient-to-r from-[#7bbfff] to-[#a8d8ff] animate-[growLine_1.2s_0.6s_ease_forwards] scale-x-0" />
            </em>
            <br />
            Starts Here
          </h2>

          {/* CTA ROW: Book a visit + WhatsApp */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 pt-10">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-3.5 text-[0.95rem] font-bold text-white tracking-[0.01em] transition-all duration-300 bg-gradient-to-r from-[#003a78] to-[#2b86c5] hover:from-[#002b5c] hover:to-[#2274ad] shadow-xl"
            >
              Book a site visit
              <ArrowRight
                className="w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </motion.a>

            <motion.a
              href="https://wa.me/919373233777"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#25d366]/40 bg-[#25d366]/[0.18] px-6 py-3.5 text-[0.95rem] font-bold text-[#4fcf7a] transition-all duration-300 hover:bg-[#25d366]/[0.28] shadow-lg"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={2} />
              WhatsApp
            </motion.a>
          </div>
        </motion.div>

        {/* RIGHT COLUMN — contact details, CTAs, timing */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
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
              href="mailto:4iconrealities@gmail.com"
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
                  4iconrealities@gmail.com
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
                  Plot No. 52-71, Gouri Meadows II, Wing-B, Behind Indian Oil
                  Petrol Pump, Besa Square, New Nagpur, Maharashtra
                </div>
              </div>
            </div>
          </div>

          {/* TIMING STRIP */}
          <div className="flex flex-wrap items-center gap-2 text-[17px] font-semibold text-[#8ba0be]">
            <Clock className="w-5 h-5 text-[#7bbfff]" strokeWidth={2} />
            Visits available Mon–Sat &middot; 9 AM – 7 PM
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
