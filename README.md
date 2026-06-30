# SiteBCV — Site web du Basket Club Verfeillois

Site officiel du Basket Club Verfeillois (Verfeil, 31590, Haute-Garonne).
Audience principale : licenciés et **parents de licenciés** — consultation surtout mobile.
Objectif de conversion : **inscription / renouvellement de licence**.

## Stack

- **React 18 + Vite 5** (`bcv-react/`)
- **Tailwind CSS v4** (tokens de design dans `bcv-react/src/index.css` via `@theme`)
- **Framer Motion** (`motion`) pour les animations · **Tabler Icons** pour les icônes
- Hébergement cible : **Cloudflare Pages** (build auto au push)
- Blog (à venir) : **Decap CMS** · Newsletter (à venir) : **Formspree** (UE)

## Démarrage

```bash
cd bcv-react
npm install
npm run dev      # http://localhost:5601
npm run build    # build de production dans dist/
npm run preview  # prévisualiser le build
```

## Documentation

- **`CLAUDE.md`** (racine) — contexte projet complet, règles non négociables, charte, méthode de travail. À lire avant toute modification.
- **`README-securite.md`** (racine) — modèle de sécurité (OWASP / CSP / RGPD) et procédure de vérification.
- Pilotage détaillé (roadmap, ADR, specs de pages) : espace **Notion** du projet.

## Structure

```
SiteBCV/
├── bcv-react/          application React/Vite (cible de production)
├── docs/ · logo/       ressources
├── archive/            ancienne maquette HTML/CSS statique (référence, non déployée)
├── CLAUDE.md · README-securite.md
└── .github/dependabot.yml
```
