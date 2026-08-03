import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Calendar,
  Sparkles,
  Building2,
  ShieldCheck,
  MessageCircle,
  Car,
  ExternalLink,
} from 'lucide-react';

interface OfficeAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookTour?: () => void;
}

export default function OfficeAddressModal({
  isOpen,
  onClose,
  onBookTour,
}: OfficeAddressModalProps) {
  if (!isOpen) return null;

  const googleMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Besa+Square+Plot+52-71+Gouri+Meadows+II+Nagpur';

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Animated Dark Glass Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#001428]/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-[#002855] via-[#001f42] to-[#00152e] border border-white/20 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.6)] overflow-hidden z-10 my-8 text-white"
        >
          {/* Top Decorative Gold Accent Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#2b86c5] via-[#f3c06b] to-[#2b86c5]" />

          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Modal Header */}
          <div className="p-6 sm:p-8 pb-4 flex items-start justify-between border-b border-white/10 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-[11px] font-bold uppercase tracking-widest mb-2 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                4 Pillars Realty Experience Centre
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Corporate Headquarters & Site Office
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer shrink-0 ml-4"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 space-y-6 relative z-10 max-h-[75vh] overflow-y-auto">
            {/* Primary Address Highlight Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-5 sm:p-6 shadow-xl hover:border-[#2b86c5]/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2b86c5] to-[#003a78] border border-white/30 flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                  <MapPin className="w-6 h-6 text-amber-300" />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#7bbfff] block mb-1">
                    Official Nagpur Address
                  </span>
                  <p className="font-serif text-base sm:text-lg text-white font-bold leading-snug mb-2">
                    Plot No. 52–71, Gouri Meadows II, Besa Square, Near Besa Flyover, Nagpur, Maharashtra &ndash; 440037
                  </p>
                  <p className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-[#7bbfff]" />
                    Central Office & Flagship Gated Township Display Suite
                  </p>
                </div>
              </div>

              {/* Action Link to Google Maps */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  Landmark: 2 Mins from Besa Square
                </span>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7bbfff] hover:text-white transition-colors"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            {/* Operating Hours & VIP Pickup Info Grid */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* Card 1: Hours */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#2b86c5]/20 border border-[#2b86c5]/40 flex items-center justify-center text-[#7bbfff] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-white mb-0.5">
                    Visit Hours
                  </h4>
                  <p className="text-xs text-slate-300 font-medium">
                    Monday &ndash; Sunday
                  </p>
                  <p className="text-xs text-amber-300 font-bold mt-0.5">
                    9:00 AM &ndash; 7:30 PM
                  </p>
                </div>
              </div>

              {/* Card 2: Chauffeur Pickup */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-white mb-0.5">
                    Complimentary Pickup
                  </h4>
                  <p className="text-xs text-slate-300 font-medium">
                    Free VIP AC transport from Besa Square or Airport.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Hotline Strip */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-[#003a78]/80 to-[#2b86c5]/40 border border-white/15 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#7bbfff]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    Direct Inquiry Line
                  </div>
                  <div className="font-serif text-base font-bold text-white">
                    +91 93732 33777 &middot; +91 98222 00000
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Mail className="w-4 h-4 text-[#7bbfff]" />
                <span>info@4pillarsrealty.com</span>
              </div>
            </motion.div>
          </div>

          {/* Modal Footer Call-To-Action Buttons */}
          <div className="p-6 sm:p-8 pt-4 bg-[#001024]/60 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4 text-emerald-400" />
              Get Directions
            </a>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <a
                href="https://wa.me/919373233777?text=Hi%204%20Pillars%20Realty,%20I%20would%20like%20to%20visit%20your%20Nagpur%20Experience%20Centre."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25d366]/20 hover:bg-[#25d366]/30 text-[#4fcf7a] border border-[#25d366]/40 p-3.5 rounded-xl flex items-center justify-center transition-all shadow-md"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>

              <button
                onClick={() => {
                  onClose();
                  if (onBookTour) onBookTour();
                }}
                className="flex-1 sm:flex-initial bg-gradient-to-r from-[#2b86c5] via-[#1f72ac] to-[#003a78] hover:from-[#1f72ac] hover:to-[#002b5c] text-white font-serif font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider border border-white/20 shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                Book VIP Site Tour
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
