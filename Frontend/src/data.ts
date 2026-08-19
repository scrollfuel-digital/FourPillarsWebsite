import { Project, Blog, Notification } from "./types";
import melbourne from "./assests/images/images/project_melbourne_png_1780484693295.png";
import canberra from "./assests/images/images/project_canberra_png_1780484709897.png";
import shraddha from "./assests/images/images/project_shraddha_png_1780484729700.png";
import hero from "./assests/images/images/project_canberra_png_1780484709897.png";
export const BRAND_COLORS = {
  primary: "#003B72", // Corporate Deep Blue
  secondary: "#1A67A4", // Royal Blue Accent
  accent: "#C51B1D", // Slogan Crimson Red
  darkBg: "#091522", // High-end dark background
  lightBg: "#F8FAFC", // Slate background for light mode
};

export const PROJECTS: Project[] = [
  {
    id: "melbourne-city-sector-ii",
    name: "Melbourne City Sector II",
    slug: "melbourne-city-sector-ii",
    type: "plot",
    location: "Kaldongri, Nagpur",
    description:
      "A thoughtfully planned residential development spread across 4 acres featuring 71 residential plots. Designed for families and investors seeking long-term growth and peaceful living.",
    details: [
      "71 Residential Plots spread over 4 Acres in Kaldongri, Nagpur",
      "NMRDA Sanctioned RL Status (100% Legal Clear Title & Bank Loan Approved)",
      "Wide paved asphalt roads with underground electrical & sewerage networks",
      "Prime position in Kaldongri corridor with direct connectivity to Wardha Road & Airport",
    ],
    specs: [
      { label: "Project Area", value: "4 Acres" },
      { label: "Total Plots", value: "71 Residential Plots" },
      { label: "Plot Sizes", value: "1,200 - 3,500 Sq. Ft." },
      { label: "Bank Loan", value: "Up to 80% Approved" },
      { label: "Approval Status", value: "NMRDA Sanctioned RL (Clear Title)" },
    ],
    highlights: [
      "71 Residential Plots",
      "4 Acre Development",
      "Lifestyle Amenities",
      "Excellent Investment Opportunity",
    ],
    amenities: [
      "European Style Entrance Gate",
      "Landscaped Gardens",
      "Children's Play Area",
      "Jogging Track",
      "Gazebos & Outdoor Seating",
      "Wide Tar & Cement Roads",
      "Sewerage Network & Electrical Infrastructure",
      "Street Lighting",
    ],
    acres: "4",
    totalUnits: "71",
    status: "ongoing",
    priceRange: "₹22 Lakh onward",
    image: melbourne,
    gallery: [melbourne, hero],
    coordinate: { x: 38, y: 72 },
    mapHotspot: "Kaldongri Highway Hub",
  },

  {
    id: "canberra-city",
    name: "Canberra City",
    slug: "canberra-city",
    type: "plot",
    location: "Wardha Road Corridor, Nagpur",
    description:
      "Spread across 6 acres with 97 residential plots, Canberra City combines modern infrastructure, open spaces, and investment potential in a well-planned residential community.",
    details: [
      "6 acres of perfectly flat, elevated prime residential land",
      "97 Residential Plots with NMRDA Sanctioned Release Letter (RL)",
      "Wide 40ft & 30ft internal tar roads with green open spaces & storm water systems",
      "Individual water supply lines & underground electricity at every plot boundary",
    ],
    specs: [
      { label: "Project Area", value: "6 Acres" },
      { label: "Total Plots", value: "97 Residential Plots" },
      { label: "Internal Roads", value: "30ft & 40ft Broad Asphalt Avenues" },
      { label: "Bank Loan Support", value: "Pre-Approved Up to 80%" },
      { label: "Clear Title", value: "100% NMRDA RL Sanctioned" },
    ],
    highlights: [
      "97 Residential Plots",
      "6 Acre Development",
      "Green Open Spaces",
      "Premium Layout Planning",
    ],
    amenities: [
      "Grand Entrance Security Gate",
      "Landscaped Gardens & Open Green Spaces",
      "Gazebos & Outdoor Seating Areas",
      "Broad Walking & Jogging Tracks",
      "Storm Water & Drainage System",
      "24/7 Gated Security Patrol",
      "Wide Tar & Cement Roads",
    ],
    acres: "6",
    totalUnits: "97",
    status: "ongoing",
    priceRange: "₹30 Lakh onward",
    image: canberra,
    gallery: [canberra, hero],
    coordinate: { x: 25, y: 58 },
    mapHotspot: "Wardha Road Smart Belt",
  },

  {
    id: "shraddha-bhakti-avenue",
    name: "Shraddha Bhakti Avenue",
    slug: "shraddha-bhakti-avenue",
    type: "apartment",
    location: "Besa, Nagpur",
    description:
      "Experience luxury living with spacious 3 BHK residences designed for modern families seeking comfort, elegance, and convenience.",
    details: [
      "7 Storey Premium Building in Besa, Nagpur",
      "Singular Opulent 3 BHK Apartments (2106 Sq. Ft. Super Built-Up Area)",
      "Prime Residential Location with easy connectivity",
      "Luxury living with modern facilities",
    ],
    specs: [
      { label: "Configuration", value: "3 BHK Homes" },
      { label: "Super Built-Up Area", value: "2106 Sq. Ft." },
      { label: "Floors", value: "7 Storey Premium Building" },
      { label: "Location", value: "Prime Besa, Nagpur" },
    ],
    highlights: [
      "2106 Sq. Ft. Super Built-Up Area",
      "7 Storey Premium Building",
      "Spacious 3 BHK Homes",
      "Prime Residential Location",
    ],
    amenities: [
      "Elevator & Power Backup",
      "Kids Play Area & Landscaped Open Spaces",
      "Fire Safety Infrastructure",
      "Covered Parking & Security",
    ],
    acres: "Boutique Project",
    totalUnits: "28",
    status: "completed",
    priceRange: "₹115 Lakh onward",
    image: shraddha,
    gallery: [shraddha, hero],
    coordinate: { x: 52, y: 40 },
    mapHotspot: "Besa Square Premium Belt",
  },

  {
    id: "perth-city",
    name: "Perth City",
    slug: "perth-city",
    type: "plot",
    location: "Kharsoli, Nagpur",
    description:
      "Premium plotted development in Kharsoli with modern gated amenities.",
    details: [
      "NMRDA Approved",
      "Wide Roads",
      "Underground Utilities",
      "High ROI",
    ],
    specs: [
      { label: "Area", value: "9 Acres" },
      { label: "Plots", value: "126+" },
    ],
    highlights: [
      "Premium Layout",
      "Gated Community",
      "Prime Location",
      "Investment Opportunity",
    ],
    amenities: ["Garden", "Security", "LED Lights", "Road Network"],
    acres: "9",
    totalUnits: "126+",
    status: "ongoing",
    priceRange: "Price on Request",
    image: hero,
    gallery: [hero],
    coordinate: { x: 72, y: 38 },
    mapHotspot: "Kharsoli Growth Zone",
  },

  {
    id: "kharsoli-township",
    name: "Kharsoli Township Project",
    slug: "kharsoli-township",
    type: "upcoming",
    location: "Kharsoli, Nagpur",
    description:
      "A premium township development spread across 9 acres featuring 126 residential plots designed for future-ready living.",
    details: [
      "9 Acres Township Development in Kharsoli",
      "126 Residential Plots",
      "Planned Residential Community",
      "Wide Internal Roads & Modern Infrastructure",
    ],
    specs: [
      { label: "Area", value: "9 Acres" },
      { label: "Plots", value: "126 Residential Plots" },
      { label: "Status", value: "Upcoming Pre-Launch" },
    ],
    highlights: [
      "Planned Residential Community",
      "Wide Internal Roads",
      "Modern Infrastructure",
      "Future Growth Potential",
    ],
    amenities: [
      "Wide Internal Roads",
      "Landscaped Green Spaces",
      "Electrical & Underground Drainage",
      "Street Lighting",
    ],
    acres: "9",
    totalUnits: "126",
    status: "upcoming",
    priceRange: "Coming Soon",
    image: hero,
    gallery: [hero],
    coordinate: { x: 70, y: 35 },
    mapHotspot: "Kharsoli",
  },

  {
    id: "mega-township-project",
    name: "Mega Township Project",
    slug: "mega-township-project",
    type: "upcoming",
    location: "Nagpur Growth Corridor",
    description:
      "A landmark 60+ acre development featuring over 1000 residential plots designed to become one of Nagpur's most promising residential destinations.",
    details: [
      "Landmark 60+ Acre Mega Township",
      "1000+ Residential Plots",
      "Comprehensive Infrastructure & Open Green Spaces",
      "Long-Term Appreciation Potential",
    ],
    specs: [
      { label: "Township Area", value: "60+ Acres" },
      { label: "Total Plots", value: "1000+ Residential Plots" },
      { label: "Status", value: "Upcoming Flagship Pre-Launch" },
    ],
    highlights: [
      "60+ Acre Township",
      "1000+ Residential Plots",
      "Comprehensive Infrastructure",
      "Long-Term Appreciation Potential",
    ],
    amenities: [
      "Grand Entrance Arch",
      "Broad Avenues & Internal Roads",
      "Parks & Recreation Hubs",
      "Underground Utilities & Street Lights",
    ],
    acres: "60+",
    totalUnits: "1000+",
    status: "upcoming",
    priceRange: "Price on Request",
    image: hero,
    gallery: [hero],
    coordinate: { x: 72, y: 38 },
    mapHotspot: "Nagpur Growth Corridor",
  },
];

export const AMENITIES_CATALOG = [
  {
    name: "European Style Entrance Gate",
    icon: "DoorOpen",
    desc: "Prestige entry with 24/7 security booth",
  },
  {
    name: "Landscaped Gardens",
    icon: "Leaf",
    desc: "Vast lush greenery with flowering plants",
  },
  {
    name: "Children's Play Area",
    icon: "Smile",
    desc: "Secure custom rubberized play grounds",
  },
  {
    name: "Jogging Track",
    icon: "Footprints",
    desc: "Premium paved paths weaving through greenery",
  },
  {
    name: "Gazebos",
    icon: "Flower2",
    desc: "Elegantly placed timber gazebos for relaxation",
  },
  {
    name: "Outdoor Seating Areas",
    icon: "Users",
    desc: "Community sit-outs surrounded by landscaping",
  },
  {
    name: "Wide Tar & Cement Roads",
    icon: "Route",
    desc: "Sturdy internal road layouts up to 50ft wide",
  },
  {
    name: "Street Lighting",
    icon: "Lightbulb",
    desc: "Eco-friendly LED lights throughout all layouts",
  },
  {
    name: "Sewerage Network",
    icon: "Waves",
    desc: "Underground pipelines keeping environment hygienic",
  },
  {
    name: "Electrical Infrastructure",
    icon: "Zap",
    desc: "Underground electrical cabling & transformers",
  },
  {
    name: "Open Green Spaces",
    icon: "Trees",
    desc: "Dedicated green parks and tree-lined avenues",
  },
];

export const FAQS = [
  {
    q: "Are bank loans available?",
    a: "Yes. We assist eligible buyers in obtaining up to 80% bank loan support through leading financial institutions.",
  },
  {
    q: "Do you offer both plots and apartments?",
    a: "Yes. We offer residential plots, township developments, and premium apartment projects.",
  },
  {
    q: "Are the projects suitable for investment?",
    a: "Yes. Our projects are located in emerging growth corridors that offer strong future appreciation potential.",
  },
  {
    q: "Can I schedule a site visit?",
    a: "Absolutely. Our team can arrange a site visit based on your convenience.",
  },
  {
    q: "How do I get project details and pricing?",
    a: "Simply contact our team through the enquiry form or call us directly.",
  },
];

export const BLOGS: Blog[] = [
  {
    id: "blog-1",
    title:
      "Why Wardha Road Belt is Nagpur's Best Real Estate Investment Corridor",
    slug: "nagpur-real-estate-corridors",
    summary:
      "Analyze why Southern Nagpur, specifically the Wardha Road and Besa areas, continues to capture over 60% of real estate transactions in Nagpur.",
    content: `Nagpur continues to rise rapidly as one of central India's primary multi-modal hubs. Driven by the Multi-modal International Cargo Hub and Airport at Nagpur (MIHAN), the entire southern growth corridor along Wardha Road has emerged as an unparalleled real estate hotspot.

For potential homebuyers and long-term land investors, the Wardha Road region offers a perfect trifecta:
1. **Unmatched Connectivity**: Proximity to the Metro network, Outer Ring Road, and Dr. Babasaheb Ambedkar International Airport makes daily traveling incredibly efficient.
2. **Economic Engines**: MIHAN houses top tech leaders (TCS, Infosys, Tech Mahindra) and logistics giants, creating massive white-collar housing demand.
3. **Plotted Layout Standards**: Modern gated layouts with proper NMRDA RL markings ensure your title deeds are fully compliant, clean, and pre-approved for top-tier loans.

Investing in projects like Canberra City or Melbourne City Sector II along this smart ring road corridor positions your portfolio right in the line of Nagpur's high-speed geographical extension.`,
    category: "Market Trends",
    readTime: "4 min read",
    date: "May 28, 2026",
    image: "/images/heroimage.png",
  },
  {
    id: "blog-2",
    title: "Understanding NMRDA RL & Non-Agricultural Sanctioning",
    slug: "understanding-mrd-rl-nagpur",
    summary:
      "A complete handbook on what NMRDA and RL mean in Nagpur real estate. Learn how to verify legal clear titles before buying residential plots.",
    content: `When purchasing land in Nagpur, you will often hear developers use the term "RL layout" or "NMRDA Approved". But what exactly do these terms stand for, and why are they critical for your financial protection?

RL stands for "Release Letter". After the Nagpur Metropolitan Region Development Authority (NMRDA) approves a plotted residential layout, they release individual plots to the developer only after checking that basic public infrastructure (roads, water lines, sewerage grids, transformers) has been properly designed and laid down.

Here is why you should ONLY purchase RL plots:
- **Immediate Building Permission**: You can present your plans to local bodies and construct your dream home immediately.
- **Easy Bank Funding**: Leading banks (like SBI, HDFC, ICICI) will only finance layouts having active RL releases.
- **Clean Title Assurance**: The release letter ensures the land has no ongoing ownership litigations or pending state encumbrances.

At 4 Pillars Realty, projects like Melbourne City Sector II are NMRDA Sanctioned RL layouts, ensuring perfect legal safety and peace of mind for every square foot.`,
    category: "Legal Guide",
    readTime: "6 min read",
    date: "April 15, 2026",
    image: "/images/project_melbourne_png_1780484693295.png",
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "success",
    message: "Plot 42 in Melbourne City Sector II was booked just now!",
    timestamp: "Just now",
    projectSlug: "melbourne-city-sector-ii",
  },
  {
    id: "2",
    type: "info",
    message: "Pre-launch registration opened for Perth City (60+ Acres).",
    timestamp: "10 min ago",
    projectSlug: "perth-city",
  },
  {
    id: "3",
    type: "alert",
    message:
      "Interest Rate Drop! High-end housing bank loans now at 8.15% SBA.",
    timestamp: "1 hr ago",
  },
  {
    id: "4",
    type: "success",
    message:
      "A duplex home site physical visit booked for Canberra City plots.",
    timestamp: "3 hrs ago",
    projectSlug: "canberra-city",
  },
];
