# BCV — Dossier de passation pour Claude.ai

> À uploader dans un **Projet Claude.ai** (bouton « Ajouter du contenu » → fichiers).
> Ce document résume tout l'état du projet au 30 juin 2026. Les autres fichiers du dossier sont les sources.

---

## 1. Le projet en une phrase
Site officiel du **Basket Club Verfeillois (BCV)** — Verfeil, 31590, Haute-Garonne. Association loi 1901. Cible : licenciés et **surtout parents de licenciés**, consultation **majoritairement mobile**. Conversion macro unique : **inscription / renouvellement de licence** (CTA « S'inscrire » toujours visible).

## 2. Règles non négociables (charte du club)
- Palette **rouge / vert / blanc uniquement**. Le blanc domine (~70 %), le rouge porte l'action, le vert est l'accent « signature ».
- **Jamais de noir en aplat** : l'encre `#161616` sert uniquement au texte.
- **Jamais coller un aplat rouge vif et un vert vif côte à côte** (effet « Noël ») : les séparer par du blanc.
- Typo : **Oswald** (titres, capitales, condensé) + **Inter** (texte). Deux polices, jamais plus.
- Espacements toujours multiples de **8**.
- Voir `CLAUDE.md` pour le détail complet (couleurs hex, composants, accessibilité, OWASP).

## 3. Les deux directions produites (IMPORTANT)
Il existe **deux versions** du site, pour deux usages différents :

### A. Version PRODUCTION — HTML/CSS pur, zéro JS (la vraie cible)
- Fichiers : `index.html` + `style.css` (version d'origine), et une **refonte** `index-refonte.html` + `style-refonte.css`.
- Contraintes de sécurité STRICTES (ADR-003/004) : **aucun JavaScript**, CSP `script-src 'none'`, aucune dépendance tierce/CDN, polices auto-hébergées en prod, formulaire durci (honeypot + validation serveur à brancher).
- La refonte CSS applique une « taste » plus moderne (hero retravaillé, bento, scroll-snap équipes, actus éditorial, reveals en `animation-timeline` CSS natif) **tout en respectant la contrainte zéro-JS**.
- C'est **cette version qui doit partir en production**. Détails sécurité : `README-securite.md`.

### B. Version MAQUETTE — React / Tailwind / Motion (uniquement « pour voir le rendu »)
- Dossier : `bcv-react/` (Vite + React 18 + Tailwind v4 + Motion + Tabler Icons).
- Demandée par le client pour visualiser un rendu **dynamique / sportif / professionnel**.
- ⚠️ **Ne respecte PAS** les contraintes de sécurité (elle utilise du JS, des libs, Google Fonts CDN). À considérer comme **prototype visuel**, pas comme livrable de prod.
- Sert de référence de direction artistique pour reporter les bonnes idées dans la version CSS pur si validées.

## 4. Le logo
- Fourni en `Verfeil signature rouge.pdf.svg` = un **PNG raster emballé dans un SVG** (1.4 Mo) → rendu mou, transparence mal compos.
- C'est un **écusson rond** : anneau vert « BASKET CLUB VERFEIL » + étoiles + « 19 23 », centre rouge « BCV » avec ballon, liseré blanc interne.
- Versions web propres produites : `logo-bcv.png` (transparent, 640px) et `logo-bcv-blanc.png` (silhouette blanche pour fonds sombres).
- **À demander au client** : le logo en **vrai SVG vectoriel** (.ai/.eps/.svg natif) ou PNG/WebP transparent @2x, pour une netteté parfaite et un poids minimal.

## 5. Contenus encore manquants
- **Photos réelles** du club (hero, entraînements, catégories, actus) — actuellement placeholders. À intégrer en `<img>` avec `alt`, + consentement parental RGPD pour les mineurs avant mise en ligne.
- Logos partenaires réels, chiffres réels, textes définitifs.
- Pages à décliner (P1) : Le Club, Équipes, Planning, Inscriptions, Contact, + Mentions légales / RGPD.
- Backend formulaire newsletter (validation serveur, CSRF, rate-limiting) ou service de formulaire hébergé en UE.

## 6. Structure de la page d'accueil (ordre des sections)
1. En-tête sticky + CTA « S'inscrire »
2. Hero rouge (titre bicolore, « à Verfeil » en vert vif, photo en diagonale)
3. Bandeau chiffres (chiffres rouges, filets verts)
4. Accès rapides (bento dans la refonte)
5. Le club en bref
6. Équipes / catégories
7. Dernières actualités
8. Bandeau Inscriptions (vert, placé loin du hero)
9. Partenaires
10. Newsletter
11. Pied de page clair (liseré rouge)

## 7. Inventaire des fichiers de ce dossier
```
00-PASSATION-claude-ia.md   ← ce document
CLAUDE.md                   ← contexte complet + charte + ADR (source de vérité)
README-securite.md          ← sécurité OWASP + checklist déploiement
index.html / style.css      ← site d'origine (HTML/CSS pur)
index-refonte.html / style-refonte.css  ← refonte CSS pur (taste-skill)
logo/                       ← logo original + versions web détourées
bcv-react/                  ← maquette React (prototype visuel, sans node_modules)
```

## 8. Comment relancer la maquette React (si besoin)
```
cd bcv-react
npm install
npm run dev      # http://localhost:5601
```

## 9. Prochaines étapes suggérées
1. Valider la direction visuelle (CSS refonte vs maquette React).
2. Récupérer logo vectoriel + photos réelles + consentements RGPD.
3. Finaliser la version PRODUCTION en CSS pur (reporter les bonnes idées de la maquette).
4. Décliner les pages P1 dans le même style.
5. Brancher le formulaire (backend ou service UE) + page Mentions légales / RGPD.
6. Déployer (HTTPS, en-têtes), vérifier sur securityheaders.com (objectif A/A+).
