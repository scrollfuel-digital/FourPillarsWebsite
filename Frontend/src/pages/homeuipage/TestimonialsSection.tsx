import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  Play,
  ShieldCheck,
  Wrench,
  Landmark,
  TrendingUp,
  Quote,
  Users,
  CheckCircle2,
  X,
  PhoneCall,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  BadgeCheck,
  ChevronRight
} from 'lucide-react';
import melbourneImg from '../../assests/images/images/project_melbourne_png_1780484693295.png';
import canberraImg from '../../assests/images/images/project_canberra_png_1780484709897.png';
import shraddhaImg from '../../assests/images/images/project_shraddha_png_1780484729700.png';

interface TestimonialsSectionProps {
  textHeadingSize?: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  project: string;
  location: string;
  plotNo?: string;
  rating: number;
  date: string;
  comment: string;
  avatarBg: string;
  avatarText: string;
  image?: string;
  tags: string[];
}

interface VideoStory {
  id: string;
  name: string;
  project: string;
  duration: string;
  thumbnail: string;
  quote: string;
  highlights: string[];
}

const VALUE_PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Trusted Guidance',
    desc: 'We assist buyers at every stage of the property journey with complete legal transparency.',
    color: 'from-blue-600 to-indigo-600',
    bgColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    icon: TrendingUp,
    title: 'Location Advantage',
    desc: 'Projects selected for future growth, top infrastructure connectivity, and rapid appreciation.',
    color: 'from-emerald-600 to-teal-600',
    bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    icon: Landmark,
    title: 'Hassle-Free Process',
    desc: 'From property selection to documentation and up to 80% financing assistance.',
    color: 'from-amber-600 to-orange-600',
    bgColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    icon: Wrench,
    title: 'Long-Term Value',
    desc: 'Developments designed to support future appreciation and long-term investment growth.',
    color: 'from-purple-600 to-pink-600',
    bgColor: 'bg-purple-50 text-purple-700 border-purple-200',
  },
];

const REVIEWS: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh & Sunita Sharma',
    role: 'Plot Owner & Businessman',
    project: 'Melbourne City Sector II',
    location: 'Wardha Road, Nagpur',
    plotNo: 'Plot #42',
    rating: 5,
    date: '2 months ago',
    comment:
      'Finding clear title NMRDA RL approved plots in Nagpur used to be stressful until we met 4 Pillars Realty. From our first guided site visit to bank loan disbursement in 10 days, everything was completely transparent. The road work and park development were already complete!',
    avatarBg: 'bg-blue-600',
    avatarText: 'RS',
    image: melbourneImg,
    tags: ['NMRDA Approved', 'Bank Loan Sanctioned', 'Verified Buyer'],
  },
  {
    id: '2',
    name: 'Dr. Amit Gupta',
    role: 'Senior Medical Officer & Real Estate Investor',
    project: 'Canberra City',
    location: 'Besa-Ghoti Road, Nagpur',
    plotNo: 'Plot #118',
    rating: 5,
    date: '1 month ago',
    comment:
      'The development speed at Canberra City is truly impressive. Asphalted 40ft wide roads, solar streetlights, and drainage lines were ready as promised. As an investor looking for high capital growth near MIHAN corridor, this is my best decision.',
    avatarBg: 'bg-emerald-600',
    avatarText: 'AG',
    image: canberraImg,
    tags: ['High Growth Zone', 'Fast Possesion', 'Clear Title'],
  },
  {
    id: '3',
    name: 'Priya Deshmukh & Family',
    role: 'IT Professional & First-Time Buyer',
    project: 'Shraddha Bhakti Township',
    location: 'Kharsoli, Nagpur',
    plotNo: 'Plot #89',
    rating: 5,
    date: '3 weeks ago',
    comment:
      'As first-time plot buyers, our primary concern was legal paperwork and Vastu orientation. The 4 Pillars team guided us with full patience, provided complete 7/12 & RL documents, and arranged 80% bank loan from SBI. Very trustworthy team!',
    avatarBg: 'bg-purple-600',
    avatarText: 'PD',
    image: shraddhaImg,
    tags: ['First Time Buyer', 'SBI Loan Approved', 'Vastu Compliant'],
  },
  {
    id: '4',
    name: 'Sanjay & Meena Kulkarni',
    role: 'Govt. Officer & Homeowner',
    project: 'Melbourne City Sector I',
    location: 'MIHAN Outer Ring Road',
    plotNo: 'Corner Plot #15',
    rating: 5,
    date: '3 months ago',
    comment:
      'The free doorstep AC pickup for site visit was a great touch! They explained the complete layout map with future development plans clearly. Registration process was smooth without any hidden charges. Highly recommended developer in Nagpur!',
    avatarBg: 'bg-amber-600',
    avatarText: 'SK',
    image: melbourneImg,
    tags: ['Free Site Pickup', 'Transparent Pricing', 'Corner Plot'],
  },
];

const VIDEO_STORIES: VideoStory[] = [
  {
    id: 'v1',
    name: 'Rajesh & Sunita Sharma',
    project: 'Melbourne City Sector II',
    duration: '2:34',
    thumbnail: melbourneImg,
    quote:
      'How 4 Pillars Realty delivered our plot handover with 100% legal clarity in less than 2 weeks.',
    highlights: ['SBI Loan Sanction in 5 Days', 'NMRDA RL Document Handover', 'Completed Road Infrastructure'],
  },
  {
    id: 'v2',
    name: 'Dr. Amit Gupta',
    project: 'Canberra City',
    duration: '1:50',
    thumbnail: canberraImg,
    quote:
      'Why I chose Canberra City for long-term investment near MIHAN SEZ growth corridor.',
    highlights: ['35% Appreciation in 18 Months', 'Ready Solar Lighting & Drainage', '40ft Wide Internal Roads'],
  },
  {
    id: 'v3',
    name: 'Priya Deshmukh & Family',
    project: 'Shraddha Bhakti Township',
    duration: '2:12',
    thumbnail: shraddhaImg,
    quote:
      'Our journey from initial inquiry to building our dream home in Kharsoli Township.',
    highlights: ['Vastu Compliant Layout', 'Easy Monthly EMI Scheme', 'Gated Security Entry'],
  },
];



export default function TestimonialsSection({
  textHeadingSize = 'text-2xl sm:text-3xl',
}: TestimonialsSectionProps) {
  const [activeTab, setActiveTab] = useState<'reviews' | 'videos'>('reviews');
  const [activeVideoModal, setActiveVideoModal] = useState<VideoStory | null>(null);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  return (
    <section
      className="py-20 md:py-28 bg-gradient-to-b from-slate-50 via-white to-blue-50/30 relative overflow-hidden border-b border-slate-200/80"
      id="client-testimonials"
    >
      {/* Decorative Glow Elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-100/40 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-100/30 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-[#003B72] text-xs font-semibold tracking-wide uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Trusted by 1,500+ Families in Nagpur</span>
          </div>

          <h2 className={`font-serif font-black tracking-tight text-[#003B72] ${textHeadingSize} mb-4`}>
            What Our Customers Value
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Discover why homebuyers, builders, and investors choose 4 Pillars Realty for clear-title gated township plots, ready infrastructure, and seamless bank loan approvals.
          </p>
        </motion.div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {VALUE_PILLARS.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pillar.bgColor} mb-5 border shadow-xs`}>
                    <IconComp className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif font-bold text-slate-900 text-lg mb-2 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Guaranteed Commitment</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials Showcase Container */}
        <div className="bg-gradient-to-br from-white to-blue-50/40 rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 mb-16 relative overflow-hidden">
          
          {/* Header & Tab Selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-slate-900 text-sm">4.9 / 5.0</span>
                <span className="text-slate-500 text-xs">(250+ Verified Reviews)</span>
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-xl sm:text-2xl">
                Real Stories from Plot Owners
              </h3>
            </div>

            <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 self-stretch sm:self-auto">
              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'reviews'
                    ? 'bg-[#003B72] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Verified Buyer Reviews
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'videos'
                    ? 'bg-[#003B72] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Video Success Stories
              </button>
            </div>
          </div>

          {/* TAB 1: VERIFIED BUYER REVIEWS */}
          {activeTab === 'reviews' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Main Featured Testimonial Card */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md flex flex-col justify-between relative overflow-hidden group">
                  <Quote className="absolute top-4 right-4 w-16 h-16 text-blue-500/10 pointer-events-none group-hover:scale-110 transition-transform" />

                  <div>
                    {/* Tags & Rating */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                        <BadgeCheck className="w-4 h-4 text-emerald-600" />
                        <span>{REVIEWS[activeReviewIndex].tags[0]}</span>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(REVIEWS[activeReviewIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    {/* Quote text */}
                    <p className="text-slate-700 text-base sm:text-lg leading-relaxed italic mb-6">
                      "{REVIEWS[activeReviewIndex].comment}"
                    </p>
                  </div>

                  {/* Customer Profile Footer */}
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full ${REVIEWS[activeReviewIndex].avatarBg} text-white font-bold flex items-center justify-center text-base shadow-sm`}>
                        {REVIEWS[activeReviewIndex].avatarText}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-base leading-tight">
                          {REVIEWS[activeReviewIndex].name}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {REVIEWS[activeReviewIndex].role}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-semibold text-[#003B72] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 inline-block">
                        {REVIEWS[activeReviewIndex].project} ({REVIEWS[activeReviewIndex].plotNo})
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-end gap-1">
                        <MapPin className="w-3 h-3" />
                        {REVIEWS[activeReviewIndex].location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* List of Other Reviews to Switch */}
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Click to view more customer stories:
                  </p>
                  {REVIEWS.map((rev, idx) => {
                    const isSelected = idx === activeReviewIndex;
                    return (
                      <motion.div
                        key={rev.id}
                        onClick={() => setActiveReviewIndex(idx)}
                        whileHover={{ scale: 1.01 }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-900 text-white border-blue-900 shadow-md'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full ${isSelected ? 'bg-blue-700 text-white' : rev.avatarBg + ' text-white'} text-xs font-bold flex items-center justify-center`}>
                              {rev.avatarText}
                            </div>
                            <div>
                              <h5 className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                                {rev.name}
                              </h5>
                              <p className={`text-xs ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>
                                {rev.project}
                              </p>
                            </div>
                          </div>

                          <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                            isSelected ? 'bg-blue-800 text-blue-100' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {rev.plotNo}
                          </span>
                        </div>

                        <p className={`text-xs line-clamp-2 ${isSelected ? 'text-blue-100' : 'text-slate-600'}`}>
                          "{rev.comment}"
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: VIDEO SUCCESS STORIES */}
          {activeTab === 'videos' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {VIDEO_STORIES.map((vid) => (
                <div
                  key={vid.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
                >
                  <div className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer" onClick={() => setActiveVideoModal(vid)}>
                    <img
                      src={vid.thumbnail}
                      alt={vid.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Play Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md text-[#003B72] flex items-center justify-center shadow-2xl border border-white"
                      >
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </motion.div>
                    </div>

                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[11px] font-mono px-2 py-0.5 rounded-md">
                      {vid.duration}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs font-semibold text-blue-200 uppercase tracking-wide">
                        {vid.project}
                      </p>
                      <h4 className="font-bold text-sm text-white leading-tight">
                        {vid.name}
                      </h4>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-slate-700 text-xs leading-relaxed italic mb-4">
                        "{vid.quote}"
                      </p>

                      <div className="space-y-1.5 mb-4">
                        {vid.highlights.map((item, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveVideoModal(vid)}
                      className="w-full py-2 rounded-xl bg-blue-50 text-[#003B72] hover:bg-[#003B72] hover:text-white transition-colors text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Watch Story Video</span>
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

        </div>


        {/* Trust Badges Footer Bar */}
        <div className="bg-[#003B72] rounded-2xl text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg text-white">Ready to find your ideal plot in Nagpur?</h4>
              <p className="text-blue-100 text-xs">Schedule a free site visit with doorstep pickup & legal document consultation.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href="tel:+919373233777"
              className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs transition-colors text-center flex items-center justify-center gap-2 shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call +91 9373233777</span>
            </a>
          </div>
        </div>

      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveVideoModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-700 text-white"
            >
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <img
                  src={activeVideoModal.thumbnail}
                  alt={activeVideoModal.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-60"
                />
                
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center mb-4 shadow-xl">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                  <h3 className="font-bold text-xl text-white mb-2">
                    {activeVideoModal.name}
                  </h3>
                  <p className="text-xs text-amber-300 font-mono bg-black/50 px-3 py-1 rounded-full">
                    {activeVideoModal.project} • {activeVideoModal.duration}
                  </p>
                </div>
              </div>

              <div className="p-6 bg-slate-900">
                <p className="text-sm text-slate-300 italic mb-4">
                  "{activeVideoModal.quote}"
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {activeVideoModal.highlights.map((h, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-blue-300 border border-slate-700">
                      ✓ {h}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <span className="text-xs text-slate-400">4 Pillars Realty Customer Verification</span>
                  <button
                    onClick={() => setActiveVideoModal(null)}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
                  >
                    Close Video
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

