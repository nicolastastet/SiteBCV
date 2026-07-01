// Génère une fiche OG par article dans dist/og-data/[slug].json (branché en postbuild).
// Lue au runtime par la Cloudflare Function functions/actus/[slug].js pour servir
// des balises Open Graph correctes aux robots sociaux (qui n'exécutent pas le JS).
// Écrit dans dist/ (même raison que le sitemap : postbuild après la copie public→dist).
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const racine = join(dirname(fileURLToPath(import.meta.url)), "..");
const dossierArticles = join(racine, "src/content/articles");
const sortie = join(racine, "dist/og-data");
mkdirSync(sortie, { recursive: true });

// Parse le frontmatter (clé: "valeur") — même format simple que le loader d'articles.
function frontmatter(contenu) {
  const data = {};
  const m = /^---\s*\n([\s\S]*?)\n---/.exec(contenu);
  if (!m) return data;
  for (const ligne of m[1].split("\n")) {
    const p = /^(\w+):\s*(.*)$/.exec(ligne.trim());
    if (!p) continue;
    let v = p[2].trim();
    if (v.startsWith('"') && v.endsWith('"') && v.length >= 2) {
      v = v.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    }
    data[p[1]] = v;
  }
  return data;
}

// Retire les marqueurs Markdown d'emphase pour un extrait propre en aperçu.
const texteBrut = (s) => (s || "").replace(/[*_`#>]/g, "").replace(/\s+/g, " ").trim();

const fichiers = readdirSync(dossierArticles).filter((f) => f.endsWith(".md"));
for (const f of fichiers) {
  const slug = f.replace(/\.md$/, "");
  const data = frontmatter(readFileSync(join(dossierArticles, f), "utf8"));
  writeFileSync(
    join(sortie, `${slug}.json`),
    JSON.stringify({
      titre: data.titre || "",
      extrait: texteBrut(data.extrait).slice(0, 200),
      image: data.image || "",
      date: data.date || "",
    }),
    "utf8"
  );
}
console.log(`og-data : ${fichiers.length} fiches JSON générées`);
