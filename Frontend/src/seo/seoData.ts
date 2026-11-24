
export interface PageSEO {
  title: string;
  description: string;
  path: string;
  keyword: string;
  h1: string;
}

export const SITE_URL = "https://4pillarsrealty.com";

export const seoData: Record<string, PageSEO> = {
  home: {
    title: "Residential Plots and Apartments in Nagpur | 4 Pillars Realty",
    description:
      "Residential plots and apartments in Nagpur by 4 Pillars Realty. Explore Melbourne City, Canberra City and more. Book a free site visit.",
    path: "/",
    keyword: "Residential plots in Nagpur",
    h1: "",
  },

  about: {
    title: "About 4 Pillars Realty | Real Estate Developer in Nagpur",
    description:
      "Know about 4 Pillars Realty, a Nagpur real estate developer offering residential plots and apartments. Explore our projects and approach.",
    path: "/about",
    keyword: "Real estate developer in Nagpur",
    h1: "",
  },

  projects: {
    title: "Residential Projects in Nagpur | 4 Pillars Realty",
    description:
      "Explore residential plots and apartments by 4 Pillars Realty in Nagpur. Discover Melbourne City, Canberra City, Perth City and more.",
    path: "/projects",
    keyword: "Residential projects in Nagpur",
    h1: "",
  },

    
  contact: {
    title: "Contact 4 Pillars Realty | Book a Site Visit in Nagpur",
    description:
      "Contact 4 Pillars Realty in Nagpur for residential plots and apartments. Call, WhatsApp or visit our office to book a site visit.",
    path: "/contact",
    keyword: "Contact 4 Pillars Realty Nagpur",
    h1: "",
  },
};

export const projectSEO: Record<string, PageSEO> = {
  "canberra-city": {
    title: "Residential Plots in Peotha Nagpur | Canberra City",
    description:
      "Explore Canberra City by 4 Pillars Realty, offering residential plots in Peotha, Nagpur. Discover plot options and find your ideal property.",
    path: "/canberra-city",
    keyword: "Residential Plots in Peotha",
    h1: "Canberra City",
  },

  "melbourne-city-sector-ii": {
    title:
      "Residential Plots in Peotha Nagpur | Melbourne City Sector II",
    description:
      "Explore Melbourne City Sector II by 4 Pillars Realty, offering residential plots in Peotha, Nagpur. Discover plot options and plan your dream home.",
    path: "/melbourne-city-sector-ii",
    keyword: "Residential Plots in Peotha Nagpur",
    h1: "Melbourne City Sector II",
  },

  "shraddha-bhakti-avenue": {
    title: "3 BHK Flats in Besa Nagpur | Shraddha Bhakti Avenue",
    description:
      "Discover Shraddha Bhakti Avenue by 4 Pillars Realty, offering 3 BHK apartments in Besa, Nagpur. Explore apartment features and find your ideal home.",
    path: "/shraddha-bhakti-avenue",
    keyword: "3 BHK Flats in Besa Nagpur",
    h1: "Shraddha Bhakti Avenue"
  },

  "perth-city": {
    title: "NMRDA Approved Plots in Kharsoli Nagpur | Perth City",
    description:
      "Explore Perth City by 4 Pillars Realty, offering 126+ NMRDA approved residential plots in Kharsoli, Nagpur, across a 9-acre gated layout.",
    path: "/perth-city",
    keyword: "NMRDA Approved Plots in Kharsoli Nagpur",
    h1: "Perth City"
  },

  "kharsoli-township": {
    title: "Residential Plots in Kharsoli Nagpur | Kharsoli Township",
    description:
      "Explore Kharsoli Township by 4 Pillars Realty, offering residential plots in Kharsoli, Nagpur. Discover the project and explore property options.",
    path: "/kharsoli-township",
    keyword: "Residential Plots in Kharsoli Nagpur",
    h1: "Kharsoli Township"
  },

  "mega-township-project": {
    title: "Residential Plots in Nagpur | Mega Township Project",
    description:
      "Explore Mega Township Project by 4 Pillars Realty, an upcoming 60+ acre residential township in Nagpur featuring 1000+ residential plots and planned infrastructure.",
    path: "/mega-township-project",
    keyword: "Residential Plots in Nagpur",
    h1: "Mega Township Project"
  },
};
