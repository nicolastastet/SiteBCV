import { Helmet } from "react-helmet-async";

export const SITE_NAME = "Basket Club Verfeillois";
export const SITE_URL = "https://basketclubverfeillois.fr"; // à ajuster si le domaine change

// Gère le <head> par page (titre, description, canonical, Open Graph, Twitter,
// et un bloc JSON-LD optionnel). react-helmet-async = pas de style injecté, pas
// d'eval → compatible CSP 'self'. Le JSON-LD est un <script type=application/ld+json>
// (bloc de DONNÉES, non exécuté → non concerné par script-src).
export default function Seo({ titre, description, chemin, image, type = "website", jsonLd }) {
  const titreComplet = `${titre} — ${SITE_NAME}`;
  const url = `${SITE_URL}${chemin}`;
  const imageUrl = `${SITE_URL}${image || "/hero-equipe.jpg"}`;

  return (
    <Helmet>
      <title>{titreComplet}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={titreComplet} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={titreComplet} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
