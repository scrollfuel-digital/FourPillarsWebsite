import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Aboutusimage from "../assests/images/images/aboutus.png";
import FounderImage from "../assests/images/images/founder-sachin-kale.jpeg";
import ResidentialProjects from "@/components/ui/ResidentialProjects";

interface AboutViewProps {
  lightMode: boolean;
  accessibilityTextSize: "sm" | "md" | "lg" | "xl";
}

// ========================================
// INTERSECTION OBSERVER ANIMATION
// ========================================

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ========================================
// FOUR PILLARS CONTENT
// ========================================

const pillars = [
  {
    num: "01",
    title: "Legal Clarity",
    subtitle: "Pillar I",
    desc: "Every project should undergo appropriate legal due diligence, including title verification, relevant approvals and documentation checks. We believe buyers should have access to clear and accurate property information.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 013 10c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Location Selection",
    subtitle: "Pillar II",
    desc: "We focus on residential locations with relevant road connectivity, neighbourhood infrastructure and development potential to help buyers make informed property decisions.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Durable Infrastructure",
    subtitle: "Pillar III",
    desc: "Planned roads, drainage, electrical infrastructure and other essential amenities are important considerations in creating functional residential developments.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Complete Transparency",
    subtitle: "Pillar IV",
    desc: "We believe in clear communication about property details, pricing, approvals, documentation and the buying process, helping customers make decisions with confidence.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

// ========================================
// MAIN COMPONENT
// ========================================

export default function AboutView() {
  const { lightMode } = useOutletContext<AboutViewProps>();

  const hero = useInView(0.1);
  const grid = useInView(0.1);
  const founder = useInView(0.1);
  const pillarsSection = useInView(0.05);

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div
      className={`about-page min-h-screen select-none transition-colors duration-500 ${
        lightMode ? "bg-white" : "bg-[#080c14]"
      }`}
    >
      <Helmet>
        <title>
          About Us | 4 Pillars Realty Nagpur - Legal Clarity & Transparency
        </title>

        <meta
          name="description"
          content="Learn about 4 Pillars Realty, a Nagpur-based real estate company focused on residential plots, townships and apartments."
        />

        <meta
          property="og:title"
          content="About Us | 4 Pillars Realty Nagpur"
        />

        <meta
          property="og:description"
          content="Discover our approach to legal clarity, location selection, durable infrastructure and complete transparency."
        />

        <meta property="og:type" content="website" />
      </Helmet>

      {/* ========================================
          1. HERO SECTION
      ======================================== */}

      <section
        ref={hero.ref}
        className="about-hero relative overflow-hidden pt-36 md:pt-40 pb-20 md:pb-24 px-6 text-center"
      >
        {/* Background gradients */}

        <div
          className={`absolute inset-0 pointer-events-none ${
            lightMode ? "opacity-30" : "opacity-20"
          }`}
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-blue-500 blur-[120px]" />

          <div className="absolute top-10 right-10 w-[300px] h-[300px] rounded-full bg-indigo-400 blur-[90px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <h1
            className={`about-heading transition-all duration-700 ${
              hero.inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            } ${lightMode ? "text-slate-900" : "text-white"}`}
          >
            About 4 Pillars Realty
            <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-400">
              Building Trust Through Real Estate in Nagpur
            </span>
          </h1>

          <div
            className={`h-[3px] mx-auto mt-7 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 transition-all duration-1000 ${
              hero.inView ? "w-32" : "w-0"
            }`}
          />
        </div>
      </section>

      {/* ========================================
          MAIN CONTENT CONTAINER
      ======================================== */}

      <main className="max-w-7xl mx-auto px-6 pb-20 md:pb-24">
        {/* ========================================
            2. ABOUT INTRODUCTION
        ======================================== */}

        <section
          ref={grid.ref}
          className="about-section grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* Text */}

          <div
            className={`transition-all duration-700 ${
              grid.inView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <h2
              className={`about-subheading ${
                lightMode ? "text-slate-900" : "text-white"
              }`}
            >
              Creating Better Real Estate Opportunities in Nagpur
            </h2>

            <div
              className={`about-content about-description mt-6 ${
                lightMode ? "text-slate-600" : "text-slate-400"
              }`}
            >
              <p>
                4 Pillars Realty is a Nagpur-based real estate company focused
                on developing residential plots, planned townships and premium
                apartments.
              </p>

              <p>
                We aim to make property buying more transparent, informed and
                convenient through carefully selected locations, quality
                infrastructure and customer-focused services.
              </p>

              <p>
                Our projects are planned to meet the needs of homebuyers and
                property investors looking for suitable residential
                opportunities in Nagpur and its growing neighbourhoods.
              </p>
            </div>
          </div>

          {/* Image */}

          <div
            className={`transition-all duration-700 ${
              grid.inView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
            style={{ transitionDelay: "280ms" }}
          >
            <div className="relative group">
              <div
                className={`absolute -inset-3 rounded-3xl border opacity-60 group-hover:opacity-100 transition-opacity duration-500 ${
                  lightMode ? "border-blue-100" : "border-blue-900/40"
                }`}
              />

              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src={Aboutusimage}
                  alt="4 Pillars Realty Corporate Workspace"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover p-2 scale-100 group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================
            3. FOUNDER SECTION
        ======================================== */}

        <section ref={founder.ref} className="about-section">
          <div
            className={`relative overflow-hidden rounded-[28px] md:rounded-[32px] transition-all duration-700 ${
              founder.inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            } ${lightMode ? "bg-slate-50" : "bg-[#0a0f1a]"}`}
          >
            {/* Background accent */}

            <div
              className={`pointer-events-none absolute inset-0 ${
                lightMode ? "opacity-20" : "opacity-25"
              }`}
            >
              <div className="absolute -bottom-40 -right-32 w-[420px] h-[420px] rounded-full bg-indigo-400 blur-[110px]" />
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-[0.75fr_1fr] items-stretch">
              {/* Founder image */}

              <div className="relative min-h-[380px] sm:min-h-[450px] lg:min-h-[540px]">
                <img
                  src={FounderImage}
                  alt="Sachin Kale, Founder of 4 Pillars Realty, Nagpur"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>

              {/* Founder details */}

              <div className="relative flex flex-col justify-center px-7 py-10 sm:px-12 sm:py-12 lg:px-14 lg:py-16">
                <p
                  className={`about-label mb-4 ${
                    lightMode ? "text-blue-600" : "text-blue-400"
                  }`}
                >
                  Meet Our Founder
                </p>

                <h2
                  className={`about-subheading ${
                    lightMode ? "text-slate-900" : "text-white"
                  }`}
                >
                  Sachin Kale
                </h2>

                <p
                  className={`text-sm font-semibold tracking-wide mt-3 mb-6 ${
                    lightMode ? "text-blue-600" : "text-blue-400"
                  }`}
                >
                  Founder &amp; Managing Director, 4 Pillars Realty
                </p>

                <p
                  className={`about-description max-w-lg ${
                    lightMode ? "text-slate-600" : "text-slate-400"
                  }`}
                >
                  Founded by Sachin Kale, 4 Pillars Realty is guided by a simple
                  belief: buying a home or residential plot should be a
                  confident and well-informed decision. With a focus on
                  transparent communication, legal clarity and customer
                  satisfaction, Sachin Kale leads the company's approach to
                  project selection, development planning and customer
                  relationships.
                </p>

                <p
                  className={`mt-5 font-serif italic text-lg ${
                    lightMode ? "text-slate-800" : "text-slate-200"
                  }`}
                >
                  — Sachin Kale
                </p>

                <blockquote
                  className={`text-xl sm:text-2xl font-semibold italic leading-snug mt-7 ${
                    lightMode ? "text-slate-900" : "text-slate-100"
                  }`}
                >
                  "A home should never be a gamble."
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================
            4. FOUR PILLARS
        ======================================== */}

        <section ref={pillarsSection.ref} className="about-section">
          {/* Heading */}

          <div
            className={`about-section-header text-center transition-all duration-700 ${
              pillarsSection.inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <h2
              className={`about-heading ${
                lightMode ? "text-slate-900" : "text-white"
              }`}
            >
              Our Real Estate
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">
                Principles
              </span>
            </h2>

            <p
              className={`about-section-description ${
                lightMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              Every decision we make is anchored to these four principles — the
              same ones that guide our approach to real estate.
            </p>
          </div>

          {/* Pillar cards */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {pillars.map((pillar, i) => {
              const isHovered = hoveredCard === i;

              return (
                <article
                  key={pillar.num}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`about-pillar-card relative rounded-2xl overflow-hidden cursor-default transition-all duration-700 group ${
                    pillarsSection.inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${i * 120 + 100}ms` }}
                >
                  {/* Background */}

                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      lightMode
                        ? isHovered
                          ? "bg-gradient-to-br from-blue-600 to-indigo-700"
                          : "bg-white"
                        : isHovered
                          ? "bg-gradient-to-br from-blue-700 to-indigo-900"
                          : "bg-[#0d1422]"
                    }`}
                  />

                  {/* Border */}

                  <div
                    className={`absolute inset-0 rounded-2xl border transition-colors duration-500 ${
                      lightMode
                        ? isHovered
                          ? "border-transparent"
                          : "border-slate-200"
                        : isHovered
                          ? "border-transparent"
                          : "border-slate-800"
                    }`}
                  />

                  {/* Hover glow */}

                  {isHovered && (
                    <div className="absolute inset-0 rounded-2xl shadow-[0_0_50px_rgba(59,130,246,0.25)]" />
                  )}

                  {/* Card content */}

                  <div className="relative z-10 p-6 md:p-7 flex flex-col h-full min-h-[300px]">
                    {/* Icon */}

                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                        isHovered
                          ? "bg-white/20 text-white"
                          : lightMode
                            ? "bg-blue-50 text-blue-600"
                            : "bg-blue-950/60 text-blue-400"
                      }`}
                    >
                      {pillar.icon}
                    </div>

                    {/* Label */}

                    <p
                      className={`about-label mb-2 transition-colors duration-300 ${
                        isHovered
                          ? "text-blue-200"
                          : lightMode
                            ? "text-blue-600"
                            : "text-blue-400"
                      }`}
                    >
                      {pillar.subtitle}
                    </p>

                    {/* Title */}

                    <h3
                      className={`about-card-heading mb-4 transition-colors duration-300 ${
                        isHovered
                          ? "text-white"
                          : lightMode
                            ? "text-slate-900"
                            : "text-slate-100"
                      }`}
                    >
                      {pillar.title}
                    </h3>

                    {/* Description */}

                    <p
                      className={`text-sm leading-[1.8] transition-colors duration-300 ${
                        isHovered
                          ? "text-blue-100"
                          : lightMode
                            ? "text-slate-500"
                            : "text-slate-400"
                      }`}
                    >
                      {pillar.desc}
                    </p>

                    {/* Number watermark */}

                    <div
                      className={`absolute bottom-4 right-5 text-6xl font-black font-mono leading-none select-none pointer-events-none transition-colors duration-300 ${
                        isHovered ? "text-white/10" : "text-blue-500/10"
                      }`}
                    >
                      {pillar.num}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ========================================
            5. RESIDENTIAL PROJECTS
        ======================================== */}

        <section className="about-section">
          <ResidentialProjects />
        </section>
      </main>
    </div>
  );
}
