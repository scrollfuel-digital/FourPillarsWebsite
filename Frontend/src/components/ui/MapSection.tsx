import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Minus,
  X,
  MapPin,
  Heart,
  ArrowUpRight,
  Home,
} from "lucide-react";

type PlotStatus = "available" | "reserved" | "sold" | "upcoming";
type FilterKey = "all" | PlotStatus;

interface Plot {
  id: string;
  plotNo: string;
  project: string;
  block: string;
  sector: string;
  status: PlotStatus;
  area: string;
  facing: string;
  zoneType: string;
  price: string;
  tags: string[];
  images: string[];
  x: number; // % position inside map canvas
  y: number;
}

interface ZoneShape {
  id: string;
  label?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  variant: "block" | "lake";
  plotId?: string;
}

/* --------------------------------- tokens ---------------------------------- */

const STATUS_META: Record<
  PlotStatus,
  { label: string; dot: string; ring: string; text: string; count: number }
> = {
  available: { label: "Available", dot: "#3B82F6", ring: "rgba(59,130,246,0.45)", text: "#60A5FA", count: 45 },
  sold: { label: "Sold", dot: "#22C55E", ring: "rgba(34,197,94,0.45)", text: "#4ADE80", count: 128 },
  reserved: { label: "Reserved", dot: "#F59E0B", ring: "rgba(245,158,11,0.45)", text: "#FBBF24", count: 12 },
  upcoming: { label: "Upcoming", dot: "#A855F7", ring: "rgba(168,85,247,0.5)", text: "#C084FC", count: 3 },
};

const ZONES: ZoneShape[] = [
  { id: "z1", x: 4, y: 8, w: 26, h: 26, variant: "block", plotId: "p2", label: "Canberra City" },
  { id: "z2", x: 36, y: 6, w: 24, h: 20, variant: "block", plotId: "p3", label: "Shraddha Bhakti" },
  { id: "z3", x: 66, y: 10, w: 28, h: 18, variant: "block", plotId: "p4", label: "Melbourne City" },
  { id: "z8", x: 30, y: 36, w: 24, h: 22, label: "Melbourne Sector II", variant: "block", plotId: "p1" },
  { id: "z4", x: 6, y: 60, w: 22, h: 24, label: "Canberra Phase 2", variant: "block", plotId: "p5" },
  { id: "z5", x: 64, y: 46, w: 30, h: 16, label: "Garden Area", variant: "lake" },
  { id: "z6", x: 64, y: 68, w: 28, h: 22, variant: "block", plotId: "p6", label: "Shraddha Avenue" },
  { id: "z7", x: 36, y: 64, w: 22, h: 22, variant: "block", plotId: "p7", label: "Melbourne Phase 3" },
];

const PLOTS: Plot[] = [
  {
    id: "p1",
    plotNo: "Plot 108",
    project: "Melbourne City Sector II",
    block: "Phase A",
    sector: "Besa, Nagpur",
    status: "available",
    area: "1,200 - 2,400 sqft",
    facing: "North-East",
    zoneType: "Residential",
    price: "₹35L - ₹70L",
    tags: ["NMRDA Approved", "Gated Community", "40ft Wide Roads", "24x7 Security"],
images: [
      "/images/images/project_melbourne_png_1780484693295.png",
      "/images/images/project_melbourne_png_1780484693295.png",
      "/images/images/project_melbourne_png_1780484693295.png",
    ],
    x: 41,
    y: 47,
  },
  {
    id: "p2",
    plotNo: "Plot 201",
    project: "Canberra City",
    block: "Phase B",
    sector: "Wardha Road, Nagpur",
    status: "available",
    area: "1,000 - 2,000 sqft",
    facing: "East",
    zoneType: "Residential",
    price: "₹30L - ₹60L",
    tags: ["Premium Location", "Solar Street Lights", "Underground Utilities"],
images: [
      "/images/images/project_canberra_png_1780484765768.png",
      "/images/images/project_canberra_png_1780484765768.png",
      "/images/images/project_canberra_png_1780484765768.png",
    ],
    x: 17,
    y: 22,
  },
  {
    id: "p3",
    plotNo: "Plot 305",
    project: "Shraddha Bhakti Avenue",
    block: "Phase C",
    sector: "Koradi Road, Nagpur",
    status: "sold",
    area: "1,500 sqft",
    facing: "South",
    zoneType: "Residential",
    price: "₹45L",
    tags: ["Near Temple", "Peaceful Location"],
images: [
      "/images/images/project_shraddha_png_1780484801986.png",
      "/images/images/project_shraddha_png_1780484801986.png",
      "/images/images/project_shraddha_png_1780484801986.png",
    ],
    x: 48,
    y: 16,
  },
  {
    id: "p4",
    plotNo: "Plot 112",
    project: "Melbourne City Sector II",
    block: "Phase A",
    sector: "Besa, Nagpur",
    status: "reserved",
    area: "1,800 sqft",
    facing: "West",
    zoneType: "Premium",
    price: "₹55L",
    tags: ["Corner Plot", "Park Facing"],
images: [
      "/images/images/project_melbourne_png_1780484693295.png",
      "/images/images/project_melbourne_png_1780484693295.png",
      "/images/images/project_melbourne_png_1780484693295.png",
    ],
    x: 78,
    y: 24,
  },
  {
    id: "p5",
    plotNo: "Plot 215",
    project: "Canberra City",
    block: "Phase B",
    sector: "Wardha Road, Nagpur",
    status: "available",
    area: "1,300 sqft",
    facing: "North",
    zoneType: "Residential",
    price: "₹40L",
    tags: ["Near School", "Good Connectivity"],
images: [
      "/images/images/project_canberra_png_1780484765768.png",
      "/images/images/project_canberra_png_1780484765768.png",
      "/images/images/project_canberra_png_1780484765768.png",
    ],
    x: 16,
    y: 72,
  },
  {
    id: "p6",
    plotNo: "Plot 320",
    project: "Shraddha Bhakti Avenue",
    block: "Phase C",
    sector: "Koradi Road, Nagpur",
    status: "sold",
    area: "1,600 sqft",
    facing: "East",
    zoneType: "Residential",
    price: "₹48L",
    tags: ["Vastu Compliant"],
images: [
      "/images/images/project_shraddha_png_1780484801986.png",
      "/images/images/project_shraddha_png_1780484801986.png",
      "/images/images/project_shraddha_png_1780484801986.png",
    ],
    x: 78,
    y: 78,
  },
  {
    id: "p7",
    plotNo: "Plot 125",
    project: "Melbourne City Sector II",
    block: "Phase A",
    sector: "Besa, Nagpur",
    status: "available",
    area: "1,400 sqft",
    facing: "South-East",
    zoneType: "Residential",
    price: "₹42L",
    tags: ["Wide Road Facing", "Investment Opportunity"],
images: [
      "/images/images/project_melbourne_png_1780484693295.png",
      "/images/images/project_melbourne_png_1780484693295.png",
      "/images/images/project_melbourne_png_1780484693295.png",
    ],
    x: 45,
    y: 75,
  },
];

/* ------------------------------- subcomponents ------------------------------ */

const FlatZone: React.FC<{
  zone: ZoneShape;
  plot?: Plot;
  index: number;
  dimmed: boolean;
  onOpen: (p: Plot) => void;
}> = ({ zone, plot, index, dimmed, onOpen }) => {
  const meta = plot ? STATUS_META[plot.status] : null;
  const Tag = plot ? motion.button : motion.div;

  return (
    <Tag
      type={plot ? "button" : undefined}
      aria-label={plot ? `${plot.project} — ${plot.plotNo}` : zone.label}
      onClick={plot ? () => onOpen(plot) : undefined}
      className={`absolute rounded-2xl flex items-center justify-center ${
        zone.variant === "lake"
          ? "bg-sky-400/15 border border-sky-400/25"
          : "bg-emerald-400/10 border border-emerald-400/15"
      } ${plot ? "cursor-pointer" : ""}`}
      style={{ left: `${zone.x}%`, top: `${zone.y}%`, width: `${zone.w}%`, height: `${zone.h}%` }}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: dimmed ? 0.25 : 1, scale: 1 }}
      viewport={{ once: true }}
      animate={{ opacity: dimmed ? 0.25 : 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={
        plot
          ? { scale: dimmed ? 1 : 1.04, borderColor: meta ? meta.ring : undefined }
          : undefined
      }
      whileTap={plot ? { scale: 0.97 } : undefined}
    >
      {zone.label && (
        <span className="absolute bottom-2 left-3 text-[11px] font-medium text-zinc-400/80">
          {zone.label}
        </span>
      )}

      {plot && meta && (
        <motion.div layoutId={`pin-shape-${plot.id}`} className="relative flex flex-col items-center gap-1.5">
          <motion.span
            className="absolute -inset-3 rounded-full"
            style={{ background: meta.ring }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.55, 0, 0.55] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <span
            className="relative z-10 w-9 h-9 rounded-xl flex items-center justify-center border border-white/30 shadow-lg"
            style={{ background: meta.dot }}
          >
            <Home className="w-4.5 h-4.5 text-white" />
          </span>
          <span className="relative z-10 text-[11px] font-semibold text-white bg-black/50 px-2 py-0.5 rounded-full whitespace-nowrap">
            {plot.plotNo}
          </span>
        </motion.div>
      )}
    </Tag>
  );
};

/* ----------------------------------- gallery ---------------------------------- */

const ImageGallery: React.FC<{ images: string[]; accent: string }> = ({ images, accent }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-4">
      <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-zinc-800">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[active]}
            src={images[active]}
            alt=""
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* prev / next */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActive((a) => (a - 1 + images.length) % images.length)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/45 hover:bg-black/65 text-white flex items-center justify-center text-sm backdrop-blur-sm"
            >
              ‹
            </button>
            <button
              onClick={() => setActive((a) => (a + 1) % images.length)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/45 hover:bg-black/65 text-white flex items-center justify-center text-sm backdrop-blur-sm"
            >
              ›
            </button>
          </>
        )}

        {/* dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              className="relative w-5 h-1.5 rounded-full bg-white/30 overflow-hidden"
            >
              {active === i && (
                <motion.span
                  layoutId="gallery-dot"
                  className="absolute inset-0 rounded-full"
                  style={{ background: accent }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* thumbnails */}
      <div className="flex gap-2 mt-2">
        {images.map((src, i) => (
          <motion.button
            key={src}
            onClick={() => setActive(i)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0"
            style={{ outline: active === i ? `2px solid ${accent}` : "2px solid transparent" }}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
            {active !== i && <span className="absolute inset-0 bg-black/30" />}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

/* ----------------------------------- modal ---------------------------------- */

const PlotModal: React.FC<{ plot: Plot; onClose: () => void; onSave?: (p: Plot) => void }> = ({
  plot,
  onClose,
  onSave,
}) => {
  const meta = STATUS_META[plot.status];
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto pt-30 pb-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        layoutId={`pin-shape-${plot.id}`}
        className="relative w-full max-w-xl bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl z-10"
        transition={{ type: "spring", stiffness: 230, damping: 26, mass: 0.9 }}
      >
        {/* top row */}
        <div className="flex items-center justify-between p-4 pb-3 bg-zinc-900 border-b border-white/10 rounded-t-3xl">
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide"
            style={{ background: meta.ring, color: meta.text }}
          >
            {meta.label}
          </motion.span>
          <motion.button
            onClick={onClose}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: 90, backgroundColor: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500/30 text-white transition-all shadow-lg border border-red-400/30"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="p-4 pt-3">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-lg font-semibold text-white"
          >
            {plot.project} — {plot.plotNo}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="flex items-center gap-1 text-sm text-zinc-400 mt-1"
          >
            <MapPin className="w-3.5 h-3.5" /> {plot.block}, {plot.sector}
          </motion.p>

          {/* image gallery */}
          <ImageGallery images={plot.images} accent={meta.dot} />

          {/* facts grid */}
          <div className="grid grid-cols-3 gap-2.5 mt-3">
            {[
              { label: "Plot area", value: plot.area },
              { label: "Facing", value: plot.facing },
              { label: "Zone type", value: plot.zoneType },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 14, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.22 + idx * 0.07, type: "spring", stiffness: 260, damping: 22 }}
                className="rounded-xl bg-white/5 border border-white/10 p-3"
              >
                <p className="text-[10px] uppercase tracking-wide text-zinc-500">{item.label}</p>
                <p className="text-sm font-semibold text-white mt-1">{item.value}</p>
              </motion.div>
            ))}
          </div>

          {/* tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap gap-2 mt-3"
          >
            {plot.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.48 + i * 0.05 }}
                className="text-xs text-zinc-300 bg-white/5 border border-white/10 rounded-full px-3 py-1 flex items-center gap-1"
              >
                <span className="text-emerald-400">✓</span> {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* footer */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-between mt-4 pt-3 border-t border-white/10"
          >
            <div>
              <p className="text-[10px] uppercase tracking-wide text-zinc-500">Starting price</p>
              <p className="text-lg font-semibold" style={{ color: meta.text }}>
                {plot.price}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSave?.(plot)}
                className="flex items-center gap-1.5 text-sm font-medium text-zinc-200 border border-white/15 rounded-xl px-4 py-2 hover:bg-white/5"
              >
                <Heart className="w-4 h-4" /> Save
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 26px -8px rgba(255,255,255,0.25)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 text-sm font-semibold text-zinc-900 bg-white rounded-xl px-4 py-2"
              >
                Pre-register <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ----------------------------------- main ----------------------------------- */

interface TownshipMapSectionProps {
  onSelectPlot?: (plot: Plot) => void;
  onSavePlot?: (plot: Plot) => void;
}

const MapSection: React.FC<TownshipMapSectionProps> = ({ onSelectPlot, onSavePlot }) => {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState(1);
  const [selected, setSelected] = useState<Plot | null>(null);

  const filteredPlots = useMemo(() => {
    return PLOTS.filter((p) => {
      const statusOk = filter === "all" || p.status === filter;
      const q = query.trim().toLowerCase();
      const queryOk =
        q.length === 0 ||
        p.plotNo.toLowerCase().includes(q) ||
        p.sector.toLowerCase().includes(q) ||
        p.project.toLowerCase().includes(q);
      return statusOk && queryOk;
    });
  }, [filter, query]);

  const matchedIds = useMemo(() => new Set(filteredPlots.map((p) => p.id)), [filteredPlots]);

  function openPlot(p: Plot) {
    setSelected(p);
    onSelectPlot?.(p);
  }

  return (
    <section className="relative py-20 bg-zinc-950 overflow-hidden">
      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-500/10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* heading */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-semibold text-white tracking-tight"
          >
            Explore Our Projects on Map
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-zinc-400 max-w-xl mx-auto mt-3 text-sm md:text-base"
          >
            Find your perfect plot across Melbourne City, Canberra City, and Shraddha Bhakti Avenue. 
            Click any location to view details and availability.
          </motion.p>
        </div>

        {/* main layout: map left, plot info right */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* LEFT — map */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {/* title bar, mac-style dots */}
            <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-sm font-medium text-zinc-200">
                  4 Pillars Realty — Project Map
                </span>
              </div>
              <span className="text-xs text-zinc-500">{PLOTS.length} plots available</span>
            </div>

            {/* canvas */}
            <div className="relative h-[360px] md:h-[460px]">
              {/* zoom controls */}
              <div className="absolute bottom-4 left-4 z-20 flex flex-col rounded-xl bg-zinc-800/90 border border-white/10 backdrop-blur-md overflow-hidden">
                <motion.button
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setZoom((z) => Math.min(z + 0.15, 1.6))}
                  className="w-9 h-9 flex items-center justify-center text-zinc-300 border-b border-white/10"
                  aria-label="Zoom in"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setZoom((z) => Math.max(z - 0.15, 0.8))}
                  className="w-9 h-9 flex items-center justify-center text-zinc-300"
                  aria-label="Zoom out"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
              </div>

              {/* legend chip, bottom-right of the map */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-3 bg-zinc-800/90 border border-white/10 backdrop-blur-md rounded-xl px-3 py-2">
                {(Object.keys(STATUS_META) as PlotStatus[]).map((key) => (
                  <span key={key} className="flex items-center gap-1.5 text-[11px] text-zinc-300">
                    <span className="w-2 h-2 rounded-full" style={{ background: STATUS_META[key].dot }} />
                    {STATUS_META[key].label}
                  </span>
                ))}
              </div>

              {/* map surface */}
              <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.04),transparent_55%)]"
                style={{ scale: zoom }}
                transition={{ duration: 0.35 }}
              >
                {/* faint grid */}
                <svg className="absolute inset-0 w-full h-full opacity-30">
                  <defs>
                    <pattern id="twgrid" width="36" height="36" patternUnits="userSpaceOnUse">
                      <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#twgrid)" />
                </svg>

                {ZONES.map((z, i) => (
                  <FlatZone
                    key={z.id}
                    zone={z}
                    plot={z.plotId ? PLOTS.find((p) => p.id === z.plotId) : undefined}
                    index={i}
                    dimmed={!!z.plotId && !matchedIds.has(z.plotId)}
                    onOpen={openPlot}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT — search, status filters, plot list */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl shadow-2xl p-4 flex flex-col h-full max-h-[510px] lg:max-h-[526px]"
          >
            {/* search bar */}
            <div className="flex items-center gap-2 bg-zinc-800/90 border border-white/10 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-zinc-500 flex-shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by plot ID, project, sector..."
                className="bg-transparent outline-none text-sm text-zinc-200 placeholder:text-zinc-500 w-full"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear search" className="text-zinc-500 hover:text-zinc-300">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* status filter cards */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              {(Object.keys(STATUS_META) as PlotStatus[]).map((key, i) => {
                const m = STATUS_META[key];
                const active = filter === key;
                return (
                  <motion.button
                    key={key}
                    onClick={() => setFilter(active ? "all" : key)}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative rounded-xl border p-2.5 text-left overflow-hidden"
                    style={{
                      borderColor: active ? m.dot : "rgba(255,255,255,0.1)",
                      background: active ? `${m.dot}1A` : "rgba(255,255,255,0.04)",
                    }}
                  >
                    <span className="flex items-center gap-1.5 text-[11px] text-zinc-300">
                      <span className="w-2 h-2 rounded-full" style={{ background: m.dot }} />
                      {m.label}
                    </span>
                    <span className="block text-lg font-semibold text-white mt-1">{m.count}</span>
                    {active && (
                      <motion.span
                        layoutId="status-card-active"
                        className="absolute inset-0 rounded-xl border-2 pointer-events-none"
                        style={{ borderColor: m.dot }}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* divider + count */}
            <div className="flex items-center justify-between mt-3 mb-1.5">
              <p className="text-xs font-medium text-zinc-400">
                {filteredPlots.length} {filteredPlots.length === 1 ? "plot" : "plots"} found
              </p>
              {filter !== "all" && (
                <button
                  onClick={() => setFilter("all")}
                  className="text-xs text-zinc-500 hover:text-zinc-300 underline"
                >
                  Clear filter
                </button>
              )}
            </div>

            {/* scrollable plot list */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 -mr-1">
              <AnimatePresence mode="popLayout">
                {filteredPlots.map((p) => {
                  const m = STATUS_META[p.status];
                  return (
                    <motion.button
                      key={p.id}
                      layout
                      onClick={() => openPlot(p)}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      whileHover={{ x: 3, borderColor: "rgba(255,255,255,0.25)" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-2.5 text-left"
                    >
                      <img
                        src={p.images[0]}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                      />
                      <span className="flex-1 min-w-0">
                        <span className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white truncate">{p.plotNo}</span>
                          <span
                            className="text-[10px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0"
                            style={{ background: m.ring, color: m.text }}
                          >
                            {m.label}
                          </span>
                        </span>
                        <span className="block text-xs text-zinc-500 truncate">
                          {p.project} · {p.sector}
                        </span>
                      </span>
                      <span className="text-sm font-semibold text-zinc-200 flex-shrink-0">{p.price}</span>
                    </motion.button>
                  );
                })}
              </AnimatePresence>

              {filteredPlots.length === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-zinc-500 text-center py-8"
                >
                  No plots match your search.
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <PlotModal plot={selected} onClose={() => setSelected(null)} onSave={onSavePlot} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default MapSection;