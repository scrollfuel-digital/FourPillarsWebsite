import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PROJECTS, BRAND_COLORS } from "../data";
import { Project } from "../types";
import { MapPin, Info, Check, Sparkles, Navigation } from "lucide-react";

interface InteractiveMapProps {
  openLeadModal: (projectSlug: string, initialMessage?: string) => void;
  accessibilityTextSize: "sm" | "md" | "lg" | "xl";
  lightMode: boolean;
}

// Generate realistic simulated plots for layout viewing
const generatePlots = (projectId: string) => {
  const plotCount = projectId === "melbourne-city-sector-ii" ? 71 : 97;
  const plots = [];
  for (let i = 1; i <= plotCount; i++) {
    let size = 1200 + ((i * 37) % 1800); // variations in sqft
    let status: "available" | "booked" | "hold" = "available";
    if (i % 5 === 0) status = "hold";
    else if (i % 3 === 0 || i % 7 === 0) status = "booked";

    plots.push({
      number: i,
      size,
      status,
      price: Math.floor(
        size * (projectId === "melbourne-city-sector-ii" ? 1800 : 2550),
      ),
    });
  }
  return plots;
};

export default function InteractiveMap() {
  const { openLeadModal, accessibilityTextSize, lightMode } =
    useOutletContext<InteractiveMapProps>();
  const navigate = useNavigate();
  const onSelectProject = (slug: string) => navigate(`/${slug}`);
  const [selectedMapProject, setSelectedMapProject] = useState<Project | null>(
    PROJECTS[0],
  );
  const [selectedSubLayout, setSelectedSubLayout] = useState<string>(
    "melbourne-city-sector-ii",
  );
  const [hoveredPlot, setHoveredPlot] = useState<any | null>(null);

  const plotsData = generatePlots(selectedSubLayout);

  const getTextClass = () => {
    if (accessibilityTextSize === "sm") return "text-xs";
    if (accessibilityTextSize === "lg") return "text-lg";
    if (accessibilityTextSize === "xl") return "text-xl";
    return "text-sm";
  };

  const getHeadingClass = () => {
    if (accessibilityTextSize === "sm") return "text-base";
    if (accessibilityTextSize === "lg") return "text-2xl";
    if (accessibilityTextSize === "xl") return "text-3xl";
    return "text-xl";
  };

  return (
    <div
      id="interactive-neighborhood-explorer"
      className="border px-4 py-6 sm:px-8 sm:py-8 lg:px-50 lg:py-10 shadow-2xl relative overflow-hidden transition-all duration-300 bg-white border-slate-200 text-slate-800"
    >
      <Helmet>
        <title>Neighborhood & Spatial Explorer | South Nagpur Expansion Map | 4 Pillars Realty</title>
        <meta
          name="description"
          content="Interactively explore South Nagpur growth corridors, Besa Square, and Wardha Road plot layout maps with 4 Pillars Realty."
        />
        <meta property="og:title" content="Neighborhood & Spatial Explorer | South Nagpur Expansion Map | 4 Pillars Realty" />
        <meta
          property="og:description"
          content="Interactively explore South Nagpur growth corridors, Besa Square, and Wardha Road plot layout maps with 4 Pillars Realty."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 sm:mb-8 border-b pb-5 sm:pb-6 relative z-10 border-slate-100">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-red-500 flex items-center gap-1.5 mb-2 pt-15">
            <Sparkles className="w-3.5 h-3.5 shrink-0" /> Neighborhood & Spatial
            Explorer
          </span>
          <h3
            className={`font-serif tracking-tight font-bold text-slate-900 ${getHeadingClass()}`}
          >
            South Nagpur Premium Expansion Corridor
          </h3>
          <p className="text-xs mt-1 text-slate-600 max-w-md">
            Explore premium growth quadrants: Wardha Road corridor, Besa square
            premium belt, and Kaldongri Highway Hub.
          </p>
        </div>
        <div className="flex flex-nowrap md:flex-wrap gap-2 w-full md:w-auto overflow-x-auto md:overflow-visible pb-1 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {PROJECTS.map((proj) => (
            <button
              key={proj.slug}
              onClick={() => {
                setSelectedMapProject(proj);
                if (proj.type !== "upcoming" && proj.type !== "apartment") {
                  setSelectedSubLayout(proj.slug);
                }
              }}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all bg-blue-600 text-white shadow-lg whitespace-nowrap shrink-0"
            >
              {proj.name.split(" ")[0]} {proj.name.split(" ")[1] || ""}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Map Visual Block on Left, Project details and interactive Sub-layout on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 relative z-10 ">
        {/* Left Side: Gorgeous Vector Map Visualizer */}
        <div className="md:col-span-5 rounded-2xl border p-3 sm:p-4 relative flex flex-col justify-between overflow-hidden group min-h-[280px] sm:min-h-[340px] lg:min-h-[420px] bg-slate-50 border-slate-200">
          {/* Map Grid Pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />

          {/* Main Ring Road Highway Path SVG */}
          <svg
            className="absolute inset-0 w-full h-full opacity-70 pointer-events-none text-slate-300"
            viewBox="0 0 400 400"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Outer Ring Road */}
            <path
              d="M50 350 C 150 300, 250 320, 380 380"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray="6,4"
            />
            {/* Wardha Road National Highway */}
            <path d="M100 50 L 300 380" stroke="currentColor" strokeWidth="5" />
            <text
              x="220"
              y="270"
              fill="#64748B"
              fontSize="9"
              className="font-mono rotate-45"
            >
              WARDHA ROAD NH-44
            </text>
            {/* Besa Ring Road Connection */}
            <path
              d="M50 150 C 200 150, 300 200, 350 250"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="3"
            />
            <text
              x="70"
              y="140"
              fill="#64748B"
              fontSize="8"
              className="font-mono"
            >
              BESA ROAD CORRIDOR
            </text>
          </svg>

          {/* Glowing Target Area Rings */}
          <div className="absolute top-1/2 left-1/3 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 border border-blue-600/10 rounded-full animate-ping pointer-events-none opacity-40 duration-1000" />

          {/* Interactive Spot Plot Markers */}
          {PROJECTS.map((proj) => {
            const isSelected = selectedMapProject?.slug === proj.slug;
            return (
              <button
                key={proj.slug}
                onClick={() => {
                  setSelectedMapProject(proj);
                  if (proj.type !== "upcoming" && proj.type !== "apartment") {
                    setSelectedSubLayout(proj.slug);
                  }
                }}
                style={{
                  left: `${proj.coordinate.x}%`,
                  top: `${proj.coordinate.y}%`,
                }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center group/marker transition-all duration-300 z-20"
                aria-label={`Locate ${proj.name} map coordinate`}
              >
                <div
                  className={`relative flex items-center justify-center p-1.5 sm:p-2 rounded-full transition-all duration-300 ${
                    isSelected
                      ? "bg-blue-600 text-white scale-125 shadow-[0_0_20px_rgba(37,99,235,0.6)]"
                      : "bg-white border-slate-300 text-blue-600 shadow-sm hover:bg-slate-50 border group-hover/marker:scale-110"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />

                  {/* Glowing core */}
                  <span
                    className={`absolute inline-flex rounded-full h-2 w-2 ${isSelected ? "bg-red-400" : "bg-blue-400"} animate-pulse`}
                  />
                </div>

                {/* Floating Micro-label */}
                <div
                  className={`absolute left-6 sm:left-7 lg:left-9 border text-[8px] sm:text-[9px] lg:text-[10px] font-semibold py-1 px-2 rounded-lg whitespace-nowrap shadow-xl transition-all duration-300 max-w-[90px] sm:max-w-[110px] lg:max-w-[150px] truncate ${
                    isSelected
                      ? "opacity-100 translate-x-0 bg-white border-blue-500 text-slate-900 shadow-md"
                      : "opacity-45 group-hover/marker:opacity-100 translate-x-1 bg-white border-slate-200 text-slate-800 shadow-sm"
                  }`}
                >
                  {proj.name}
                  <div className="text-[8px] font-light block text-slate-500 truncate">
                    {proj.location}
                  </div>
                </div>
              </button>
            );
          })}

          {/* Bottom Map Info Legend Card */}
          <div className="relative mt-auto border rounded-xl p-2.5 sm:p-3 z-30 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between transition-all duration-300 bg-white/95 border-slate-200 shadow-md text-slate-800">
            <div className="flex flex-wrap gap-2.5 sm:gap-4 text-[9px] sm:text-[10px] text-slate-600">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shrink-0" />{" "}
                Plots Available
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block shrink-0" />{" "}
                Booked
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shrink-0" />{" "}
                On Hold
              </span>
            </div>
            <span className="text-[9px] font-mono border px-1.5 py-0.5 rounded uppercase bg-slate-100 border-slate-200 text-blue-600 self-start sm:self-auto">
              Live Vector Map API
            </span>
          </div>
        </div>

        {/* Right Side: Informative panel + Interactive Plot Allocator Grid */}
        <div className="md:col-span-7 flex flex-col gap-5 sm:gap-6">
          {/* Selected Project Highlights Card */}
          {selectedMapProject && (
            <div className="border rounded-2xl p-4 sm:p-5 relative transition-all duration-300 bg-[#F1F5F9] border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-mono bg-slate-200 text-slate-700">
                    {selectedMapProject.type.toUpperCase()}
                  </span>
                  <h4 className="text-base sm:text-lg font-serif tracking-tight font-bold mt-1.5 text-slate-900">
                    {selectedMapProject.name}
                  </h4>
                  <p className="text-xs flex items-start gap-1 mt-0.5 text-slate-600">
                    <Navigation className="w-3.5 h-3.5 text-blue-500 inline shrink-0 mt-0.5" />{" "}
                    <span>
                      {selectedMapProject.location} | Hub:{" "}
                      {selectedMapProject.mapHotspot}
                    </span>
                  </p>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <div className="text-[10.5px] uppercase font-mono text-slate-500">
                    Investment Pricing
                  </div>
                  <div className="text-base font-bold font-mono text-red-600">
                    {selectedMapProject.priceRange}
                  </div>
                </div>
              </div>

              <p className="text-xs mt-3 leading-relaxed text-slate-600">
                {selectedMapProject.description}
              </p>

              {/* Specs Badge Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mt-4 pt-4 border-t text-[11px] border-slate-200">
                {selectedMapProject.specs.slice(0, 3).map((spec, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-lg border transition-all bg-white border-slate-200 shadow-sm"
                  >
                    <div className="text-slate-500 font-mono text-[9px] uppercase">
                      {spec.label}
                    </div>
                    <div className="font-semibold mt-0.5 text-slate-900">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-6 pt-4 border-t border-slate-200">
                <button
                  onClick={() => onSelectProject(selectedMapProject.slug)}
                  className="text-xs font-semibold hover:text-blue-500 transition-colors flex items-center justify-center sm:justify-start gap-1 group text-blue-600"
                >
                  View Complete Brochure{" "}
                  <span className="group-hover:translate-x-1 transition-transform inline-block">
                    →
                  </span>
                </button>
                <button
                  onClick={() =>
                    openLeadModal(
                      selectedMapProject.slug,
                      `I am interested in scheduling a site visit to view ${selectedMapProject.name} layout.`,
                    )
                  }
                  className="bg-blue-600 hover:bg-blue-500 text-slate-100 text-xs font-semibold py-2.5 sm:py-1.5 px-4 rounded-lg shadow-md transition-all duration-200"
                >
                  Book Private Site Cabin
                </button>
              </div>
            </div>
          )}

          {/* Interactive Plot Layout Grid (Available specifically for Plots projects) */}
          {selectedMapProject && selectedMapProject.type === "plot" ? (
            <div
              className={`border rounded-2xl p-4 sm:p-5 ${
                lightMode
                  ? "bg-[#F1F5F9] border-slate-200"
                  : "bg-slate-950 border-slate-800/80"
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                <div>
                  <h5 className="text-xs font-semibold tracking-wider uppercase font-mono text-slate-800">
                    Layout Map Sandbox: {selectedMapProject.name}
                  </h5>
                  <p className="text-[10px] text-slate-500">
                    Interact directly with individual RL plots to check specs,
                    sizing metrics, and select slots.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-600 shrink-0">
                  <span className="text-emerald-500 font-semibold">
                    {plotsData.filter((p) => p.status === "available").length}{" "}
                    Available
                  </span>
                  <span className="text-slate-400">/</span>
                  <span>{plotsData.length} Total Plots</span>
                </div>
              </div>

              {/* Master Plotted Grid simulation */}
              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1.5 p-3 rounded-xl max-h-[180px] sm:max-h-[160px] overflow-y-auto custom-scrollbar bg-slate-200/50">
                {plotsData.map((plot) => {
                  let colorClass =
                    "bg-emerald-600/30 border-emerald-500/50 hover:bg-emerald-600/60 text-emerald-300";
                  if (plot.status === "booked")
                    colorClass =
                      "bg-slate-300/60 border-slate-300 text-slate-400";
                  if (plot.status === "hold")
                    colorClass =
                      "bg-amber-600/20 border-amber-500/50 hover:bg-amber-600/40 text-amber-500";

                  const isHovered = hoveredPlot?.number === plot.number;

                  return (
                    <button
                      key={plot.number}
                      onMouseEnter={() =>
                        plot.status !== "booked" && setHoveredPlot(plot)
                      }
                      onMouseLeave={() => setHoveredPlot(null)}
                      onClick={() => {
                        if (plot.status !== "booked") {
                          setHoveredPlot(plot);
                          openLeadModal(
                            selectedMapProject!.slug,
                            `I wish to check details specifically for Plot No. ${plot.number} (Size: ${plot.size} Sq. Ft.) inside ${selectedMapProject!.name}. Please share layout costing.`,
                          );
                        }
                      }}
                      className={`relative aspect-square rounded-md border text-[9px] sm:text-[10px] font-bold flex items-center justify-center transition-all ${colorClass} ${
                        isHovered
                          ? "scale-110 shadow-[0_0_10px_rgba(16,185,129,0.5)] z-20"
                          : ""
                      }`}
                      disabled={plot.status === "booked"}
                    >
                      P{plot.number}
                    </button>
                  );
                })}
              </div>

              {/* Hover plot meta detailed floating card */}
              {hoveredPlot ? (
                <div
                  className={`mt-3 border p-2.5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs animate-fade-in ${
                    lightMode
                      ? "bg-white border-slate-200 text-slate-800 shadow-md"
                      : "bg-slate-900 border-slate-800 text-slate-50"
                  }`}
                >
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    <div>
                      <span className="text-[10px] text-slate-500 block">
                        PLOT NUMBER
                      </span>
                      <span className="font-bold font-mono text-emerald-600">
                        Plot No. {hoveredPlot.number}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">
                        PLOT AREA
                      </span>
                      <span
                        className={`font-bold ${lightMode ? "text-slate-900" : "text-white"}`}
                      >
                        {hoveredPlot.size.toLocaleString()} Sq. Ft.
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">
                        ESTIMATED VALUATING
                      </span>
                      <span className="font-bold text-red-500 font-mono">
                        ₹{(hoveredPlot.price / 100000).toFixed(2)} Lakh
                      </span>
                    </div>
                  </div>
                  <div className="text-[9px] bg-blue-600/20 border border-blue-500/30 text-blue-600 px-2 py-1 rounded font-semibold whitespace-nowrap">
                    Click to Reserve Plot
                  </div>
                </div>
              ) : (
                <div className="mt-3 text-slate-500 text-[10px] text-center italic py-2">
                  Hover or tap any colored plot block above to instantly read
                  sizing measurements and live legal estimation.
                </div>
              )}
            </div>
          ) : selectedMapProject && selectedMapProject.type === "apartment" ? (
            <div
              className={`border rounded-2xl p-4 sm:p-5 ${
                lightMode
                  ? "bg-[#F1F5F9] border-slate-200"
                  : "bg-slate-950 border-slate-800/80"
              }`}
            >
              <h5
                className={`text-xs font-semibold tracking-wider uppercase font-mono mb-3 ${
                  lightMode ? "text-slate-800" : "text-slate-300"
                }`}
              >
                Apartment Structural Block: {selectedMapProject.name}
              </h5>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
                <div
                  className={`sm:w-1/3 text-center sm:border-r p-2 ${lightMode ? "border-slate-200" : "border-slate-800"}`}
                >
                  <span className="text-2xl font-serif font-bold text-blue-600">
                    7
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1 uppercase font-mono">
                    STOREY BLOCK
                  </span>
                </div>
                <div
                  className={`sm:w-1/3 text-center sm:border-r p-2 ${lightMode ? "border-slate-200" : "border-slate-800"}`}
                >
                  <span className="text-2xl font-serif font-bold text-red-500">
                    28
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1 uppercase font-mono">
                    ELITE UNITS
                  </span>
                </div>
                <div className="sm:w-1/3 text-center p-2">
                  <span className="text-xl font-mono text-emerald-600 font-bold">
                    2,106
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1 uppercase font-mono">
                    SQ.FT AREA
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-3 italic text-center">
                Super-spacious and airy premium layout. Features single
                standalone block structure guaranteeing maximum ventilation on
                Besa primary lane.
              </p>
              <div className="mt-4 flex gap-1 justify-start sm:justify-center overflow-x-auto pb-1 -mx-1 px-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 min-w-[32px] sm:min-w-[36px] text-center border rounded p-1 ${
                      lightMode
                        ? "bg-white border-slate-200 text-slate-700"
                        : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    <div className="text-[9px] text-slate-500">FL_{7 - i}</div>
                    <div className="flex justify-around gap-1 mt-1">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-center text-[9px] text-slate-500 font-mono">
                Display mapping represents occupancy status: Green (Available 3
                BHK layouts), Red (Sold out layout units).
              </div>
            </div>
          ) : (
            <div
              className={`border rounded-2xl p-5 text-center text-slate-500 text-xs py-10 sm:py-12 ${
                lightMode
                  ? "bg-[#F1F5F9] border-slate-200"
                  : "bg-slate-950 border-slate-800"
              }`}
            >
              This project is currently in the pre-launch architectural mapping
              stage. Submit a query to prioritize custom block mapping
              notifications.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
