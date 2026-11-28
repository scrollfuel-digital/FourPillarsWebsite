
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
    h1: "Residential Plots in Nagpur",
  },

  about: {
    title: "About 4 Pillars Realty | Real Estate Developer in Nagpur",
    description:
      "Know about 4 Pillars Realty, a Nagpur real estate developer offering residential plots and apartments. Explore our projects and approach.",
    path: "/about",
    keyword: "Real estate developer in Nagpur",
    h1: "About 4 Pillars Realty – Trusted Real Estate Developer in Nagpur",
  },

  projects: {
    title: "Residential Projects in Nagpur | 4 Pillars Realty",
    description:
      "Explore residential plots and apartments by 4 Pillars Realty in Nagpur. Discover Melbourne City, Canberra City, Perth City and more.",
    path: "/projects",
    keyword: "Residential projects in Nagpur",
    h1: "Our Projects",
  },

    
  contact: {
    title: "Contact 4 Pillars Realty | Book a Site Visit in Nagpur",
    description:
      "Contact 4 Pillars Realty in Nagpur for residential plots and apartments. Call, WhatsApp or visit our office to book a site visit.",
    path: "/contact",
    keyword: "Contact 4 Pillars Realty Nagpur",
    h1: "Contact 4 Pillars Realty",
  },
};

export const projectSEO: Record<string, PageSEO> = {
  "canberra-city": {
    title: "NMRDA Sanctioned Plots in Peotha Nagpur | Canberra City",
    description:
      "NMRDA Sanctioned Plots in Peotha, Nagpur: Canberra City by 4 Pillars Realty offers 97 residential plots in a 6-acre layout. Book a free site visit today.",
    path: "/projects/canberra-city",
    keyword: "NMRDA Sanctioned Plots in Peotha Nagpur ",
    h1: "Canberra City",
  },

  "melbourne-city-sector-ii": {
    title:
      "NMRDA Residential Plots in Peotha Nagpur | Melbourne City",
    description:
      "NMRDA Residential Plots in Peotha Nagpur at Melbourne City Sector II by 4 Pillars Realty. Explore approved residential plots and book your free site visit today",
    path: "/projects/melbourne-city-sector-ii",
    keyword: "NMRDA Residential Plots in Peotha Nagpur",
    h1: "Melbourne City Sector II",
  },

  "shraddha-bhakti-avenue": {
    title: "Luxury 3 BHK Flats in Besa Nagpur | Shraddha Bhakti Avenue",
    description:
      "Luxury 3 BHK Flats in Besa Nagpur at Shraddha Bhakti Avenue by 4 Pillars Realty. Spacious 2,106 sq.ft. flats in a 7-storey building. Book a site visit.",
    path: "/projects/shraddha-bhakti-avenue",
    keyword: "3 BHK Flats in Besa Nagpur",
    h1: "Shraddha Bhakti Avenue"
  },

  "perth-city": {
    title: "NMRDA Approved Plots in Kharsoli Nagpur | Perth City",
    description:
      "NMRDA Approved Plots in Kharsoli, Nagpur at Perth City by 4 Pillars Realty. Explore residential plots in a well-planned layout and book your free site visit today.",
    path: "/projects/perth-city",
    keyword: "NMRDA Approved Plots in Kharsoli Nagpur",
    h1: "Perth City"
  },

};
