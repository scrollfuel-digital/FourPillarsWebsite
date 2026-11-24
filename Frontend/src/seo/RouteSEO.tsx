import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useProject } from "../hooks/useProject";
import { SITE_URL, seoData, projectSEO } from "./seoData";

const RESERVED_ROUTES = [
  "/",
  "/about",
  "/projects",
  "/project",
  "/contact",
  "/blogs",
  "/faqs",
  "/map",
  "/signup",
  "/login",
  "/admin",
];

function normalizePath(path: string) {
  return path.replace(/\/+$/, "") || "/";
}

function getCanonicalUrl(path: string) {
  const normalized = normalizePath(path);
  return normalized === "/" ? `${SITE_URL}/` : `${SITE_URL}${normalized}`;
}

function isNoIndexRoute(pathname: string) {
  return ["/signup", "/login", "/admin"].some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export default function RouteSEO() {
  const location = useLocation();
  const rawPathname = normalizePath(location.pathname);
  // Alias /project to /projects
  const pathname = rawPathname === "/project" ? "/projects" : rawPathname;

  const segments = pathname.split("/").filter(Boolean);

  // Match /:slug (e.g. /canberra-city) OR /projects/:slug (e.g. /projects/canberra-city)
  let slug: string | undefined = undefined;
  if (segments.length === 1 && !RESERVED_ROUTES.includes(pathname)) {
    slug = segments[0];
  } else if (segments.length === 2 && segments[0] === "projects") {
    slug = segments[1];
  }

  const isProjectRoute = Boolean(slug);
  const { project, loading } = useProject(slug);
  const projectConfig = slug ? projectSEO[slug] : undefined;

  const staticConfig =
    pathname === "/"
      ? seoData.home
      : Object.values(seoData).find(
          (item) => normalizePath(item.path) === pathname,
        );

  const isKnownProject = Boolean(projectConfig || project);
  const noIndex = isNoIndexRoute(pathname);

  // Unknown project route (only when loading finished and really unknown)
  if (isProjectRoute && !loading && !isKnownProject) {
    return (
      <Helmet>
        <title>Project Not Found | 4 Pillars Realty</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="prerender-status" content="ready" />
      </Helmet>
    );
  }

  // Wait for project data before marking the project route as ready
  if (isProjectRoute && loading) {
    return (
      <Helmet>
        <meta name="prerender-status" content="pending" />
      </Helmet>
    );
  }

  // Page-wise SEO data
  const pageTitle =
    projectConfig?.title ??
    (project
      ? `${project.name} | Residential Plots in Nagpur | 4 Pillars Realty`
      : undefined) ??
    staticConfig?.title ??
    "Residential Projects in Nagpur | 4 Pillars Realty";

  const description =
    projectConfig?.description ??
    project?.description ??
    staticConfig?.description ??
    "Explore residential plots and apartments by 4 Pillars Realty in Nagpur.";

  const keyword =
    projectConfig?.keyword ??
    staticConfig?.keyword ??
    "Residential plots in Nagpur";

  const canonicalPath =
    projectConfig?.path ??
    (slug ? `/${slug}` : undefined) ??
    staticConfig?.path ??
    pathname;

  const canonicalUrl = getCanonicalUrl(canonicalPath);

  const imageUrl = project?.image
    ? project.image.startsWith("http")
      ? project.image
      : new URL(project.image, SITE_URL).href
    : `${SITE_URL}/og-image.jpg`;

 

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": "https://4pillarsrealty.com/#business",
    name: "4 Pillars Realty",
    url: canonicalUrl,
    logo: `${SITE_URL}/logo.png`,
    description: description,
    telephone: "+91 93732 33777",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nagpur, Maharashtra",
      addressLocality: "Nagpur",
      addressRegion: "Maharashtra",
      postalCode: "440001",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "City",
      name: "Nagpur",
    },
  };

  return (
    <Helmet>
      <html lang="en" />

      {/* Primary SEO */}
      <title>{pageTitle}</title>

      {/* Meta Tags */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keyword} />
      <meta
        name="robots"
        content={
          noIndex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large"
        }
      />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="4 Pillars Realty" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={pageTitle} />

      {/* Twitter SEO */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Prerender Status */}
      <meta name="prerender-status" content="ready" />

      {/* Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData, null, 2)}
      </script>
    </Helmet>
  );
}
