import { motion } from 'motion/react';
import { TrendingUp, Building, ShieldCheck, ArrowRight } from 'lucide-react';

export default function InvestmentSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50/20 to-slate-50 border-b border-slate-200/80 relative overflow-hidden" id="investment-opportunities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-[#003a78] to-[#002855] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2b86c5]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-wider"
            >
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span>High Capital Growth Region</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
            >
              Real Estate Investment Opportunities in Nagpur
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-blue-100 text-sm sm:text-base leading-relaxed"
            >
              <p>
                Nagpur continues to emerge as one of India's most promising real estate markets. Increasing infrastructure development, growing residential demand, and expanding urban growth corridors make it an attractive destination for property investment.
              </p>
              <p>
                At 4 Pillars Realty, we help investors and homebuyers capitalize on these opportunities through carefully planned projects located in developing residential zones.
              </p>
              <p>
                Whether you're looking for residential plots, township developments, or luxury apartments, our projects are designed to offer both lifestyle benefits and future value appreciation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-4 flex flex-wrap gap-4 items-center"
            >
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md"
              >
                <span>Consult Investment Advisor</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="flex items-center gap-2 text-xs text-blue-200 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Legal Clearance & Up to 80% Loan Support</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
