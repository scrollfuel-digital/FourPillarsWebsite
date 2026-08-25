import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Star,
  ShieldCheck,
  Wrench,
  Landmark,
  TrendingUp,
  Quote,
  Users,
  CheckCircle2,
  PhoneCall,
  MapPin,
  Sparkles,
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface TestimonialsSectionProps {
  textHeadingSize?: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  project: string;
  location: string;
  comment: string;
  avatarBg: string;
  avatarText: string;
  tags: string[];
}


const REVIEWS: Testimonial[] = [
  {
    id: "1",
    name: "Rekha Shinde",
    role: "Google Reviewer · 4 reviews",
    project: "Four Pillars Realty",
    location: "Nagpur",
    comment:
      "Finding a reliable source of investment is important, especially in today’s market. I had a really good experience with Four Pillars Realty. 👌",
    avatarBg: "bg-blue-600",
    avatarText: "RS",
    tags: ["Positive", "Responsiveness", "Quality", "Value"],
  },
  {
    id: "2",
    name: "Shahezad Sayyad",
    role: "Local Guide · 8 reviews · 14 photos",
    project: "Four Pillars Realty",
    location: "Nagpur",
    comment:
      "Nice layout, polite staff, and very helpful service. Overall, a great experience with Four Pillars Realty.",
    avatarText: "SS",
    avatarBg: "bg-emerald-600",
    tags: ["Nice Layout", "Polite Staff", "Very Helpful"],
  },
  {
    id: "3",
    name: "Ashok Tamgadge",
    role: "Google Reviewer · 3 reviews",
    project: "Melbourne City  ",
    location: "Nagpur",
    comment:
      "Melbourne City is located in a good location and offers a pleasant environment for recreation and leisure. The development is progressing well, with good amenities being planned.",
    avatarBg: "bg-emerald-600",
    avatarText: "AT",
    tags: ["Good Location", "Development", "Amenities"],
  },
  {
    id: "4",
    name: "Sandip Yede",
    role: "Google Reviewer · 4 reviews · 1 photo",
    project: "Four Pillars Realty",
    location: "Nagpur",
    comment:
      "It has been a great experience. Four Pillars Realty provides valuable assets and focuses on delivering a positive experience to its clients.",
    avatarBg: "bg-amber-600",
    avatarText: "SY",
    tags: ["Great Experience", "Valuable Asset"],
  },
  {
    id: "5",
    name: "Kisana Bokde",
    role: "Google Reviewer · 3 reviews",
    project: "Four Pillars Realty",
    location: "Nagpur",
    comment:
      "I purchased a plot in 2021, but unfortunately, the property value has not increased as quickly as I expected.",
    avatarBg: "bg-purple-600",
    avatarText: "KB",
    tags: ["Customer Feedback", "Investment"],
  },
];

export default function TestimonialsSection({
  textHeadingSize = "text-2xl sm:text-3xl",
}: TestimonialsSectionProps) {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeReview = REVIEWS[activeReviewIndex];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveReviewIndex((current) =>
        current === REVIEWS.length - 1 ? 0 : current + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToPrevious = () => {
    setActiveReviewIndex((current) =>
      current === 0 ? REVIEWS.length - 1 : current - 1,
    );

    setIsPaused(true);

    setTimeout(() => {
      setIsPaused(false);
    }, 7000);
  };

  const goToNext = () => {
    setActiveReviewIndex((current) =>
      current === REVIEWS.length - 1 ? 0 : current + 1,
    );

    setIsPaused(true);

    setTimeout(() => {
      setIsPaused(false);
    }, 7000);
  };

  const goToReview = (index: number) => {
    setActiveReviewIndex(index);

    setIsPaused(true);

    setTimeout(() => {
      setIsPaused(false);
    }, 7000);
  };

  return (
    <section
      className="py-20 md:py-28 bg-gradient-to-b from-slate-50 via-white to-blue-50/30 relative overflow-hidden border-b border-slate-200/80"
      id="client-testimonials"
    >
      {/* Decorative Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-100/40 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-100/30 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          
          <h2
            className={`font-serif font-black tracking-tight text-[#003B72] ${textHeadingSize} mb-4`}
          >
            What Our Customers Value
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Discover what customers have shared about their experience with Four
            Pillars Realty and their property investment journey.
          </p>
        </motion.div>

        {/* =====================================================
            CLIENT REVIEWS
        ====================================================== */}
        <div
          className="bg-gradient-to-br from-white to-blue-50/40 rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 mb-16 relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Reviews Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-8 pb-6 border-b border-slate-200/80">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-400 stroke-amber-400"
                    />
                  ))}
                </div>

                <span className="font-bold text-slate-900 text-sm">
                  4.3 / 5.0
                </span>

                <span className="text-slate-500 text-xs">
                  • 60 Google Reviews
                </span>
              </div>

              <h3 className="font-serif font-bold text-slate-900 text-xl sm:text-2xl">
                What Our Clients Say
              </h3>
            </div>

            {/* Google Reviews Badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 border border-blue-100">
              <BadgeCheck className="w-4 h-4 text-emerald-600" />

              <span className="text-xs font-bold text-[#003B72]">
                60 Reviews
              </span>
            </div>
          </div>

          {/* =================================================
              SINGLE REVIEW SLIDER
          ================================================== */}
          <div className="relative max-w-4xl mx-auto">
            {/* Previous Button */}
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous review"
              className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200 shadow-lg hover:bg-[#003B72] hover:text-white hover:border-[#003B72] transition-all flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next review"
              className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200 shadow-lg hover:bg-[#003B72] hover:text-white hover:border-[#003B72] transition-all flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Review Card */}
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-md relative overflow-hidden"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-5 right-5 w-20 h-20 text-blue-500/10 pointer-events-none" />

              {/* Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-14 h-14 rounded-full ${activeReview.avatarBg} text-white font-bold flex items-center justify-center text-lg shadow-md`}
                  >
                    {activeReview.avatarText}
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-base sm:text-lg">
                      {activeReview.name}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {activeReview.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <BadgeCheck className="w-4 h-4 text-emerald-600" />

                  <span className="text-xs font-semibold text-emerald-700">
                    Client Review
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div className="relative z-10">
                <p className="text-slate-700 text-base sm:text-xl leading-relaxed italic mb-8">
                  "{activeReview.comment}"
                </p>
              </div>

              {/* Bottom Information */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#003B72] bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {activeReview.project}
                  </div>

                  <div className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {activeReview.location}
                  </div>
                </div>

                {/* Review Tags */}
                <div className="flex flex-wrap gap-2">
                  {activeReview.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* =================================================
                SLIDER PAGINATION
            ================================================== */}
            <div className="flex items-center justify-center gap-2 mt-7">
              {REVIEWS.map((review, index) => (
                <button
                  key={review.id}
                  type="button"
                  onClick={() => goToReview(index)}
                  aria-label={`View review from ${review.name}`}
                  className={`transition-all duration-300 rounded-full ${
                    index === activeReviewIndex
                      ? "w-8 h-2.5 bg-[#003B72]"
                      : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            {/* Slide Counter */}
            <div className="text-center mt-3">
              <span className="text-[11px] text-slate-400 font-medium">
                {activeReviewIndex + 1} / {REVIEWS.length}
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================
            TRUST CTA
        ====================================================== */}
        <div className="bg-[#003B72] rounded-2xl text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
              <Users className="w-6 h-6" />
            </div>

            <div>
              <h4 className="font-bold text-lg text-white">
                Ready to find your ideal plot in Nagpur?
              </h4>

              <p className="text-blue-100 text-xs">
                Schedule a free site visit with doorstep pickup & legal document
                consultation.
              </p>
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

            <a
              href="/contact"
              className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors text-center flex items-center justify-center gap-2 border border-white/20"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
