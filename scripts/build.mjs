// Build / dev script. Usage: node scripts/build.mjs [--dev] [--check]
import * as esbuild from "esbuild";
import { readFile, writeFile, mkdir, cp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { site } from "../src/config/site.js";
import { projects } from "../src/data/projects.js";

const dev = process.argv.includes("--dev");
const check = process.argv.includes("--check");
const out = "dist";
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// ── Content sanity checks (fail loudly on leftover placeholders) ──
function runChecks() {
  const problems = [];
  const walk = (v, path) => {
    if (typeof v === "string" && /\[[A-Z][A-Z /]+\]/.test(v)) problems.push(`${path}: placeholder "${v}"`);
    else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) walk(x, `${path}.${k}`);
  };
  walk(site, "site"); walk(projects, "projects");
  const ids = new Set();
  for (const p of projects) {
    if (ids.has(p.id)) problems.push(`duplicate project id ${p.id}`);
    ids.add(p.id);
    for (const k of [p.coverImage, ...(p.gallery || [])])
      if (k && k.startsWith("/") && !existsSync(`public${k}`)) problems.push(`${p.id}: missing asset public${k}`);
    for (const u of [p.liveUrl, p.sourceUrl, p.videoUrl]) if (u && !/^https:\/\//.test(u)) problems.push(`${p.id}: non-https url ${u}`);
  }
  if (!site.contact.email && !site.contact.github && !site.contact.linkedin) problems.push("no contact method configured");
  if (site.identity.portrait && !existsSync(`public${site.identity.portrait}`)) problems.push("portrait file missing");
  if (site.identity.resume && site.identity.resume.startsWith("/") && !existsSync(`public${site.identity.resume}`)) problems.push("resume file missing");
  if (!site.websiteUrl) console.warn("⚠ websiteUrl is empty — canonical & og:url will be omitted until you set your domain.");
  return problems;
}

async function writeHtml() {
  const id = site.identity, a = site.appearance;
  const title = `${id.fullName} | ${id.profession}`;
  const desc = id.intro.split(". ")[0].replace(/\.$/, "") + ".";
  const url = site.websiteUrl.replace(/\/?$/, "/");
  const sameAs = [site.contact.github, site.contact.linkedin, site.contact.instagram, site.contact.youtube].filter(Boolean);
  const ld = { "@context": "https://schema.org", "@type": "Person", name: id.fullName, jobTitle: id.profession,
    ...(site.websiteUrl && { url }), ...(sameAs.length && { sameAs }) };
  let html = await readFile("index.html", "utf8");
  const map = {
    LANG: { English: "en", Hindi: "hi", Indonesian: "id" }[a.language] || "en",
    TITLE: esc(title), DESCRIPTION: esc(desc), BG: a.background,
    CANONICAL: site.websiteUrl ? `<link rel="canonical" href="${esc(url)}" />` : "",
    OG_URL: site.websiteUrl ? `<meta property="og:url" content="${esc(url)}" />` : "",
    JSONLD: `<script type="application/ld+json">${JSON.stringify(ld)}</script>`,
    NOSCRIPT_CONTACT: site.contact.email ? `Email: <a style="color:inherit" href="mailto:${esc(site.contact.email)}">${esc(site.contact.email)}</a>` : "",
  };
  html = html.replace(/%([A-Z_]+)%/g, (m, k) => (k in map ? map[k] : m));
  await writeFile(`${out}/index.html`, html);
  const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${a.accent}"/><text x="32" y="43" text-anchor="middle" font-family="Impact,Arial Narrow,sans-serif" font-size="30" fill="#fff">${esc(id.initials)}</text></svg>`;
  await writeFile(`${out}/favicon.svg`, fav);
}

const problems = runChecks();
if (problems.length) { console.error("✖ Content check failed:\n  " + problems.join("\n  ")); process.exit(1); }
if (check) { console.log("✔ Content check passed"); }

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
if (existsSync("public")) await cp("public", out, { recursive: true });
await writeHtml();

const opts = {
  entryPoints: { main: "src/main.jsx" }, bundle: true, outdir: out, format: "esm",
  jsx: "automatic", loader: { ".js": "jsx", ".webp": "file", ".png": "file", ".jpg": "file", ".svg": "file", ".woff": "file", ".woff2": "file" },
  assetNames: "assets/[name]-[hash]",
  minify: !dev, sourcemap: dev, target: ["es2020"],
  define: { "process.env.NODE_ENV": JSON.stringify(dev ? "development" : "production") },
  logLevel: "info",
};

if (dev) {
  const ctx = await esbuild.context(opts);
  await ctx.watch();
  const { port } = await ctx.serve({ servedir: out, port: 5173 });
  console.log(`\n  Dev server → http://localhost:${port}\n`);
} else {
  await esbuild.build(opts);
  console.log(`✔ Built to ./${out}`);
}
