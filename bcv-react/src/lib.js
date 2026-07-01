// Constantes et helpers partagés par les pages et composants.
export const EASE = [0.16, 1, 0.3, 1];
export const LOGO = "/logo-bcv.png";
export const LOGO_BLANC = "/logo-bcv-blanc.png";

// Helper images de démonstration (Accueil uniquement). Les pages internes
// utilisent des placeholders `coquille` en attendant les vraies photos du club.
export const img = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

// Formate une date ISO (AAAA-MM-JJ) en français : "28 juin 2026".
export const formatDateFr = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

// Catégories d'articles : libellé + style de badge (charte rouge/vert/neutre).
export const CATEGORIES = {
  recits: { label: "Récits du week-end", badge: "bg-rouge text-white", radio: "f-recits" },
  "vie-club": { label: "Vie du club", badge: "bg-vert text-white", radio: "f-vie" },
  galerie: { label: "Galerie Photos", badge: "bg-neutral-200 text-neutral-700", radio: "f-galerie" },
};
