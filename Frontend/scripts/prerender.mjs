import jsBeautify from "js-beautify";

import puppeteer from "puppeteer";
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
const API_BASE = (env.VITE_API_URL || "").replace(/\/$/, "");

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

const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

function expectedCanonical(route) {
    const cleanRoute = route.replace(/\/+$/, "");

    return cleanRoute === ""
        ? `${SITE_URL}/`
        : `${SITE_URL}${cleanRoute}`;
}

/**
 * Wait until Vite preview server starts.
 */
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
            // Server is still starting.
        }

        await sleep(1000);
    }

    throw new Error(
        "Vite preview server did not start in time."
    );
}

/**
 * Fetch project routes from backend API.
 */
async function getProjectRoutes() {
    if (!API_BASE) {
        throw new Error(
            "VITE_API_URL is missing. Check .env.production."
        );
    }

    const apiUrl = `${API_BASE}/projects`;

    console.log("\nFetching project routes:", apiUrl);

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error(
            `Projects API failed: ${response.status}`
        );
    }

    const result = await response.json();

    if (!result.success || !Array.isArray(result.data)) {
        throw new Error(
            "Invalid projects API response."
        );
    }

    const routes = result.data
        .map((project) => project.slug)
        .filter(Boolean)
        .map((slug) => {
            const cleanSlug = String(slug)
                .replace(/^\/+|\/+$/g, "");

            return cleanSlug ? `/${cleanSlug}` : null;
        })
        .filter(Boolean);

    const nonRootRoutes = routes.filter((r) => r !== "/");
    const orderedRoutes = routes.includes("/") ? [...nonRootRoutes, "/"] : nonRootRoutes;
    return orderedRoutes;
}

/**
 * Get all static and dynamic project routes.
 */
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

/**
 * IMPORTANT:
 * Remove old prerendered HTML before starting preview.
 *
 * This prevents Vite preview from serving old
 * project HTML instead of the fresh React application.
 *
 * Do not delete dist/index.html because it is the
 * fresh Vite application entry point.
 */
function removePreviousPrerenderedPages(routes) {
    console.log(
        "\nRemoving previous prerendered HTML..."
    );

    for (const route of routes) {
        if (route === "/") continue;

        const cleanName = route.replace(/^\/+|\/+$/g, "");
        const outputDirectory = path.join(
            frontendDir,
            "dist",
            cleanName
        );
        const flatHtmlFile = path.join(
            frontendDir,
            "dist",
            `${cleanName}.html`
        );

        if (fs.existsSync(outputDirectory)) {
            fs.rmSync(outputDirectory, {
                recursive: true,
                force: true,
            });

            console.log(
                `Removed: ${outputDirectory}`
            );
        }

        if (fs.existsSync(flatHtmlFile)) {
            fs.unlinkSync(flatHtmlFile);
            console.log(
                `Removed: ${flatHtmlFile}`
            );
        }
    }

    console.log(
        "Previous prerendered pages removed."
    );
}

/**
 * Prepare pristine SPA shell to prevent serving prerendered HTML
 * of previously generated pages to subsequent routes during preview.
 */
function prepareSpaShell() {
    if (!fs.existsSync(distIndexFile)) {
        throw new Error(
            `dist/index.html not found: ${distIndexFile}. Run vite build first.`
        );
    }

    const currentHtml = fs.readFileSync(distIndexFile, "utf-8");
    const isPrerendered =
        currentHtml.includes('name="prerender-status"') ||
        currentHtml.includes("data-rh-managed") ||
        currentHtml.includes("<title>");

    if (!isPrerendered) {
        fs.writeFileSync(spaShellFile, currentHtml, "utf-8");
    } else if (fs.existsSync(spaShellFile)) {
        console.log(
            "Restoring pristine SPA shell from _spa_shell.html before preview..."
        );
        fs.copyFileSync(spaShellFile, distIndexFile);
    }
}

/**
 * Start Vite preview server.
 */
async function startPreviewServer() {
    console.log(
        "\nStarting Vite preview server..."
    );

    const viteCli = path.join(
        frontendDir,
        "node_modules",
        "vite",
        "bin",
        "vite.js"
    );

    if (!fs.existsSync(viteCli)) {
        throw new Error(
            `Vite CLI not found: ${viteCli}`
        );
    }

    previewProcess = spawn(
        process.execPath,
        [
            viteCli,
            "preview",
            "--host",
            "127.0.0.1",
            "--port",
            "4173",
            "--strictPort",
        ],
        {
            cwd: frontendDir,
            stdio: "inherit",
            env: process.env,
        }
    );

    previewProcess.on("error", (error) => {
        console.error(
            "Preview server error:",
            error
        );
    });

    await waitForPreview(PREVIEW_URL);
}

/**
 * Collect metadata from rendered HTML.
 */
async function collectMetadata(page) {
    return page.evaluate(() => {
        const titles = Array.from(
            document.head.querySelectorAll("title")
        );

        const descriptions = Array.from(
            document.head.querySelectorAll(
                'meta[name="description"]'
            )
        );

        const canonicals = Array.from(
            document.head.querySelectorAll(
                'link[rel="canonical"]'
            )
        );

        const ogUrls = Array.from(
            document.head.querySelectorAll(
                'meta[property="og:url"]'
            )
        );

        const titleElements = titles.map(
            (item) => item.outerHTML
        );

        const descriptionElements = descriptions.map(
            (item) => item.outerHTML
        );

        console.log(
            "ALL TITLE ELEMENTS:",
            titleElements
        );

        console.log(
            "ALL DESCRIPTION ELEMENTS:",
            descriptionElements
        );

        return {
            title: document.title,

            titleCount: titles.length,

            titleElements,

            description:
                descriptions[0]?.content || "",

            descriptionCount: descriptions.length,

            descriptionElements,

            canonical:
                canonicals[0]?.href || "",

            canonicalCount: canonicals.length,

            canonicals: canonicals.map(
                (item) => item.href
            ),

            keywords:
                document.querySelector(
                    'meta[name="keywords"]'
                )?.content || "",

            robots:
                document.querySelector(
                    'meta[name="robots"]'
                )?.content || "",

            ogUrl:
                ogUrls[0]?.content || "",

            ogUrlCount: ogUrls.length,

            prerenderStatus:
                document.querySelector(
                    'meta[name="prerender-status"]'
                )?.content || "",

            rootText:
                document.querySelector("#root")
                    ?.innerText?.trim() || "",
        };
    });
}

/**
 * Validate SEO metadata.
 */
function validateMetadata(metadata, route) {
    const expectedUrl = expectedCanonical(route);

    console.log(
        `\nSEO Metadata for ${route}:`
    );

    console.log({
        title: metadata.title,
        description: metadata.description,
        keywords: metadata.keywords,
        canonical: metadata.canonical,
        robots: metadata.robots,
    });

    // Check title.
    if (metadata.titleCount !== 1) {
        throw new Error(
            `Expected exactly 1 title, found ${metadata.titleCount}: ${route}\n` +
            `Found titles: ${JSON.stringify(metadata.titleElements)}`
        );
    }

    if (!metadata.title?.trim()) {
        throw new Error(
            `Missing title: ${route}`
        );
    }

    // Check description.
    if (metadata.descriptionCount !== 1) {
        throw new Error(
            `Expected exactly 1 description, found ${metadata.descriptionCount}: ${route}\n` +
            `Found descriptions: ${JSON.stringify(metadata.descriptionElements)}`
        );
    }

    if (!metadata.description?.trim()) {
        throw new Error(
            `Missing description: ${route}`
        );
    }

    // Check canonical.
    if (metadata.canonicalCount !== 1) {
        throw new Error(
            `Expected exactly 1 canonical, found ${metadata.canonicalCount}: ${route}`
        );
    }

    if (metadata.canonical !== expectedUrl) {
        throw new Error(
            `Incorrect canonical for ${route}.\n` +
            `Expected: ${expectedUrl}\n` +
            `Received: ${metadata.canonical}`
        );
    }

    // Check robots.
    if (
        metadata.robots
            .toLowerCase()
            .includes("noindex")
    ) {
        throw new Error(
            `Page is marked noindex: ${route}`
        );
    }

    // Check Open Graph URL.
    if (metadata.ogUrlCount !== 1) {
        throw new Error(
            `Expected exactly 1 og:url, found ${metadata.ogUrlCount}: ${route}`
        );
    }

    if (metadata.ogUrl !== expectedUrl) {
        throw new Error(
            `og:url does not match canonical: ${route}`
        );
    }

    // Check prerender status.
    if (metadata.prerenderStatus !== "ready") {
        throw new Error(
            `Prerender status is not ready: ${route}`
        );
    }

    // Check actual rendered page content.
    if (!metadata.rootText) {
        throw new Error(
            `Rendered page content is empty: ${route}`
        );
    }
}

/**
 * Prerender an individual route.
 */
async function prerenderRoute(route) {
    const page = await browser.newPage();

    try {
        const url = `${PREVIEW_URL}${route}`;

        console.log(
            "\n-----------------------------------"
        );

        console.log(
            `Prerendering: ${route}`
        );

        console.log(
            `URL: ${url}`
        );

        const browserErrors = [];

        page.on("console", (message) => {
            if (message.type() === "error") {
                browserErrors.push(message.text());
            }
        });

        page.on("pageerror", (error) => {
            browserErrors.push(error.message);
        });

        const response = await page.goto(url, {
            waitUntil: "networkidle2",
            timeout: 90000,
        });

        if (!response || !response.ok()) {
            throw new Error(
                `Page returned an invalid response: ${route}`
            );
        }

        // Wait until RouteSEO reports ready.
        await page.waitForFunction(
            () => {
                const status = document.querySelector(
                    'meta[name="prerender-status"]'
                );

                return (
                    status?.getAttribute("content") ===
                    "ready"
                );
            },
            {
                timeout: 90000,
            }
        );

        // Allow Helmet updates to complete.
        await sleep(700);

        // Collect actual metadata.
        const metadata = await collectMetadata(page);

        // Validate without modifying the HTML.
        validateMetadata(metadata, route);

        if (browserErrors.length > 0) {
            console.warn(
                "Browser console errors:",
                browserErrors
            );
        }

        // Save generated HTML.
        const html = await page.content();

        const outputDirectory =
            route === "/"
                ? path.join(frontendDir, "dist")
                : path.join(
                    frontendDir,
                    "dist",
                    route.replace(/^\/+|\/+$/g, "")
                );

        fs.mkdirSync(outputDirectory, {
            recursive: true,
        });

        const outputFile = path.join(
            outputDirectory,
            "index.html"
        );

        const formattedHtml = formatHtml(html);

        if (route === "/") {
            homePrerenderResult = { outputFile, html: formattedHtml };
            console.log(
                `Prerendered root / (write to ${outputFile} deferred until all routes finish).`
            );
        } else {
            fs.writeFileSync(
                outputFile,
                formattedHtml,
                "utf-8"
            );

            const cleanName = route.replace(/^\/+|\/+$/g, "");
            const flatOutputFile = path.join(
                frontendDir,
                "dist",
                `${cleanName}.html`
            );

            fs.writeFileSync(
                flatOutputFile,
                formattedHtml,
                "utf-8"
            );

            // Also support /project alias if route is /projects
            if (route === "/projects") {
                const projectAliasDir = path.join(frontendDir, "dist", "project");
                fs.mkdirSync(projectAliasDir, { recursive: true });
                fs.writeFileSync(path.join(projectAliasDir, "index.html"), formattedHtml, "utf-8");
                fs.writeFileSync(path.join(frontendDir, "dist", "project.html"), formattedHtml, "utf-8");
            }

            console.log(
                `Saved formatted HTML: ${outputFile} and ${flatOutputFile}`
            );
        }

        console.log(
            `Completed: ${route}`
        );

    } finally {
        await page.close();
    }
}

/**
 * Close browser and preview server.
 */
async function cleanup() {
    if (browser) {
        await browser.close().catch(() => { });
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


/**
 * Generate and save dynamic sitemap.xml.
 */
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

            return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
        })
        .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>
`;

    const publicSitemap = path.join(frontendDir, "public", "sitemap.xml");
    const distSitemap = path.join(frontendDir, "dist", "sitemap.xml");

    fs.writeFileSync(publicSitemap, xml, "utf-8");
    fs.writeFileSync(distSitemap, xml, "utf-8");

    console.log(`\nGenerated dynamic sitemap.xml with ${routes.length} URLs in public/ and dist/.`);
}

/**
 * Generate and save robots.txt.
 */
function generateAndSaveRobotsTxt() {
    const robotsContent = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Private & Admin routes
Disallow: /admin
Disallow: /admin/
Disallow: /login
Disallow: /signup

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml
`;

    const publicRobots = path.join(frontendDir, "public", "robots.txt");
    const distRobots = path.join(frontendDir, "dist", "robots.txt");

    fs.writeFileSync(publicRobots, robotsContent, "utf-8");
    fs.writeFileSync(distRobots, robotsContent, "utf-8");

    console.log("Saved robots.txt to public/ and dist/.");
}

/**
 * Main execution.
 */
async function main() {
    try {
        console.log(
            "===================================="
        );

        console.log(
            "4 Pillars Realty SEO Prerender"
        );

        console.log(
            "===================================="
        );

        // 1. Collect all routes.
        const routes = await getAllRoutes();

        // 2. Remove old prerendered HTML.
        removePreviousPrerenderedPages(routes);

        // 3. Ensure pristine SPA shell before preview.
        prepareSpaShell();

        // 4. Start fresh Vite preview.
        await startPreviewServer();

        // 4. Launch Puppeteer.
        browser = await puppeteer.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
            ],
        });

        // 5. Prerender every route.
        for (const route of routes) {
            await prerenderRoute(route);
        }

        // 6. Write root index.html now that all other routes finished prerendering.
        if (homePrerenderResult) {
            fs.writeFileSync(
                homePrerenderResult.outputFile,
                homePrerenderResult.html,
                "utf-8"
            );
            console.log(
                `Saved root HTML: ${homePrerenderResult.outputFile}`
            );
        }

        // 7. Generate and save sitemap.xml & robots.txt
        generateAndSaveSitemap(routes);
        generateAndSaveRobotsTxt();

        console.log(
            "\n===================================="
        );

        console.log(
            "SEO PRERENDER COMPLETED SUCCESSFULLY"
        );

        console.log(
            `Total routes: ${routes.length}`
        );

        console.log(
            "===================================="
        );

    } catch (error) {
        console.error(
            "\nPRERENDER FAILED:"
        );

        console.error(error);

        process.exitCode = 1;

    } finally {
        await cleanup();
    }
}

main();
