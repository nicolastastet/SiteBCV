# CLAUDE.md — Projet Site Web Basket Club Verfeillois (BCV)

> Fichier de contexte racine du projet pour Claude Code.
> À placer à la racine du dépôt `SiteBCV`. Lire entièrement avant toute modification.
> Notion reste la source de vérité côté pilotage projet — ce fichier en est la version distillée et auto-suffisante pour le code.
>
> ⚠️ **Mise à jour du 30/06/2026** : ce fichier remplace une version précédente écrite pour une stack 100 % HTML/CSS statique sans JS. Le projet a basculé vers **React + Vite**, décision du porteur de projet (motif : esthétique/maintenabilité). Voir §3 et §7 pour le nouveau modèle de sécurité (ADR-005, qui remplace ADR-001/003/004).
>
> ℹ️ Ce fichier a été rédigé à partir de la documentation Notion du projet **et d'une lecture partielle du dépôt** (page d'accueil GitHub du repo consultée le 30/06/2026 ; le détail du contenu de `bcv-react/` n'a pas pu être lu — accès bloqué par les règles d'exploration du site pour la navigation de dossiers). Confirmé à cette date : le repo `nicolastastet/SiteBCV` est public, et sa racine contient `bcv-react/` (le projet React/Vite), `docs/`, `logo/`, ainsi que l'ancienne stack statique encore présente telle quelle à la racine (`index.html`, `style.css`, `index-refonte.html`, `style-refonte.css` — pas dans un sous-dossier dédié). Le `README.md` du repo est minimal à ce stade. Aucun `CLAUDE.md`, `_headers` ni `README-securite.md` n'étaient visibles à la racine au moment de cette lecture. Si l'état réel diverge de ce qui suit, l'état réel du repo prévaut — merci de signaler les écarts.

---

## ⛔ RÈGLES NON NÉGOCIABLES (toutes pages, tout le projet)

### Sécurité (site public, audience incluant des mineurs) — modèle React/Vite (ADR-005)
1. **CSP stricte sans `unsafe-inline` ni `unsafe-eval` en production.** Build Vite statique (pas de SSR) → le bundle de prod ne contient pas de JS inline (fichiers `.js` externes avec content-hash), ce qui permet `script-src 'self'` strict. Ne jamais introduire de pattern qui force du JS inline (pas de `dangerouslySetInnerHTML` avec du contenu non maîtrisé, pas de script injecté dynamiquement).
2. **`object-src 'none'`, `frame-ancestors 'none'`, `base-uri 'self'`** systématiques, en en-tête HTTP (config Cloudflare Pages), pas seulement en balise `<meta>`.
3. **Pas de lib UI faisant du CSS-in-JS runtime** (styled-components, emotion, etc.) sans validation explicite — elles injectent du style inline et cassent `style-src` strict. Préférer Tailwind, CSS Modules, ou du CSS classique. Si une lib CSS-in-JS est vraiment nécessaire, le signaler et prévoir un `style-src` avec hash/nonce dédié — ne jamais basculer tout le site sur `unsafe-inline` pour une seule lib.
4. **`npm audit` à chaque build** (intégré au pipeline Cloudflare Pages — échec de build si vulnérabilité haute/critique). **Dependabot ou Renovate activé** sur le repo pour les CVE de dépendances.
5. **Polices auto-hébergées** en production (`/public/fonts/*.woff2` ou équivalent Vite). Ne jamais charger Google Fonts en prod (fuite IP = RGPD, dépendance tierce).
6. **Secrets Decap CMS** (OAuth GitHub pour l'édition du blog) **jamais committés** — toujours en variables d'environnement Cloudflare Pages.
7. **Formulaire newsletter via Formspree** (service externe hébergé UE) : pas de backend maison à coder. Vérifier que la protection anti-spam native de Formspree est activée. Toujours ajouter un consentement RGPD explicite dans le formulaire.
8. **Liens externes** : toujours `rel="noopener noreferrer"`.
9. **RGPD / mineurs** : aucune page de collecte (formulaire, photo, témoignage) ne part en prod sans le consentement adapté. Mentions légales + politique de confidentialité obligatoires avant mise en ligne publique.
10. **Avant toute mise en ligne** : vérifier la CSP sur Google CSP Evaluator et le site sur securityheaders.com (objectif note A/A+).

### Code couleur (imposé par le club — strict, inchangé par la bascule de stack)
- Palette = **rouge / vert / blanc** uniquement.
- **JAMAIS de noir en aplat** (fond, bandeau, carte). L'Encre `#161616` sert **uniquement au texte**.
- **Ne jamais coller un aplat rouge vif et un aplat vert vif côte à côte** (effet « Noël »). Toujours séparer par du blanc/coquille.
- Le **blanc domine** (~70 % de la surface). Le rouge porte l'action. Le vert est un accent / signature, jamais dominant.

### Qualité visuelle (pour ne pas retomber dans le « ça fait IA »)
- Pas d'emoji utilisé comme icône — toujours des SVG au trait (ou une lib d'icônes cohérente type Lucide/Heroicons), cohérents avec la charte.
- Pas de dégradés criards, pas de glassmorphism gratuit, pas d'effets « gimmick » sauf décision explicite.
- Les blocs photo sont des placeholders gris neutres clairement annotés `PHOTO — à remplacer`, en attendant les vraies photos du club.
- Texte spécifique au club (vrais noms, vrais horaires) plutôt que des génériques marketing quand le contenu réel est disponible.

---

## 1. Contexte du projet

- **Quoi** : site officiel du Basket Club Verfeillois (Verfeil, 31590, Haute-Garonne). Association loi 1901.
- **Pour qui** : tous les licenciés, **surtout les parents de licenciés**. Consultation **majoritairement mobile**.
- **Objectif** : centraliser qui contacter, le planning d'entraînement, les actualités (blog), la présentation du club.
- **Conversion macro (unique sur tout le site)** : inscription / renouvellement de **licence**.
- **Conversions secondaires** : inscription newsletter, contact qualifié, recrutement bénévoles, contact sponsors, présence aux matchs.
- **Règle de conversion** : un seul CTA prioritaire par page = **« S'inscrire »**, visible en permanence dans l'en-tête.

---

## 2. Stack & conventions de code (mise à jour)

- **Stack** : **React + Vite**, déployé sur **Cloudflare Pages** (build automatique à chaque push Git).
- **Back-office / blog** : **Decap CMS** (Git-based CMS) — interface web simple pour rédiger un article ; la publication = commit Git → rebuild automatique du site.
- **Formulaire newsletter** : **Formspree** (service externe hébergé UE) — pas de backend maison.
- **Nom de domaine** : `basketclubverfeillois.fr` (principal) + `basketclubverfeillois.com` (redirection 301, achat défensif).
- **SEO** : pré-rendu statique des routes (React/Vite conservé — pas de migration vers Next.js/Astro).
- **Accessibilité (sur chaque page/composant)** : landmarks sémantiques, labels de formulaire explicites, `alt`/`aria-label` sur tout visuel, respect de `prefers-reduced-motion`, navigation clavier complète (`:focus-visible` partout).
- **Noms de composants et classes en français**, clairs, pour rester compréhensibles par le club même non-développeur (`BoutonPrimaire`, `CarteRapide`, `HeroVisuel`, `BandeauChiffres`…).
- **Design tokens centralisés** (variables CSS ou config Tailwind) — une seule source pour les couleurs/espacements.
- **Commentaires en français**, par sections.
- **Espacements** : toujours des multiples de **8**.
- **Mobile-first** : on conçoit pour le mobile en premier (l'essentiel de l'audience), desktop est l'enrichissement.

### Stack précédente (archivée, ne plus utiliser comme base de travail)
D'anciens fichiers `index.html` / `style.css` (et variantes `*-refonte`) en HTML/CSS pur sans JS peuvent encore exister dans le repo à titre de référence/archive. Ils ne sont **plus la cible de déploiement**. Ne pas repartir de ces fichiers pour de nouvelles pages — repartir des composants React.

---

## 3. Charte graphique — Direction retenue : « Option A » (rouge dominant + vert signature, format sportif)

> La direction visuelle ne change pas avec la bascule de stack — seule son implémentation technique change.

### Couleurs (à porter dans les tokens/variables du projet React)
| Rôle | Token | Hex |
| --- | --- | --- |
| Rouge primaire (action) | `rouge` | `#E63946` |
| Rouge foncé (survol/diagonale) | `rouge-fonce` | `#C1121F` |
| Vert (accent, posé sur blanc) | `vert` | `#1E8E5A` |
| Vert vif (texte/élément posé SUR le rouge) | `vert-vif` | `#27C277` |
| Vert foncé (survol) | `vert-fonce` | `#166D45` |
| Blanc (base) | `blanc` | `#FFFFFF` |
| Coquille (fond de section, pied de page) | `coquille` | `#F7F7F4` |
| Encre (TEXTE uniquement) | `encre` | `#161616` |
| Gris (texte secondaire) | `gris` | `#6B7280` |
| Bordure | `bordure` | `#E6E6E2` |

> `vert-vif` (#27C277) ne sert QUE quand le vert est posé sur du rouge (ex. mot-clé dans un hero rouge), car `#1E8E5A` pur y est peu lisible. Sur fond blanc/coquille, toujours `#1E8E5A` exact.

### Typographie
- **Titres** : `Oswald` (600/700), **CAPITALES**, condensé.
- **Texte courant** : `Inter` (400/500).
- Deux polices, jamais plus. Auto-hébergées en production.
- Tailles fluides via `clamp()` : titre hero `clamp(38px,6.2vw,64px)` · titres de section `clamp(24px,4vw,36px)` · texte courant 16–18px.

### Composants standards (à porter en composants React réutilisables)
- **Boutons** : `BoutonPrimaire` (fond rouge), `BoutonBlanc` (blanc, CTA sur fond rouge/vert), `BoutonVert` (contour vert). Coins 8px, hauteur min. 48px, capitales Oswald. Un seul bouton rouge par écran.
- **Rayons** : 8px pour les blocs, 10px pour les images.
- **Logo** : monogramme SVG (cercle + lignes façon ballon) + texte « BCV ». Jamais d'emoji.
- **Icônes** : SVG au trait ou lib cohérente (Lucide). Jamais d'emoji.
- **Cartes** (`CarteRapide`, `CarteEquipe`, `CarteActu`) : fond blanc, bordure fine, ombre douce, légère élévation au survol.
- **Signature de marque** : mot-clé en vert vif dans un hero rouge (ex. « À Verfeil »), diagonale nette sur les photos via `clip-path` (jamais de débordement — vérifier à toutes les largeurs), bandeaux pleine couleur séparés par du blanc, pied de page **clair** (coquille + liseré rouge en haut, jamais sombre).

---

## 4. Arborescence du site & objectifs de conversion

| Page | Objectif de conversion | Priorité | Statut |
| --- | --- | --- | --- |
| Accueil | Aiguiller → inscription | P1 | Maquette HTML/CSS validée (Option A) — à porter en React |
| Le Club | Confiance → inscription/bénévolat | P1 | À faire |
| Équipes / Catégories | Inscription dans la bonne catégorie | P1 | À faire |
| Planning d'entraînement | Rétention/usage (PDF téléchargeable) | P1 | À faire |
| Calendrier & Résultats | Présence aux matchs (data FFBB) | P2 | À faire |
| Actualités (blog, via Decap CMS) | Newsletter + partage | P2 | À faire |
| Inscriptions / Licence ⭐ | MACRO : licence | P1 | À faire |
| Contact | Contact qualifié | P1 | À faire |
| Partenaires / Sponsors | Contact B2B | P3 | Phase 2 |
| Nous rejoindre / Bénévoles | Recrutement bénévoles | P3 | Phase 2 |
| Mentions légales / RGPD | Obligation légale + confiance | P1 | À faire — bloquant avant mise en ligne |

### Structure de la page d'accueil (validée en maquette — gabarit pour le portage React)
1. En-tête + CTA « S'inscrire » persistant (sticky)
2. Hero (rouge, titre bicolore avec mot-clé vert, 2 CTA, photo en diagonale clip-path)
3. Bandeau chiffres (fond blanc, chiffres rouges, filet vert sous chaque chiffre)
4. Accès rapides (4 cartes : Planning, Prochains matchs, Contact, Inscriptions)
5. Le club en bref
6. Équipes / catégories (aperçu)
7. Dernières actualités (3 cartes, alimentées par Decap CMS)
8. Bandeau Inscriptions (fond vert plein)
9. Partenaires (logos en niveaux de gris)
10. Newsletter (formulaire Formspree + consentement RGPD)
11. Pied de page clair (coquille, liseré rouge)

---

## 5. Responsive — exigence stricte sur toutes les pages

- **Desktop ≥ 760px** : navigation en ligne ; mises en page 2 colonnes avec diagonales.
- **Tablette ≤ 900px** : sections 2 colonnes empilées ; diagonale clip-path désactivée au profit d'un cadre photo net ; grilles réduites à 2 colonnes.
- **Mobile ≤ 560px** : tout en 1 colonne (sauf grilles d'icônes/logos en 2) ; boutons pleine largeur dans les zones d'action.
- **Petit mobile ≤ 360px** : marges resserrées, grilles à 1 colonne si nécessaire.
- **Mobile paysage** (`max-height:480px`) : hauteur des héros réduite.
- **Toujours** : pas de débordement horizontal, police des champs ≥ 16px (zoom iOS), cibles tactiles ≥ 44px.

**Avant de livrer une page** : vérifier le rendu à au moins 3 largeurs (mobile ~390px, tablette ~768px, desktop ~1200px).

---

## 6. Structure des fichiers — état confirmé + cible

**Confirmé dans le repo (racine, au 30/06/2026)** :
```
SiteBCV/
├── bcv-react/             ← le projet React/Vite (contenu non lu en détail, cf. note en tête de fichier)
├── docs/
├── logo/
├── .gitignore
├── README.md              (minimal, à enrichir)
├── index.html             ← ANCIENNE stack statique, encore à la racine
├── style.css               ← ANCIENNE stack statique, encore à la racine
├── index-refonte.html     ← ANCIENNE stack, variante "refonte"
└── style-refonte.css      ← ANCIENNE stack, variante "refonte"
```

⚠️ Point d'attention : les fichiers de l'ancienne stack (`index.html`, `style.css`, `index-refonte.html`, `style-refonte.css`) sont actuellement **à la racine du repo**, au même niveau que `bcv-react/`, pas isolés dans un dossier d'archive. Risque de confusion pour quiconque (humain ou agent) ouvre le repo et ne sait pas lequel est la cible de prod. **Tâche recommandée** : déplacer ces 4 fichiers dans un dossier `archive/` ou `legacy-static/` à la racine, pour ne laisser aucune ambiguïté sur ce qui est actif (`bcv-react/`) vs historique.

**Cible à terme à l'intérieur de `bcv-react/`** (indicative — à vérifier/ajuster une fois le contenu du dossier lisible) :
```
bcv-react/
├── package.json
├── vite.config.ts
├── index.html              point d'entrée Vite (différent du index.html racine ci-dessus)
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── assets/
├── public/
│   └── fonts/
content/        (si Decap CMS) articles en Markdown
admin/          (si Decap CMS) config.yml + interface
_headers        en-têtes sécurité Cloudflare Pages
README-securite.md
CLAUDE.md        ce fichier — à placer à la racine du repo (pas dans bcv-react/), pour couvrir tout le projet
```

> Ni `_headers`, ni `README-securite.md`, ni `CLAUDE.md` n'étaient visibles à la racine du repo au moment de la rédaction — à créer/déplacer.

---

## 7. Sécurité — résumé OWASP, modèle React/Vite (détail dans README-securite.md et ADR-005)

| Risque OWASP | Traitement |
| --- | --- |
| A01 Contrôle d'accès | X-Frame-Options: DENY / frame-ancestors 'none' |
| A02 Crypto | HTTPS forcé (Cloudflare), HSTS, aucun secret dans le code |
| A03 Injection | script-src 'self' strict (build Vite statique) ; pas de dangerouslySetInnerHTML non maîtrisé ; validation côté Formspree |
| A04 Conception | Honeypot anti-bot ; pas de lib CSS-in-JS runtime sans validation |
| A05 Mauvaise config | En-têtes Cloudflare Pages, CSP vérifiée au CSP Evaluator |
| A06 Composants vulnérables | Risque réintroduit par npm — npm audit à chaque build + Dependabot/Renovate |
| A08 Intégrité | Secrets Decap en variables d'environnement Cloudflare, jamais committés ; lockfile figé |

CSP cible en production :
```
default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self';
style-src 'self'; img-src 'self' data:; font-src 'self'; form-action 'self' https://formspree.io;
frame-ancestors 'none'; upgrade-insecure-requests
```
> Si une lib UI nécessite du CSS-in-JS runtime, adapter style-src (hash/nonce) — documenter explicitement, ne jamais élargir silencieusement à unsafe-inline.

---

## 8. Méthode de travail sur ce projet

- **Première action sur ce repo** : lister et lire le contenu réel de `bcv-react/` (package.json, structure src/) avant toute modification — ce fichier n'a pas pu être lu en détail au moment de sa rédaction (cf. note en tête de fichier), donc le §6 "cible" est une hypothèse à confirmer, pas un état constaté.
- Le projet avance étape par étape, une page ou une fonctionnalité à la fois.
- Avant de coder une nouvelle page : relire ce fichier, en particulier §3 (charte) et §5 (responsive).
- Toujours vérifier le rendu à 3 largeurs avant de considérer une page terminée.
- Avant d'ajouter une dépendance npm : vérifier l'absence de CSS-in-JS runtime non maîtrisé, lancer npm audit, signaler l'ajout explicitement.
- Le pilotage détaillé (roadmap, check-list, décisions historiques) vit dans Notion (page « BCV — Site Web | Projet & Documentation »). En cas de divergence, ce fichier fait foi pour l'implémentation technique — et toute divergence doit être reportée dans Notion.

---

## 9. Historique des décisions (ADR — résumé, détail complet dans Notion)

- **ADR-001 / ADR-003 / ADR-004** *(remplacées par ADR-005)* : ancien modèle 100 % statique HTML/CSS sans JS, conservé en archive dans le repo à titre de référence.
- **ADR-002** : identité visuelle — palette rouge/vert/blanc, Oswald + Inter, espacement en base 8. Toujours valable.
- **ADR-005** *(actuelle)* : bascule vers React + Vite + Cloudflare Pages + Decap CMS + Formspree. Nouveau modèle de sécurité : CSP stricte script-src 'self' sans unsafe-inline, npm audit + Dependabot en continu, secrets Decap en variables d'environnement, polices auto-hébergées.
- **Direction visuelle finale** : Option A retenue — rouge dominant, mot-clé « À Verfeil » en vert vif, diagonale photo nette, pied de page clair, aucun noir en aplat.

---

## 10. Ce qui est déjà livré vs à faire

### Livré (sous l'ancienne stack, sert de référence pour le portage React)
- [x] Maquette complète de la page d'accueil (HTML + CSS), responsive vérifié — Option A validée.
- [x] Hero avec diagonale clip-path propre, photo pleine hauteur.
- [x] Modèle de sécurité initial documenté (obsolète, remplacé par ADR-005).

### À faire (ordre suggéré, sous la nouvelle stack React/Vite)
1. Scaffold du projet : initialiser Vite + React, tokens de design centralisés.
2. Porter l'Accueil en composants React à partir de la maquette validée.
3. Auto-héberger les polices (public/fonts/), retirer tout lien Google Fonts.
4. Mettre en place la CSP stricte (§7) en config Cloudflare Pages, vérifier au CSP Evaluator.
5. Intégrer les vrais contenus de l'Accueil (logo, photos, chiffres, partenaires réels).
6. Décliner les pages P1 : Le Club, Équipes, Planning, Inscriptions (page macro), Contact.
7. Brancher Decap CMS pour le blog (config admin/config.yml, secrets en variables d'environnement).
8. Brancher Formspree pour la newsletter (vérifier hébergement UE + anti-spam natif).
9. Page Mentions légales / RGPD + bannière cookies + consentement parental photos — bloquant avant mise en ligne.
10. Pages P2 : Calendrier & Résultats (data FFBB si possible).
11. Déploiement : Cloudflare Pages + domaines, build auto sur push, vérification securityheaders.com.
12. npm audit + Dependabot/Renovate activés dès le scaffold.
