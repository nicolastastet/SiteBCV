// Constantes et helpers partagés par les pages et composants.
export const EASE = [0.16, 1, 0.3, 1];
export const LOGO = "/logo-bcv.png";
export const LOGO_BLANC = "/logo-bcv-blanc.png";

// Helper images de démonstration (Accueil uniquement). Les pages internes
// utilisent des placeholders `coquille` en attendant les vraies photos du club.
export const img = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
