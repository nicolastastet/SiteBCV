import { defineConfig } from "vite";

// Build séparé du bundle Decap CMS (auto-hébergé, jamais via CDN).
// Lancé APRÈS le build principal (`vite build && vite build --config vite.admin.config.js`).
// Le build principal a déjà copié public/redaction/index.html + config.yml dans dist/redaction/ ;
// ici on ajoute uniquement dist/redaction/decap-cms.js (emptyOutDir: false → on n'efface rien).
export default defineConfig({
  define: { "process.env.NODE_ENV": '"production"' },
  // Ne pas recopier public/ ici : le build principal l'a déjà fait. Sinon Vite
  // dupliquerait tout le site dans dist/redaction/.
  publicDir: false,
  build: {
    outDir: "dist/redaction",
    emptyOutDir: false,
    // Un seul fichier ES chargé par <script src="/redaction/decap-cms.js" type="module">.
    lib: {
      entry: "src/admin-entry.js",
      formats: ["es"],
      fileName: () => "decap-cms.js",
    },
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
});
