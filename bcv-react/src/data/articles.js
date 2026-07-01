// Source des articles du blog : lecture DYNAMIQUE des fichiers Markdown de
// src/content/articles/*.md, chargés au build par Vite (import.meta.glob).
// Ajouter un article = déposer un .md dans src/content/articles/ (via Decap CMS
// ou à la main) — aucun code à modifier ici.
//
// Frontmatter parsé par un petit parseur maison (format simple `clé: "valeur"`).
// Choix délibéré de NE PAS utiliser gray-matter : cette lib embarque `eval`,
// incompatible avec la CSP stricte `script-src 'self'` du site public. Le format
// étant uniforme et simple, un parseur dédié est sûr, sans dépendance, CSP-clean.

const fichiers = import.meta.glob("/src/content/articles/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Sépare le frontmatter (--- ... ---) du corps Markdown et parse les paires clé: "valeur".
function parseFrontmatter(brut) {
  const m = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/.exec(brut);
  if (!m) return { data: {}, body: brut.trim() };
  const data = {};
  for (const ligne of m[1].split("\n")) {
    const paire = /^(\w+):\s*(.*)$/.exec(ligne.trim());
    if (!paire) continue;
    let val = paire[2].trim();
    if (val.startsWith('"') && val.endsWith('"') && val.length >= 2) {
      val = val.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    }
    data[paire[1]] = val;
  }
  return { data, body: m[2].trim() };
}

// Retire les marqueurs Markdown d'emphase pour un extrait propre en carte.
function texteBrut(s) {
  return (s || "").replace(/[*_`#>]/g, "").replace(/\s+/g, " ").trim();
}

export const articles = Object.entries(fichiers)
  .map(([chemin, brut]) => {
    const slug = chemin.split("/").pop().replace(/\.md$/, "");
    const { data, body } = parseFrontmatter(brut);
    return {
      slug,
      titre: data.titre || slug,
      categorie: data.categorie || "recits",
      date: data.date || "",
      image: data.image || "",
      extrait: texteBrut(data.extrait),
      body,
    };
  })
  // Tri par date décroissante (dates ISO AAAA-MM-JJ → tri lexicographique = chronologique).
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export const getArticle = (slug) => articles.find((a) => a.slug === slug);
