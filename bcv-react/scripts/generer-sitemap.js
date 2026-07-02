// Génère dist/sitemap.xml au build (branché en `postbuild`).
// Écart assumé vs la consigne "public/sitemap.xml" : le postbuild s'exécute APRÈS
// la copie public/ → dist/ par Vite ; écrire dans public/ ne toucherait pas le
// dist/ du build courant. On écrit donc directement dans dist/ (sortie déployée),
// régénéré à chaque déploiement — articles inclus.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { EQUIPES } from "../src/data/equipes.js";

const racine = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://basketclubverfeillois.fr";
const aujourdhui = new Date().toISOString().slice(0, 10);

// 1. Routes statiques connues
const routesStatiques = [
  "/", "/le-club", "/equipes", "/equipes/mini-basket", "/equipes/jeunes",
  "/equipes/seniors", "/planning", "/calendrier", "/actus", "/inscriptions", "/contact",
  "/mentions-legales",
];

// 2. Une entrée par fiche équipe présente dans les données
const routesEquipes = EQUIPES.map((e) => `/equipes/${e.slug}`);

// 3. Une entrée par article Markdown (slug = nom de fichier, lastmod = date frontmatter)
const dossierArticles = join(racine, "src/content/articles");
const routesArticles = readdirSync(dossierArticles)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const contenu = readFileSync(join(dossierArticles, f), "utf8");
    const m = /date:\s*"?(\d{4}-\d{2}-\d{2})/.exec(contenu);
    return { loc: `/actus/${f.replace(/\.md$/, "")}`, lastmod: m ? m[1] : aujourdhui };
  });

const urls = [
  ...routesStatiques.map((loc) => ({ loc, lastmod: aujourdhui })),
  ...routesEquipes.map((loc) => ({ loc, lastmod: aujourdhui })),
  ...routesArticles,
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url>\n    <loc>${SITE}${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`)
  .join("\n")}
</urlset>
`;

writeFileSync(join(racine, "dist/sitemap.xml"), xml, "utf8");
console.log(`sitemap.xml généré : ${urls.length} URLs (${routesStatiques.length} statiques + ${routesEquipes.length} équipes + ${routesArticles.length} articles)`);
