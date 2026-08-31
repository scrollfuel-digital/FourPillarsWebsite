import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BRAND_COLORS } from "../data";
import Aboutusimage from "../assests/images/images/aboutus.png";
// Drop the founder photo (provided) into this same assets folder.
import FounderImage from "../assests/images/images/founder-sachin-kale.jpeg";

interface AboutViewProps {
  lightMode: boolean;
  accessibilityTextSize: "sm" | "md" | "lg" | "xl";
}

// Custom hook for intersection observer animations
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

const pillars = [
  {
    num: "01",
    title: "Legal Clarity",
    subtitle: "Pillar I",
    desc: "Every plot layout undergoes exhaustive title searches and prior release letter verification — so your ownership is ironclad from day one.",
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
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 10c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Strategic Siting",
    subtitle: "Pillar II",
    desc: "We stake positions only along South Nagpur's high-growth corridors — locations engineered for immediate valuation elevation and long-range appreciation.",
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
    desc: "No shortcuts. Tar-cement roads, full LED grids, and engineered sewerage pipelines — built to serve generations, not just inspections.",
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
    title: "Pure Transparency",
    subtitle: "Pillar IV",
    desc: "No hidden calculations. Every document is straightforward, every conversation is honest — absolute clarity at every step of your journey.",
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

export default function AboutView() {
  const { lightMode, accessibilityTextSize } =
    useOutletContext<AboutViewProps>();
  const hero = useInView(0.1);
  const grid = useInView(0.1);
  const founder = useInView(0.1);
  const pillarsSection = useInView(0.05);

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div
      className={`min-h-screen select-none transition-colors duration-500 ${
        lightMode ? "bg-white" : "bg-[#080c14]"
      }`}
    >
      <Helmet>
        <title>
          About Us | 4 Pillars Realty Nagpur - Legal Clarity & Transparency
        </title>
        <meta
          name="description"
          content="Learn about 4 Pillars Realty's 15+ years of real estate excellence in Nagpur. Discover our four pillars: Legal Clarity, Strategic Siting, Durable Infrastructure, and Pure Transparency."
        />
        <meta
          property="og:title"
          content="About Us | 4 Pillars Realty Nagpur - Legal Clarity & Transparency"
        />
        <meta
          property="og:description"
          content="Learn about 4 Pillars Realty's 15+ years of real estate excellence in Nagpur. Discover our four pillars: Legal Clarity, Strategic Siting, Durable Infrastructure, and Pure Transparency."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* ── 1. HERO BANNER ── */}
      <div
        ref={hero.ref}
        className="relative overflow-hidden pt-40 pb-20 px-6 text-center"
      >
        {/* Ambient gradient blobs */}
        <div
          className={`absolute inset-0 pointer-events-none ${lightMode ? "opacity-30" : "opacity-20"}`}
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-blue-500 blur-[120px]" />
          <div className="absolute top-10 right-10 w-[300px] h-[300px] rounded-full bg-indigo-400 blur-[90px]" />
        </div>

        {/* Main headline — staggered word reveal */}
        <h1
          className={`relative font-extrabold leading-[1.05] tracking-tight transition-all duration-700 ${
            hero.inView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          } ${lightMode ? "text-slate-900" : "text-white"}`}
          style={{
            fontSize: "clamp(2.6rem, 6vw, 5rem)",
            transitionDelay: "220ms",
          }}
        >
          Building Trust.{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-400">
              Creating Communities.
            </span>
            {/* Underline accent */}
            <span
              className={`absolute left-0 -bottom-1 h-[3px] rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 transition-all duration-1000 ${
                hero.inView ? "w-full" : "w-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            />
          </span>
        </h1>
      </div>

      {/* ── 2. TEXT + IMAGE GRID ── */}
      <div className="max-w-7xl mx-auto px-6 pb-24 text-justify">
        <div
          ref={grid.ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center"
        >
          {/* Text block */}
          <div
            className={`transition-all duration-700  ${
              grid.inView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div
              className={`space-y-5 text-[1.05rem] leading-[1.8] pb-2 ${
                lightMode ? "text-slate-600" : "text-slate-400"
              }`}
            >
              <p>
                At 4 Pillars Realty, we believe every property should offer more
                than space — it should create opportunities for better living
                and lasting future growth.
              </p>
              <p>
                We specialize in premium plotted developments, residential
                townships, and luxury apartments across Nagpur. Our projects are
                meticulously selected in emerging locations offering strong
                connectivity, quality infrastructure, and excellent appreciation
                potential.
              </p>
              <p>
                Our commitment to transparency, customer satisfaction, and
                quality development has made us a trusted name among homebuyers
                and investors alike. Statutory compliance is our absolute,
                non-negotiable priority.
              </p>
            </div>
          </div>

          {/* Image */}
          <div
            className={`transition-all duration-700 pt-15 ${
              grid.inView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
            style={{ transitionDelay: "280ms" }}
          >
            <div className="relative group">
              {/* Decorative frame */}
              <div
                className={`absolute -inset-3 rounded-3xl border transition-opacity duration-500 group-hover:opacity-100 opacity-60 ${
                  lightMode ? "border-blue-100" : "border-blue-900/40"
                }`}
              />
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src={Aboutusimage}
                  alt="4 Pillars Corporate Workspace"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover p-2 scale-100 group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-transparent to-transparent" />
                {/* Badge */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md text-white text-sm font-semibold"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    RERA Compliant · Nagpur Registered
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2B. FOUNDER INTRO ── */}
        <div ref={founder.ref} className="mt-28">
          <div
            className={`relative overflow-hidden rounded-[32px] transition-all duration-700 delay-[80ms] ${
              founder.inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            } ${lightMode ? "bg-slate-50" : "bg-[#0a0f1a]"}`}
          >
            {/* Ambient accent, echoes the hero */}
            <div
              className={`pointer-events-none absolute inset-0 ${lightMode ? "opacity-20" : "opacity-25"}`}
            >
              <div className="absolute -bottom-40 -right-32 w-[420px] h-[420px] rounded-full bg-indigo-400 blur-[110px]" />
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-[0.62fr_1fr] items-stretch">
              {/* Portrait — full-bleed within the card */}
              <div className="relative min-h-[420px] lg:min-h-[520px]">
                <img
                  src={FounderImage}
                  alt="Sachin Kale, Founder of 4 Pillars Realty, Nagpur"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                {/* <div
                  className={`absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r ${
                    lightMode
                      ? "from-slate-50 via-slate-50/10 to-transparent lg:from-slate-50 lg:via-transparent lg:to-transparent"
                      : "from-[#0a0f1a] via-[#0a0f1a]/10 to-transparent lg:from-[#0a0f1a] lg:via-transparent lg:to-transparent"
                  }`}
                /> */}
              </div>

              {/* Intro copy */}
              <div className="relative flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-14 lg:py-16">
                <p
                  className={`text-[11px] font-bold tracking-[0.25em] uppercase mb-4 ${lightMode ? "text-blue-500" : "text-blue-400"}`}
                >
                  Meet the Founder
                </p>

                <h2
                  className={`font-extrabold leading-tight mb-2 text-3xl sm:text-4xl ${
                    lightMode ? "text-slate-900" : "text-white"
                  }`}
                >
                  Sachin Kale
                </h2>
                <p
                  className={`text-sm font-semibold tracking-wide mb-7 ${lightMode ? "text-blue-600" : "text-blue-400"}`}
                >
                  Founder &amp; Managing Director, 4 Pillars Realty
                </p>

                <blockquote
                  className={`text-xl sm:text-2xl font-semibold italic leading-snug mb-7 ${
                    lightMode ? "text-slate-900" : "text-slate-100"
                  }`}
                >
                  "A home should never be a gamble."
                </blockquote>

                <p
                  className={`text-[15px] leading-[1.8] max-w-lg ${lightMode ? "text-slate-600" : "text-slate-400"}`}
                >
                  Sachin Kale founded 4 Pillars Realty in Nagpur out of a simple
                  conviction — that buying a home or a plot shouldn't feel like
                  a leap of faith. That belief still shapes how the company
                  works today, from the first site visit to the day the keys
                  change hands.
                </p>

                <p
                  className={`mt-5 font-serif italic text-lg ${lightMode ? "text-slate-800" : "text-slate-200"}`}
                >
                  — Sachin Kale
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. FOUR PILLARS ── */}
        <div ref={pillarsSection.ref} className="mt-28">
          {/* Section header */}
          <div
            className={`text-center mb-14 transition-all duration-700 ${
              pillarsSection.inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <h2
              className={`font-extrabold leading-tight ${
                lightMode ? "text-slate-900" : "text-white"
              }`}
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)" }}
            >
              The Four Pillars
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">
                of Our Operations
              </span>
            </h2>
            <p
              className={`mt-4 max-w-lg mx-auto text-base leading-relaxed ${
                lightMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              Every decision we make is anchored to these four principles — the
              same ones that have guided us since day one.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => {
              const isHovered = hoveredCard === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`relative rounded-2xl overflow-hidden cursor-default transition-all duration-700 group ${
                    pillarsSection.inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${i * 120 + 100}ms` }}
                >
                  {/* Card background */}
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

                  {/* Glow on hover */}
                  {isHovered && (
                    <div className="absolute inset-0 rounded-2xl shadow-[0_0_50px_rgba(59,130,246,0.35)]" />
                  )}

                  {/* Content */}
                  <div className="relative z-10 p-7 flex flex-col h-full min-h-[260px]">
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

                    {/* Subtitle */}
                    <p
                      className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-1 transition-colors duration-300 ${
                        isHovered
                          ? "text-blue-200"
                          : lightMode
                            ? "text-blue-500"
                            : "text-blue-500"
                      }`}
                    >
                      {pillar.subtitle}
                    </p>

                    {/* Title */}
                    <h4
                      className={`font-extrabold text-xl leading-snug mb-4 transition-colors duration-300 ${
                        isHovered
                          ? "text-white"
                          : lightMode
                            ? "text-slate-900"
                            : "text-slate-100"
                      }`}
                    >
                      {pillar.title}
                    </h4>

                    {/* Description */}
                    <p
                      className={`text-sm leading-relaxed transition-colors duration-300 ${
                        isHovered
                          ? "text-blue-100"
                          : lightMode
                            ? "text-slate-500"
                            : "text-slate-400"
                      }`}
                    >
                      {pillar.desc}
                    </p>

                    {/* Large number watermark */}
                    <div
                      className={`absolute bottom-4 right-5 text-6xl font-black font-mono leading-none select-none transition-all duration-300 ${
                        isHovered ? "text-white/10" : "text-blue-500/8"
                      }`}
                    >
                      {pillar.num}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
