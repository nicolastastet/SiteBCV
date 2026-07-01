// Point d'entrée du bundle Decap CMS, auto-hébergé (jamais via CDN).
// Bundlé séparément par vite.admin.config.js vers dist/redaction/decap-cms.js.
// Decap lit sa configuration depuis /redaction/config.yml.
import CMS from "decap-cms-app";

CMS.init();
