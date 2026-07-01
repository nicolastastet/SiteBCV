// Cloudflare Pages Function — aperçus de partage (Open Graph) fiables pour les articles.
// Route : /actus/:slug (routing par fichier, comme functions/api/auth.js & callback.js).
// Les robots sociaux (Facebook, WhatsApp, etc.) n'exécutent pas le JS : ils ne verraient
// que le HTML brut identique de la SPA. Ici, on détecte le robot par User-Agent et on lui
// renvoie un HTML minimal avec les bonnes balises OG (lues depuis /og-data/[slug].json,
// généré au build). Les humains sont laissés passer vers le site React normal.
const BOT_USER_AGENTS = [
  "facebookexternalhit", "Facebot", "Twitterbot", "LinkedInBot",
  "WhatsApp", "TelegramBot", "Slackbot", "Discordbot",
];

// Échappe le contenu injecté dans les attributs HTML (évite casse et injection).
function echapper(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function onRequest({ request, params, next }) {
  const ua = request.headers.get("user-agent") || "";
  const estUnRobot = BOT_USER_AGENTS.some((bot) => ua.includes(bot));

  // Visiteur humain : laisse passer vers le site React (SPA) normal.
  if (!estUnRobot) return next();

  const slug = params.slug;

  // Validation d'entrée : le slug ne doit contenir que minuscules, chiffres et tirets
  // (mêmes slugs que les fichiers .md). Bloque toute injection dans l'URL fetch ci-dessous.
  if (!/^[a-z0-9-]+$/.test(slug || "")) return next();

  const url = new URL(request.url);

  try {
    const res = await fetch(`${url.origin}/og-data/${slug}.json`);
    if (!res.ok) return next();
    const data = await res.json();

    const titre = echapper(data.titre);
    const description = echapper(data.extrait);
    const image = echapper(`${url.origin}${data.image}`);
    const pageUrl = echapper(`${url.origin}/actus/${slug}`);

    const html = `<!doctype html><html lang="fr"><head>
<meta charset="utf-8">
<title>${titre} — Basket Club Verfeillois</title>
<meta property="og:type" content="article">
<meta property="og:site_name" content="Basket Club Verfeillois">
<meta property="og:title" content="${titre}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">
<meta property="og:url" content="${pageUrl}">
<meta name="twitter:card" content="summary_large_image">
</head><body></body></html>`;

    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  } catch {
    return next();
  }
}
