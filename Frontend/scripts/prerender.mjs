import jsBeautify from "js-beautify";
import { spawn } from "child_process";
import { loadEnv } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDir = path.resolve(__dirname, "..");

const SITE_URL = "https://4pillarsrealty.com";
const PREVIEW_URL = "http://127.0.0.1:4173";

const env = loadEnv("production", frontendDir, "");
const API_BASE = (env.VITE_API_URL || "https://fourpillarswebsite.onrender.com/api").replace(/\/$/, "");

const STATIC_ROUTES = [
    "/",
    "/about",
    "/projects",
    "/contact",
];

const KNOWN_PROJECT_ROUTES = [
    "/canberra-city",
    "/melbourne-city-sector-ii",
    "/shraddha-bhakti-avenue",
    "/perth-city",
    "/kharsoli-township",
    "/mega-township-project",
];

const STATIC_PAGE_SEO = {
    "/": {
        title: "Residential Plots and Apartments in Nagpur | 4 Pillars Realty",
        description: "Residential plots and apartments in Nagpur by 4 Pillars Realty. Explore Melbourne City, Canberra City and more. Book a free site visit.",
        keywords: "Residential plots in Nagpur",
        canonical: "https://4pillarsrealty.com/",
        image: "https://4pillarsrealty.com/og-image.jpg",
    },
    "/about": {
        title: "About 4 Pillars Realty | Real Estate Developer in Nagpur",
        description: "Know about 4 Pillars Realty, a Nagpur real estate developer offering residential plots and apartments. Explore our projects and approach.",
        keywords: "Real estate developer in Nagpur",
        canonical: "https://4pillarsrealty.com/about",
        image: "https://4pillarsrealty.com/og-image.jpg",
    },
    "/projects": {
        title: "Residential Projects in Nagpur | 4 Pillars Realty",
        description: "Explore residential plots and apartments by 4 Pillars Realty in Nagpur. Discover Melbourne City, Canberra City, Perth City and more.",
        keywords: "Residential projects in Nagpur",
        canonical: "https://4pillarsrealty.com/projects",
        image: "https://4pillarsrealty.com/og-image.jpg",
    },
    "/contact": {
        title: "Contact 4 Pillars Realty | Book a Site Visit in Nagpur",
        description: "Contact 4 Pillars Realty in Nagpur for residential plots and apartments. Call, WhatsApp or visit our office to book a site visit.",
        keywords: "Contact 4 Pillars Realty Nagpur",
        canonical: "https://4pillarsrealty.com/contact",
        image: "https://4pillarsrealty.com/og-image.jpg",
    },
};

const KNOWN_PROJECT_SEO = {
    "canberra-city": {
        title: "Residential Plots in Peotha Nagpur | Canberra City",
        description: "Explore Canberra City by 4 Pillars Realty, offering residential plots in Peotha, Nagpur. Discover plot options and find your ideal property.",
        keywords: "Residential Plots in Peotha",
        canonical: "https://4pillarsrealty.com/canberra-city",
        image: "https://res.cloudinary.com/ds1y9wivv/image/upload/v1794813923/fourpillars/covers/oqywuc8l8lvjflizcqwt.png",
    },
    "melbourne-city-sector-ii": {
        title: "Residential Plots in Peotha Nagpur | Melbourne City Sector II",
        description: "Explore Melbourne City Sector II by 4 Pillars Realty, offering residential plots in Peotha, Nagpur. Discover plot options and plan your dream home.",
        keywords: "Residential Plots in Peotha Nagpur",
        canonical: "https://4pillarsrealty.com/melbourne-city-sector-ii",
        image: "https://res.cloudinary.com/ds1y9wivv/image/upload/v1794813923/fourpillars/covers/oqywuc8l8lvjflizcqwt.png",
    },
    "shraddha-bhakti-avenue": {
        title: "3 BHK Flats in Besa Nagpur | Shraddha Bhakti Avenue",
        description: "Discover Shraddha Bhakti Avenue by 4 Pillars Realty, offering 3 BHK apartments in Besa, Nagpur. Explore apartment features and find your ideal home.",
        keywords: "3 BHK Flats in Besa Nagpur",
        canonical: "https://4pillarsrealty.com/shraddha-bhakti-avenue",
        image: "https://4pillarsrealty.com/og-image.jpg",
    },
    "perth-city": {
        title: "NMRDA Approved Plots in Kharsoli Nagpur | Perth City",
        description: "Explore Perth City by 4 Pillars Realty, offering 126+ NMRDA approved residential plots in Kharsoli, Nagpur, across a 9-acre gated layout.",
        keywords: "NMRDA Approved Plots in Kharsoli Nagpur",
        canonical: "https://4pillarsrealty.com/perth-city",
        image: "https://4pillarsrealty.com/og-image.jpg",
    },
    "kharsoli-township": {
        title: "Residential Plots in Kharsoli Nagpur | Kharsoli Township",
        description: "Explore Kharsoli Township by 4 Pillars Realty, offering residential plots in Kharsoli, Nagpur. Discover the project and explore property options.",
        keywords: "Residential Plots in Kharsoli Nagpur",
        canonical: "https://4pillarsrealty.com/kharsoli-township",
        image: "https://4pillarsrealty.com/og-image.jpg",
    },
    "mega-township-project": {
        title: "Residential Plots in Nagpur | Mega Township Project",
        description: "Explore Mega Township Project by 4 Pillars Realty, an upcoming 60+ acre residential township in Nagpur featuring 1000+ residential plots and planned infrastructure.",
        keywords: "Residential Plots in Nagpur",
        canonical: "https://4pillarsrealty.com/mega-township-project",
        image: "https://4pillarsrealty.com/og-image.jpg",
    },
};

let projectsApiData = [];

function organizeHead(raw) {
    let schemaTag = null;
    const schemaMatch = raw.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/i);
    if (schemaMatch) {
        schemaTag = schemaMatch[0].trim();
        raw = raw.replace(schemaMatch[0], "");
    }
    raw = raw.replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, "");

    const headMatch = raw.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    if (!headMatch) return raw;
    let headInner = headMatch[1];

    headInner = headInner
        .replace(/<!--\s*Viewport\s*-->/gi, "")
        .replace(/<!--\s*Google Analytics \(GA4\)\s*-->/gi, "")
        .replace(/<!--\s*Favicon\s*-->/gi, "")
        .replace(/<!--\s*Primary SEO\s*-->/gi, "")
        .replace(/<!--\s*Meta Tags\s*-->/gi, "")
        .replace(/<!--\s*Facebook Domain Verification\s*-->/gi, "")
        .replace(/<!--\s*Open Graph\s*-->/gi, "")
        .replace(/<!--\s*Twitter SEO\s*-->/gi, "")
        .replace(/<!--\s*Canonical\s*-->/gi, "")
        .replace(/<!--\s*Local Business Schema\s*-->/gi, "")
        .replace(/<!--\s*Auto-refresh on Ctrl\+U[^>]*-->/gi, "");

    const extract = (regex) => {
        const match = headInner.match(regex);
        if (match) {
            headInner = headInner.replace(match[0], "");
            return match[0].trim();
        }
        return null;
    };

    const charsetTag = extract(/<meta[^>]*charset=["'][^"']*["'][^>]*>/i) || '<meta charset="UTF-8">';
    const viewportTag = extract(/<meta[^>]*name=["']viewport["'][^>]*>/i) || '<meta name="viewport" content="width=device-width, initial-scale=1.0">';

    const gaScriptTag = extract(/<script[^>]*src=["'][^"']*googletagmanager\.com[^"']*["'][^>]*>[\s\S]*?<\/script>/i) ||
        '<script async="" src="https://www.googletagmanager.com/gtag/js?id=G-ZJCV4Q5BD6"></script>';
    const gtagInlineTag = extract(/<script>[\s\S]*?gtag\([\s\S]*?<\/script>/i) ||
        `<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag() {\n    dataLayer.push(arguments);\n  }\n  gtag("js", new Date());\n  gtag("config", "G-ZJCV4Q5BD6");\n</script>`;

    const faviconTag = extract(/<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*>/i) || '<link rel="icon" type="image/png" href="/logo.png">';

    const titleTag = extract(/<title>[\s\S]*?<\/title>/i);

    const descTag = extract(/<meta[^>]*name=["']description["'][^>]*>/i);
    const keywordsTag = extract(/<meta[^>]*name=["']keywords["'][^>]*>/i);
    const robotsTag = extract(/<meta[^>]*name=["']robots["'][^>]*>/i);
    const fbVerificationTag = extract(/<meta[^>]*name=["']facebook-domain-verification["'][^>]*>/i) || '<meta name="facebook-domain-verification" content="">';

    const ogTypeTag = extract(/<meta[^>]*property=["']og:type["'][^>]*>/i);
    const ogSiteTag = extract(/<meta[^>]*property=["']og:site_name["'][^>]*>/i);
    const ogLocaleTag = extract(/<meta[^>]*property=["']og:locale["'][^>]*>/i);
    const ogTitleTag = extract(/<meta[^>]*property=["']og:title["'][^>]*>/i);
    const ogDescTag = extract(/<meta[^>]*property=["']og:description["'][^>]*>/i);
    const ogUrlTag = extract(/<meta[^>]*property=["']og:url["'][^>]*>/i);
    const ogImgTag = extract(/<meta[^>]*property=["']og:image["'][^>]*>/i);
    const ogWidthTag = extract(/<meta[^>]*property=["']og:image:width["'][^>]*>/i);
    const ogHeightTag = extract(/<meta[^>]*property=["']og:image:height["'][^>]*>/i);
    const ogAltTag = extract(/<meta[^>]*property=["']og:image:alt["'][^>]*>/i);

    const twCardTag = extract(/<meta[^>]*name=["']twitter:card["'][^>]*>/i);
    const twTitleTag = extract(/<meta[^>]*name=["']twitter:title["'][^>]*>/i);
    const twDescTag = extract(/<meta[^>]*name=["']twitter:description["'][^>]*>/i);
    const twImgTag = extract(/<meta[^>]*name=["']twitter:image["'][^>]*>/i);

    const canonicalTag = extract(/<link[^>]*rel=["']canonical["'][^>]*>/i);
    const prerenderStatusTag = extract(/<meta[^>]*name=["']prerender-status["'][^>]*>/i);

    const ctrlUScriptTag =
        extract(/<script>[\s\S]*?handleKey[\s\S]*?<\/script>/i) ||
        extract(/<script>[\s\S]*?isCtrlU[\s\S]*?<\/script>/i) ||
        `<script>\n  (function () {\n    function handleKey(e) {\n      var isCtrl = e.ctrlKey || e.metaKey;\n      var isU =\n        (e.key && e.key.toLowerCase() === "u") ||\n        e.code === "KeyU" ||\n        e.keyCode === 85 ||\n        e.which === 85;\n      var isMacViewSource = e.metaKey && e.altKey && isU;\n\n      if ((isCtrl && isU) || isMacViewSource) {\n        window.location.reload();\n      }\n    }\n    document.addEventListener("keydown", handleKey, true);\n    window.addEventListener("keydown", handleKey, true);\n  })();\n</script>`;

    const sections = [];
    if (charsetTag) sections.push(charsetTag);
    if (viewportTag) sections.push(`<!-- Viewport -->\n${viewportTag}`);
    if (gaScriptTag || gtagInlineTag) {
        const gaParts = [gaScriptTag, gtagInlineTag].filter(Boolean).join("\n");
        sections.push(`<!-- Google Analytics (GA4) -->\n${gaParts}`);
    }
    if (faviconTag) sections.push(`<!-- Favicon -->\n${faviconTag}`);
    if (titleTag) sections.push(`<!-- Primary SEO -->\n${titleTag}`);
    const metaTags = [descTag, keywordsTag, robotsTag].filter(Boolean);
    if (metaTags.length > 0) sections.push(`<!-- Meta Tags -->\n${metaTags.join("\n")}`);
    sections.push(`<!-- Facebook Domain Verification -->\n${fbVerificationTag}`);
    const ogTags = [ogTypeTag, ogSiteTag, ogLocaleTag, ogTitleTag, ogDescTag, ogUrlTag, ogImgTag, ogWidthTag, ogHeightTag, ogAltTag].filter(Boolean);
    if (ogTags.length > 0) sections.push(`<!-- Open Graph -->\n${ogTags.join("\n")}`);
    const twTags = [twCardTag, twTitleTag, twDescTag, twImgTag].filter(Boolean);
    if (twTags.length > 0) sections.push(`<!-- Twitter SEO -->\n${twTags.join("\n")}`);
    if (canonicalTag) sections.push(`<!-- Canonical -->\n${canonicalTag}`);
    if (schemaTag) sections.push(`<!-- Local Business Schema -->\n${schemaTag}`);
    if (prerenderStatusTag) sections.push(prerenderStatusTag);

    if (ctrlUScriptTag) {
        sections.push(`<!-- Auto-refresh on Ctrl+U / View Source key combination -->\n${ctrlUScriptTag}`);
    }

    const trimmedRemaining = headInner.trim();
    if (trimmedRemaining) {
        sections.push(trimmedRemaining);
    }

    const newHead = `<head>\n${sections.join("\n\n")}\n</head>`;
    return raw.replace(/<head[^>]*>[\s\S]*?<\/head>/i, newHead);
}

function formatHtml(rawHtml) {
    const beautify = jsBeautify.html || jsBeautify;
    const organizedHtml = organizeHead(rawHtml);
    return beautify(organizedHtml, {
        indent_size: 2,
        indent_char: " ",
        wrap_line_length: 0,
        preserve_newlines: true,
        max_preserve_newlines: 1,
        indent_inner_html: true,
        extra_liners: ["head", "body", "/html"],
    });
}

let previewProcess;
let browser;
let homePrerenderResult = null;

const distIndexFile = path.join(frontendDir, "dist", "index.html");
const spaShellFile = path.join(frontendDir, "dist", "_spa_shell.html");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function expectedCanonical(route) {
    const cleanRoute = route.replace(/\/+$/, "");
    return cleanRoute === "" ? `${SITE_URL}/` : `${SITE_URL}${cleanRoute}`;
}

async function waitForPreview(url, timeout = 60000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                console.log("Vite preview is ready.");
                return;
            }
        } catch {
            // Server still starting
        }
        await sleep(1000);
    }
    throw new Error("Vite preview server did not start in time.");
}

async function getProjectRoutes() {
    if (!API_BASE) {
        console.warn("VITE_API_URL is missing. Using static known routes.");
        return KNOWN_PROJECT_ROUTES;
    }

    const apiUrl = `${API_BASE}/projects`;
    console.log("\nFetching project routes:", apiUrl);

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.warn(`Projects API returned ${response.status}. Using known project routes.`);
            return KNOWN_PROJECT_ROUTES;
        }

        const result = await response.json();
        if (!result.success || !Array.isArray(result.data)) {
            console.warn("Invalid projects API response. Using known project routes.");
            return KNOWN_PROJECT_ROUTES;
        }

        projectsApiData = result.data;

        const routes = result.data
            .map((project) => project.slug)
            .filter(Boolean)
            .map((slug) => {
                const cleanSlug = String(slug).replace(/^\/+|\/+$/g, "");
                return cleanSlug ? `/${cleanSlug}` : null;
            })
            .filter(Boolean);

        const nonRootRoutes = routes.filter((r) => r !== "/");
        const orderedRoutes = routes.includes("/") ? [...nonRootRoutes, "/"] : nonRootRoutes;
        return orderedRoutes;
    } catch (err) {
        console.warn("Failed to fetch project routes from API:", err.message, ". Using known project routes fallback.");
        return KNOWN_PROJECT_ROUTES;
    }
}

async function getAllRoutes() {
    const apiRoutes = await getProjectRoutes();
    const routes = [
        ...new Set([
            ...STATIC_ROUTES,
            ...KNOWN_PROJECT_ROUTES,
            ...apiRoutes,
        ]),
    ];

    console.log("\nRoutes to prerender:");
    routes.forEach((route) => {
        console.log(` - ${route}`);
    });
    return routes;
}

function removePreviousPrerenderedPages(routes) {
    console.log("\nRemoving previous prerendered HTML...");
    for (const route of routes) {
        if (route === "/") continue;

        const cleanName = route.replace(/^\/+|\/+$/g, "");
        const outputDirectory = path.join(frontendDir, "dist", cleanName);
        const flatHtmlFile = path.join(frontendDir, "dist", `${cleanName}.html`);

        if (fs.existsSync(outputDirectory)) {
            fs.rmSync(outputDirectory, { recursive: true, force: true });
        }
        if (fs.existsSync(flatHtmlFile)) {
            fs.unlinkSync(flatHtmlFile);
        }
    }
    console.log("Previous prerendered pages removed.");
}

function prepareSpaShell() {
    if (!fs.existsSync(distIndexFile)) {
        throw new Error(`dist/index.html not found: ${distIndexFile}. Run vite build first.`);
    }

    const currentHtml = fs.readFileSync(distIndexFile, "utf-8");
    const isPrerendered =
        currentHtml.includes('name="prerender-status"') ||
        currentHtml.includes("data-rh-managed") ||
        currentHtml.includes("<title>");

    if (!isPrerendered) {
        fs.writeFileSync(spaShellFile, currentHtml, "utf-8");
    } else if (fs.existsSync(spaShellFile)) {
        console.log("Restoring pristine SPA shell from _spa_shell.html...");
        fs.copyFileSync(spaShellFile, distIndexFile);
    }
}

async function startPreviewServer() {
    console.log("\nStarting Vite preview server...");
    const viteCli = path.join(frontendDir, "node_modules", "vite", "bin", "vite.js");

    if (!fs.existsSync(viteCli)) {
        throw new Error(`Vite CLI not found: ${viteCli}`);
    }

    previewProcess = spawn(
        process.execPath,
        [viteCli, "preview", "--host", "127.0.0.1", "--port", "4173", "--strictPort"],
        {
            cwd: frontendDir,
            stdio: "inherit",
            env: process.env,
        }
    );

    previewProcess.on("error", (error) => {
        console.error("Preview server error:", error);
    });

    await waitForPreview(PREVIEW_URL);
}

function getRouteMeta(route) {
    if (STATIC_PAGE_SEO[route]) {
        return STATIC_PAGE_SEO[route];
    }

    const slug = route.replace(/^\/+|\/+$/g, "");
    if (KNOWN_PROJECT_SEO[slug]) {
        return KNOWN_PROJECT_SEO[slug];
    }

    const apiProject = projectsApiData.find(
        (p) => String(p.slug || "").replace(/^\/+|\/+$/g, "") === slug
    );

    if (apiProject) {
        return {
            title: `${apiProject.name} | Residential Plots in Nagpur | 4 Pillars Realty`,
            description: apiProject.description || "Residential plots and apartments in Nagpur by 4 Pillars Realty.",
            keywords: `${apiProject.name} Nagpur, Residential plots in Nagpur`,
            canonical: `${SITE_URL}/${slug}`,
            image: apiProject.image
                ? (apiProject.image.startsWith("http") ? apiProject.image : `${SITE_URL}${apiProject.image}`)
                : `${SITE_URL}/og-image.jpg`,
        };
    }

    return {
        title: "Residential Projects in Nagpur | 4 Pillars Realty",
        description: "Explore residential plots and apartments by 4 Pillars Realty in Nagpur.",
        keywords: "Residential projects in Nagpur",
        canonical: expectedCanonical(route),
        image: `${SITE_URL}/og-image.jpg`,
    };
}

function buildRouteHtml(route, baseHtml) {
    const meta = getRouteMeta(route);
    const canonicalUrl = meta.canonical;

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "@id": "https://4pillarsrealty.com/#business",
        name: "4 Pillars Realty",
        url: canonicalUrl,
        logo: `${SITE_URL}/logo.png`,
        description: meta.description,
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

    const schemaBlock = `<script type="application/ld+json">\n${JSON.stringify(schemaData, null, 2)}\n</script>`;

    const seoBlock = `
<title>${meta.title}</title>
<meta name="description" content="${meta.description}">
<meta name="keywords" content="${meta.keywords}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="facebook-domain-verification" content="">
<meta property="og:type" content="website">
<meta property="og:site_name" content="4 Pillars Realty">
<meta property="og:locale" content="en_IN">
<meta property="og:title" content="${meta.title}">
<meta property="og:description" content="${meta.description}">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:image" content="${meta.image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${meta.title}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${meta.title}">
<meta name="twitter:description" content="${meta.description}">
<meta name="twitter:image" content="${meta.image}">
<link rel="canonical" href="${canonicalUrl}">
${schemaBlock}
<meta name="prerender-status" content="ready">
`;

    const combinedHtml = baseHtml.replace("</head>", `${seoBlock}\n</head>`);
    return formatHtml(combinedHtml);
}

function prerenderRoutesStatically(routes) {
    console.log("\n====================================");
    console.log("High-Performance Static SEO Prerender Engine");
    console.log("====================================");

    const baseHtml = fs.existsSync(spaShellFile)
        ? fs.readFileSync(spaShellFile, "utf-8")
        : fs.readFileSync(distIndexFile, "utf-8");

    for (const route of routes) {
        console.log(`Prerendering (static): ${route}`);
        const formattedHtml = buildRouteHtml(route, baseHtml);

        const cleanName = route.replace(/^\/+|\/+$/g, "");
        const outputDirectory =
            route === "/"
                ? path.join(frontendDir, "dist")
                : path.join(frontendDir, "dist", cleanName);

        fs.mkdirSync(outputDirectory, { recursive: true });

        const outputFile = path.join(outputDirectory, "index.html");
        fs.writeFileSync(outputFile, formattedHtml, "utf-8");

        if (route !== "/") {
            const flatOutputFile = path.join(frontendDir, "dist", `${cleanName}.html`);
            fs.writeFileSync(flatOutputFile, formattedHtml, "utf-8");

            if (route === "/projects") {
                const projectAliasDir = path.join(frontendDir, "dist", "project");
                fs.mkdirSync(projectAliasDir, { recursive: true });
                fs.writeFileSync(path.join(projectAliasDir, "index.html"), formattedHtml, "utf-8");
                fs.writeFileSync(path.join(frontendDir, "dist", "project.html"), formattedHtml, "utf-8");
            }
        }
    }

    console.log("\nStatic prerender completed for all routes.");
}

async function collectMetadata(page) {
    return page.evaluate(() => {
        const titles = Array.from(document.head.querySelectorAll("title"));
        const descriptions = Array.from(document.head.querySelectorAll('meta[name="description"]'));
        const canonicals = Array.from(document.head.querySelectorAll('link[rel="canonical"]'));
        const ogUrls = Array.from(document.head.querySelectorAll('meta[property="og:url"]'));

        return {
            title: document.title,
            titleCount: titles.length,
            titleElements: titles.map((item) => item.outerHTML),
            description: descriptions[0]?.content || "",
            descriptionCount: descriptions.length,
            descriptionElements: descriptions.map((item) => item.outerHTML),
            canonical: canonicals[0]?.href || "",
            canonicalCount: canonicals.length,
            keywords: document.querySelector('meta[name="keywords"]')?.content || "",
            robots: document.querySelector('meta[name="robots"]')?.content || "",
            ogUrl: ogUrls[0]?.content || "",
            ogUrlCount: ogUrls.length,
            prerenderStatus: document.querySelector('meta[name="prerender-status"]')?.content || "",
            rootText: document.querySelector("#root")?.innerText?.trim() || "",
        };
    });
}

function validateMetadata(metadata, route) {
    const expectedUrl = expectedCanonical(route);
    console.log(`\nSEO Metadata for ${route}:`, {
        title: metadata.title,
        description: metadata.description,
        keywords: metadata.keywords,
        canonical: metadata.canonical,
        robots: metadata.robots,
    });

    if (metadata.titleCount !== 1 || !metadata.title?.trim()) {
        throw new Error(`Invalid title for ${route}`);
    }
    if (metadata.descriptionCount !== 1 || !metadata.description?.trim()) {
        throw new Error(`Invalid description for ${route}`);
    }
    if (metadata.canonicalCount !== 1 || metadata.canonical !== expectedUrl) {
        throw new Error(`Incorrect canonical for ${route}`);
    }
    if (metadata.robots.toLowerCase().includes("noindex")) {
        throw new Error(`Page is marked noindex: ${route}`);
    }
    if (metadata.prerenderStatus !== "ready") {
        throw new Error(`Prerender status is not ready: ${route}`);
    }
}

async function prerenderRoute(route) {
    const page = await browser.newPage();
    try {
        const url = `${PREVIEW_URL}${route}`;
        console.log(`\n-----------------------------------\nPrerendering (live): ${route}\nURL: ${url}`);

        const response = await page.goto(url, {
            waitUntil: "networkidle2",
            timeout: 90000,
        });

        if (!response || !response.ok()) {
            throw new Error(`Page returned an invalid response: ${route}`);
        }

        await page.waitForFunction(
            () => document.querySelector('meta[name="prerender-status"]')?.getAttribute("content") === "ready",
            { timeout: 90000 }
        );

        await sleep(700);

        const metadata = await collectMetadata(page);
        validateMetadata(metadata, route);

        const html = await page.content();
        const formattedHtml = formatHtml(html);

        const cleanName = route.replace(/^\/+|\/+$/g, "");
        const outputDirectory =
            route === "/"
                ? path.join(frontendDir, "dist")
                : path.join(frontendDir, "dist", cleanName);

        fs.mkdirSync(outputDirectory, { recursive: true });

        const outputFile = path.join(outputDirectory, "index.html");

        if (route === "/") {
            homePrerenderResult = { outputFile, html: formattedHtml };
            console.log(`Prerendered root / (write to ${outputFile} deferred until all routes finish).`);
        } else {
            fs.writeFileSync(outputFile, formattedHtml, "utf-8");
            const flatOutputFile = path.join(frontendDir, "dist", `${cleanName}.html`);
            fs.writeFileSync(flatOutputFile, formattedHtml, "utf-8");

            if (route === "/projects") {
                const projectAliasDir = path.join(frontendDir, "dist", "project");
                fs.mkdirSync(projectAliasDir, { recursive: true });
                fs.writeFileSync(path.join(projectAliasDir, "index.html"), formattedHtml, "utf-8");
                fs.writeFileSync(path.join(frontendDir, "dist", "project.html"), formattedHtml, "utf-8");
            }
            console.log(`Saved formatted HTML: ${outputFile} and ${flatOutputFile}`);
        }
        console.log(`Completed: ${route}`);
    } finally {
        await page.close();
    }
}

async function cleanup() {
    if (browser) {
        await browser.close().catch(() => {});
    }

    if (previewProcess && !previewProcess.killed) {
        try {
            if (process.platform === "win32") {
                spawn("taskkill", ["/pid", previewProcess.pid.toString(), "/f", "/t"]);
            } else {
                previewProcess.kill();
            }
        } catch {
            previewProcess.kill();
        }
    }
}

function generateAndSaveSitemap(routes) {
    const today = new Date().toISOString().split("T")[0];

    const xmlUrls = routes
        .filter((r) => !["/login", "/signup", "/admin"].includes(r))
        .map((route) => {
            const loc = expectedCanonical(route);
            let priority = "0.8";
            let changefreq = "weekly";

            if (route === "/") {
                priority = "1.0";
                changefreq = "weekly";
            } else if (route === "/projects") {
                priority = "0.9";
                changefreq = "weekly";
            } else if (route === "/about" || route === "/contact") {
                priority = "0.8";
                changefreq = "monthly";
            }

            return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
        })
        .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlUrls}\n</urlset>\n`;

    const publicSitemap = path.join(frontendDir, "public", "sitemap.xml");
    const distSitemap = path.join(frontendDir, "dist", "sitemap.xml");

    fs.writeFileSync(publicSitemap, xml, "utf-8");
    fs.writeFileSync(distSitemap, xml, "utf-8");

    console.log(`\nGenerated dynamic sitemap.xml with ${routes.length} URLs in public/ and dist/.`);
}

function generateAndSaveRobotsTxt() {
    const robotsContent = `# https://www.robotstxt.org/robotstxt.html\nUser-agent: *\nAllow: /\n\n# Private & Admin routes\nDisallow: /admin\nDisallow: /admin/\nDisallow: /login\nDisallow: /signup\n\n# Sitemap\nSitemap: ${SITE_URL}/sitemap.xml\n`;

    const publicRobots = path.join(frontendDir, "public", "robots.txt");
    const distRobots = path.join(frontendDir, "dist", "robots.txt");

    fs.writeFileSync(publicRobots, robotsContent, "utf-8");
    fs.writeFileSync(distRobots, robotsContent, "utf-8");

    console.log("Saved robots.txt to public/ and dist/.");
}

async function main() {
    try {
        console.log("====================================");
        console.log("4 Pillars Realty SEO Prerender");
        console.log("====================================");

        const routes = await getAllRoutes();
        removePreviousPrerenderedPages(routes);
        prepareSpaShell();

        if (process.env.PRERENDER_ENGINE === "puppeteer") {
            try {
                console.log("\nAttempting live Puppeteer crawl (PRERENDER_ENGINE=puppeteer)...");
                const puppeteer = (await import("puppeteer")).default;
                browser = await puppeteer.launch({
                    headless: true,
                    args: ["--no-sandbox", "--disable-setuid-sandbox"],
                });
                await startPreviewServer();
                for (const route of routes) {
                    await prerenderRoute(route);
                }
                if (homePrerenderResult) {
                    fs.writeFileSync(homePrerenderResult.outputFile, homePrerenderResult.html, "utf-8");
                    console.log(`Saved root HTML: ${homePrerenderResult.outputFile}`);
                }
            } catch (err) {
                console.warn("\nPuppeteer execution failed. Falling back to static prerender engine:", err.message);
                prerenderRoutesStatically(routes);
            }
        } else {
            // Default: High-Performance Static SEO Prerender Engine (100% Vercel, CI & local compatible)
            prerenderRoutesStatically(routes);
        }

        generateAndSaveSitemap(routes);
        generateAndSaveRobotsTxt();

        console.log("\n====================================");
        console.log("SEO PRERENDER COMPLETED SUCCESSFULLY");
        console.log(`Total routes: ${routes.length}`);
        console.log("====================================");

    } catch (error) {
        console.error("\nPRERENDER FAILED:");
        console.error(error);
        process.exitCode = 1;
    } finally {
        await cleanup();
    }
}

main();
